import type { AppDispatch } from "../../../shared/api/dispatcher";

export interface UnreadMessagesInfo {
	unreadPersonalChats: number;
	unreadGroupChats: number;
}
export type MessageFull = {
	sender: {
		id: number;
		username: string;
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
	created_at: string;
	senderId: number;
};
export type ChatShort = {
	id: number;
	name: string | null;
	isGroup: boolean;
	isOnline: boolean;
	lastMessage: MessageFull | null;
	avatar: string | null | undefined;
	peopleOnline: number[];
	userIsAdmin: boolean;
	userId: number;
	messagesUnread: number;
};
export type ChatShortGroup = {
	id: number;
	name: string;
	currentlyOnline: number;
	lastMessage: MessageFull | null;
	avatar: string | null | undefined;
	peopleOnline: number[];
	userIsAdmin: boolean;
	messagesUnread: number;
};
export type ShortUserInfo = {
	id: number;
	name: string | null;
	surname: string | null;
	username: string;
	profile: {
		avatar: string | null;
	};
};
export type ChatInfo = {
	id: number;
	name: string | null;
	isGroup: boolean;
	messages: MessageFull[];
	avatar: string | null | undefined;
	peopleOnline: number[];
	userIsAdmin: boolean;
	totalMembers: number;
	memberIds: number[];
};

export type NotifMessage = {
	sender: {
		id: number;
		username: string;
		profile: {
			avatar: string | null;
		};
	};
	senderId: number;
	id: number;
	chatId: number;
	text: string;
	messageReaders: {
		user: {
			id: number;
		};
	}[];
	messageImages: {
		id: number;
		image: string;
	}[];
	created_at: string;
};

export type FriendApiActionsContract = {
	// dispatch: AppDispatch,
	changeUnreadData: (
		dispatcher: AppDispatch,
		byNumber: number,
		isGroupsChange: boolean,
	) => Promise<void>;
	changeUnreadLastMessage: (
		dispatcher: AppDispatch,
		isGroupChat: boolean,
		chatId: number,
		newMessage: NotifMessage,
		changeUnreadNum: boolean,
	) => Promise<void>;
	readChatCompletely: (
		dispatcher: AppDispatch,
		isGroupChat: boolean,
		chatId: number,
	) => Promise<void>;
	addNewMessage: (
		dispatcher: AppDispatch,
		isGroupChat: boolean,
		userOrChatId: number,
		newMessage: NotifMessage,
	) => Promise<void>;
    readChatMessages: (
        dispatcher: AppDispatch, 
        isGroupChat: boolean,
        userOrChatId: number,
        clientId: number
    ) => Promise<void>;
    removeGroupChat: (
        dispatcher: AppDispatch,
        chatId: number
    ) => Promise<void>
    updateGroupChat: (
        dispatcher: AppDispatch,
        chatId: number,
        newName: string,
        newAvatarPath: string
    ) => Promise<void>
};
