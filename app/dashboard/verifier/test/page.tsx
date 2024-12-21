'use client';

import { useState } from 'react';
import { FileText, Upload, Check, AlertCircle } from 'lucide-react';

interface VerificationResult {
  success: boolean;
  score: number;
  verification_data: {
    text_score: number;
    feature_score: number;
    extracted_data: Record<string, string>;
  };
}

export default function VerificationTest() {
  const [originalDoc, setOriginalDoc] = useState<File | null>(null);
  const [testDoc, setTestDoc] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('aadhar');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    if (!testDoc) {
        setError('Please select a document to verify');
        return;
    }

    setLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append('file', testDoc);
        formData.append('document_type', documentType);

        // Note the updated endpoint URL
        const response = await fetch('http://localhost:5000/api/verifier/verify-document', {
            method: 'POST',
            body: formData
        });

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        try {
            const data = JSON.parse(responseText);
            if (data.success) {
                setVerificationResult(data);
            } else {
                setError(data.message || 'Verification failed');
            }
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            setError('Server returned invalid response format');
        }

    } catch (error: unknown) {
        console.error('Request Error:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-black dark:text-white">Document Verification Testing</h2>

        {/* Document Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Document Type
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:text-white dark:bg-gray-700"
          >
            <option value="aadhar">Aadhar Card</option>
            <option value="pan">PAN Card</option>
            <option value="degree">Degree Certificate</option>
          </select>
        </div>

        {/* Original Document Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Original Document (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <input
              type="file"
              onChange={(e) => setOriginalDoc(e.target.files?.[0] || null)}
              className="w-full text-black dark:text-white"
              accept="image/*"
            />
            {originalDoc && (
              <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                <Check className="w-4 h-4 mr-1" />
                {originalDoc.name}
              </div>
            )}
          </div>
        </div>

        {/* Test Document Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Test Document
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <input
              type="file"
              onChange={(e) => setTestDoc(e.target.files?.[0] || null)}
              className="w-full text-black dark:text-white"
              accept="image/*"
            />
            {testDoc && (
              <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                <Check className="w-4 h-4 mr-1" />
                {testDoc.name}
              </div>
            )}
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerification}
          disabled={loading || !testDoc}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Verify Document
            </>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Verification Results */}
        {verificationResult && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Verification Results</h3>
            
            {/* Score */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Verification Score</span>
                <span className={`text-xl font-bold ${
                  verificationResult.score >= 80 ? 'text-green-600' :
                  verificationResult.score >= 50 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {verificationResult.score.toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 bg-gray-200 dark:bg-gray-600 h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    verificationResult.score >= 80 ? 'bg-green-500' :
                    verificationResult.score >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${verificationResult.score}%` }}
                />
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-2 gap-4">
              {/* Text Score */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-black dark:text-white mb-2">Text Match</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {verificationResult.verification_data.text_score.toFixed(1)}%
                </p>
              </div>

              {/* Feature Score */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-black dark:text-white mb-2">Feature Match</h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {verificationResult.verification_data.feature_score.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Extracted Data */}
            {verificationResult.verification_data.extracted_data && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-black dark:text-white mb-2">Extracted Information</h4>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  {Object.entries(verificationResult.verification_data.extracted_data).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-black dark:text-white text-sm mb-1">
                      <span>{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
