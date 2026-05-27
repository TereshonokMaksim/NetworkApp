import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../shared/constants/colors";
import { Submenu } from "../../shared/ui/submenu/submenu";
import { Icons } from "../../shared/ui/icons/icons";
import { Link, useRouter } from "expo-router";
import { useGetFriendsQuery } from "../../modules/friends/api";
import { Image } from "expo-image";
import { BACK_HOST } from "../../shared/constants/api-data";
import { StyleSheet } from "react-native";


const blockStyles = StyleSheet.create({
    main: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        borderStyle: "solid",
        padding: 16,
        borderRadius: 10,
        gap: 20
    },
    top: {
        flexDirection: "row",
        width: "100%",
        gap: 8,
        alignItems: "center"
    },
    name: {
        color: COLORS.blue50,
        fontSize: 20,
        fontFamily: "GTWP Medium"
    },
    searchBox: {
        width: "100%",
        gap: 10,
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderColor: COLORS.blue20,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: 'center'
    },
    searchInput: {
        color: COLORS.blue,
        fontSize: 16,
        fontFamily: "GTWP Regular",
        flex: 1
    },
    contactList: {
        gap: 16,
        maxHeight: 418,
        width: "100%"
    },
    contact: {
        flexDirection: "row",
        gap: 16,
        width: "100%",
        alignItems: "center"
    },
    contactImage: {
        borderRadius: 76.88,
        width: 46,
        height: 46
    },
    contactUsername: {
        fontSize: 16,
        color: COLORS.blue,
        fontFamily: "GTWP Medium"
    }
})

export default function ChatsScreen(){
    const {data} = useGetFriendsQuery({})
    const router = useRouter()
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
            <View style = {blockStyles.main}>
                <View style = {blockStyles.top}>
                    <Icons.FriendsIcon/>
                    <Text style = {blockStyles.name}>Контакти</Text>
                </View>
                <View style = {blockStyles.searchBox}>
                    <Icons.GlassIcon/>
                    <TextInput
                        style = {blockStyles.searchInput}
                        placeholder = "Пошук"
                        placeholderTextColor={COLORS.blue50}
                    />
                </View>
                <ScrollView style = {blockStyles.contactList}>
                    {Array.isArray(data) && data.map(el => <TouchableOpacity style = {blockStyles.contact} key = {el.id}
                                onPress = {() => {router.navigate(`chats_add/1h${el.id}`)}}>
                        <Image source = {
                                        el.avatar
                                        ? `${BACK_HOST}/media/${el.avatar}`
                                        : require("../../assets/images/defaultAva.png")
                                        }
                                style = {blockStyles.contactImage}/>
                        <Text style = {blockStyles.contactUsername}>{el.username}</Text>
                    </TouchableOpacity>)}
                </ScrollView>
            </View>
            {/* <Link href = "user/registration"><Text>To reg</Text></Link>
            <Link href = "user/login"><Text>To log</Text></Link>
            <Link href = "user/verification"><Text>To verification</Text></Link> */}
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "80%", }}></View>
        </View>
    )
}