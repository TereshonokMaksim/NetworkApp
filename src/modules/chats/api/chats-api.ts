import { GroupChatPreview, CreateGroupChatDto } from './chats-api-types';

const mockGroupChats: GroupChatPreview[] = [
  {
    id: 201,
    title: 'Розробники World IT',
    groupAvatarUrl: 'https://avatar.iran.liara.run/public/43',
    membersCount: 14,
    lastMessageText: 'Максим, перевір будь ласка пулреквест',
    lastMessageSenderName: 'Артем',
    lastMessageCreatedAt: new Date().toISOString(),
  },
  {
    id: 202,
    title: 'Дизайнери (Figma)',
    groupAvatarUrl: null,
    membersCount: 5,
    lastMessageText: 'Оновила лінки на макети в описі',
    lastMessageSenderName: 'Анна',
    lastMessageCreatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export const fetchGroupChats = async (): Promise<GroupChatPreview[]> => {
  return mockGroupChats;
};

export const createGroupChat = async (dto: CreateGroupChatDto): Promise<GroupChatPreview> => {
  const newGroup: GroupChatPreview = {
    id: Math.floor(Math.random() * 1000),
    title: dto.title,
    groupAvatarUrl: null,
    membersCount: dto.invitedUserIds.length + 1,
    lastMessageText: null,
    lastMessageSenderName: null,
    lastMessageCreatedAt: null,
  };
  mockGroupChats.push(newGroup);
  return newGroup;
};