import { create } from 'zustand';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      set({ user, token, isInitialized: true });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, access_token } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token: access_token });
    } catch (error: any) {
      console.error('Login error in authStore:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (email: string, username: string, password: string, role: string = 'TOURIST') => {
    try {
      const response = await api.post('/auth/register', { email, username, password, role });
      const { user, access_token } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token: access_token });
    } catch (error: any) {
      console.error('Register error in authStore:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));
