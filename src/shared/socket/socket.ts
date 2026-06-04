import { io, Socket } from "socket.io-client";
import { WS_HOST } from "../constants/api-data";
import { ClientEvents, ServerEvents } from "./socket.contracts";

export const ClientSocket: Socket<ServerEvents, ClientEvents> = io(WS_HOST, {
	autoConnect: false,
});