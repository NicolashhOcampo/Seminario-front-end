'use client';

import config from '@/config/app.config';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.urlHost}/api/auth/current`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error al cargar usuario');

      const user = await response.json();
      setUser(user);
    } catch (err) {
      console.log('Error:', err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegisterUser = async (data) => {
    try {
      const response = await fetch(`${config.urlHost}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
    }
  }, [loading, user, pathname, router]);

  return (
    <UserContext.Provider value={{ user, fetchUser, fetchRegisterUser, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
