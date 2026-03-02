import { create } from 'zustand';

import type { User } from '@/types/user';

interface AuthStore {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  isAuth: false,
  user: null,
  setUser: user => {
    set(() => ({ user, isAuth: true }));
  },
  clearIsAuth: () => {
    set(() => ({ user: null, isAuth: false }));
  },
}));
