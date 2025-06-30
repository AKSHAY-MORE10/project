import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconType: {
    type: String,
    enum: ['lucide', 'emoji', 'image'],
    default: 'lucide'
  },
  show: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: 'Welcome to my Brezix profile!'
  },
  avatar: {
    type: String,
    default: '👤'
  },
  avatarType: {
    type: String,
    enum: ['emoji', 'image'],
    default: 'emoji'
  },
  username: {
    type: String,
    required: true
  }
});

const themeSchema = new mongoose.Schema({
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  fontFamily: {
    type: String,
    default: 'Inter, sans-serif'
  },
  buttonStyle: {
    type: String,
    enum: ['rounded', 'square', 'pill'],
    default: 'rounded'
  },
  colorScheme: {
    type: String,
    enum: ['light', 'dark', 'royal'],
    default: 'light'
  }
});

const specialButtonSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Contact Me'
  },
  url: {
    type: String,
    default: ''
  },
  emoji: {
    type: String,
    default: '📧'
  }
});

const configurationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  profile: {
    type: profileSchema,
    required: true
  },
  links: [linkSchema],
  theme: {
    type: themeSchema,
    required: true
  },
  specialButton: {
    type: specialButtonSchema,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better performance
configurationSchema.index({ userId: 1 });

const Configuration = mongoose.models.Configuration || mongoose.model('Configuration', configurationSchema);

export default Configuration; 