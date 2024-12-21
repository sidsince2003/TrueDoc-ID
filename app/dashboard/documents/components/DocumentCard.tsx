"use client"
// src/app/dashboard/documents/components/DocumentCard.tsx
import { FileText, MoreVertical, Eye, Download, Share2, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface DocumentCardProps {
  doc: {  // Renamed from 'document' to 'doc' to avoid confusion
    id: string;
    name: string;
    type: string;
    status: string;
    uploadedAt: string;
    size: number;
  };
  onAction: (action: string, doc: any) => void;
}

export default function DocumentCard({ doc, onAction }: DocumentCardProps) {
  const [showActions, setShowActions] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionRef.current && !actionRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    }
    // Using global document object here, not the prop
    window.document.addEventListener('mousedown', handleClickOutside);
    return () => window.document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      {/* Document Icon and Type */}
      <div className="flex items-start justify-between mb-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="relative" ref={actionRef}>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {/* Action Menu */}
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
              <button
                onClick={() => onAction('view', doc)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button
                onClick={() => onAction('download', doc)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => onAction('share', doc)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={() => onAction('delete', doc)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Document Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">
          {doc.name}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {formatFileSize(doc.size)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${doc.status === 'verified' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : doc.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}