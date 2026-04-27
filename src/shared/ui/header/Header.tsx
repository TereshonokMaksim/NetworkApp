import { HeaderButton } from "../header-button/HeaderButton";
import { styles } from "./header.styles";
import { View } from "react-native";
import { Images } from "../images";
import { Icons } from "../icons/icons";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";
import { COLORS } from "../../constants/colors";
import { useUserContext } from "../../context";


export function Header(props?: any) {
    const router = useRouter()
    const path = usePathname()
    const { setToken, setUser } = useUserContext()
    return (
            <View style = {styles.headerBar}>
                <Images.LogoImage style = {styles.headerImage}/>
                <View style = {styles.headerRight}>
                    {!(path == "/friends" || path == "/friends/requests" || path == "/friends/recomendations" || path == "/friends/allFriends") &&
                        <HeaderButton iconLeft = {<Icons.PlusIcon/>} label = "Створити"/>
                    }
                    {!(path == "/chats" || path == "/chats_add/messages" || path == "/chats_add/groups") &&
                        <HeaderButton iconLeft = {<Icons.SettingsIcon/>} onPress={() => {router.navigate("settings/personal")}} style = {(path == "/settings/albums" || path == "/settings/personal") ? {backgroundColor: COLORS.plum50} : {}}label = "Налаштування"/>
                    }
                    <HeaderButton iconLeft = {<Icons.LogoutIcon/>} label = "Вийти" onPress = {
                        () => {
                            setUser(null)
                            setToken(null)
                            router.push("user/login")
                        }
                    }/>
                </View>
            </View>
    )
}