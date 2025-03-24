'use client'

import config from '@/config/app.config';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null )
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const pathname = usePathname();

  const fetchUser = async () => {
    
    try {
      setLoading(true)

      const response = await fetch(`${config.urlHost}/api/auth/current`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Error al cargar usuario");
      const user = await response.json()
      //console.log("User:", user)
      setUser(user)
      
      
    } catch (err) {
      //setError(err.message);
      setUser(null)
      console.log("Error:", err.message)
      if(pathname !== "/login"){
        router.push("/login")
      }
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchUser();

  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);