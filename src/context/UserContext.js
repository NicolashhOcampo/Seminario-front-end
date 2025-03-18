'use client'

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null )
  const router = useRouter()

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/current", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Error al cargar usuario");
      const user = await response.json()
      console.log("User:", user)
      setUser(user)
      
    } catch (err) {
      //setError(err.message);
      console.log("Error:", err.message)
      router.push("/login")

    }
  }

  useEffect(() => {
    console.log("Contecto creado")

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);