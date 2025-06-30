import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { LinkItem } from '../types';
import { platformTemplates, defaultIcons } from '../data/defaultIcons';

interface AddLinkModalProps {
  onClose: () => void;
  onAdd: (link: Omit<LinkItem, 'id' | 'order'>) => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ onClose, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [customLink, setCustomLink] = useState({
    name: '',
    url: '',
    icon: '🔗',
    iconType: 'emoji' as const
  });

  const filteredTemplates = platformTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
  };

  const handleAddTemplate = () => {
    if (selectedTemplate) {
      onAdd({
        name: selectedTemplate.name,
        url: selectedTemplate.url,
        icon: selectedTemplate.icon,
        iconType: 'lucide',
        show: true
      });
    }
  };

  const handleAddCustom = () => {
    if (customLink.name && customLink.url) {
      onAdd({
        name: customLink.name,
        url: customLink.url,
        icon: customLink.icon,
        iconType: customLink.iconType,
        show: true
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Link</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="space-y-4 sm:space-y-6">
            {/* Platform Templates */}
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Popular Platforms</h3>
              
              <div className="relative mb-3 sm:mb-4">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search platforms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4">
                {filteredTemplates.map((template) => {
                  const IconComponent = defaultIcons[template.icon as keyof typeof defaultIcons];
                  return (
                    <button
                      key={template.name}
                      onClick={() => handleTemplateSelect(template)}
                      className={`p-2 sm:p-3 border rounded-lg text-left text-black transition-all hover:shadow-md ${
                        selectedTemplate?.name === template.name
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {IconComponent && <IconComponent size={16} className="sm:w-5 sm:h-5" />}
                        <span className="font-medium text-xs sm:text-sm text-black">{template.name}</span>
                      </div>
                      <span className="text-lg sm:text-xl">{template.emoji}</span>
                    </button>
                  );
                })}
              </div>

              {selectedTemplate && (
                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">{selectedTemplate.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{selectedTemplate.url}</p>
                    </div>
                    <button
                      onClick={handleAddTemplate}
                      className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                    >
                      Add Platform
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Link */}
            <div className="border-t pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Custom Link</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., My Portfolio"
                    value={customLink.name}
                    onChange={(e) => setCustomLink({ ...customLink, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={customLink.url}
                    onChange={(e) => setCustomLink({ ...customLink, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    placeholder="🔗"
                    value={customLink.icon}
                    onChange={(e) => setCustomLink({ ...customLink, icon: e.target.value })}
                    className="w-16 sm:w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-sm sm:text-base text-black"
                  />
                </div>

                <button
                  onClick={handleAddCustom}
                  disabled={!customLink.name || !customLink.url}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  Add Custom Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;