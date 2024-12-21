// src/app/dashboard/documents/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Upload,
  Filter,
  Search,
  FileText,
  Download,
  Share2,
  Trash2,
  Eye,
  MoreVertical
} from 'lucide-react';
import DocumentViewer from '../documents/components/DocumentViewer';
import UploadModal from '../documents/components/UploadModal';
import ShareModal from '../documents/components/ShareModal';
import FilterPanel from '../documents/components/FilterPanel';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  hash: string;
  issuer?: string;
  verifiedBy?: string;
  description?: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    date: 'all'
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentAction = async (action: string, document: Document) => {
    switch (action) {
      case 'view':
        setSelectedDocument(document);
        setShowViewer(true);
        break;
      case 'share':
        setSelectedDocument(document);
        setShowShareModal(true);
        break;
      case 'download':
        // Implement download logic
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this document?')) {
          // Implement delete logic
        }
        break;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || doc.status === filters.status;
    const matchesType = filters.type === 'all' || doc.type === filters.type;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Documents</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your documents</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Documents List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Document
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {document.name}
                          </div>
                          {document.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {document.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${document.status === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          document.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {document.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(document.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleDocumentAction('view', document)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDocumentAction('share', document)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDocumentAction('download', document)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDocumentAction('delete', document)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(file) => {
            // Handle file upload
            setShowUploadModal(false);
          }}
        />
      )}

      {showShareModal && selectedDocument && (
        <ShareModal
          document={selectedDocument}
          onClose={() => {
            setShowShareModal(false);
            setSelectedDocument(null);
          }}
        />
      )}

      {showViewer && selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => {
            setShowViewer(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </div>
  );
}