// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  Activity
} from 'lucide-react';

interface DashboardStats {
  documents: {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
  metrics: {
    [key: string]: number;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    documents: {
      total: 0,
      pending: 0,
      verified: 0,
      rejected: 0
    },
    recentActivities: [],
    metrics: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Simulated API call for dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Replace with actual API call
      const mockData = getMockData(user?.role);
      setStats(mockData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMockData = (role: string): DashboardStats => {
    // Mock data based on user role
    const baseStats = {
      documents: {
        total: 150,
        pending: 25,
        verified: 115,
        rejected: 10
      },
      recentActivities: [
        {
          id: '1',
          type: 'verification',
          description: 'Degree Certificate verified',
          timestamp: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: '2',
          type: 'upload',
          description: 'New document uploaded for verification',
          timestamp: new Date().toISOString(),
          status: 'pending'
        }
      ],
      metrics: {}
    };

    // Add role-specific metrics
    switch (role) {
      case 'Verifier':
        baseStats.metrics = {
          verificationRate: 95,
          avgVerificationTime: 2.5,
          pendingVerifications: 25
        };
        break;
      case 'Issuer':
        baseStats.metrics = {
          issuedToday: 12,
          totalIssued: 450,
          pendingRequests: 15
        };
        break;
      case 'Individual':
        baseStats.metrics = {
          documentsShared: 8,
          activeRequests: 3,
          totalDocuments: 25
        };
        break;
    }

    return baseStats;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'rejected':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's an overview of your document management system
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.documents.total}
              </h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {stats.documents.verified}
              </h3>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                {stats.documents.pending}
              </h3>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                {stats.documents.rejected}
              </h3>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Role-Specific Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(stats.metrics).map(([key, value]) => (
          <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {typeof value === 'number' && value % 1 === 0 ? value : value.toFixed(1)}
                </h3>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {stats.recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                  {activity.type === 'verification' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}