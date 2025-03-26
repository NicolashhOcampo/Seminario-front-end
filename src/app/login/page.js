"use client";

import Login from "@/components/Login/Login";
import Spinner from "@/components/Spinner/Spinner";
import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter()
  const {user, loading, setUser} = useUser()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] =useState("")

  useEffect(() => {
    if(user  && !loading) {
      router.push("/products")
      console.log("User logueado")
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.urlHost}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");
      // const user = await response.json()
      // console.log("login: ", user)
      //console.log("Response: ", await response.json())
      const res = await response.json()
      setUser(res.payload)
      router.push("/products"); // Redirige a /products
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading || user) return (<Spinner />)

  return (
    <div className="h-screen w-screen bg-[linear-gradient(130deg,rgb(2,0,36)_0%,rgb(110,32,255)_35%,rgb(0,212,255)_100%)] flex flex-col items-center justify-center">          
        <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} error={error}/>
    </div>
  );
}