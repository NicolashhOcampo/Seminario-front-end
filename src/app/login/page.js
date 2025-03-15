"use client";

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
              body: JSON.stringify({ email, password }), credentials: "include",
            });
      
            if (!response.ok) throw new Error("Credenciales incorrectas");
      
      
            router.push("/products"); // Redirige a /products
          } catch (err) {
            setError(err.message);
          }

        console.log("Formulario enviado");
      };
    
      return (
        <main style={{ border: "solid black", height: "100vh" }}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Iniciar Sesión</h2>
            <form
              name="login"
              onSubmit={handleSubmit}
              style={{
                border: "solid black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "20px",
              }}
            >
              <input placeholder="Ingrese su email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input placeholder="Ingrese su contraseña" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="submit">Iniciar Sesión</button>
            </form>
            {error && (<p>{error}</p>)}
          </div>
        </main>
      );
}