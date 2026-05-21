import { GetChatsResponse, ChatMessage, GetMessagesParams } from './messages-api-types';

const mockDirectChats: GetChatsResponse = {
  chats: [
    {
      id: 101,
      interlocutorId: 1,
      interlocutorName: 'Олександр Коваленко',
      avatarUrl: 'https://avatar.iran.liara.run/public/12',
      lastMessageText: 'Привіт! Проєкт World IT готовий до тесту?',
      lastMessageCreatedAt: new Date().toISOString(),
      unreadCount: 2,
    },
    {
      id: 102,
      interlocutorId: 2,
      interlocutorName: 'Марія Шевченко',
      avatarUrl: 'https://avatar.iran.liara.run/public/75',
      lastMessageText: 'Дякую за допомогу з фронтендом 🙌',
      lastMessageCreatedAt: new Date(Date.now() - 7200000).toISOString(),
      unreadCount: 0,
    },
  ],
};

const mockMessages: Record<number, ChatMessage[]> = {
  101: [
    { id: 1001, chatId: 101, senderId: 1, text: 'Привіт! Ти тут?', createdAt: new Date(Date.now() - 600000).toISOString(), isRead: true },
    { id: 1002, chatId: 101, senderId: 1, text: 'Проєкт World IT готовий до тесту?', createdAt: new Date().toISOString(), isRead: false },
  ],
};

export const fetchDirectChats = async (): Promise<GetChatsResponse> => {
  return mockDirectChats;
};

export const fetchChatMessages = async (params: GetMessagesParams): Promise<ChatMessage[]> => {
  return mockMessages[params.chatId] || [];
};