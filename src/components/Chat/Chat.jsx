"use client";

import { useChat } from "@/hooks/useChat";
import { useUser } from "@/context/UserContext";
import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Spinner from "../Spinner/Spinner";
import config from "@/config/app.config";


export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const { user, setUser } = useUser()
  const messagesEndRef = useRef(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (messages.length > 0) {
      /* const fetchChat = async () => {
        console.log(user)
        const response = await fetch(`${config.urlHost}/api/user/${user.id}/chat`, {
          method: "GET",
          credentials: 'include'
        });
        const data = await response.json()
        console.log(data)
      }
      fetchChat() */
      setLoading(false);
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollTo({
          top: messagesEndRef.current.scrollHeight,
          behavior: "smooth",
        });
      };
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  if(loading) {
    return (
      <Spinner />
    )
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(user.nickName, message);
      setMessage("");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  let lastDate = null;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      
      <div ref={messagesEndRef} className="h-64 overflow-y-auto border p-2 rounded-md">
        {messages.map((msg, index) => {
          const messageDate = formatDate(msg.date);
          const isNewDate = messageDate !== lastDate;
          lastDate = messageDate;

          return (
            <div key={index}>
              {isNewDate && (
                <div className="text-center text-gray-500 text-sm my-2 font-semibold">
                  {messageDate}
                </div>
              )}

              <div
                className={`mb-2 flex flex-col ${
                  msg.email === user.nickName
                    ? "items-end ml-10"
                    : "items-start mr-10"
                }`}
              >
                <div
                  className={`p-2 shadow-md text-white ${
                    msg.email === user.nickName
                      ? "bg-blue-900 rounded-l-2xl rounded-tr-2xl"
                      : "bg-fuchsia-900 rounded-r-2xl rounded-tl-2xl"
                  }`}
                >
                  <strong>{msg.email}</strong> 
                  <p>{msg.message}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {formatTime(msg.date)}
                </span>
              </div>
            </div>
          );
        })}
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
          className="ml-2 p-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-300"
          onClick={handleSendMessage}
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}