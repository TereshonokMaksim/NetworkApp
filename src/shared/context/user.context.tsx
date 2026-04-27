import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";
import type { User, UserPowered } from "../user";

interface UserContextContract {
	token: string | null;
	user: UserPowered | null;
	setToken: (token: string | null) => void;
	setUser: (user: UserPowered | null) => void;
	isInited: boolean
	setIsInited: (isInitedNew: boolean) => void
}

const UserContext = createContext<UserContextContract | null>(null);

export function useUserContext() {
	const ctx = useContext(UserContext);
	if (!ctx) throw new Error("User context is not wrapped in provider.");
	return ctx;
}

export function UserContextProvider(props: PropsWithChildren) {
	const [user, setUser] = useState<UserPowered | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isInited, setIsInited] = useState(false)
	return (
		<UserContext value={{ user, token, setUser, setToken, isInited, setIsInited }} {...props} />
	);
}