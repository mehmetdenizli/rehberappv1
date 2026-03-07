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
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, access_token } = response.data;
    localStorage.setItem('token', access_token);
    set({ user, token: access_token });
  },

  register: async (email: string, username: string, password: string) => {
    const response = await api.post('/auth/register', { email, username, password });
    const { user, access_token } = response.data;
    localStorage.setItem('token', access_token);
    set({ user, token: access_token });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
