"use client";

import { useEffect, useState } from "react";
import socket from "@/utils/socket";

export function useConsult(productId) {  
    const [consultsLogs, setConsults] = useState([]);

    useEffect(() => {
        if (!productId) return;

        const fetchConsults = () => {
            console.log("Consultas para el producto:", productId);
            socket.emit("consultsLogs", { pid: productId });
        }
        if (socket.connected) {
            fetchConsults();
        } 

        socket.on("consults", (data) => {
            console.log("Consultas recibidas:", data);
            setConsults(data);
        });

        return () => {
            socket.off();
        };
    }, [productId]);

    const sendConsult = (consult, productId) => {
        console.log("Enviando nueva consulta:", consult, "con pid: ", productId);
        socket.emit("newConsult", { consult, pid: productId });
    };

    return { consultsLogs, sendConsult,  setConsults };
}
