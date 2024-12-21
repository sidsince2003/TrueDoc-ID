'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Upload, 
  Search, 
  Sun, 
  Moon 
} from 'lucide-react';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  type: string;
  verificationProgress?: number;
}

const DocumentStatusBadge = ({ status }: { status: Document['status'] }) => {
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
      icon: <Clock className="w-4 h-4 mr-2" />,
      text: 'Pending Verification'
    },
    approved: {
      color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200',
      icon: <CheckCircle2 className="w-4 h-4 mr-2" />,
      text: 'Verified'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
      icon: <XCircle className="w-4 h-4 mr-2" />,
      text: 'Rejected'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 space-y-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{document.name}</h3>
        </div>
        <DocumentStatusBadge status={document.status} />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Upload Date</span>
          <span>{document.date}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Document Type</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{document.type}</span>
        </div>
      </div>
      
      {document.status === 'pending' && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${document.verificationProgress || 0}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

// Modal Component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Issue a New Document</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Document Name</label>
            <input id="document-name" type="text" className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div>
            <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Document Type</label>
            <input id="document-type" type="text" className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Issue Document</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function IssuerDashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme to the document body
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Simulated document fetch
    const mockDocuments: Document[] = [
      { 
        id: '1', 
        name: 'Employment Certificate', 
        date: '2024-01-15', 
        status: 'approved', 
        type: 'Employment',
        verificationProgress: 100
      },
      { 
        id: '2', 
        name: 'Academic Transcript', 
        date: '2024-02-20', 
        status: 'pending', 
        type: 'Academic',
        verificationProgress: 65
      },
      { 
        id: '3', 
        name: 'Tax Declaration', 
        date: '2024-03-10', 
        status: 'rejected', 
        type: 'Financial',
        verificationProgress: 0
      }
    ];

    setDocuments(mockDocuments);
  }, []);

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Issuer Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and track your issued documents</p>
            </div>
            <div className="flex items-center space-x-4">
             <Link href="/dashboard/issuer/certificate-gen"> <button 
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                <Plus className="w-5 h-5" />
                <span>Issue Document</span>
              </button></Link>
            </div>
          </div>
        </header>

        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>


      </div>
    </div>
  );
}
