// src/app/dashboard/documents/components/FilterPanel.tsx
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    status: string;
    type: string;
    date: string;
  };
  onChange: (filters: any) => void;
  onClose: () => void;
}

export default function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Document Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Document Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF Documents</option>
            <option value="image">Images</option>
            <option value="certificate">Certificates</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <select
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}