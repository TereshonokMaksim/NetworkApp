// export type JoinChatCallback = (
// 	response: { status: "ok" } | { status: "error"; message?: string },
// ) => void;

export interface SendMessagePayload {
    senderId: number,
    chatId: number,
    text: string,
    messageImages: string[]
}

type Message = {
    id: number;
    text: string;
    chatId: number;
    created_at: Date;
    senderId: number;
};

export type NewMessage = {
    sender: {
        name: string | null;
        id: number;
        surname: string | null;
        profile: {
            avatar: string | null;
        } | null;
    };
    messageImages: {
        id: number;
        image: string;
    }[];
    id: number;
    text: string;
    chatId: number;
    created_at: Date;
    senderId: number;
}

export interface JoinChatPayload {
	chatId: number;
}

export interface LeaveChatPayload {
	chatId: number;
}
// export type GetOnlineUsersPayload = {
// 	userIds: number[];
// };
// export type GetOnlineUsersAcknowledgment = (response: {
// 	userIds: number[];
// }) => void;

export interface ServerEvents {
	newChatMessage: (message: NewMessage) => void;
}
export interface ClientEvents {
	enterChat: (payload: JoinChatPayload) => void;
	leaveChat: (payload: LeaveChatPayload) => void;
	sendMessage: (payload: SendMessagePayload) => void;
	// getOnlineUsers: (
	// 	payload: GetOnlineUsersPayload,
	// 	ack?: GetOnlineUsersAcknowledgment,
	// ) => void;
}