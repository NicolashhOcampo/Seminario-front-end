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

    if (socket.connected) {
      console.log("Conectado al servidor de sockets: ", user);
      if (user?.id) {
        console.log("newUser")
        socket.emit("newUser", user?.id);
      }

      if (user?.role == "admin") {
        socket.emit("newAdmin", user?.id);
      }
    }

    socket.on("clientChatsLogs", (data) => {
      console.log("Nuevo mensaje para cliente")
      const { mappedChats } = data
      //console.log("Front chats: ", mappedChats)
      setChats([...mappedChats])
    });

    socket.on("adminChatsLogs", (data) => {
      console.log("Nuevos chats para el admin")
      const { mappedChats } = data
      console.log("Front chats: ", mappedChats)
      setChats(prevChats => {
        const updated = [...prevChats];

        mappedChats.forEach(newChat => {
          const index = updated.findIndex(c => c.chatID === newChat.chatID);
          if (index !== -1) {
            updated[index] = newChat; // reemplaza chat existente
          } else {
            updated.push(newChat); // agrega nuevo chat
          }
        });

        return updated;
      });
    });

    socket.on("userConnected", (user) => {
      console.log(`Usuario conectado: ${user}`);
    });

    return () => {
      socket.off();
    };
  }, [user]);

  useEffect(()=>{
    console.log("Chats actualizados")
    console.log(chats)
  },[chats])


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