"use client"
import { ChatView } from "@/components/Chat/ChatView";
import { useChat } from "@/hooks/useChat";
import { useEffect, useState } from "react";

export default function ChatPage() {
  
  return (
    <>
      <div className="mt-40">
        <ChatView />
      </div>
      
    </>
  );
}
