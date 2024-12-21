// src/app/dashboard/history/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { History, FileText, UserCheck, Upload, Clock, Filter } from 'lucide-react';

interface HistoryItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  status: string;
  type: string;
  documentName?: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulated history data - replace with API call
    const mockHistory: HistoryItem[] = [
      {
        id: '1',
        action: 'Document Verification',
        description: 'Verified university degree certificate',
        timestamp: '2024-03-15T10:30:00',
        status: 'completed',
        type: 'verification',
        documentName: 'Degree Certificate'
      },
      {
        id: '2',
        action: 'Document Upload',
        description: 'Uploaded new document for verification',
        timestamp: '2024-03-14T15:45:00',
        status: 'pending',
        type: 'upload',
        documentName: 'Experience Letter'
      }
    ];
    
    setHistory(mockHistory);
    setLoading(false);
  }, []);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return <UserCheck className="w-5 h-5" />;
      case 'upload':
        return <Upload className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity History</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track all your document-related activities</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Activities</option>
            <option value="verification">Verifications</option>
            <option value="upload">Uploads</option>
          </select>
          <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* History Timeline */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start space-x-4"
            >
              <div className={`p-2 rounded-full ${
                item.type === 'verification' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                item.type === 'upload' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {getActionIcon(item.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.action}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                
                {item.documentName && (
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="w-4 h-4 mr-1" />
                    {item.documentName}
                  </div>
                )}

                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}