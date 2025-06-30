import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { ProfileConfig } from '../types';

interface ProfileEditorProps {
  profile: ProfileConfig;
  onClose: () => void;
  onSave: (profile: ProfileConfig) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onClose, onSave }) => {
  const [editedProfile, setEditedProfile] = useState<ProfileConfig>(profile);

  const handleSave = () => {
    onSave(editedProfile);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProfile({
          ...editedProfile,
          avatar: e.target?.result as string,
          avatarType: 'image'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Profile</h2>
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
              Name
            </label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto sm:mx-0">
                {editedProfile.avatarType === 'image' ? (
                  <img src={editedProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl sm:text-3xl">{editedProfile.avatar}</span>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setEditedProfile({ ...editedProfile, avatarType: 'emoji' })}
                    className={`px-3 py-1 text-xs sm:text-sm rounded ${
                      editedProfile.avatarType === 'emoji' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    Emoji
                  </button>
                  <label className={`px-3 py-1 text-xs sm:text-sm rounded cursor-pointer ${
                    editedProfile.avatarType === 'image' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {editedProfile.avatarType === 'emoji' && (
                  <input
                    type="text"
                    placeholder="👑"
                    value={editedProfile.avatar}
                    onChange={(e) => setEditedProfile({ ...editedProfile, avatar: e.target.value })}
                    className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm sm:text-base"
                  />
                )}
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default ProfileEditor;