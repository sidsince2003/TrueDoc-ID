"use client"

// src/app/dashboard/documents/components/UploadModal.tsx
import { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload PDF, JPEG, or PNG files.');
      return false;
    }
    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit.');
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      // Handle file upload here
      onUpload(selectedFile);
    } catch (error) {
      setError('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Upload Document
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center
            ${dragOver 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600'
            }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={allowedTypes.join(',')}
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex items-center justify-center space-x-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag and drop your file here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PDF, JPEG, or PNG (max. 10MB)
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center text-red-800 dark:text-red-200">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-lg text-white
              ${selectedFile
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}