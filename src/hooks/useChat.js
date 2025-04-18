"use client";

import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const { user } = useUser()

  useEffect(() => {

    if(socket.connected) {
      console.log("Conectado al servidor de sockets: ", user);
      if (user?.nickName) {
        socket.emit("newUser", user.nickName);
      }
    }

    socket.on("messageLogs", (data) => {
      setMessages(data);
    });

    socket.on("userConnected", (user) => {
      console.log(`Usuario conectado: ${user}`);
    });

    return () => {
      socket.off();
    };
  }, [user]);

  const sendMessage = (user, message) => {
    if (socket) {
      socket.emit("message", { user, message });
    }
  };

  return { messages, sendMessage };
}