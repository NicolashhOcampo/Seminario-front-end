import React from "react";

export const LinkPreviewCard = ({chat, index, onClickChat}) => {
    console.log('chat', index, chat)
  return (
    <div
      key={index}
      className="cursor-pointer px-4 py-2 rounded-xl bg-gray-50 hover:bg-blue-100 transition-colors duration-200 border border-gray-300 shadow-sm text-gray-700"
      onClick={() => onClickChat(index + 1)}
    >
        
      {chat.clientNickName}
    </div>
  );
};
