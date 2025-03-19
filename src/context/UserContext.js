'use client'

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null )
  const [loading, setLoading] = useState(true);
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
      //console.log("User:", user)
      setUser(()=>{
        console.log("User seteado:", user)
        return user
      })
      setLoading(false)
      
    } catch (err) {
      //setError(err.message);
      console.log("Error:", err.message)
      router.push("/login")

    }
  }

  useEffect(() => {
    console.log("Contexto creado")

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);