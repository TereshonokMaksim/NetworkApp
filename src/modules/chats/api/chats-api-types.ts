export interface GroupChatPreview {
  id: number;
  title: string;
  groupAvatarUrl: string | null;
  membersCount: number;
  lastMessageText: string | null;
  lastMessageSenderName: string | null;
  lastMessageCreatedAt: string | null;
}

export interface CreateGroupChatDto {
  title: string;
  invitedUserIds: number[];
}