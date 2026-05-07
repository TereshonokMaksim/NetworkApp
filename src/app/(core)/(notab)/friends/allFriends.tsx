import { View, Text, ScrollView } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { COLORS } from "../../../../shared/constants/colors";
import { UsersBlock } from "../../../../modules/friends/ui/usersBlock";
import { testFriendProfiles } from "../../../../modules/friends/TEST_DATA";


export default function AllFriendsScreen(){
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
                    name="Друзі"
                    profiles={testFriendProfiles}
                    actionText="Повідомлення"
                    actionOnProceed={(i: number) => {}}
                    dontShowAllLink = {true}
                />
            </ScrollView>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "55%", }}></View>
        </View>
    )
}