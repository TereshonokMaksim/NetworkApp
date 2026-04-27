import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AvatarPayload, AvatarResponse, LoginPayload, LoginResponse, MeResponse, ModifyPayload, ModifyResponse, RegPayload, RegResponse, VerifyPayload, VerifyResponse } from "./api.types";
import { BACK_HOST } from "../constants/api-data";
import { Album, AlbumCreate, AlbumEdit, AlbumImageCreate, AlbumImageForShow, Tag } from "../albums";


export const queryBaseHeaders = async (headers: Headers) => {
	const token = await AsyncStorage.getItem("token");
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}
	return headers;
};

export const baseApi = createApi({
	reducerPath: "api",
	tagTypes: ["avatarImages", "user"],
	baseQuery: fetchBaseQuery({
		baseUrl: BACK_HOST,
		prepareHeaders: queryBaseHeaders,
	}),
	endpoints(build) {
		return {
			login: build.mutation<LoginResponse, LoginPayload>({
				query: (body) => ({
					url: "users/login",
					method: "POST",
					body,
				}),
			}),
			register: build.mutation<RegResponse, RegPayload>({
				query: (body) => ({
					url: "users/register",
					method: "POST",
					body,
				})
			}),
			verify: build.mutation<VerifyResponse, VerifyPayload>({
				query: (body) => ({
					url: "users/verify",
					method: "POST",
					body,
				})
			}),
			me: build.query<MeResponse, void>({
				query: () => {console.log("remaking"); return { url: "users/me" }},
				providesTags: ["user"]
			}),
			modify: build.mutation<ModifyResponse, ModifyPayload>({
				query: (body) => {
					const {avatar, ...elseBody} = body
					const newFormData = new FormData();
					Object.entries(elseBody).forEach(([key, value]) => {
						if (value) newFormData.append(key, String(value));
					});
					if (avatar){
						newFormData.append("avatar", {
							uri: avatar,
							type: "images/jpeg",
							name: `${Date.now()}.jpeg`,
						} as any)
					}
					console.log("SENDING MODIFY REQUEST!")
					console.log(newFormData)
					return {
						url: "users/me",
						method: "PATCH",
						body: newFormData,
					}
				},
				invalidatesTags: ["avatarImages", "user"]
			}),
			getAvatarById: build.mutation<AvatarResponse, AvatarPayload>({
				query: (body) => ({
					url: `users/avatar/${body.id}`,
					method: "GET"
				})
			}),
			// createAlbum: build.mutation
		};
	},
});

export const { useMeQuery, useRegisterMutation, useLoginMutation, useModifyMutation, useVerifyMutation, useGetAvatarByIdMutation
 } = baseApi;