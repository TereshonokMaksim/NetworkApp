import { View, Text, ScrollView } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { COLORS } from "../../../../shared/constants/colors";
import { UsersBlock } from "../../../../modules/friends/ui/usersBlock";
import { useDeleteFriendMutation, useGetFriendsQuery } from "../../../../modules/friends/api";


export default function AllFriendsScreen(){
    const data = useGetFriendsQuery({})
    const [deleteFriend] = useDeleteFriendMutation()
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <Submenu
                links = {
                    [
                        {
                            name: "Головна",
                            href: "friends"
                        },
                        {
                            name: "Запити",
                            href: "friends/requests"
                        },
                        {
                            name: "Рекомендації",
                            href: "friends/recomendations"
                        },
                        {
                            name: "Всі друзі",
                            href: "friends/allFriends",
						    choosed: true
                        }
                    ]
                }
            />
            <ScrollView contentContainerStyle = {{paddingBottom: 10}}>
                <UsersBlock
                    name="Друзі"
                    profiles={data.data ? data.data : []}
                    actionText="Повідомлення"
                    actionOnProceed={(i: number) => {}}
                    dontShowAllLink = {true}
                    actionOnDelete = {(id) => {deleteFriend({userId: id})}}
                    emptyListText = "Друзів поки що немає."
                />
            </ScrollView>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "55%", }}></View>
        </View>
    )
}