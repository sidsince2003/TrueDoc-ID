// src/app/dashboard/verifier/components/VerificationModal.tsx
'use client';

import { useState, useCallback } from 'react';
import { Upload, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// Type definitions
interface Document {
  id: string;
  name: string;
  type: 'Aadhar' | 'PAN';
  uploader: string;
  hash?: string;
  date: string;
  status: 'pending' | 'verified' | 'rejected';
}

interface VerificationResult {
  success: boolean;
  message: string;
  score: number;
  blockchain_match: boolean;
  extracted_data: {
    [key: string]: string | null;
  };
  status: 'verified' | 'rejected';
  verification_id: string;
}

interface VerificationModalProps {
  document: Document | null;
  onClose: () => void;
  onVerificationComplete: (result: VerificationResult) => void;
}

type VerificationStatus = 'idle' | 'processing' | 'completed' | 'error';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export default function VerificationModal({
  document,
  onClose,
  onVerificationComplete
}: VerificationModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG or PNG)';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size should be less than 5MB';
    }
    return null;
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        e.target.value = '';
        return;
      }

      setIsUploading(true);
      try {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setIsUploading(false);
        };
        reader.onerror = () => {
          throw new Error('Failed to read file');
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        setError('Error processing file. Please try again.');
        setIsUploading(false);
      }
    }
  }, [validateFile]);

  const handleVerification = async () => {
    if (!file || !document) {
      setError('Please select a file to verify');
      return;
    }

    setVerificationStatus('processing');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', document.type);
    if (document.hash) {
      formData.append('original_hash', document.hash);
    }

    try {
      const response = await fetch('/api/verifier/verify-document', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification failed');
      }

      const result: VerificationResult = await response.json();
      setVerificationResult(result);
      setVerificationStatus('completed');
      
      if (result.success) {
        setTimeout(() => {
          onVerificationComplete(result);
        }, 2000);
      } else {
        setError(result.message);
        setVerificationStatus('error');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setError(error instanceof Error ? error.message : 'Verification failed');
      setVerificationStatus('error');
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'idle':
        return (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Original Document Details</h3>
                {document && (
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {document.name}</p>
                    <p><span className="font-medium">Type:</span> {document.type}</p>
                    <p><span className="font-medium">Uploader:</span> {document.uploader}</p>
                    {document.hash && (
                      <p><span className="font-medium">Hash:</span> {document.hash}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Upload Document for Verification</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Upload a JPEG or PNG image (max 5MB)
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500"
                      disabled={isUploading}
                    />
                  </div>
                </div>
                {isUploading && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Processing image...
                  </div>
                )}
                {preview && (
                  <div className="mt-4">
                    <img 
                      src={preview} 
                      alt="Document preview" 
                      className="max-w-full h-auto rounded border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleVerification}
                disabled={!file || isUploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isUploading ? 'Processing...' : 'Verify Document'}
              </button>
            </div>
          </>
        );

      case 'processing':
        return (
          <div className="flex flex-col items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Verifying document with AI...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        );

      case 'completed':
        return verificationResult && (
          <div className="py-8">
            <div className="flex items-center justify-center mb-6">
              {verificationResult.score >= 50 ? (
                <div className="text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="mt-2 text-green-600 font-medium">Verification Successful</p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                  <p className="mt-2 text-red-600 font-medium">Verification Failed</p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium mb-4">Verification Results</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Verification Score</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {verificationResult.score.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blockchain Match</p>
                    <p className={`text-lg font-medium ${
                      verificationResult.blockchain_match ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {verificationResult.blockchain_match ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              </div>

              {verificationResult.extracted_data && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">Extracted Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(verificationResult.extracted_data).map(([key, value]) => (
                      <div key={key} className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm text-gray-500 capitalize">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className="font-medium">
                          {value || 'Not found'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-red-600 font-medium">Verification Failed</p>
            <p className="text-sm text-gray-500 mt-2">{error}</p>
            <button
              onClick={() => setVerificationStatus('idle')}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Document Verification</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        {error && verificationStatus !== 'error' && (
          <div className="mb-6 p-4 bg-red-50 rounded-md">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}