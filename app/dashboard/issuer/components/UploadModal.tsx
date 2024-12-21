'use client';

import { useState } from 'react';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal = ({ onClose }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!file) {
      alert('Please upload a file.');
      return;
    }
    console.log('Uploading file:', file.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Issue New Document</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full mb-4"
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
