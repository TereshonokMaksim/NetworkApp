import type { UserProfile } from "../../types/friends.types";

export interface UsersBlockProps {
	name: string;
	profiles: UserProfile[];
	actionText: string;
	actionOnProceed: (profileId: number) => void;
    lookAllLink?: string
    dontShowAllLink?: boolean
}
