import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar({user}) {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const router = useRouter()
  const handleClickOption = (redirect) => {
    router.push(redirect)
    setIsNavOpen(false)
  }

  return (
    
    <nav className="fixed left-[1vw] top-[7vw] h-[calc(100%-8vw)] bg-gray-900 text-white rounded-xl flex flex-col overflow-hidden">
        {/* Header */}
      <div
        className={`relative w-${
    isNavOpen ? "20" : "64"
        } min-h-20 bg-gray-900 flex items-center transition-all duration-200 p-4`}
      >
        <div
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="absolute right-4 cursor-pointer"
        >
            {!isNavOpen && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>   
            )}
            {isNavOpen && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            )}
        </div>
      </div>
      <hr className="border-gray-700 w-[calc(100%-32px)] mx-4" />

      {/* Content */}
      <div className={`flex-1 p-4 transition-all duration-200 ${isNavOpen ? "w-20" : "w-64"}`}>
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
            <i className={"text-xl min-w-[3rem] text-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </i>
            {!isNavOpen && <span className="ml-2">Home</span>}
        </div>
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
            <i className={"text-xl min-w-[3rem] text-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            </i>
        {!isNavOpen && <span className="ml-2">Chat</span>}
        </div>
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
            <i className={"text-xl min-w-[3rem] text-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </i>
        {!isNavOpen && <span className="ml-2">Create Product</span>}
        </div>
        <div className="flex items-center py-2 cursor-pointer hover:text-gray-300">
            <i className={"text-xl min-w-[3rem] text-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </i>
        {!isNavOpen && <span className="ml-2">Create Product</span>}
        </div>
          
      </div>

      <hr className="border-gray-700 w-[calc(100%-32px)] mx-4" />

      {/* Footer */}
      <div
        className={`relative bg-gray-800 p-4 transition-all duration-200 ${
          isNavOpen ? "w-20 h-14" : "w-64 h-20"
        } flex items-center`}
      >
        <img
          src="ImagenPrueba"
          className="w-10 h-10 rounded-full"
        />
        {!isNavOpen && (
          <div className="ml-4 font-semibold cursor-pointer" onClick={() => handleClickOption(`/profile/${user.name}`)}>
              {user.name}
            <p className="text-xs text-gray-400">{user.role}</p>
          </div>
        )}
        <button
          onClick={() => handleLogout()}
          className="absolute right-4 cursor-pointer"
        >
        {!isNavOpen && 
            <i className={`transition-transform duration-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
            </i>
        }
        </button>
      </div>
    </nav>
  );
}