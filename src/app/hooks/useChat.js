"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8080";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Conectado al servidor de sockets");
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
  }, []);

  const sendMessage = (user, message) => {
    if (socket) {
      socket.emit("message", { user, message });
    }
  };

  return { messages, sendMessage };
}
