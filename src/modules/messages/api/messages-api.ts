import { DirectChatPreview, ChatMessage, GetChatsResponse, GetMessagesParams } from './messages-api-types';

export const fetchDirectChats = async (): Promise<GetChatsResponse> => {
  // const response = await apiEngine.get<GetChatsResponse>('/chats/direct');
  // return response.data;
  return { chats: [] };
};

export const fetchChatMessages = async (params: GetMessagesParams): Promise<ChatMessage[]> => {
  // const response = await apiEngine.get<ChatMessage[]>(`/chats/direct/${params.chatId}/messages`, { params });
  // return response.data;
  return [];
};