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

      // console.log(pathname)
      // if(pathname !== "/login" || pathname !== "/signup"){
      //   console.log("Al login desde: ", pathname)
      //   router.push("/login")
      // }
    }
    finally {
      setLoading(false)
    }
  }

  const fetchRegisterUser = async (data) => {

      try{

        const response = await fetch(`${config.urlHost}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        // if(!response.ok) {
        //   console.log(response)
        //   throw new Error("Error al registrar")
        // }

        return response
      }
      catch (e){
          console.log(e)
      }


  }

  useEffect(() => {
    fetchUser();

  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, fetchRegisterUser, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);