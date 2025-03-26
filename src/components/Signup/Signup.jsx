"use client";

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';

export const Signup = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const {register, handleSubmit, clearErrors} = useForm()
    const {fetchRegisterUser} = useUser()


    const InputForm = ({type, id, label, className}) => {

        return(
            <div className={className}>
                <label htmlFor={id} className={"self-start text-base font-bold mb-[0.3rem]"}>{label}</label>
                <input
                    {...register(id, { required: {
                        value: true,
                        message: "Nombre necesario"
                    } })}
                    type={type}
                    name={id}
                    id={id}
                    required
                    className="w-full bg-[#2c2c2c] text-white mb-4 p-[0.7rem] rounded-[0.3rem] border border-transparent hover:border hover:border-solid hover:border-[rgba(0,212,255,0.8)] text-[1rem]"
                />
            </div>
            
        )
    }
    const handleSubmitResgister = async (data)=>{
        try {
            console.log("Submit")
            const res = await fetchRegisterUser(data)


            if(res.ok) {
                router.push("/login")
                return
            }else{
                setError("El Usuario ya se encuentra registrado")
            }

            
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if (error){
            toast.error(error)
        }
    }, [setError])
  return (
    <>
                        <Toaster position="top-center" reverseOrder={false}></Toaster>
            <h2 className="text-[2rem] text-white mb-6 text-shadow text-lg font-bold">SignUp</h2>
            <form id="loginForm"
                onSubmit={handleSubmit(handleSubmitResgister)}
                className="bg-[rgb(31,29,29)] w-2/5 p-8 grid grid-cols-2 gap-2 text-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            >

                <InputForm type="text" id={"firstName"} label = "Nombre"/>

                <InputForm type="text" id={"lastName"} label = "Apellido"/>

                <InputForm type="email" id={"email"} label = "Email" className={"col-span-full"}/>
                
                <InputForm type="text" id={"nickName"} label = "Usuario" className={"col-span-full"}/>
                
                <InputForm type="password" id={"password"} label = "Contraseña" className={"col-span-full"}/>

                {error  && <div className={"col-span-full text-[red] text-sm mx-auto my-2"}>
                    {error}
                </div>}

                {/* <div className={`${errors ? "block" : "hidden"} text-[red] text-sm mx-auto my-2`}>
                    {errors}
                </div> */}

                <button
                    type="submit"
                    className="col-span-full text-base font-bold text-white bg-[#007acc] cursor-pointer transition-[background] duration-[0.3s] ease-[ease-in-out] p-[0.8rem] rounded-[0.3rem] border-none hover:bg-[#005f99]"
                >
                    Regístrate
                </button>

                <a href="/login" className="no-underline col-span-2 text-white text-[0.8rem] text-center transition-[color] duration-[0.2s] ease-[ease-in-out] cursor-pointer mt-4 hover:text-[#007acc]">
                    Iniciar Sesion
                </a>

            </form>
        </>
  )
}
