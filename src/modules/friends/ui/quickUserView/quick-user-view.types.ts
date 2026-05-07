import type { UserProfile } from "../../types/friends.types";


export interface QuickUserViewProps {
    profile: UserProfile,
    actionText: string,
    actionOnProceed: (profileId: number) => void
}