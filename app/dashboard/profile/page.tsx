// src/app/dashboard/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Key, Shield } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  hash_id: string;
  is_email_verified: boolean;
  created_at: string;
  last_login: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setProfile(JSON.parse(userData));
      setLoading(false);
    }
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateSuccess(false);
    
    try {
      // API call would go here
      setUpdateSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profile?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{profile?.role}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile}>
          {/* Profile Information */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={profile?.name}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={profile?.email}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <input
                  type="text"
                  value={profile?.role}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end space-x-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </form>

        {/* Success/Error Messages */}
        {updateSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Profile updated successfully!
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}