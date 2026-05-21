import { GroupChatPreview, CreateGroupChatDto } from './chats-api-types';

export const fetchGroupChats = async (): Promise<GroupChatPreview[]> => {
  // const response = await apiEngine.get<GroupChatPreview[]>('/chats/groups');
  // return response.data;
  return [];
};

export const createGroupChat = async (dto: CreateGroupChatDto): Promise<GroupChatPreview> => {
  // const response = await apiEngine.post<GroupChatPreview>('/chats/groups', dto);
  // return response.data;
  return {} as GroupChatPreview;
};