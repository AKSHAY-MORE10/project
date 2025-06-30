import { AppConfig, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mock user configurations
const defaultUserConfigs: Record<string, AppConfig> = {
  nitesh: {
    profile: {
      name: 'Nitesh Kumar',
      bio: 'Full Stack Developer | React Expert | Open Source Contributor',
      avatar: '🚀',
      avatarType: 'emoji',
      username: 'nitesh'
    },
    links: [
      {
        id: '1',
        name: 'GitHub',
        url: 'https://github.com/nitesh',
        icon: 'Github',
        iconType: 'lucide',
        show: true,
        order: 0
      },
      {
        id: '2',
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/nitesh',
        icon: 'Linkedin',
        iconType: 'lucide',
        show: true,
        order: 1
      },
      {
        id: '3',
        name: 'Portfolio',
        url: 'https://nitesh.dev',
        icon: 'Globe',
        iconType: 'lucide',
        show: true,
        order: 2
      }
    ],
    theme: {
      backgroundColor: '#1a1a1a',
      fontFamily: 'Inter, sans-serif',
      buttonStyle: 'rounded',
      colorScheme: 'dark'
    },
    specialButton: {
      enabled: true,
      title: 'Hire Me',
      url: 'https://wa.me/1234567890',
      emoji: '💼'
    }
  },
  akshay: {
    profile: {
      name: 'Akshay More',
      bio: 'Helping Brands Grow with Code, Creativity & Automation.',
      avatar: '👑',
      avatarType: 'emoji',
      username: 'akshay'
    },
    links: [
      {
        id: '1',
        name: 'GitHub',
        url: 'https://github.com/akshay',
        icon: 'Github',
        iconType: 'lucide',
        show: true,
        order: 0
      },
      {
        id: '2',
        name: 'Instagram',
        url: 'https://instagram.com/akshay',
        icon: 'Instagram',
        iconType: 'lucide',
        show: true,
        order: 1
      },
      {
        id: '3',
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/akshay',
        icon: 'Linkedin',
        iconType: 'lucide',
        show: true,
        order: 2
      }
    ],
    theme: {
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      buttonStyle: 'rounded',
      colorScheme: 'royal'
    },
    specialButton: {
      enabled: true,
      title: 'Work With Me',
      url: 'https://wa.me/1234567890',
      emoji: '✨'
    }
  }
};

export class UserConfigService {
  static async getUserConfig(username: string): Promise<AppConfig | null> {
    const res = await fetch(`${API_URL}/config/${username}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  }

  static async saveUserConfig(username: string, config: AppConfig): Promise<void> {
    await fetch(`${API_URL}/config/${username}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      }
    );
  }

  static async createUserConfig(username: string, user: User): Promise<AppConfig> {
    // Not needed, handled by backend on registration
    return this.getUserConfig(username) as Promise<AppConfig>;
  }

  static async getAllUsers(): Promise<string[]> {
    // Not implemented in backend, return []
    return [];
  }

  static async userExists(username: string): Promise<boolean> {
    const res = await fetch(`${API_URL}/config/${username}`);
    return res.ok;
  }
} 