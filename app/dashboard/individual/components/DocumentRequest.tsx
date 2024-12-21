'use client';

import { useState } from 'react';

interface RequestModalProps {
  onClose: () => void;
}

const DocumentRequest = ({ onClose }: RequestModalProps) => {
  const [requestDetails, setRequestDetails] = useState({
    documentType: '',
    purpose: '',
    urgency: 'normal'
  });

  const handleSubmit = () => {
    if (!requestDetails.documentType || !requestDetails.purpose) {
      alert('Please fill all required fields.');
      return;
    }
    console.log('Requesting document:', requestDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Request New Document</h2>
        <select
          value={requestDetails.documentType}
          onChange={(e) => setRequestDetails(prev => ({ ...prev, documentType: e.target.value }))}
          className="block w-full mb-4 p-2 border rounded"
        >
          <option value="">Select Document Type</option>
          <option value="certificate">Certificate</option>
          <option value="transcript">Transcript</option>
          <option value="identification">Identification</option>
        </select>
        <textarea
          placeholder="Purpose of request"
          value={requestDetails.purpose}
          onChange={(e) => setRequestDetails(prev => ({ ...prev, purpose: e.target.value }))}
          className="block w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentRequest;