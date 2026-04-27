import { Slot, Stack, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../shared/ui/header/Header";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseApi, useMeQuery } from "../shared/api/api";
import { useUserContext, UserContextProvider } from "../shared/context";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { FForm } from "../modules/auth/ui/finish-form/finish-form";
import { StyleSheet, View } from "react-native";



export default function LayoutDef(){
    return (
        <SafeAreaProvider style = {{paddingTop: 36}}>
            <ApiProvider api = {baseApi}>
                <UserContextProvider>
                    <App/>
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
    
	const { token, setUser, setToken, user, isInited, setIsInited } = useUserContext();
	const { refetch, data } = useMeQuery();

	useEffect(() => {
		if (token) {
			AsyncStorage.setItem("token", token);
			refetch();
		}
	}, [token]);

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
	}, []);
    
    // const path = usePathname()
    // if (path.split("/")[0] != "user"){
    //     console.log("NO USER")
    //     if (user){
    //         console.log("YES USER")
    //         console.log(path.split("/")[0])
    //         console.log(!user.nickname || !user.username)
    //         if (!user.nickname || !user.username){
    //             console.log("GOOD")
    //             return (
    //                 <View style = {StyleSheet.absoluteFill}>
    //                     <FForm/>
    //                     <Stack screenOptions={{headerShown: false}}>
    //                     </Stack>
    //                 </View>
    //                 )
    //         }
    //     }
    // }
    return (
        // <Stack
		// 	screenOptions={{
		// 		headerShown: false,
		// 	}}>
        //     <Stack.Screen name = "user"/>
        //     {/* <Stack.Screen name = ""/> */}
        // </Stack>
        <Stack screenOptions={{headerShown: false}}>
        </Stack>
    )
}