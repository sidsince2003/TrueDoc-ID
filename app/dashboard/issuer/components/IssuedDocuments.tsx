'use client';

import { useState } from 'react';
import { Download, Eye, Share2 } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  recipient: string;
  dateIssued: string;
  status: 'verified' | 'pending' | 'rejected';
  type: string;
}

const IssuedDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Bachelor Degree Certificate',
      recipient: 'John Doe',
      dateIssued: '2024-03-15',
      status: 'verified',
      type: 'Academic'
    },
    {
      id: '2',
      title: 'Course Completion Certificate',
      recipient: 'Jane Smith',
      dateIssued: '2024-03-14',
      status: 'pending',
      type: 'Course'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Issued Documents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                    <div className="text-sm text-gray-500">{doc.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.dateIssued}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssuedDocuments;