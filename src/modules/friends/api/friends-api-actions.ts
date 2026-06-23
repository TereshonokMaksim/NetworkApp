import type { FriendApiActionsContract } from "./friends-api.types";
import { friendUtil } from "./friends-api";

export const FriendApiActions: FriendApiActionsContract = {
	// dispatch: useAppDispatch(),
	async changeUnreadData(dispatcher, byNumber, isGroupsChange) {
		dispatcher(
			friendUtil.updateQueryData("getUnreadData", {}, (draft) => {
				if (isGroupsChange) {
					draft.unreadGroupChats = draft.unreadGroupChats + byNumber;
				} else {
					draft.unreadPersonalChats = draft.unreadPersonalChats + byNumber;
				}
			}),
		);
	},
	async changeUnreadLastMessage(dispatcher, isGroupChat, chatId, notifMessage, changeUnreadNum) {
		dispatcher(
			friendUtil.updateQueryData(
				isGroupChat ? "getGroupChatList" : "getPersonalChatList",
				{},
				(draft) => {
					for (const chat of draft) {
						if (chat.id !== chatId) continue;
						chat.lastMessage = notifMessage;
						if (changeUnreadNum) chat.messagesUnread = chat.messagesUnread + 1;
						break;
					}
				},
			),
		);
	},
	async readChatCompletely(dispatcher, isGroupChat, chatId) {
		dispatcher(
			friendUtil.updateQueryData(
				isGroupChat ? "getGroupChatList" : "getPersonalChatList",
				{},
				(draft) => {
					for (const chat of draft) {
						if (chat.id !== chatId) continue;
						this.changeUnreadData(dispatcher, -chat.messagesUnread, isGroupChat);
						chat.messagesUnread = 0;
						break;
					}
				},
			),
		);
	},
	async addNewMessage(dispatcher, isGroupChat, userOrChatId, newMessage) {
		dispatcher(
			friendUtil.updateQueryData(
				isGroupChat ? "getGroupChat" : "getPersonalChat",
				isGroupChat ? { chatId: userOrChatId } : { userId: userOrChatId },
				(draft) => {
					draft.messages.push(newMessage);
				},
			),
		);
	},
	async readChatMessages(dispatcher, isGroupChat, userOrChatId, clientId) {
		dispatcher(
			friendUtil.updateQueryData(
				isGroupChat ? "getGroupChat" : "getPersonalChat",
				isGroupChat ? { chatId: userOrChatId } : { userId: userOrChatId },
				(draft) => {
					for (
						let messageIndex = draft.messages.length - 1;
						messageIndex > 0;
						messageIndex--
					) {
                        if (draft.messages[messageIndex].messageReaders.some((el) => el.user.id === clientId)) { 
                            break
                        }
						draft.messages[messageIndex].messageReaders.push({
							user: { id: clientId },
						});
					}
				},
			),
		);
	},
    async removeGroupChat(dispatcher, chatId) {
        dispatcher(
            friendUtil.updateQueryData(
                "getGroupChatList",
                {},
                (draft) => {
                    for (let ind = 0; ind < draft.length; ind++){
                        if (draft[ind].id === chatId){
                            draft.splice(ind, 1)
                            break
                        }
                    }
                }
            )
        )
    },
    async updateGroupChat(dispatcher, chatId, newName, newAvatarPath) {
        dispatcher(
            friendUtil.updateQueryData(
                "getGroupChatList",
                {},
                (draft) => {
                    for (let ind = 0; ind < draft.length; ind++){
                        if (draft[ind].id === chatId){
                            draft[ind].avatar = newAvatarPath
                            draft[ind].name = newName
                            break
                        }
                    }
                }
            )
        )
        dispatcher(
			friendUtil.updateQueryData(
				"getGroupChat",
				{ chatId: chatId },
				(draft) => {
                    draft.avatar = newAvatarPath
                    draft.name = newName
				},
			),
        )
    },
};
