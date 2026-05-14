import { UsersBlock } from "../usersBlock";
import { stylesBase } from "./full-user-list.styles";
import type { FullUserListProps } from "./full-user-list.types";
import { View } from "react-native";
import { useRemoveFriendMutation } from "../../api/friends-api";

export function FullUserList(props: FullUserListProps) {
	const { requests, recomendations, friends } = props;
	return (
		<View style = {stylesBase.mainList}>
			<UsersBlock
				name="Запити"
				profiles={requests}
				actionText="Підтвердити"
				actionOnProceed={(i: number) => {useRemoveFriendMutation({id: i})}}
                lookAllLink="friends/requests"
			/>
			<UsersBlock
				name="Рекомендації"
				profiles={recomendations}
				actionText="Додати"
				actionOnProceed={(i: number) => {useRemoveFriendMutation({id: i})}}
                lookAllLink="friends/recomendations"
			/>
			<UsersBlock
				name="Друзі"
				profiles={friends}
				actionText="Повідомлення"
				actionOnProceed={(i: number) => {useRemoveFriendMutation({id: i})}}
                lookAllLink="friends/allFriends"
			/>
		</View>
	);

}
