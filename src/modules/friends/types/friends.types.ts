export interface UserProfile {
	id: number;
	avatar?: string;
	pseudonym: string;
    username: string;
}

export interface FriendsRequest {
    id: number;
	from_profile: UserProfile;
	to_profile: UserProfile;
}
