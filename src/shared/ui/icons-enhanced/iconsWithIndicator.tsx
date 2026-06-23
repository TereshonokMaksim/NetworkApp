import { useEffect, useRef } from "react";
import { useGetUnreadDataQuery } from "../../../modules/friends/api/friends-api";
import { EnhancedChatIcon } from "./enhanced-chat-icon";


function messagesIcon(){
	const { data: num } = useGetUnreadDataQuery({});
	return (
		<EnhancedChatIcon
			indNumber={
				typeof num?.unreadPersonalChats === "number" ? num.unreadPersonalChats : 0
			}
		/>
	);
}

function groupsIcon(){
	const { data: num } = useGetUnreadDataQuery({});
	return (
		<EnhancedChatIcon
			indNumber={typeof num?.unreadGroupChats === "number" ? num.unreadGroupChats : 0}
		/>
	);
}

function chatsIcon(){
	const { data: num } = useGetUnreadDataQuery({});
	return (
		<EnhancedChatIcon
			indNumber={
				typeof num?.unreadPersonalChats === "number"
					? num.unreadPersonalChats + num.unreadGroupChats
					: 0
			}
		/>
	);
}

export const EnhancedIcons = {
	messagesIcon,
	groupsIcon,
	chatsIcon,
};
