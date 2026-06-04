

export interface UnreadMessagesInfo {
    unreadPersonalChats: number,
    unreadGroupChats: number
}
export type MessageFull = {
    sender: {
        name: string | null;
        id: number;
        surname: string | null;
        profile: {
            avatar: string | null;
        };
    };
    messageReaders: {
        user: {
            id: number;
        };
    }[];
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
export type ChatShort = {
    id: number,
    name: string | null,
    isGroup: boolean,
    isOnline: boolean,
    lastMessage: MessageFull | null,
    avatar: string | null | undefined,
    peopleOnline: number[],
    userIsAdmin: boolean,
    userId: number,
    messagesUnread: number
}
export type ShortUserInfo = {
    id: number,
    name: string | null,
    surname: string | null,
    profile: {
        avatar: string | null
    }
}
export type ChatInfo = {
    id: number,
    name: string | null,
    isGroup: boolean,
    messages: MessageFull[],
    avatar: string | null | undefined,
    peopleOnline: number[],
    userIsAdmin: boolean
}