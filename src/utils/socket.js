import { io } from "socket.io-client";
import config from "@/config/app.config";

const socket = io(config.urlHost, {
    withCredentials: true,
});

export default socket;
