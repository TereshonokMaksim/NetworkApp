import { View, Text } from "react-native";
import { COLORS } from "../../shared/constants/colors";
import { Submenu } from "../../shared/ui/submenu/submenu";
import { Icons } from "../../shared/ui/icons/icons";
import { Link } from "expo-router";


export default function ChatsScreen(){
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <Submenu 
                reversed = {true}
                links = {[
                    {
                        name: "Контакти",
                        href: "chats",
                        icon: <Icons.FriendsIcon/>
                    },
                    {
                        name: "Повідомлення",
                        href: "chats_add/messages",
                        icon: <Icons.ChatsIcon/>
                    },
                    {
                        name: "Групові чати",
                        href: "chats_add/groups",
                        icon: <Icons.ChatsIcon/>
                    }
                ]}
            />
            <Text style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
                Chat Page
            </Text>
            <Link href = "user/registration"><Text>To reg</Text></Link>
            <Link href = "user/login"><Text>To log</Text></Link>
            <Link href = "user/verification"><Text>To verification</Text></Link>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "80%", }}></View>
        </View>
    )
}