import { HeaderButton } from "../header-button/HeaderButton";
import { styles } from "./header.styles";
import { View } from "react-native";
import { Images } from "../images";
import { Icons } from "../icons/icons";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";
import { COLORS } from "../../constants/colors";
import { useUserContext } from "../../context";
import { CreatePostModal } from "../../../modules/posts/ui/createPostModal/createPostModal";
import { useState } from "react";


export function Header(props?: any) {
    const router = useRouter()
    const path = usePathname()
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const { setToken, setUser } = useUserContext()
    console.log("USER IS HERE", !(path.split("/").includes("user")), path.split("/"))
    return (
            <View style = {styles.headerBar}>
                <CreatePostModal visible = {createPostVisible} onClose = {() => {setCreatePostVisible(false)}}/>
                <Images.LogoImage style = {styles.headerImage}/>
                <View style = {styles.headerRight}>
                    {!(path == "/friends" || path == "/friends/requests" || path == "/friends/recomendations" || path == "/friends/allFriends" || path.split("/").includes("user") || path.split("/").includes("chats_add")) &&
                        <HeaderButton iconLeft = {<Icons.PlusIcon/>} onPress = {() => {setCreatePostVisible(true)}} label = "Створити"/>
                    }
                    {!(path == "/chats" || path == "/chats_add/messages" || path == "/chats_add/groups" || path.split("/").includes("user")) &&
                        <HeaderButton iconLeft = {<Icons.SettingsIcon/>} onPress={() => {router.navigate("settings/personal")}} style = {(path == "/settings/albums" || path == "/settings/personal") ? {backgroundColor: COLORS.plum50} : {}} label = "Налаштування"/>
                    }
                    <HeaderButton iconLeft = {<Icons.LogoutIcon/>} label = "Вийти" onPress = {
                        () => {
                            setUser(null)
                            setToken(null)
                            router.navigate("user/login")
                        }
                    }/>
                </View>
            </View>
    )
}