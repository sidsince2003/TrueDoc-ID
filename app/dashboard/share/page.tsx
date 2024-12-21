// src/app/dashboard/share/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Share2, 
  Link, 
  Clock, 
  Users, 
  Shield, 
  Eye,
  XCircle,
  Copy,
  RefreshCw,
  Mail
} from 'lucide-react';

interface SharedDocument {
  id: string;
  documentId: string;
  documentName: string;
  sharedWith: string;
  sharedAt: string;
  expiresAt: string | null;
  accessCount: number;
  status: 'active' | 'expired' | 'revoked';
  shareType: 'link' | 'email';
  lastAccessed?: string;
}

export default function ShareManagementPage() {
  const [sharedDocuments, setSharedDocuments] = useState<SharedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSharedDocuments();
  }, []);

  const fetchSharedDocuments = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/documents/shares');
      const data = await response.json();
      setSharedDocuments(data);
    } catch (error) {
      console.error('Error fetching shared documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAccess = async (shareId: string) => {
    if (window.confirm('Are you sure you want to revoke access?')) {
      try {
        await fetch(`/api/documents/shares/${shareId}/revoke`, {
          method: 'POST'
        });
        // Refresh the list
        fetchSharedDocuments();
      } catch (error) {
        console.error('Error revoking access:', error);
      }
    }
  };

  const handleRefreshLink = async (shareId: string) => {
    try {
      const response = await fetch(`/api/documents/shares/${shareId}/refresh`, {
        method: 'POST'
      });
      const data = await response.json();
      // Update the link in the UI
      setSharedDocuments(prev =>
        prev.map(doc =>
          doc.id === shareId ? { ...doc, ...data } : doc
        )
      );
    } catch (error) {
      console.error('Error refreshing link:', error);
    }
  };

  const handleCopyLink = (shareId: string) => {
    const shareLink = `${window.location.origin}/shared/${shareId}`;
    navigator.clipboard.writeText(shareLink);
    // You could add a toast notification here
  };

  const filteredDocuments = sharedDocuments.filter(doc => {
    const matchesFilter = filter === 'all' || doc.status === filter;
    const matchesSearch = doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.sharedWith.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shared Documents</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your shared documents and access permissions
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Shares</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {sharedDocuments.filter(doc => doc.status === 'active').length}
              </h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <Share2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Access Count</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {sharedDocuments.reduce((sum, doc) => sum + doc.accessCount, 0)}
              </h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expired Shares</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {sharedDocuments.filter(doc => doc.status === 'expired').length}
              </h3>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search shared documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="all">All Shares</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="revoked">Revoked</option>
        </select>
      </div>

      {/* Shares List */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Shared With
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Access Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((share) => (
                  <tr key={share.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {share.documentName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {share.shareType === 'email' ? (
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        ) : (
                          <Link className="w-4 h-4 text-gray-400 mr-2" />
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {share.sharedWith}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${share.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : share.status === 'expired'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                        {share.status.charAt(0).toUpperCase() + share.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {share.accessCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {share.expiresAt 
                        ? new Date(share.expiresAt).toLocaleDateString()
                        : 'Never'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleCopyLink(share.id)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRefreshLink(share.id)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRevokeAccess(share.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <XCircle className="w-5 h-5" />
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
    </div>
  );
}