import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Image } from "expo-image"
import { useRouter } from "expo-router";
import { useGetUnreadDataQuery } from "../../../../modules/friends/api/friends-api";


const blockStyles = StyleSheet.create({
    main: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        borderStyle: "solid",
        paddingVertical: 16,
        borderRadius: 10,
        gap: 20,
    },
    top: {
        flexDirection: "row",
        width: "100%",
        gap: 8,
        alignItems: "center",
        marginHorizontal: 16,
    },
    name: {
        color: COLORS.blue50,
        fontSize: 20,
        fontFamily: "GTWP Medium",
    },
    searchBox: {
        width: "92%",
        gap: 10,
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderColor: COLORS.blue20,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
    },
    searchInput: {
        color: COLORS.blue,
        fontSize: 16,
        fontFamily: "GTWP Regular",
        flex: 1,
    },
    contactList: {
        gap: 16,
        maxHeight: 418,
        width: "100%",
    },
    contact: {
        flexDirection: "row",
        gap: 16,
        width: "100%",
        alignItems: "center",
        height: 62,
        paddingHorizontal: 10
    },
    contactImage: {
        borderRadius: 76.88,
        width: 46,
        height: 46,
    },
    contactUsername: {
        fontSize: 16,
        color: COLORS.blue,
        fontFamily: "GTWP Medium",
    },
    selected: {
        backgroundColor: COLORS.plum50,
    },
    textData: {
        gap: 4,
        flex: 1
    },
    message: {
        fontSize: 14,
        color: COLORS.blue,
        fontFamily: "GTWP Medium",
    },
    timeText: {
        fontSize: 12,
        color: COLORS.blue50,
        fontFamily: "GTWP Medium",
    },
    contactTop: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row"
    }
});

interface UserMess {
	id: number;
	avatar?: string;
	username: string;
	pseudonym: string;
	lastMessage: string;
	lastTime: string;
	read: boolean;
	isOnline: boolean;
}

export default function GroupsScreen(){
    const data: UserMess[] = [
		{
			id: 1,
			avatar: "https://picsum.photos/seed/1000/200",
			username: "JS18:00-2",
			pseudonym: "asdadasdasd",
			lastMessage: "Когда у нас встреча?",
			lastTime: "9:21",
			read: false,
			isOnline: true,
		},
		{
			id: 4,
			avatar: "https://picsum.photos/seed/1asd/400",
			username: "9Б без учителя",
			pseudonym: "asdadasdasd",
			lastMessage: "Скиньте кто-то дз по украинскому плиз",
			lastTime: "7:01",
			read: true,
			isOnline: false,
		},
		{
			id: 3,
			avatar: "https://picsum.photos/seed/1asd/300",
			username: "9Б",
			pseudonym: "asdadasdasd",
			lastMessage: "Расписание на следующую неделю:",
			lastTime: "25.01.2024",
			read: true,
			isOnline: true,
		},
		{
			id: 7,
			avatar: "https://picsum.photos/seed/2asd/500",
			username: "Test",
			pseudonym: "asdadasdasd",
			lastMessage: "Тест",
			lastTime: "01.01.2001",
			read: true,
			isOnline: false,
		},
	];
    const router = useRouter()
        const {data: unreadData} = useGetUnreadDataQuery({})
        const personalNum = unreadData?.unreadPersonalChats
        const newPersonalIcon = (
            <View style = {{
                width: 20,
                height: 20,
                position: "relative",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Icons.ChatsIcon color = {COLORS.plum}/>
                {!!(personalNum && (personalNum ? (personalNum > 0) : false)) && (
                    <View style = {{
                        backgroundColor: COLORS.red,
                        justifyContent: "center",
                        alignItems: "center",
                        width: 20,
                        height: 20,
                        borderWidth: 2.25,
                        borderStyle: "solid",
                        borderColor: COLORS.white,
                        borderRadius: 60,
                        position: "absolute",
                        right: -6,
                        top: -6
                    }}>
                        <Text style = {{
                            fontSize: 11,
                            color: COLORS.white
                        }}>{personalNum < 100 ? personalNum : "99"}</Text>
                    </View>
                )}
            </View>
        )
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
                        icon: newPersonalIcon
                    },
                    {
                        name: "Групові чати",
                        href: "chats_add/groups",
                        icon: <Icons.ChatsIcon/>
                    }
                ]}
            />
            <View style={blockStyles.main}>
                <View style={blockStyles.top}>
                    <Icons.ChatsIcon />
                    <Text style={blockStyles.name}>Повідомлення</Text>
                </View>
                <View style={blockStyles.searchBox}>
                    <Icons.GlassIcon />
                    <TextInput
                        style={blockStyles.searchInput}
                        placeholder="Пошук"
                        placeholderTextColor={COLORS.blue50}
                    />
                </View>
                <ScrollView style={blockStyles.contactList}>
                    {Array.isArray(data) &&
                        data.map((el) => (
                            <TouchableOpacity
                                style={[blockStyles.contact, !el.read && blockStyles.selected]}
                                key={el.id}
                                onPress = {() => {router.navigate(`chats_add/0h${el.id}`)}}
                            >
                                <View style={blockStyles.contactImage}>
                                    <Image source = {el.avatar}
                                    style = {blockStyles.contactImage}/>
                                </View>
                                <View style = {blockStyles.textData}>
                                    <View style = {blockStyles.contactTop}>
                                        <Text style={blockStyles.contactUsername}>{el.username}</Text>
                                        <Text style = {blockStyles.timeText}>{el.lastTime}</Text>
                                    </View>
                                    <Text style = {blockStyles.message}>{el.lastMessage}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "80%", }}></View>
        </View>
    )
}