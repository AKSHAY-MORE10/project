import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or the user profile is not available.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Home size={16} />
            <span>Go Home</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try these demo profiles:</p>
            <div className="mt-2 space-x-4">
              <Link
                to="/nitesh"
                className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-700"
              >
                <User size={14} />
                <span>/nitesh</span>
              </Link>
              <Link
                to="/akshay"
                className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-700"
              >
                <User size={14} />
                <span>/akshay</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 