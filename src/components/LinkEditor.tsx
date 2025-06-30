import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkEditorProps {
  link: LinkItem;
  onClose: () => void;
  onSave: (link: LinkItem) => void;
}

const LinkEditor: React.FC<LinkEditorProps> = ({ link, onClose, onSave }) => {
  const [editedLink, setEditedLink] = useState<LinkItem>(link);

  const handleSave = () => {
    onSave(editedLink);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Link</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Name
            </label>
            <input
              type="text"
              value={editedLink.name}
              onChange={(e) => setEditedLink({ ...editedLink, name: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              value={editedLink.url}
              onChange={(e) => setEditedLink({ ...editedLink, url: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {editedLink.iconType === 'emoji' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={editedLink.icon}
                onChange={(e) => setEditedLink({ ...editedLink, icon: e.target.value })}
                className="w-16 sm:w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-sm sm:text-base text-black"
              />
            </div>
          )}

          <div className="flex items-start space-x-2 sm:space-x-3">
            <input
              type="checkbox"
              id="show-link"
              checked={editedLink.show}
              onChange={(e) => setEditedLink({ ...editedLink, show: e.target.checked })}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
            />
            <label htmlFor="show-link" className="block text-sm text-black leading-relaxed">
              Show this link on your page
            </label>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
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
      </div>
    </div>
  );
};

export default LinkEditor;