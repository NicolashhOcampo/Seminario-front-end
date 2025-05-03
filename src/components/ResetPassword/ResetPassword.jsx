import config from '@/config/app.config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const ResetPassword = ({token}) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("La contraseña no coincide")
            return
        }
    
        try {
          const response = await fetch(`${config.urlHost}/api/auth/resetPassword/${token}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password}),
          });
    
          if (!response.ok){
            if (response.status === 404){
                toast.error("Usuario no encontrado");
                return
            }
            else {
                throw new Error("Error inesperado")
            }
            
          }
          else{
            router.push("/login")
          }

          
        } catch (err) {
          console.log(err)
        }
      };

    return (
        <>
            <Toaster position="top-center" className="z-200" reverseOrder={false}></Toaster>
            <h2 className="text-[2rem] text-white mb-6 text-shadow text-lg font-bold">Recuperar Contraseña</h2>
            <form id="loginForm"
                onSubmit={handleSubmit}
                className="bg-[rgb(31,29,29)] w-2/5 p-8 grid grid-cols-2 gap-2 text-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            >

                <div className="col-span-2">
                    <label className={"self-start text-base font-bold mb-[0.3rem]"}>Nueva Contraseña</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        required
                        className="w-full bg-[#2c2c2c] text-white mb-4 p-[0.7rem] rounded-[0.3rem] border border-transparent hover:border hover:border-solid hover:border-[rgba(0,212,255,0.8)] text-[1rem]"
                    />
                </div>

                <div className="col-span-2">
                    <label className={"self-start text-base font-bold mb-[0.3rem]"}>Confirmar Contraseña</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                        required
                        className="w-full bg-[#2c2c2c] text-white mb-4 p-[0.7rem] rounded-[0.3rem] border border-transparent hover:border hover:border-solid hover:border-[rgba(0,212,255,0.8)] text-[1rem]"
                    />
                </div>

                <button
                    type="submit"
                    className="col-span-full text-base font-bold text-white bg-[#007acc] cursor-pointer transition-[background] duration-[0.3s] ease-[ease-in-out] p-[0.8rem] rounded-[0.3rem] border-none hover:bg-[#005f99]"
                >
                    Recuperar Contraseña
                </button>

                <a href="/login" className="no-underline col-span-2 text-white text-[0.8rem] text-center transition-[color] duration-[0.2s] ease-[ease-in-out] cursor-pointer mt-4 hover:text-[#007acc]">
                    Iniciar Sesion
                </a>

            </form>
        </>
    )
}
