import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { AppDispatch } from "../../api/dispatcher";

type OnlineDataMap = Map<number, boolean>;

interface FriendContextContract {
	contactsUserIds: OnlineDataMap;
	groupIds: OnlineDataMap;
	dispatcher: null | AppDispatch
	setDispatcher: (newDispatcher: null | AppDispatch) => void
	setContactsUserIds: (newUserIds: OnlineDataMap) => void;
	setGroupIds: (newGroupIds: OnlineDataMap) => void;
	updateContactUser: (newId: number, isOnline: boolean) => void;
	deleteContactUser: (newId: number) => void;
	updateGroup: (newId: number, isOnline: boolean) => void;
	deleteGroup: (newId: number) => void;

	currentChatId: number | null;
	setCurrentChatId: (newId: number | null) => void;
	getCurrentChatId: () => () => number | null
}

const FriendContext = createContext<FriendContextContract | null>(null);

export function useFriendContext() {
	const ctx = useContext(FriendContext);
	if (!ctx) throw new Error("Friend context is not wrapped in provider.");
	return ctx;
}

export function FriendContextProvider(props: PropsWithChildren) {
	const [contactsUserIds, setContactsUserIds] = useState<OnlineDataMap>(new Map());
	const [groupIds, setGroupIds] = useState<OnlineDataMap>(new Map());
	const [currentChatId, setCurrentChatId] = useState<null | number>(-1)
	const [dispatcher, setDispatcher] = useState<null | AppDispatch>(null)
	function updateContactUser(newId: number, isOnline: boolean) {
		setContactsUserIds((prev) => {
			const newMap = new Map(prev);
			newMap.set(newId, isOnline);
			return newMap;
		});
	}
	function deleteContactUser(id: number) {
		setContactsUserIds((prev) => {
			const newMap = new Map(prev);
			newMap.delete(id);
			return newMap;
		});
	}
	function updateGroup(newId: number, isOnline: boolean) {
		setGroupIds((prev) => {
			const newMap = new Map(prev);
			newMap.set(newId, isOnline);
			return newMap;
		});
	}
	function deleteGroup(id: number) {
		setGroupIds((prev) => {
			const newMap = new Map(prev);
			newMap.delete(id);
			return newMap;
		});
	}
	function getCurrentChatId(){
		return () => {return currentChatId}
	}
	return (
		<FriendContext
			value={{
				contactsUserIds,
				setContactsUserIds,
				groupIds,
				dispatcher,
				setDispatcher,
				setGroupIds,
				updateContactUser,
				updateGroup,
				deleteContactUser,
				deleteGroup,

				currentChatId, 
				setCurrentChatId,
				getCurrentChatId
			}}
			{...props}
		/>
	);
}
