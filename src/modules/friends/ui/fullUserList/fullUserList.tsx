import { useRouter } from "expo-router";
import { useDeleteFriendMutation, useDeleteRequestMutation, useMakeFriendMutation, useMakeRequestMutation } from "../../api";
import { UsersBlock } from "../usersBlock";
import { stylesBase } from "./full-user-list.styles";
import type { FullUserListProps } from "./full-user-list.types";
import { View } from "react-native";

export function FullUserList(props: FullUserListProps) {
	const { requests, recomendations, friends } = props;
    // const [makeFriend] = useMakeFriendMutation()
    // const [makeRequest] = useMakeRequestMutation()
    const [deleteFriend] = useDeleteFriendMutation()
    const [deleteRequest] = useDeleteRequestMutation()
	const router = useRouter()
	return (
		<View style = {stylesBase.mainList}>
			<UsersBlock
				name="Запити"
				profiles={requests.slice(0, 2)}
				actionText="Підтвердити"
				actionOnProceed={(i: number) => {}}
                lookAllLink="friends/requests"
                actionOnDelete={(id) => {deleteRequest({userId: id})}}
                emptyListText = "Запитів поки що немає."
			/>
			<UsersBlock
				name="Рекомендації"
				profiles={recomendations.slice(0, 2)}
				actionText="Додати"
				actionOnProceed={(i: number) => {}}
                lookAllLink="friends/recomendations"
                actionOnDelete={(id?) => {}}
                emptyListText = "Рекомендацій поки що немає."
			/>
			<UsersBlock
				name="Друзі"
				profiles={friends.slice(0, 2)}
				actionText="Повідомлення"
				actionOnProceed={(profileId: number) => {router.navigate(`chats_add/${profileId}`)}}
                lookAllLink="friends/allFriends"
                actionOnDelete = {(id) => {deleteFriend({userId: id})}}
                emptyListText = "Друзів поки що немає."
				notAutoThrow = {true}
			/>
		</View>
	);
}
