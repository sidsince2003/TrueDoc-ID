'use client';

import { useState } from 'react';
import { Eye, Download, Share2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Document } from '../../../types/document';

interface DocumentsListProps {
  documents: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents: initialDocuments }) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const StatusIcon = ({ status }: { status: Document['status'] }) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };
  

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <StatusIcon status={doc.status} />
                <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Issuer</p>
                  <p className="text-sm font-medium text-gray-900">{doc.issuer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Issued</p>
                  <p className="text-sm font-medium text-gray-900">{doc.date}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsList;
