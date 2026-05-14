import type { Usernew, UserProfile, FriendsRequest } from "../types/friends.types";

export interface RemoveFriendResponse {
  success: boolean;
};
export interface RemoveFriendPayload {
  id: number;
}
export interface FullUserListProps {
  requests: FriendsRequest[];
  recomendations: Usernew[];
  friends: UserProfile[];
}
export interface useRemoveFriendMutation{
    (id: number) => void
}