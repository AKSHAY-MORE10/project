import React, { useState, useEffect } from 'react';
import { AppConfig } from '../types';
import { UserConfigService } from '../services/userConfigService';
import { useParams, Navigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import PreviewMode from './PreviewMode';

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) {
        setError('Username is required');
        setIsLoading(false);
        return;
      }

      try {
        // Check if user exists
        const userExists = await UserConfigService.userExists(username);
        if (!userExists) {
          setError('Profile not found');
          setIsLoading(false);
          return;
        }

        // Load user configuration
        const userConfig = await UserConfigService.getUserConfig(username);
        if (!userConfig) {
          setError('Profile configuration not found');
          setIsLoading(false);
          return;
        }

        setConfig(userConfig);
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-8">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PreviewMode config={config} />
    </div>
  );
} 