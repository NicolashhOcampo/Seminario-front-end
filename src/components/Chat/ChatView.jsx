import { useChat } from '@/hooks/useChat';
import React, { useEffect, useState } from 'react'
import { ChatV2 } from './ChatV2';
import { LinkPreviewCard } from './LinkPreviewCard';

export const ChatView = () => {

  const { chats, sendMessage } = useChat();
  const [activeChat, setActiveChat] = useState(null)


  const handleClickChat = (indexChat) => {
    setActiveChat(indexChat)
  }

  return (
    <>
      <div className="flex justify-center items-start h-screen">
        <div className="flex flex-col gap-3 bg-white p-4 shadow-md w-full h-screen">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Chats</h2>
          {chats.map((chat, index) => (
            <LinkPreviewCard key={index} index={index} chat={chat} onClickChat={handleClickChat} />
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
