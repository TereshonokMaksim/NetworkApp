import type { UserProfile } from "../../types/friends.types";


export interface FullUserListProps {
    requests: UserProfile[],
    recomendations: UserProfile[],
    friends: UserProfile[],

}