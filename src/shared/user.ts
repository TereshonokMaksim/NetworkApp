export interface User {
    name: string | null;
    id: number;
    surname: string | null;
    nickname: string | null;
    username: string | null;
    email: string;
    birthday?: string;
    currentAvatarId: number | null;
    showNickname: boolean;
    signatureImageId: number | null;
    showSignature: boolean;
    online: boolean;
    createdAt: Date;
    isAdmin: boolean;
    verified: boolean;
}

export interface UserModify {
    name?: string | null;
    surname?: string | null;
    nickname?: string | null;
    username?: string | null;
    password?: string;
    email?: string;
    birthday?: string
    currentAvatarId?: number | null;
    showNickname?: boolean;
    signatureImageId?: number | null;
    showSignature?: boolean;
    verified?: boolean;
    avatar?: string | null | undefined
}


export type UserPowered = {
    name: string | null;
    id: number;
    surname: string | null;
    nickname: string | null;
    username: string | null;
    email: string;
    birthday: string | null;
    currentAvatarId: number | null;
    showNickname: boolean;
    signatureImageId: number | null;
    showSignature: boolean;
    online: boolean;
    verified: boolean;
    createdAt: Date;
    isAdmin: boolean;
    avatarPath: string | null | undefined;
}