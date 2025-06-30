import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ThemeEditorProps {
  theme: ThemeConfig;
  onClose: () => void;
  onSave: (theme: ThemeConfig) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onClose, onSave }) => {
  const [editedTheme, setEditedTheme] = useState<ThemeConfig>(theme);

  const handleSave = () => {
    console.log('Saving theme with font:', editedTheme.fontFamily);
    onSave(editedTheme);
  };

  const handleFontSelect = (fontId: string) => {
    console.log('Selected font:', fontId);
    setEditedTheme({ ...editedTheme, fontFamily: fontId });
  };

  const colorSchemes = [
    { 
      id: 'light', 
      name: 'Light', 
      preview: 'bg-white border-gray-200',
      description: 'Clean and minimal white theme'
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      preview: 'bg-gray-900 border-gray-700',
      description: 'Modern dark theme'
    },
    { 
      id: 'royal', 
      name: 'Royal', 
      preview: 'bg-gradient-to-br from-purple-900 to-blue-900',
      description: 'Elegant gradient theme'
    }
  ];

  const buttonStyles = [
    { id: 'rounded', name: 'Rounded', preview: 'rounded-lg' },
    { id: 'square', name: 'Square', preview: 'rounded-none' },
    { id: 'pill', name: 'Pill', preview: 'rounded-full' }
  ];

  const fonts = [
    { id: 'Inter, sans-serif', name: 'Inter', category: 'Modern Sans', preview: 'Inter' },
    { id: 'Poppins, sans-serif', name: 'Poppins', category: 'Clean Sans', preview: 'Poppins' },
    { id: 'Roboto, sans-serif', name: 'Roboto', category: 'Google Sans', preview: 'Roboto' },
    { id: 'Open Sans, sans-serif', name: 'Open Sans', category: 'Friendly Sans', preview: 'Open Sans' },
    { id: 'Montserrat, sans-serif', name: 'Montserrat', category: 'Geometric Sans', preview: 'Montserrat' },
    { id: 'Lato, sans-serif', name: 'Lato', category: 'Balanced Sans', preview: 'Lato' },
    { id: 'Source Sans Pro, sans-serif', name: 'Source Sans Pro', category: 'Professional Sans', preview: 'Source Sans Pro' },
    { id: 'Ubuntu, sans-serif', name: 'Ubuntu', category: 'Modern Sans', preview: 'Ubuntu' },
    { id: 'Oswald, sans-serif', name: 'Oswald', category: 'Condensed Sans', preview: 'Oswald' },
    { id: 'Playfair Display, serif', name: 'Playfair Display', category: 'Elegant Serif', preview: 'Playfair Display' },
    { id: 'Georgia, serif', name: 'Georgia', category: 'Classic Serif', preview: 'Georgia' },
    { id: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif', name: 'System Default', category: 'System Font', preview: 'System Default' }
  ];

  // Live preview theme classes
  const getPreviewThemeClasses = () => {
    switch (editedTheme.colorScheme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'royal':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getPreviewCardClasses = () => {
    switch (editedTheme.colorScheme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700';
      case 'royal':
        return 'bg-white/10 border-white/20 backdrop-blur-sm';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Theme Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Theme Settings */}
            <div className="space-y-4 sm:space-y-6">
              {/* Color Scheme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color Scheme
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setEditedTheme({ ...editedTheme, colorScheme: scheme.id as any })}
                      className={`p-3 sm:p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                        editedTheme.colorScheme === scheme.id
                          ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-6 sm:w-12 sm:h-8 rounded border ${scheme.preview}`}></div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{scheme.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{scheme.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Button Style
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {buttonStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setEditedTheme({ ...editedTheme, buttonStyle: style.id as any })}
                      className={`p-3 sm:p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                        editedTheme.buttonStyle === style.id
                          ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-4 sm:w-12 sm:h-6 bg-gray-300 ${style.preview}`}></div>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{style.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Font Family
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => handleFontSelect(font.id)}
                      className={`p-2 sm:p-3 border rounded-lg text-left transition-all hover:shadow-md ${
                        editedTheme.fontFamily === font.id
                          ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ fontFamily: font.id }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 text-base sm:text-lg">{font.preview}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{font.category}</div>
                        </div>
                        {editedTheme.fontFamily === font.id && (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Background Color
                </label>
                <input
                  type="color"
                  value={editedTheme.backgroundColor}
                  onChange={(e) => setEditedTheme({ ...editedTheme, backgroundColor: e.target.value })}
                  className="w-full h-10 sm:h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
              <div className={`${getPreviewThemeClasses()} rounded-lg p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]`} style={{ fontFamily: editedTheme.fontFamily }}>
                <div className="mb-3 sm:mb-4 p-2 bg-white/20 rounded text-center">
                  <p className="text-xs sm:text-sm opacity-80">Current Font: <span className="font-semibold">{editedTheme.fontFamily}</span></p>
                </div>
                
                <div className={`${getPreviewCardClasses()} rounded-lg p-3 sm:p-4 border mb-3 sm:mb-4`}>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Sample Link</h4>
                  <p className="text-xs sm:text-sm opacity-80">This is how your links will look</p>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className={`w-full p-2 sm:p-3 border transition-all ${
                    editedTheme.colorScheme === 'dark' 
                      ? 'border-gray-700 bg-gray-800' 
                      : editedTheme.colorScheme === 'royal'
                      ? 'border-purple-500/30 bg-purple-800/50'
                      : 'border-gray-200 bg-white'
                  } ${editedTheme.buttonStyle === 'rounded' ? 'rounded-lg' : 
                      editedTheme.buttonStyle === 'square' ? 'rounded-none' : 'rounded-full'}`}>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-sm sm:text-base">🔗</span>
                      <span className="font-medium text-sm sm:text-base">Sample Link</span>
                    </div>
                  </div>
                  
                  <div className={`w-full p-2 sm:p-3 border transition-all ${
                    editedTheme.colorScheme === 'dark' 
                      ? 'border-gray-700 bg-gray-800' 
                      : editedTheme.colorScheme === 'royal'
                      ? 'border-purple-500/30 bg-purple-800/50'
                      : 'border-gray-200 bg-white'
                  } ${editedTheme.buttonStyle === 'rounded' ? 'rounded-lg' : 
                      editedTheme.buttonStyle === 'square' ? 'rounded-none' : 'rounded-full'}`}>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-sm sm:text-base">📱</span>
                      <span className="font-medium text-sm sm:text-base">Another Link</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;