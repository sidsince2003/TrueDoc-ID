'use client';

import { useState } from 'react';

interface VerificationFormProps {
  onVerify: (doc: { name: string; status: string }) => void;
}

const VerificationForm = ({ onVerify }: VerificationFormProps) => {
  const [docId, setDocId] = useState('');
  const [status, setStatus] = useState('');

  const handleVerification = () => {
    // Simulate verification
    const doc = { name: `Document ${docId}`, status: 'Verified' };
    setStatus('Verified');
    onVerify(doc);
    setDocId('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-2">Verify Document</h3>
      <input
        type="text"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        placeholder="Enter Document ID"
        className="block w-full mb-4 px-4 py-2 border rounded-md"
      />
      <button
        onClick={handleVerification}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Verify
      </button>
      {status && (
        <p className="mt-2 text-green-600 font-semibold">Document Verified!</p>
      )}
    </div>
  );
};

export default VerificationForm;
