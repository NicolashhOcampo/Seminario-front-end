"use client";

import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";

export function useChat() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useUser()

  useEffect(() => {
  const handleConnect = () => {
    console.log("Socket conectado:", socket.connected);

    if (!user) return;

    if (user.role === "admin") {
      socket.emit("newAdmin", user.id);
    } else {
      socket.emit("newUser", user.id);
    }
  };

  if (socket.connected) {
    handleConnect();
  } else {
    socket.on("connect", handleConnect);
  }

  socket.on("clientChatsLogs", (data) => {
    console.log("Nuevo mensaje para cliente");
    const { mappedChats } = data;
    setChats([...mappedChats]);
  });

  socket.on("adminChatsLogs", (data) => {
    console.log("Nuevos chats para el admin");
    const { mappedChats } = data;

    setChats(prevChats => {
      const updated = [...prevChats];

      mappedChats.forEach(newChat => {
        const index = updated.findIndex(c => c.chatID === newChat.chatID);
        if (index !== -1) {
          updated[index] = newChat;
        } else {
          updated.push(newChat);
        }
      });

      return updated;
    });
  });

  socket.on("userConnected", (user) => {
    console.log(`Usuario conectado: ${user}`);
  });

  return () => {
    socket.off("connect", handleConnect);
    socket.off("clientChatsLogs");
    socket.off("adminChatsLogs");
    socket.off("userConnected");
  };
}, [user]);



  const sendMessage = (message, chatID) => {
    if (!chatID) {
      console.log("No hay id")
      return
    }
    if (socket) {
      if (!user) {
        console.log("No hay user")
        return
      }
      if (user?.role == "admin") {
        console.log("Admin envia: ", message)
        socket.emit("newAdminMessage", { chatID, message });
      } else {
        console.log("Client envia: ", message)
        socket.emit("newClientMessage", { chatID, message });
      }
    }
  };

  return { messages, sendMessage, chats };
}