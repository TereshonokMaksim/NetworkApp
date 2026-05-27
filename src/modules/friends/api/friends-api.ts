import type { UserProfile } from "../types/friends.types";
import { baseApi } from "../../../shared/api/api";

export const tagsApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["friends", "requests", "recomendations"] })
    .injectEndpoints({ endpoints: (build) => {
        return {
            getFriends: build.query<UserProfile[], object>({
                query: (body?) => {console.log("Do i exist1?"); return {
                    url: "social/friends",
                    method: "GET"
                }},
                providesTags: ["friends"]
            }),
            getRecomendations: build.query<UserProfile[], object>({
                query: (body?) => {console.log("Do i exist2?"); return {
                    url: `social/recomendations`,
                    method: "GET"
                }},
                providesTags: ["recomendations"]
            }),
            getRequests: build.query<UserProfile[], object>({
                query: (body?) => {console.log("Do i exist3?"); return {
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
    useDeleteRequestMutation
} = tagsApi