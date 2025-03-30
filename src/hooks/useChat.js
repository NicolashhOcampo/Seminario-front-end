"use client";

import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useUser()

  useEffect(() => {
    const socketInstance = io(config.urlHost, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Conectado al servidor de sockets: ", user);
      if (user?.nickName) {
        socketInstance.emit("newUser", user.nickName);
      }
    });

    socketInstance.on("messageLogs", (data) => {
      setMessages(data);
    });

    socketInstance.on("userConnected", (user) => {
      console.log(`Usuario conectado: ${user}`);
    });

    // Descionexion del socket cuando se desmonta el componente
    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const sendMessage = (user, message) => {
    if (socket) {
      socket.emit("message", { user, message });
    }
  };

  return { messages, sendMessage };
}
