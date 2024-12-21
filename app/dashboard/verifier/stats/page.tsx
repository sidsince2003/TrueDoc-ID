// src/app/dashboard/verifier/stats/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { verifierService } from '../../../services/verifierService';
import { BarChart2, PieChart, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface VerificationStats {
  total_verifications: number;
  verified_count: number;
  rejected_count: number;
  average_score: number;
  verification_rate: number;
  weekly_stats: {
    date: string;
    count: number;
    average_score: number;
  }[];
  document_type_distribution: {
    type: string;
    count: number;
  }[];
}

export default function VerificationStats() {
  const [stats, setStats] = useState<VerificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    fetchStats();
  }, [timeframe]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/verifier/dashboard-stats?timeframe=${timeframe}`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch verification stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-gray-500">
        Failed to load statistics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Verification Statistics</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Verifications</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total_verifications}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+{stats.verification_rate}%</span>
            <span className="text-gray-500 ml-2">vs previous {timeframe}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {((stats.verified_count / stats.total_verifications) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <PieChart className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {stats.verified_count} of {stats.total_verifications} successful
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">{stats.average_score.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Time</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">45s</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Average verification time
          </div>
        </div>
      </div>

      {/* Document Type Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Document Type Distribution</h2>
        <div className="space-y-4">
          {stats.document_type_distribution.map((item) => (
            <div key={item.type}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">{item.type}</span>
                <span className="text-sm text-gray-500">{item.count} verifications</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
              // src/app/dashboard/verifier/stats/page.tsx (continued)
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(item.count / stats.total_verifications) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Verification Performance</h2>
        <div className="relative h-80">
          <div className="absolute inset-0 flex items-end space-x-2">
            {stats.weekly_stats.map((day) => (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center"
              >
                <div className="relative flex-1 w-full">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t"
                    style={{
                      height: `${(day.count / Math.max(...stats.weekly_stats.map(d => d.count))) * 100}%`
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  index % 2 === 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {index % 2 === 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Document {index % 2 === 0 ? 'Verified' : 'Rejected'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {index % 2 === 0 ? '95.5%' : '42.3%'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Section */}
      <div className="flex justify-end">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          onClick={() => {
            // Add export functionality
            console.log('Exporting stats...');
          }}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}