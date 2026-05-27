import { View, Text, ScrollView } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { COLORS } from "../../../../shared/constants/colors";
import { useGetRecomendationsQuery } from "../../../../modules/friends/api";
import { UsersBlock } from "../../../../modules/friends/ui/usersBlock";


export default function FriendsRecomendationsScreen(){
    const data = useGetRecomendationsQuery({})
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
                            href: "friends/allFriends"
                        }
                    ]
                }
            />
            <ScrollView contentContainerStyle = {{paddingBottom: 10}}>
                <UsersBlock
                    name="Рекомендації"
                    profiles={data.data ? data.data : []}
                    actionText="Додати"
                    actionOnProceed={(i: number) => {}}
                    dontShowAllLink = {true}
                    actionOnDelete={(id?) => {}}
                    emptyListText = "Рекомендацій поки що немає."
                />
            </ScrollView>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "55%", }}></View>
        </View>
    )
}