"use client";

import Login from "@/components/Login/Login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] =useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      router.push("/products"); // Redirige a /products
    } catch (err) {
      setError(err.message);
    }

    console.log("Formulario enviado");
  };

  return (
    <div className="h-screen w-screen bg-[linear-gradient(130deg,rgb(2,0,36)_0%,rgb(110,32,255)_35%,rgb(0,212,255)_100%)] flex flex-col items-center justify-center">          
        <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} error={error}/>
    </div>
  );
}