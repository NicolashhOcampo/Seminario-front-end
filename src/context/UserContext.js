'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null )
  const router = useRouter()

const fetchUser = async () => {
    try {
        const userRes = await fetch("http://localhost:8080/api/auth/current", {
        credentials: "include",
        });

        if (!userRes.ok) {
          if (userRes.status === 401) {
              router.push('/login')
          } else {
            throw new Error("No se pudo obtener el usuario");
          }
        }

        const userData = await userRes.json();
        setUser(userData);
    } catch (err) {
        setUser(null);
    }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);