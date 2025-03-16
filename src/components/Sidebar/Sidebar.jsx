import { ArrowLeftEndOnRectangleIcon, Bars3Icon, ChatBubbleLeftRightIcon, ChevronLeftIcon, HomeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar({user}) {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const router = useRouter()
  const handleClickOption = (redirect) => {
    router.push(redirect)
  }

  const handleLogout = () => {
    fetch('http://localhost:8080/api/auth/logout', {
        method: "GET",
        credentials: 'include'
    })
    router.push('/login')
  }

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
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <HomeIcon className="size-6" />
                </i>
                {!isNavOpen && <span className="ml-2" onClick={() => handleClickOption('/products')}>Home</span>}
            </div>
            <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <ChatBubbleLeftRightIcon className="size-6" />
                </i>
            {!isNavOpen && <span className="ml-2">Chat</span>}
            </div>
            <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <PlusIcon className="size-6" />
                </i>
            {!isNavOpen && <span className="ml-2">Add Product</span>}
            </div>
            <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
                <i className={"text-xl min-w-[3rem] text-center"}>
                    <TrashIcon className="size-6" />
                </i>
            {!isNavOpen && <span className="ml-2">Delete Product</span>}
            </div>
            
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
                src="https://th.bing.com/th/id/R.a579c301d250c490662bbdfb16c405e9?rik=qWtc4VPeSEZ7qw&pid=ImgRaw&r=0"
                className="w-10 h-10 rounded-full"
            />
        )}
        {!isNavOpen &&   
            <div className="ml-4 font-semibold cursor-pointer" onClick={() => handleClickOption(`/profile/${user.name}`)}>
                {user.name}
            <p className="text-xs text-gray-400">{user.role}</p>
            </div>
        }
        <button
            onClick={() => handleLogout()}
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