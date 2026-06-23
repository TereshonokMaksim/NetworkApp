import { View, Text, ScrollView } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { COLORS } from "../../../../shared/constants/colors";
import { UsersBlock } from "../../../../modules/friends/ui/usersBlock";
import { useDeleteRequestMutation, useGetRequestsQuery } from "../../../../modules/friends/api";


export default function FriendsRequestsScreen(){
    const data = useGetRequestsQuery({})
    const [deleteRequest] = useDeleteRequestMutation()
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
                            href: "friends/requests",
						    choosed: true
                        },
                        {
                            name: "Рекомендації",
                            href: "friends/recomendations"
                        },
                        {
                            name: "Всі друзі",
                            href: "friends/allFriends"
                        }
                    ]
                }
            />
            <ScrollView contentContainerStyle = {{paddingBottom: 10}}>
                <UsersBlock
                    name="Запити"
                    profiles={data.data ? data.data : []}
                    actionText="Підтвердити"
                    actionOnProceed={(i: number) => {}}
                    dontShowAllLink = {true}
                    actionOnDelete={(id) => {deleteRequest({userId: id})}}
                    emptyListText = "Запитів поки що немає."
                />
            </ScrollView>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "55%", }}></View>
        </View>
    )
}