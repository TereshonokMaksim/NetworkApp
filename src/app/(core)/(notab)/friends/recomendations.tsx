import { View, Text, ScrollView } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { COLORS } from "../../../../shared/constants/colors";
import { testRecomendationProfiles } from "../../../../modules/friends/TEST_DATA";
import { UsersBlock } from "../../../../modules/friends/ui/usersBlock";


export default function FriendsRecomendationsScreen(){
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
            <ScrollView>
                <UsersBlock
                    name="Рекомендації"
                    profiles={testRecomendationProfiles}
                    actionText="Додати"
                    actionOnProceed={(i: number) => {}}
                    dontShowAllLink = {true}
                />
            </ScrollView>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "55%", }}></View>
        </View>
    )
}