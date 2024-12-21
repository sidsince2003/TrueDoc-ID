// src/app/dashboard/verifier/history/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { verifierService } from '../../../services/verifierService';
import { Clock, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';

interface VerificationRecord {
  id: string;
  document_type: 'Aadhar' | 'PAN';
  verification_score: number;
  verified_at: string;
  status: 'verified' | 'rejected';
  blockchain_match: boolean;
  extracted_data: Record<string, string | null>;
}

export default function VerificationHistory() {
  const [records, setRecords] = useState<VerificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<'all' | 'verified' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHistory();
  }, [currentPage, filter]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/verifier/verifications?page=${currentPage}&status=${filter}`);
      const data = await response.json();
      if (data.success) {
        setRecords(data.verifications);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error('Failed to fetch verification history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecords = records.filter(record => 
    Object.values(record.extracted_data || {})
      .some(value => value?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const StatusBadge = ({ status }: { status: 'verified' | 'rejected' }) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'verified' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status === 'verified' ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Verification History</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search verifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'verified' | 'rejected')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blockchain Match
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.document_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.verification_score.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.blockchain_match 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.blockchain_match ? 'Matched' : 'Not Matched'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.verified_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No verification records found
            </div>
          )}

          {totalPages > 1 && (
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}