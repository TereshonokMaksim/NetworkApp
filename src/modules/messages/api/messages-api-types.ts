export interface DirectChatPreview {
  id: number;
  interlocutorId: number;
  interlocutorName: string;
  avatarUrl: string | null;
  lastMessageText: string;
  lastMessageCreatedAt: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface GetChatsResponse {
  chats: DirectChatPreview[];
}

export interface GetMessagesParams {
  chatId: number;
  limit?: number;
  offset?: number;
}