'use client'

import { ArrowLeftEndOnRectangleIcon, Bars3Icon, ChatBubbleLeftRightIcon, ChevronLeftIcon, HomeIcon, PlusIcon, PresentationChartLineIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import config from "@/config/app.config";
import Spinner from "../Spinner/Spinner";
import { useCart } from "@/hooks/useCart";

export default function Sidebar() {
    const searchParams = useSearchParams()
    const {user, setUser, fetchUser, loading} = useUser()
    const {resetCart} = useCart()

    const userNickName = !user? "Usuario" : user.nickName;
    const userRole = !user? "Invitado" : user.role;

    const [isNavOpen, setIsNavOpen] = useState(true);
    const router = useRouter()
    //const { fetchUser } = useUser();


  const handleClickOption = (redirect) => {
    router.push(`${redirect}?${searchParams.toString()}`)
  }

  const handleLogout = () => {
    fetch(`${config.urlHost}/api/auth/logout`, {
        method: "GET",
        credentials: 'include'
    });
    setUser(null)
    resetCart()
    router.push('/login')
  }

  if(!user) return (<Spinner />)

  return (
    
    <nav className="fixed z-100 text-nowrap left-0 top-0 h-screen text-white flex flex-col overflow-hidden">
        {/* Header */}
        <div
        className={`relative w-${isNavOpen ? "20" : "64"} h-15 bg-transparent flex items-center transition-all duration-200 p-4`}
        >
        <div
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="absolute left-4 cursor-pointer text-[#333] text-2xl hover:text-[#007bff]"
        >
            {!isNavOpen ? (
                <ChevronLeftIcon className="size-6" />
            ) : (
                <Bars3Icon className="size-6" />
            )}
        </div>
        </div>
        <hr className="w-[calc(100%-32px)] mx-4" />


      {/* Content */}
    <div className={`flex-1 p-4 bg-gray-900 transition-all duration-200 ${isNavOpen ? "w-20" : "w-64"} flex flex-col`}>
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300"  onClick={() => handleClickOption('products')}>
            <i className={"text-xl min-w-[3rem] text-center"}>
                <HomeIcon className="size-6" />
            </i>
            {!isNavOpen && <span className="ml-2">Home</span>}
        </div>
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300" onClick={() => handleClickOption('/chat')}>
            <i className={"text-xl min-w-[3rem] text-center"}>
                <ChatBubbleLeftRightIcon className="size-6" />
            </i>
        {!isNavOpen && <span className="ml-2">Chat</span>}
        </div>

        {user.role === "admin" &&
        <>
            <div className="flex items-center py-2 cursor-pointer hover:text-gray-300" onClick={() => handleClickOption('createProduct')}>
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <PlusIcon className="size-6" />
                </i>
            {!isNavOpen && <span className="ml-2">Add Product</span>}
            </div>
            <div className="flex items-center py-2 cursor-pointer hover:text-gray-300" onClick={() => handleClickOption('/deleteProduct')}>
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <TrashIcon className="size-6" />
                </i>
            {!isNavOpen && <span className="ml-2">Delete Product</span>}
            </div>

            <div className="flex items-center py-2 cursor-pointer hover:text-gray-300" onClick={() => handleClickOption('/stadistics')}>
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <PresentationChartLineIcon className="size-6" />
                </i>
            {!isNavOpen && <span className="ml-2">Stadistics</span>}
            </div>
        </>
        }
    </div>

    <hr className="border-gray-700 w-[calc(100%)]" />

      
      {/* Footer */}
      <div
        className={`relative bg-gray-800 p-4 transition-all duration-200 ${
          isNavOpen ? "w-20 h-14" : "w-64 h-20"
        } flex items-center`}
      >
        
        {!isNavOpen && (
            <img
                src={`${config.urlHost}/public/images/users/${user.avatar}`}
                className="w-10 h-10 rounded-full"
            />
        )}
        {!isNavOpen &&   
            <div className="ml-4 font-semibold cursor-pointer" onClick={() => handleClickOption(`/profile/${userNickName}`)}>
                {userNickName}
            <p className="text-xs text-gray-400">{userRole}</p>
            </div>
        }
        <button
            onClick={handleLogout}
            className="absolute right-8 cursor-pointer flex items-center justify-center gap-1"
        >
        <i className="transition-transform duration-200">
            <ArrowLeftEndOnRectangleIcon className="size-6" />
        </i>
        </button>
        </div>
    </nav>
  );
}