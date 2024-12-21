// src/app/dashboard/documents/components/DocumentViewer.tsx
import { X, Download, Share2, Printer } from 'lucide-react';

interface DocumentViewerProps {
  document: {
    id: string;
    name: string;
    type: string;
    url?: string;
    status: string;
    hash?: string;
  };
  onClose: () => void;
}

export default function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {document.name}
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Printer className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Display */}
        <div className="flex-1 p-4 overflow-auto">
          {document.type.includes('image') ? (
            <img 
              src={document.url} 
              alt={document.name}
              className="max-w-full h-auto mx-auto"
            />
          ) : (
            <iframe
              src={document.url}
              className="w-full h-full border-0"
              title={document.name}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Document Hash: {document.hash}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${document.status === 'verified' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : document.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}