import type { User, UserModify, UserPowered } from "../user";

export interface RegPayload {
	email: string;
	password: string;
}

export interface RegResponse {
	token: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
}

export type MeResponse = UserPowered;  

export type ModifyPayload = UserModify;
export type ModifyResponse = UserPowered;  
export type VerifyPayload = {code: string};
export type VerifyResponse = {success: boolean};  

export type AvatarPayload = {id: number | string}
export type AvatarResponse = {avatar: string}


export type Profile = {
	id: number
    avatar: string | null | undefined
    isOnline: boolean
    username: string
    pseudonym: string
    postsTotal: number
    readers: number
    friends: number
	status: string
}
