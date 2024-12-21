// src/app/dashboard/verifier/components/DocumentTable.tsx
'use client';

import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'Aadhar' | 'PAN';
  uploader: string;
  hash?: string;
  date: string;
  status: 'pending' | 'verified' | 'rejected';
}

interface DocumentTableProps {
  documents: Document[];
  onVerify: (document: Document) => void;
}

const StatusBadge = ({ status }: { status: Document['status'] }) => {
  const statusConfig = {
    pending: {
      icon: <Clock className="w-4 h-4" />,
      text: 'Pending',
      className: 'bg-yellow-100 text-yellow-800'
    },
    verified: {
      icon: <CheckCircle className="w-4 h-4" />,
      text: 'Verified',
      className: 'bg-green-100 text-green-800'
    },
    rejected: {
      icon: <XCircle className="w-4 h-4" />,
      text: 'Rejected',
      className: 'bg-red-100 text-red-800'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

export default function DocumentTable({ documents, onVerify }: DocumentTableProps) {
  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No documents found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploader
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                  {doc.hash && (
                    <div className="text-xs text-gray-500 mt-1 truncate max-w-xs" title={doc.hash}>
                      {doc.hash}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.uploader}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(doc.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onVerify(doc)}
                    disabled={doc.status !== 'pending'}
                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white
                      ${doc.status === 'pending'
                        ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        : 'bg-gray-300 cursor-not-allowed'
                      }`}
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}