import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppConfig } from '../types';
import { UserConfigService } from '../services/userConfigService';
import EditMode from './EditMode';
import PreviewMode from './PreviewMode';
import ProfileSettings from './ProfileSettings';
import { LogOut, ExternalLink, Settings, User } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadUserConfig = async () => {
      try {
        // Load user config
        let userConfig = await UserConfigService.getUserConfig(user.username);
        if (!userConfig) {
          // Create default config for new user
          userConfig = await UserConfigService.createUserConfig(user.username, user);
        }
        setConfig(userConfig);
      } catch (error) {
        console.error('Error loading user config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserConfig();
  }, [user, navigate]);

  const handleConfigChange = async (newConfig: AppConfig) => {
    try {
      setConfig(newConfig);
      if (user) {
        await UserConfigService.saveUserConfig(user.username, newConfig);
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPublicUrl = () => {
    return `${window.location.origin}/${user?.username}`;
  };

  const handleProfileSettings = () => {
    setIsProfileSettingsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!config) {
    return <div>Error loading configuration</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">OneTab Dashboard</h1>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Public Link */}
              <a
                href={getPublicUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-purple-600 hover:text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-50"
              >
                <ExternalLink size={16} />
                <span>View Public Profile</span>
              </a>

              {/* Profile Settings */}
              <button 
                onClick={handleProfileSettings}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <User size={16} />
                <span>Profile Settings</span>
              </button>

              

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreviewMode ? (
          <div className="relative">
            <PreviewMode config={config} />
            <button
              onClick={() => setIsPreviewMode(false)}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors z-50"
            >
              Back to Editor
            </button>
          </div>
        ) : (
          <EditMode
            config={config}
            onConfigChange={handleConfigChange}
            onPreviewMode={() => setIsPreviewMode(true)}
          />
        )}
      </main>

      {/* Profile Settings Modal */}
      <ProfileSettings
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      />
    </div>
  );
} 