# OneTab - LinkTree Alternative

A modern, responsive LinkTree alternative built with React, TypeScript, and MongoDB. Create beautiful profile pages with customizable links, themes, and branding.

## Features

- 🔐 **User Authentication** - Secure login and registration system
- 🎨 **Customizable Themes** - Light, dark, and royal color schemes
- 🔗 **Link Management** - Add, edit, and organize your social links
- 👤 **Profile Customization** - Custom avatars, bios, and branding
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Public Profiles** - Share your profile with a unique URL
- ⚡ **Real-time Preview** - See changes instantly in preview mode
- 🎯 **Special Call-to-Action** - Add a prominent contact button

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oneTab
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up MongoDB**
   - Create a MongoDB Atlas cluster or use local MongoDB
   - Update the connection string in `src/database/connection.ts`
   - The app will automatically create the necessary collections

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Database Schema

### User Collection
```typescript
{
  _id: ObjectId,
  username: string (unique),
  email: string (unique),
  name: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Configuration Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  profile: {
    name: string,
    bio: string,
    avatar: string,
    avatarType: 'emoji' | 'image',
    username: string
  },
  links: [{
    id: string,
    name: string,
    url: string,
    icon: string,
    iconType: 'lucide' | 'emoji' | 'image',
    show: boolean,
    order: number
  }],
  theme: {
    backgroundColor: string,
    fontFamily: string,
    buttonStyle: 'rounded' | 'square' | 'pill',
    colorScheme: 'light' | 'dark' | 'royal'
  },
  specialButton: {
    enabled: boolean,
    title: string,
    url: string,
    emoji: string
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

### For Users

1. **Register** - Create an account with your email and username
2. **Customize** - Edit your profile, add links, and choose themes
3. **Preview** - See how your profile looks to visitors
4. **Share** - Your profile is available at `yourdomain.com/yourusername`

### Demo Accounts

The app comes with demo accounts for testing:
- **Username**: `nitesh` | **Password**: `demo123`
- **Username**: `akshay` | **Password**: `demo123`

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── EditMode.tsx    # Profile editor
│   ├── PreviewMode.tsx # Profile preview
│   └── Dashboard.tsx   # Main dashboard
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── database/           # Database configuration
│   ├── connection.ts   # MongoDB connection
│   └── models/         # Mongoose models
├── services/           # Business logic
│   ├── mongoService.ts # MongoDB operations
│   └── userConfigService.ts # User config management
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## Features in Detail

### Authentication
- Secure user registration and login
- Session persistence with localStorage
- Profile settings management
- Password change functionality

### Profile Management
- Custom profile information (name, bio, avatar)
- Username-based public URLs
- Profile settings modal with validation

### Link Management
- Add, edit, and delete social links
- Drag and drop reordering
- Icon selection (Lucide icons, emojis, images)
- Link visibility toggle

### Theme Customization
- Multiple color schemes (light, dark, royal)
- Custom background colors
- Font family selection
- Button style options (rounded, square, pill)

### Special Features
- Call-to-action button with custom styling
- Real-time preview mode
- Responsive design for all devices
- Toast notifications for user feedback

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oneTab
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@oneTab.com or create an issue in the repository. 