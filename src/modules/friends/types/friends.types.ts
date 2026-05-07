export interface Usernew {
    id: number,
    username: string,
    name?: string,
    surname?: string
}

export interface UserProfile {
	id: number;
	user: Usernew;
	birth_date?: string;
	signature?: string;
	avatar?: string;
	preudonym: string;
	friends: UserProfile[];
	is_image_signature?: boolean;
	is_text_signature?: boolean;
}

export interface FriendsRequest {
    id: number;
	from_profile: UserProfile;
	to_profile: UserProfile;
	created_at: string;
}
