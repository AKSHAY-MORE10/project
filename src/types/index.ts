export interface LinkItem {
  id: string;
  name: string;
  url: string;
  icon: string;
  iconType: 'lucide' | 'emoji' | 'image';
  show: boolean;
  order: number;
}

export interface ProfileConfig {
  name: string;
  bio: string;
  avatar: string;
  avatarType: 'emoji' | 'image';
  username: string; // Unique username for public links
}

export interface ThemeConfig {
  backgroundColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  colorScheme: 'light' | 'dark' | 'royal';
}

export interface AppConfig {
  profile: ProfileConfig;
  links: LinkItem[];
  theme: ThemeConfig;
  specialButton: {
    enabled: boolean;
    title: string;
    url: string;
    emoji: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  name: string;
}