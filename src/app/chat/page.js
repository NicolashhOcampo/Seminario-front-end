'use client'

import Chat from "@/components/Chat/Chat";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useUser } from "@/context/UserContext";

export default function ChatPage() {
  const { user } = useUser();
  return (
    <>
      <Navbar />
      <Sidebar user={{ nickName: user?.nickName || "Usuario", role: user?.role || "Invitado" }}/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Chat />
      </div>
    </>
  );
}
