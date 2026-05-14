import { View, Text, TouchableOpacity, Image } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { COLORS } from "../../../../shared/constants/colors";
import { router } from "expo-router";

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
        <TouchableOpacity
            onPress={() => router.push("/user/1")}
        >
            <Image
                source={{ uri: "" }}
            />
        </TouchableOpacity>           
            <Text style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
                All Friends Page
            </Text>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "55%", }}></View>
        </View>
    )
}