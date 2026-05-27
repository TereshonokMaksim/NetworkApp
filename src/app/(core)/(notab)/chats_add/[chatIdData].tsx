import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Image } from "expo-image";
import { COLORS } from "../../../../shared/constants/colors";
import { useState } from "react";


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 660,
        borderColor: COLORS.blue20,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        padding: 16,
        backgroundColor: COLORS.white
    },
    top: {
        width: "100%",
        gap: 10
    },
    topTop: {
        position: "relative",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center'
    },
    topData: {
        flexDirection: "row",
        gap: 24,
        height: 48
    },
    topBack: {
        height: "100%",
        justifyContent: "center"
    },
    topChatData: {
        flexDirection: "row",
        gap: 10,
        height: "100%",
        alignItems: "center"
    },
    topAvatar: {
        width: 46,
        height: 46,
        borderRadius: 1000
    },
    topTextData: {
        gap: 5
    },
    topUsername: {
        color: COLORS.blue,
        fontSize: 24,
        fontFamily: "GTWP Medium"
    },
    topPersonal: {
        color: COLORS.blue50,
        fontSize: 14,
        fontFamily: "GTWP Regular"
    },
    borderView: {
        width: "100%",
        height: 1,
        backgroundColor: COLORS.blue20
    },
    sendBlock: {
        width: "100%",
        flexDirection: "row",
        gap: 24,
    },
    sendInput: {
		color: COLORS.blue,
		fontSize: 16,
		fontFamily: "GTWP Regular",
		flex: 1,
		gap: 10,
		paddingVertical: 0,
		paddingHorizontal: 16,
		borderColor: COLORS.blue20,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
    },
    imageButton: {
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: COLORS.plum,
        borderStyle: "solid",
        padding: 10
    },
    planeButton: {
        borderRadius: 1000,
        backgroundColor: COLORS.plum,
        padding: 10
    },
    messageWhole: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    messageImage: {
        width: 46, 
        height: 46,
        borderRadius: 23
    },
    messageItself: {
        padding: 10,
        borderRadius: 6,
        gap: 10,
        borderWidth: 1,
        borderColor: COLORS.plum50,
        borderStyle: "solid",
        alignItems: "flex-end",
        flexDirection: "row"
    },
    messageTextData: {
        gap: 4
    },
    messageUsername: {
        color: COLORS.plum,
        fontSize: 10,
        fontFamily: "GTWP Regular"
    },
    messageContent: {
        color: COLORS.blue,
        fontSize: 14,
        fontFamily: "GTWP Regular"
    },
    addDataMessage: {
        flexDirection: "row",
        gap: 3,
        alignItems: "flex-end"
    },
    timeMessage: {
        color: COLORS.blue50,
        fontSize: 10,
        fontFamily: "GTWP Regular"
    }
})

const dropDownStyles = StyleSheet.create({
    thingy: {
        width: 300,
        borderRadius: 10,
        backgroundColor: COLORS.plum50,
        gap: 16,
        padding: 16,
        position: "absolute",
        top: -2,
        right: -16,
        zIndex: 10
    },
    tripleOffset: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    dataBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    dataText: {
        fontFamily: "GTWP Medium",
        fontSize: 16,
        color: COLORS.blue
    },
    dataBorder: {
        width: "100%",
        height: 1,
        backgroundColor: COLORS.blue20
    }
})

const modalStyles = StyleSheet.create({
    modalBg: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignContent: "center"
    },
    modalItself: {
        height: 600,
        width: "100%",
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        alignItems: "center",

    },
    crossOffset: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    textTitle: {
        color: COLORS.blue,
        fontSize: 34,
        fontFamily: "GTWP Medium"
    }
})

export default function FriendsRequestsScreen(){
    const { chatIdData } = useLocalSearchParams();
    console.log("AAA", chatIdData)
    const [isPersonal, chatId] = Array.isArray(chatIdData) ? chatIdData[0].split("h") : chatIdData.split('h')
    const router = useRouter()
    const data = {
        username: isPersonal === "0" ? "GroupName" : "Guy",
        avatar: "https://picsum.photos/seed/1000/200",
        isOnline: true
    }
    const otherMessages = [
        {
            avatar: "https://picsum.photos/seed/10000/200",
            messageContent: "Hello!",
            messageUsername: isPersonal === "0" ? "Umka" : "Guy",
            read: false,
            timeSent: "10:30"
        }
    ]
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
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
            <View style = {styles.container}>
                <Modal
                    visible={modalVisible}
                    animationType="none"
                    transparent={true}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                    statusBarTranslucent
                >
                    <View style = {modalStyles.modalBg}>
                        <View style = {modalStyles.modalItself}>
                            <View style = {modalStyles.crossOffset}>
                                <Icons.CrossIcon onPress = {() => {setModalVisible(false)}}/>
                            </View>
                            <Text style = {modalStyles.textTitle}>Редагування групи</Text>
                        </View>
                    </View>
                </Modal>
                <View style = {styles.top}>
                    <View style = {styles.topTop}>
                        <View style = {styles.topData}>
                            <View style = {styles.topBack}>
                                <TouchableOpacity onPress = {() => {router.back()}}>
                                    <Icons.BackIcon/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style = {styles.topChatData} onPress = {() => {if (isPersonal === "0") {setModalVisible(true)}}}>
                                <Image style = {styles.topAvatar} source = {data.avatar}/>
                                <View style = {styles.topTextData}>
                                    <Text style = {styles.topUsername}>{data.username}</Text>
                                    <Text style = {styles.topPersonal}>{isPersonal ? (data.isOnline ? "В мережі" : "Не в мережі") : "3 учасники, 1 в мережі"}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {isPersonal === "0" && <TouchableOpacity>
                                <Icons.TripleDotIcon onPress = {() => {setDropdownVisible(true)}}/>
                            </TouchableOpacity>}
                        {dropdownVisible && <View style = {dropDownStyles.thingy}>
                                <TouchableOpacity style = {dropDownStyles.tripleOffset}>
                                    <Icons.TripleDotIcon onPress = {() => {setDropdownVisible(false)}}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {dropDownStyles.dataBlock}>
                                    <Icons.GaleryIcon/>
                                    <Text style = {dropDownStyles.dataText}>Медіа</Text>
                                </TouchableOpacity>
                                <View style = {dropDownStyles.dataBorder}/>
                                <TouchableOpacity style = {dropDownStyles.dataBlock}>
                                    <Icons.LogoutIcon/>
                                    <Text style = {dropDownStyles.dataText}>Покинути групу</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                    <View style = {styles.borderView}/>
                </View>
                <View style = {{flex: 1, justifyContent: "flex-end"}}>
                    <ScrollView style = {{width: "100%", height: "90%"}} contentContainerStyle = {{justifyContent: "flex-end", minHeight: "90%"}}>
                        {otherMessages.map((el, elId) => <View style = {styles.messageWhole} key = {elId}>
                            <Image source = {el.avatar} style = {styles.messageImage}/>
                            <View style = {styles.messageItself}>
                                <View style = {styles.messageTextData}>
                                    <Text style = {styles.messageUsername}>{el.messageUsername}</Text>
                                    <Text style = {styles.messageContent}>{el.messageContent}</Text>
                                </View>
                                <View style = {styles.addDataMessage}>
                                    <Text style = {styles.timeMessage}>{el.timeSent}</Text>
                                    <Icons.CheckMarkIcon/>
                                </View>
                            </View>
                        </View>)}
                    </ScrollView>
                    <View style = {styles.sendBlock}>
                        <TextInput placeholder = "Повідомлення" placeholderTextColor={COLORS.blue50} style = {styles.sendInput}/>
                        <TouchableOpacity style = {styles.imageButton}>  
                            <Icons.GaleryIcon/>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.planeButton}>
                            <Icons.PlaneIcon color = {COLORS.white}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}