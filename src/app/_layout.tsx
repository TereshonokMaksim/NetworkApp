import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseApi, useMeQuery } from "../shared/api/api";
import { useUserContext, UserContextProvider } from "../shared/context/user";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { SocketActions } from "../shared/socket/socket";
import { FriendContextProvider, useFriendContext } from "../shared/context/friends/friends.context";
import { useGetFriendsQuery } from "../modules/friends/api";
import { GetUserStatusesResponse, NewMessageNotification } from "../shared/socket/socket.contracts";
import { useAppDispatch } from "../shared/api/dispatcher";
import { FriendApiActions } from "../modules/friends/api/friends-api-actions";


export default function LayoutDef(){
    return (
        <SafeAreaProvider style = {{paddingTop: 36}}>
            <ApiProvider api = {baseApi}>
                <UserContextProvider>
                    <FriendContextProvider>
                        <App/>
                    </FriendContextProvider>
                </UserContextProvider>
			</ApiProvider>
        </SafeAreaProvider>
    )
}

function App(){
    const [Fonts] = useFonts({
        'GTWP Bold': require('../assets/fonts/GTWalsheimPro-Bold.ttf'),
        'GTWP Ultrabold': require('../assets/fonts/GTWalsheimPro-UltraBold.ttf'),
        'GTWP Medium': require('../assets/fonts/GTWalsheimPro-Medium.ttf'),
        'GTWP Regular': require('../assets/fonts/GTWalsheimPro-Regular.ttf'),
    })
    
	const { token, setUser, setToken, user } = useUserContext();
    const { updateContactUser, currentChatId, getCurrentChatId, setDispatcher, dispatcher } = useFriendContext()
	const { refetch, data } = useMeQuery();
    const { data: friendIds } = useGetFriendsQuery({})
    const dispatch = useAppDispatch()
    const currentChatIdRef = useRef(currentChatId)
    const currentUserRef = useRef(user)

    function userUpdateListener(updatedUserId: number, updatedIsOnline: boolean){
        updateContactUser(updatedUserId, updatedIsOnline)
    }

    function subscribeResponseListener(statuses: GetUserStatusesResponse) {
        for (const stat of statuses.data){
            updateContactUser(stat.userId, stat.isOnline)
        }
    }
    useEffect(() => {
        currentChatIdRef.current = currentChatId
    }, [currentChatId])
    useEffect(() => {
        currentUserRef.current = user
    }, [user])


    function listenToNotifications(data: NewMessageNotification){
        console.log("Got notification")
        if (!currentUserRef.current) {
            console.log("No message?")
            return
        }
        const cid = currentChatIdRef.current
        const reallyNew = (data.chatId !== cid) && (currentUserRef.current.id !== data.senderId)
        const newMessage = {
                            sender: {
                                id: data.senderId,
                                username: data.sender.username,
                                profile: {
                                    avatar: data.sender.profile!.avatar
                                }
                            },
                            senderId: data.senderId,
                            id: data.id,
                            chatId: data.chatId,
                            text: data.text,
                            messageReaders: [{user: {id: data.senderId}}],
                            messageImages: [],
                            created_at: data.created_at
                        }
        if (reallyNew) {
            FriendApiActions.changeUnreadData(dispatch, currentUserRef.current.id === data.senderId ? 0 : 1, data.isGroupMessage)
        }
        else {
            newMessage.messageReaders.push({user: {id: currentUserRef.current.id}})
        }

        FriendApiActions.changeUnreadLastMessage(dispatch, data.isGroupMessage, data.chatId, newMessage, reallyNew)
        FriendApiActions.addNewMessage(dispatch, data.isGroupMessage, data.isGroupMessage ? data.chatId : data.senderId, newMessage)
    }
    console.log("Performace check")
	useEffect(() => {
		if (token) {
			AsyncStorage.setItem("token", token);
            console.log(`User token: ${token}`)
            SocketActions.connect(token)
            SocketActions.listenToUserStatuses(subscribeResponseListener)
            SocketActions.userConnect()
            SocketActions.listenToUserUpdate(userUpdateListener)
            SocketActions.listenToNotification(listenToNotifications)
            // SocketActions.disconnect()
			refetch();
		}
	}, [token]);

    useEffect(() => {
        if (friendIds){
            SocketActions.subscribeToStatusUpdates(friendIds.map(el => el.id))
        }
    }, [friendIds])

	useEffect(() => {
		if (data) {
			setUser(data);
		}
        // setIsInited(true)
	}, [data]);

	useEffect(() => {
		async function loadToken() {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				setToken(token);
			}
		}
		loadToken();
        return () => {
            SocketActions.disconnect()
        }
	}, []);
    
    return (
        <Stack screenOptions={{headerShown: false}}/>
    )
}