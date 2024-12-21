'use client';

import { Plus, FileText, Users, Settings } from 'lucide-react';

const IssuerActions = ({ onIssueNew }: { onIssueNew: () => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <button
        onClick={onIssueNew}
        className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Issue New Document
      </button>
      
      <button className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        <FileText className="w-5 h-5 mr-2" />
        Manage Templates
      </button>
      
      <button className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        <Settings className="w-5 h-5 mr-2" />
        Settings
      </button>
    </div>
  );
};

export default IssuerActions;