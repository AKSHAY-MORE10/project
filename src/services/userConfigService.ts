import { AppConfig, User } from '../types';

const API_URL ='https://onetab-nine.vercel.app/api';


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