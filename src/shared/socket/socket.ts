import { io, Socket } from "socket.io-client";
import { WS_HOST } from "../constants/api-data";
import { ClientEvents, ServerEvents, SocketActionsContract } from "./socket.contracts";

export const ClientSocket: Socket<ServerEvents, ClientEvents> = io(WS_HOST, {
	autoConnect: false,
});

export const SocketActions: SocketActionsContract = {
    connect: async (token) => {
        ClientSocket.auth = { token: `Bearer ${token}` };
        const connected = await ClientSocket.connect();
        await SocketActions.userConnect()
    },
    disconnect: () => {
        ClientSocket.removeAllListeners("newChatMessage")
        ClientSocket.removeAllListeners("notifyUser")
        ClientSocket.removeAllListeners("sendUserStatuses")
        ClientSocket.off("newChatMessage")
        ClientSocket.off("notifyUser")
        ClientSocket.off("sendUserStatuses")
        ClientSocket.disconnect()
    },
    userConnect: () => {
        ClientSocket.emit("userConnect", {})
    },
    subscribeToStatusUpdates(userIds) {
        ClientSocket.emit("subscribeToStatusUpdates", {toUserIds: userIds})
    },
    enterChat(chatId) {
        ClientSocket.emit("enterChat", {chatId: +chatId})
    },
    leaveChat(chatId) {
        ClientSocket.emit("enterChat", {chatId: +chatId})
    },

    listenToNewMessage(callback) {
        ClientSocket.on("newChatMessage", callback)
    },
    listenToUserStatuses(callback) {
        ClientSocket.on("sendUserStatuses", callback)
    },
    listenToUserUpdate(callback) {
        ClientSocket.on("notifyUser", (data) => {callback(data.userId, data.isOnline)})
    },
    listenToGroupOnlineUpdate(callback) {
        ClientSocket.on("groupOnlineUpdate", (data) => {callback(data.membersTotal, data.membersOnline)})
    },
    listenToNotification(callback) {
        ClientSocket.on("messageNotification", callback)
    },

    removeToNewMessageListener() {
        ClientSocket.off("newChatMessage")
    },
    removeToUserStatusesListener() {
        ClientSocket.off("sendUserStatuses")
    },
    removeToUserUpdateListener() {
        ClientSocket.off("notifyUser")
    },
    removeToGroupOnlineUpdateListener() {
        ClientSocket.off("groupOnlineUpdate")
    },
    removeNotificationListener() {
        ClientSocket.off("messageNotification")
    },
}
