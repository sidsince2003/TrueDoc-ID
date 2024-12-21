"use client"

// src/app/dashboard/documents/components/ShareModal.tsx
import { useState } from 'react';
import { X, Copy, Mail, Link, Clock } from 'lucide-react';

interface ShareModalProps {
  document: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

export default function ShareModal({ document, onClose }: ShareModalProps) {
  const [shareType, setShareType] = useState<'link' | 'email'>('link');
  const [email, setEmail] = useState('');
  const [expiry, setExpiry] = useState('7');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (shareType === 'email' && !email) return;

    try {
      // Handle share logic here
      const response = await fetch('/api/documents/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: document.id,
          shareType,
          email: shareType === 'email' ? email : undefined,
          expiry: parseInt(expiry),
        }),
      });

      if (!response.ok) throw new Error('Failed to share document');
      
      onClose();
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleCopyLink = () => {
    const shareLink = `${window.location.origin}/documents/shared/${document.id}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Share Document
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Options */}
        <div className="space-y-6">
          {/* Share Type Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShareType('link')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                shareType === 'link'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Link className="w-4 h-4 inline-block mr-2" />
              Share Link
            </button>
            <button
              onClick={() => setShareType('email')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                shareType === 'email'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Mail className="w-4 h-4 inline-block mr-2" />
              Email
            </button>
          </div>

          {/* Share Settings */}
          <div className="space-y-4">
            {shareType === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter recipient's email"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Link Expiry
              </label>
              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-3 py-py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="never">Never expire</option>
              </select>
            </div>

            {shareType === 'link' && (
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/documents/shared/${document.id}`}
                  className="w-full px-3 py-2 pr-20 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <button
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
                >
                  {copied ? 'Copied!' : 'Copy'}
                  <Copy className="w-4 h-4 inline-block ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}