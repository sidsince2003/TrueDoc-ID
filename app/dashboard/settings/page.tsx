// src/app/dashboard/settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Lock,
  Globe,
  Shield,
  Save,
  RefreshCw
} from 'lucide-react';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    documents: boolean;
    updates: boolean;
  };
  privacy: {
    showProfile: boolean;
    showHistory: boolean;
    twoFactorAuth: boolean;
  };
  preferences: {
    language: string;
    darkMode: boolean;
    compactView: boolean;
  };
  security: {
    loginAlerts: boolean;
    deviceHistory: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      documents: true,
      updates: false,
    },
    privacy: {
      showProfile: true,
      showHistory: false,
      twoFactorAuth: false,
    },
    preferences: {
      language: 'en',
      darkMode: false,
      compactView: false,
    },
    security: {
      loginAlerts: true,
      deviceHistory: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (category: keyof Settings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulated API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const SettingToggle = ({ 
    label, 
    checked, 
    onChange 
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void 
  }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences and configuration</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className={`flex items-center px-4 py-2 rounded-lg text-white
            ${isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
            transition-colors duration-200`}
        >
          {isSaving ? (
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-2">
            <SettingToggle
              label="Email Notifications"
              checked={settings.notifications.email}
              onChange={() => handleToggle('notifications', 'email')}
            />
            <SettingToggle
              label="Push Notifications"
              checked={settings.notifications.push}
              onChange={() => handleToggle('notifications', 'push')}
            />
            <SettingToggle
              label="Document Updates"
              checked={settings.notifications.documents}
              onChange={() => handleToggle('notifications', 'documents')}
            />
            <SettingToggle
              label="Platform Updates"
              checked={settings.notifications.updates}
              onChange={() => handleToggle('notifications', 'updates')}
            />
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h2>
          </div>
          <div className="space-y-2">
            <SettingToggle
              label="Show Profile to Others"
              checked={settings.privacy.showProfile}
              onChange={() => handleToggle('privacy', 'showProfile')}
            />
            <SettingToggle
              label="Public History"
              checked={settings.privacy.showHistory}
              onChange={() => handleToggle('privacy', 'showHistory')}
            />
            <SettingToggle
              label="Two-Factor Authentication"
              checked={settings.privacy.twoFactorAuth}
              onChange={() => handleToggle('privacy', 'twoFactorAuth')}
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                className="ml-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <SettingToggle
              label="Dark Mode"
              checked={settings.preferences.darkMode}
              onChange={() => handleToggle('preferences', 'darkMode')}
            />
            <SettingToggle
              label="Compact View"
              checked={settings.preferences.compactView}
              onChange={() => handleToggle('preferences', 'compactView')}
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h2>
          </div>
          <div className="space-y-2">
            <SettingToggle
              label="Login Alerts"
              checked={settings.security.loginAlerts}
              onChange={() => handleToggle('security', 'loginAlerts')}
            />
            <SettingToggle
              label="Device History"
              checked={settings.security.deviceHistory}
              onChange={() => handleToggle('security', 'deviceHistory')}
            />
            <button
              className="mt-4 w-full py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
              onClick={() => {/* Handle password change */}}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}