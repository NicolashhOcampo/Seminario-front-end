"use client";

import { useEffect, useState } from "react";
import socket from "@/utils/socket";

export function useConsult(productId) {  
    const [consultsLogs, setConsults] = useState([]);

    useEffect(() => {
        if (!productId) return;

        if (socket.connected) {
            socket.emit("consultsLogs", { pid: productId });
        } 

        socket.on("consults", (data) => {
            setConsults(data);
        });

        return () => {
            socket.off();
        };
    }, [productId]);

    const sendConsult = (consult, productId) => {
        socket.emit("newConsult", { consult, pid: productId });
    };

    const answerQuery = (answer, consultId, productId) => {
        socket.emit("answerQuery", { pid: productId, cid: consultId, answer });
    };

    return { consultsLogs, sendConsult,  setConsults, answerQuery };
}