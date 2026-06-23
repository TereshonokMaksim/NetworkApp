import type { UserProfile } from "../types/friends.types";
import { baseApi } from "../../../shared/api/api";
import { ChatInfo, ChatShort, ChatShortGroup, UnreadMessagesInfo } from "./friends-api.types";
import { NewMessage, SendMessagePayload } from "../../../shared/socket/socket.contracts";

export const friendsApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["friends", "requests", "recomendations", "unreadData", "groups", "personal", "groupChat"] })
    .injectEndpoints({ endpoints: (build) => {
        return {
            getFriends: build.query<UserProfile[], object>({
                query: (body?) => {return {
                    url: "social/friends",
                    method: "GET"
                }},
                providesTags: ["friends"]
            }),
            getRecomendations: build.query<UserProfile[], object>({
                query: (body?) => {return {
                    url: `social/recomendations`,
                    method: "GET"
                }},
                providesTags: ["recomendations"]
            }),
            getRequests: build.query<UserProfile[], object>({
                query: (body?) => {return {
                    url: `social/requests`,
                    method: "GET"
                }},
                providesTags: ["requests"]
            }),

            makeFriend: build.mutation<void, {userId: number}>({
                query: (body) => ({
                    url: `social/friends/${body.userId}`,
                    method: "POST"
                }),
                invalidatesTags: ["friends", "requests"]
            }),
            makeRequest: build.mutation<void, {userId: number}>({
                query: (body) => ({
                    url: `social/requests/${body.userId}`,
                    method: "POST"
                }),
                invalidatesTags: ["requests", "recomendations"]
            }),

            deleteFriend: build.mutation<void, {userId: number}>({
                query: (body) => ({
                    url: `social/friends/${body.userId}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["friends"]
            }),
            deleteRequest: build.mutation<void, {userId: number}>({
                query: (body) => ({
                    url: `social/requests/${body.userId}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["requests"]
            }),

            getPersonalChat: build.query<ChatInfo, {userId: number}>({
                query: (body) => ({
                    url: `chats/personal/${body.userId}`,
                    method: "GET"
                }),
            }),
            getGroupChat: build.query<ChatInfo, {chatId: number}>({
                query: (body) => {return {
                    url: `chats/groups/${body.chatId}`,
                    method: "GET"
                }},
                providesTags: ['groupChat']
            }),
            getPersonalChatList: build.query<ChatShort[], object>({
                query: (body?) => ({
                    url: `chats/personal`,
                    method: "GET"
                }),
                providesTags: ["personal"]
            }),
            getGroupChatList: build.query<ChatShortGroup[], object>({
                query: (body?) => ({
                    url: `chats/groups`,
                    method: "GET"
                }),
                providesTags: ["groups"]
            }),
            markMessage: build.mutation<object, {messageId: number}>({
                query: (body) => ({
                    url: `chats/messages/${body.messageId}`,
                    method: "POST"
                })
            }),
            getUnreadData: build.query<UnreadMessagesInfo, object>({
                query: (body) => ({
                    url: "chats/messages/unread",
                    method: "GET"
                }),
                providesTags: ["unreadData"]
            }),
            sendMessageWithImages: build.mutation<object, SendMessagePayload>({
                query: (body) => {
                    const { messageImages, ...elseBody } = body;
                    const newFormData = new FormData();
                    if (messageImages) {
                        messageImages.forEach((img, index) => {
                            newFormData.append("media", {
                                uri: img,
                                type: "image/jpeg",
                                name: `${Date.now()}-${index}.jpeg`,
                            } as any);
                        });
                    }
					Object.entries(elseBody).forEach(([key, value]) => {
                        
						if (value) { 
                            if (typeof value === "string" || typeof value === "number") newFormData.append(key, String(value));
                            else newFormData.append(key, JSON.stringify(value));
                        }
					});
                    return {
                        url: `chats/message/`,
                        method: "POST",
                        body: newFormData,
                    };},
                // invalidatesTags: (result, error, msg) => [
                //     {type: ""}
                // ]
            }),
            createGroupChat: build.mutation<object, {name: string, avatar: string | null | undefined, members: number[], chatId?: number}>({
                query: (body) => {
                    const { avatar, ...elseBody } = body;

                    const newFormData = new FormData();
					if (avatar) {
						newFormData.append("avatar", {
							uri: avatar,
							type: "image/jpeg",
							name: `${Date.now()}.jpeg`,
						} as any);
					}
					Object.entries(elseBody).forEach(([key, value]) => {
						if (value) { 
                            if (typeof value === "string" || typeof value === "number") newFormData.append(key, String(value));
                            else newFormData.append(key, JSON.stringify(value));
                        }
					});
                    console.log("Sending form...")
                    console.log(newFormData)
                    console.log(newFormData.get("avatar"))
                    return {
                        url: `chats/groups/`,
                        method: "POST",
                        body: newFormData,
                    };},
                    invalidatesTags: ["groups", "groupChat"]
            }),
            deleteChat: build.mutation<object, {chatId: number}>({
                query: (body) => ({
                    url: `chats/groups/${body.chatId}`,
                    method: "DELETE"
                }),
                // invalidatesTags: ["groups"]
            })
        }
    } 
});

export const {
    useGetFriendsQuery,
    useGetRecomendationsQuery,
    useGetRequestsQuery,

    useMakeFriendMutation,
    useMakeRequestMutation,

    useDeleteFriendMutation,
    useDeleteRequestMutation,

    useGetPersonalChatQuery,
    useGetPersonalChatListQuery,
    useMarkMessageMutation,
    useGetUnreadDataQuery,
    useSendMessageWithImagesMutation,

    useGetGroupChatListQuery,
    useCreateGroupChatMutation,
    useGetGroupChatQuery,
    useDeleteChatMutation,
    util: friendUtil,
    
} = friendsApi