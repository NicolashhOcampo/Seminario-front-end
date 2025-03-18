"use client";

import { useChat } from "@/app/hooks/useChat";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";


export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const [ user, setUser ] = useUser()

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(user, message);
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.email}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          className="flex-1 p-2 border rounded-md"
          placeholder="Tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
