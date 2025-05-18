"use client"
import { ChatView } from "@/components/Chat/ChatView";

export default function ChatPage() {

  return (
    <>
      <div className="mt-15 w-60 absolute right-0 inset-y-0 h-screen">
        <ChatView />
      </div>
      
    </>
  );
}
