import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	LoginPayload,
	LoginResponse,
	MeResponse,
	ModifyPayload,
	ModifyResponse,
	Profile,
	RegPayload,
	RegResponse,
	VerifyPayload,
	VerifyResponse,
} from "./api.types";
import { BACK_HOST } from "../constants/api-data";

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
				}),
			}),
			verify: build.mutation<VerifyResponse, VerifyPayload>({
				query: (body) => ({
					url: "users/verify",
					method: "POST",
					body,
				}),
			}),
			me: build.query<MeResponse, void>({
				query: () => ({ url: "users/me" }),
				providesTags: ["user"],
			}),
			modify: build.mutation<ModifyResponse, ModifyPayload>({
				query: (body) => {
					const { avatar, ...elseBody } = body;
					const newFormData = new FormData();
					Object.entries(elseBody).forEach(([key, value]) => {
						if (value) newFormData.append(key, String(value));
					});
					if (avatar) {
						newFormData.append("avatar", {
							uri: avatar,
							type: "images/jpeg",
							name: `${Date.now()}.jpeg`,
						} as any);
					}
					// console.log("Modifying", avatar)
					// console.log(FormData)
					return {
						url: "users/me",
						method: "PATCH",
						body: newFormData,
					};
				},
				invalidatesTags: ["avatarImages", "user"],
			}),
			getProfile: build.query<Profile, { userId: number }>({
				query: (body) => ({
					url: `users/profile/${body.userId}`,
				}),
			})
			// createAlbum: build.mutation
		};
	},
});

export const {
	useMeQuery,
	useRegisterMutation,
	useLoginMutation,
	useModifyMutation,
	useVerifyMutation,
	useGetProfileQuery,
} = baseApi;
