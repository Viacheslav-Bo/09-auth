// components/AuthProvider/AuthProvider.tsx

'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuth = useAuthStore(state => state.clearIsAuth);

  useEffect(() => {
    const fetchUser = async () => {
      // Перевіряємо сесію
      const isAuth = await checkSession();
      if (isAuth) {
        // Якщо сесія валідна — отримуємо користувача
        const user = await getMe();
        if (user) setUser(user);
      } else {
        // Якщо сесія невалідна — чистимо стан
        clearIsAuth();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuth]);

  return children;
};

export default AuthProvider;
