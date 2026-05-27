import type { UserProfile } from "../../types/friends.types";

export interface UsersBlockProps {
	name: string;
	profiles: UserProfile[];
	actionText: string;
	actionOnProceed: (profileId: number) => void;
    actionOnDelete: (profileId: number) => void;
    lookAllLink?: string
    dontShowAllLink?: boolean
    emptyListText: string
    notAutoThrow?: boolean
}
