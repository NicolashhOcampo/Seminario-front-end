"use client";
import { ForgotPassword } from "@/components/ForgotPassword/ForgotPassword"
import Spinner from "@/components/Spinner/Spinner";
import { useUser } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const router = useRouter()
      const {user, loading} = useUser()
    
      //const [email, setEmail] = useState("")
    
      useEffect(() => {
        if(user  && !loading) {
          router.push("/products")
          console.log("User logueado")
        }
      }, [user])
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${config.urlHost}/api/auth/forgotPassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email}),
            credentials: 'include',
          });
    
          if (!response.ok){
            if (response.status === 404){
                setError("Usuario no encontrado");
                return
            }
            throw new Error("Error inesperado")
          }
          
          const res = await response.json()
        } catch (err) {
          setError(err.message);
        }
      };
    
      if (loading || user) return (<Spinner />)
    
      return (
        <div className="h-screen w-screen bg-[linear-gradient(130deg,rgb(2,0,36)_0%,rgb(110,32,255)_35%,rgb(0,212,255)_100%)] flex flex-col items-center justify-center">          
            <ForgotPassword />
        </div>
      );
}