import { useChat } from '@/hooks/useChat';
import React, { useEffect, useState } from 'react'
import { Chat } from './Chat';
import { LinkPreviewCard } from './LinkPreviewCard';

export const ChatView = () => {

  const { chats, sendMessage } = useChat();
  const [activeChat, setActiveChat] = useState(null)


  const handleClickChat = (indexChat) => {
    setActiveChat(indexChat)
  }

  return (
    <>
      <div className="h-full grid gap-2 grid-cols-[auto_1fr] justify-center items-start p-4">
        <div className="flex flex-col h-full justify-start gap-3 bg-white p-4 rounded-xl shadow-md w-60">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Chats</h2>
          {chats.map((chat, index) => (
            <LinkPreviewCard key={index} index={index} chat={chat} onClickChat={handleClickChat} />
          ))}
        </div>

        {activeChat && (
          <div className=" h-full bg-amber-400">
            <Chat chat={chats[activeChat - 1]} onSend={sendMessage} />
          </div>
        )}
      </div>
    </>
  );
}
