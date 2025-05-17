import { useChat } from '@/hooks/useChat';
import React, { useEffect, useState } from 'react'
import { ChatV2 } from './ChatV2';

export const ChatView = () => {

  const { chats, sendMessage } = useChat();
  const [activeChat, setActiveChat] = useState(null)


  const handleClickChat = (indexChat) => {
    setActiveChat(indexChat)
  }

  return (
    <>
      <div className="flex justify-center items-start h-full p-4">
        <div className="flex flex-col gap-3 bg-white p-4 rounded-xl shadow-md w-40">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Chats</h2>
          {chats.map((chat, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 rounded-xl bg-gray-50 hover:bg-blue-100 transition-colors duration-200 border border-gray-300 shadow-sm text-gray-700"
              onClick={() => handleClickChat(index + 1)}
            >
              {chat.clientNickName}
            </div>
          ))}
        </div>

        {activeChat && (
          <div className="ml-6 flex-1">
            <ChatV2 chat={chats[activeChat - 1]} onSend={sendMessage} />
          </div>
        )}
      </div>
    </>
  );
}
