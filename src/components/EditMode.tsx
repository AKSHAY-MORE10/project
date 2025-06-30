import React, { useState } from 'react';
import { AppConfig, LinkItem } from '../types';
import { Plus, Eye, Settings, Download, Upload, Trash2, GripVertical, Edit3 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LinkEditor from './LinkEditor';
import ProfileEditor from './ProfileEditor';
import ThemeEditor from './ThemeEditor';
import AddLinkModal from './AddLinkModal';

interface EditModeProps {
  config: AppConfig;
  onConfigChange: (config: AppConfig) => void;
  onPreviewMode: () => void;
}

const EditMode: React.FC<EditModeProps> = ({ config, onConfigChange, onPreviewMode }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showThemeEditor, setShowThemeEditor] = useState(false);

  // Theme helper functions
  const getThemeClasses = () => {
    switch (config.theme.colorScheme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'royal':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white';
      default:
        return 'bg-gray-50 text-gray-900';
    }
  };

  const getCardClasses = () => {
    switch (config.theme.colorScheme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700';
      case 'royal':
        return 'bg-white/10 border-white/20 backdrop-blur-sm';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getTextClasses = () => {
    switch (config.theme.colorScheme) {
      case 'dark':
        return 'text-white';
      case 'royal':
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  const getSecondaryTextClasses = () => {
    switch (config.theme.colorScheme) {
      case 'dark':
        return 'text-gray-300';
      case 'royal':
        return 'text-gray-200';
      default:
        return 'text-gray-600';
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(config.links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    onConfigChange({
      ...config,
      links: updatedItems
    });
  };

  const handleDeleteLink = (id: string) => {
    onConfigChange({
      ...config,
      links: config.links.filter(link => link.id !== id)
    });
  };

  const handleToggleLink = (id: string) => {
    onConfigChange({
      ...config,
      links: config.links.map(link =>
        link.id === id ? { ...link, show: !link.show } : link
      )
    });
  };

  const handleAddLink = (newLink: Omit<LinkItem, 'id' | 'order'>) => {
    const link: LinkItem = {
      ...newLink,
      id: Date.now().toString(),
      order: config.links.length
    };
    
    onConfigChange({
      ...config,
      links: [...config.links, link]
    });
    setShowAddModal(false);
  };

  const handleUpdateLink = (updatedLink: LinkItem) => {
    onConfigChange({
      ...config,
      links: config.links.map(link =>
        link.id === updatedLink.id ? updatedLink : link
      )
    });
    setEditingLink(null);
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'linktree-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          onConfigChange(importedConfig);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleThemeSave = (theme: any) => {
    console.log('EditMode received theme change:', theme);
    onConfigChange({ ...config, theme });
    setShowThemeEditor(false);
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()}`} style={{ fontFamily: config.theme.fontFamily }}>
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className={`${getCardClasses()} rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 border`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold ${getTextClasses()}`}>Link Dashboard</h1>
              <p className={`text-sm sm:text-base ${getSecondaryTextClasses()}`}>Manage your links and customize your page</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={onPreviewMode}
                className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                <Eye size={16} className="sm:w-5 sm:h-5" />
                <span>Preview</span>
              </button>
              <button
                onClick={exportConfig}
                className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                <Upload size={16} className="sm:w-5 sm:h-5" />
                <span>Export</span>
              </button>
              <label className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm sm:text-base">
                <Download size={16} className="sm:w-5 sm:h-5" />
                <span>Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importConfig}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className={`${getCardClasses()} rounded-lg shadow-sm p-3 sm:p-4 md:p-6 border`}>
              <h2 className={`text-base sm:text-lg font-semibold ${getTextClasses()} mb-3 sm:mb-4`}>Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => setShowProfileEditor(true)}
                  className={`flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                    config.theme.colorScheme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 
                    config.theme.colorScheme === 'royal' ? 'border-white/30 hover:bg-white/20' : 
                    'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Edit3 size={16} className="sm:w-[18px] sm:h-[18px] text-purple-600" />
                  <span className={`text-xs sm:text-sm md:text-base ${getTextClasses()}`}>Edit Profile</span>
                </button>
                <button
                  onClick={() => setShowThemeEditor(true)}
                  className={`flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                    config.theme.colorScheme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 
                    config.theme.colorScheme === 'royal' ? 'border-white/30 hover:bg-white/20' : 
                    'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Settings size={16} className="sm:w-[18px] sm:h-[18px] text-blue-600" />
                  <span className={`text-xs sm:text-sm md:text-base ${getTextClasses()}`}>Theme Settings</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 p-2 sm:p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors sm:col-span-2 lg:col-span-1"
                >
                  <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm md:text-base">Add Link</span>
                </button>
              </div>
            </div>

            {/* Links Management */}
            <div className={`${getCardClasses()} rounded-lg shadow-sm p-3 sm:p-4 md:p-6 border`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                <h2 className={`text-base sm:text-lg font-semibold ${getTextClasses()}`}>Your Links</h2>
                <span className={`text-xs sm:text-sm ${getSecondaryTextClasses()}`}>
                  {config.links.filter(link => link.show).length} of {config.links.length} visible
                </span>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="links">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {config.links.map((link, index) => (
                        <Draggable key={link.id} draggableId={link.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`p-3 sm:p-4 border rounded-lg transition-all ${
                                snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                              } ${link.show ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                <div {...provided.dragHandleProps} className="cursor-grab self-start sm:self-center">
                                  <GripVertical size={18} className="text-gray-400" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                    <h3 className={`font-medium ${getTextClasses()} truncate text-sm sm:text-base`}>{link.name}</h3>
                                    <span className={`px-2 py-1 text-xs rounded-full w-fit ${
                                      link.show ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {link.show ? 'Visible' : 'Hidden'}
                                    </span>
                                  </div>
                                  <p className={`text-xs sm:text-sm ${getSecondaryTextClasses()} truncate`}>{link.url}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                  <button
                                    onClick={() => handleToggleLink(link.id)}
                                    className={`px-2 py-1 text-xs rounded ${
                                      link.show 
                                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                    }`}
                                  >
                                    {link.show ? 'Hide' : 'Show'}
                                  </button>
                                  <button
                                    onClick={() => setEditingLink(link)}
                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLink(link.id)}
                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {config.links.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <p className={`${getSecondaryTextClasses()} mb-4`}>No links added yet</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                  >
                    Add Your First Link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Profile Preview */}
            <div className={`${getCardClasses()} rounded-lg shadow-sm p-4 sm:p-6 border`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>Profile Preview</h3>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  {config.profile.avatarType === 'image' ? (
                    <img src={config.profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-xl sm:text-2xl">{config.profile.avatar}</span>
                  )}
                </div>
                <h4 className={`font-semibold ${getTextClasses()} text-sm sm:text-base`}>{config.profile.name}</h4>
                <p className={`text-xs sm:text-sm ${getSecondaryTextClasses()}`}>{config.profile.bio}</p>
              </div>
            </div>

            {/* Stats */}
            <div className={`${getCardClasses()} rounded-lg shadow-sm p-4 sm:p-6 border`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-xs sm:text-sm ${getSecondaryTextClasses()}`}>Total Links</span>
                  <span className={`font-semibold text-sm sm:text-base ${getTextClasses()}`}>{config.links.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs sm:text-sm ${getSecondaryTextClasses()}`}>Visible Links</span>
                  <span className="font-semibold text-green-600 text-sm sm:text-base">
                    {config.links.filter(link => link.show).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs sm:text-sm ${getSecondaryTextClasses()}`}>Hidden Links</span>
                  <span className={`font-semibold text-sm sm:text-base ${getSecondaryTextClasses()}`}>
                    {config.links.filter(link => !link.show).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddLinkModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddLink}
        />
      )}

      {editingLink && (
        <LinkEditor
          link={editingLink}
          onClose={() => setEditingLink(null)}
          onSave={handleUpdateLink}
        />
      )}

      {showProfileEditor && (
        <ProfileEditor
          profile={config.profile}
          onClose={() => setShowProfileEditor(false)}
          onSave={(profile) => {
            onConfigChange({ ...config, profile });
            setShowProfileEditor(false);
          }}
        />
      )}

      {showThemeEditor && (
        <ThemeEditor
          theme={config.theme}
          onClose={() => setShowThemeEditor(false)}
          onSave={handleThemeSave}
        />
      )}
    </div>
  );
};

export default EditMode;