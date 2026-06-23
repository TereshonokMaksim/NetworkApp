// export type JoinChatCallback = (
// 	response: { status: "ok" } | { status: "error"; message?: string },
// ) => void;

export interface SendMessagePayload {
	senderId: number;
	chatId: number;
	text: string;
	messageImages: string[];
}

type Message = {
	id: number;
	text: string;
	chatId: number;
	created_at: string;
	senderId: number;
};

export type NewMessage = {
	sender: {
		id: number;
		username: string;
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
	created_at: string;
	senderId: number;
};

export interface JoinChatPayload {
	chatId: number;
}

export interface LeaveChatPayload {
	chatId: number;
}

export interface UserOnlineData {
	userId: number;
	isOnline: boolean;
}

export interface GetUserStatusesResponse {
	data: UserOnlineData[];
}

// export type GetOnlineUsersPayload = {
// 	userIds: number[];
// };
// export type GetOnlineUsersAcknowledgment = (response: {
// 	userIds: number[];
// }) => void;

export interface SubscribeToStatusUpdatesPayload {
	toUserIds: number[];
}

export interface GroupOnlineData {
	membersTotal: number;
	membersOnline: number;
}

export interface NewMessageNotification {
	sender: {
		id: number;
		username: string;
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
	created_at: string;
	senderId: number;
	isGroupMessage: boolean;
}

export interface ServerEvents {
	newChatMessage: (message: NewMessage) => void;
	notifyUser: (data: UserOnlineData) => void;
	sendUserStatuses: (data: GetUserStatusesResponse) => void;
	groupOnlineUpdate: (data: GroupOnlineData) => void;
	messageNotification: (data: NewMessageNotification) => void;
}
export interface ClientEvents {
	enterChat: (payload: JoinChatPayload) => void;
	leaveChat: (payload: LeaveChatPayload) => void;
	sendMessage: (payload: SendMessagePayload) => void;
	userConnect: (payload: object) => void;
	subscribeToStatusUpdates: (payload: SubscribeToStatusUpdatesPayload) => void;
	// getOnlineUsers: (
	// 	payload: GetOnlineUsersPayload,
	// 	ack?: GetOnlineUsersAcknowledgment,
	// ) => void;
}

export type SocketActionsContract = {
	connect: (token: string) => void;
	disconnect: () => void;
	userConnect: () => void;
	subscribeToStatusUpdates: (userIds: number[]) => void;
	enterChat: (chatId: number) => void;
	leaveChat: (chatId: number) => void;

	listenToUserUpdate: (
		callback: (updatedUserId: number, updatedIsOnline: boolean) => void,
	) => void;
	listenToNewMessage: (callback: (message: NewMessage) => void) => void;
	listenToUserStatuses: (callback: (statuses: GetUserStatusesResponse) => void) => void;
	listenToGroupOnlineUpdate: (
		callback: (membersTotal: number, membersOnline: number) => void,
	) => void;
	listenToNotification: (callback: (data: NewMessageNotification) => void) => void;

	removeToUserUpdateListener: () => void;
	removeToNewMessageListener: () => void;
	removeToUserStatusesListener: () => void;
	removeToGroupOnlineUpdateListener: () => void;
	removeNotificationListener: () => void;
};
