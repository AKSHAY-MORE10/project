import React from 'react';
import { AppConfig } from '../types';
import { defaultIcons } from '../data/defaultIcons';

interface PreviewModeProps {
  config: AppConfig;
}

const PreviewMode: React.FC<PreviewModeProps> = ({ config }) => {
  const { profile, links, theme, specialButton } = config;
  const visibleLinks = links.filter(link => link.show).sort((a, b) => a.order - b.order);

  const getThemeClasses = () => {
    return 'bg-white text-gray-900';
  };

  const getButtonClasses = () => {
    const baseClasses = 'w-full p-3 sm:p-4 border transition-all hover:scale-105';
    const styleClasses = {
      rounded: 'rounded-lg',
      square: 'rounded-none',
      pill: 'rounded-full'
    };
    
    const colorClasses = theme.colorScheme === 'dark' 
      ? 'border-gray-700 bg-gray-800 hover:bg-gray-700'
      : theme.colorScheme === 'royal'
      ? 'border-purple-500/30 bg-purple-800/50 hover:bg-purple-700/50'
      : 'border-gray-200 bg-white hover:bg-gray-50';

    return `${baseClasses} ${styleClasses[theme.buttonStyle]} ${colorClasses}`;
  };

  const renderIcon = (link: any) => {
    if (link.iconType === 'emoji') {
      return <span className="text-lg sm:text-xl">{link.icon}</span>;
    } else if (link.iconType === 'image') {
      return <img src={link.icon} alt={link.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded" />;
    } else {
      const IconComponent = defaultIcons[link.icon as keyof typeof defaultIcons];
      return IconComponent ? <IconComponent size={20} className="sm:w-6 sm:h-6" /> : <span>🔗</span>;
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()}`} style={{ fontFamily: theme.fontFamily }}>
      <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Profile Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
            {profile.avatarType === 'image' ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-2xl sm:text-3xl">{profile.avatar}</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-gray-400 text-sm ">{profile.bio}</p>
        </div>
        
        {/* Links */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-5 mt-6">
          {visibleLinks.map((link) => (
            <a
              key={link.id}
              href={link.url.startsWith('http://') || link.url.startsWith('https://') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-64 bg-white shadow-md rounded-2xl px-4 py-3 flex items-center space-x-4 transition-transform hover:scale-105 hover:shadow-xl border border-gray-100 group"
              style={{ textDecoration: 'none' }}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200">
                {renderIcon(link)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base text-gray-800 group-hover:text-purple-700 truncate">{link.name}</div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 pt-4 sm:pt-6 ">
          <p className="text-xs sm:text-sm opacity-60">© 2025 • Built with ✨</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewMode;