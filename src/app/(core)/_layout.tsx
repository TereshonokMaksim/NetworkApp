import { Tabs } from "expo-router";
import { Icons } from "../../shared/ui/icons/icons";
import { COLORS } from "../../shared/constants/colors";
import { Header } from "../../shared/ui/header/Header";
import { useUserContext } from "../../shared/context";
import { View, StyleSheet, Text } from "react-native"
import { FForm } from "../../modules/auth/ui/finish-form/finish-form";
import { useGetUnreadDataQuery } from "../../modules/friends/api/friends-api";
import { useEffect, useState } from "react";


export default function TabLayOut(){
    const { token } = useUserContext()
    const {data: unreadData} = useGetUnreadDataQuery({})
    const [totalNum, setTotalNum] = useState(0)
    console.log(token)
    useEffect(() => {
        let num = 0
        if (unreadData?.unreadGroupChats){
            num += unreadData.unreadGroupChats
        }
        if (unreadData?.unreadPersonalChats){
            num += unreadData.unreadPersonalChats
        }
        setTotalNum(num)
    }, [unreadData])
    console.log("TOTAL: ", totalNum, unreadData)
    // console.log("BIGINT: ", BigInt(10) + 10)
    const newIcon = (color: string) => (
        <View style = {{
            width: 20,
            height: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Icons.ChatsIcon color = {color}/>
            {totalNum > 0 && (
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
                    }}>{totalNum < 100 ? totalNum : "99"}</Text>
                </View>
            )}
        </View>
    )
    const bodyOOO = <Tabs screenOptions={{header: (props: any) => <Header {...props}/>}}>
            <Tabs.Screen 
                name = "main"
                options = {
                    {
                        title: "Головна",
                        tabBarIcon: ({ color }) => <Icons.HomeIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen 
                name = "my_publications"
                options = {
                    {
                        title: "Мої публікації",
                        tabBarIcon: ({ color }) => <Icons.GaleryIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen 
                name = "friends"
                options = {
                    {
                        title: "Друзі",
                        tabBarIcon: ({ color }) => <Icons.FriendsIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen 
                name = "chats"
                options = {
                    {   
                        
                        title: "Чати",
                        tabBarIcon: ({ color }) => newIcon(color),
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        }
                    }
                }
            />
            <Tabs.Screen
                name="(notab)/settings"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="(notab)/friends"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="(notab)/chats_add"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="(notab)/user"
                options={{
                    href: null
                }}
            />
        </Tabs>

    const {user} = useUserContext()
    if (user){
        if (!user.nickname || !user.username){
            return (
                <View style = {StyleSheet.absoluteFill}>
                    <FForm/>
                    <Tabs screenOptions={{header: (props: any) => <Header {...props}/>}}>
            <Tabs.Screen 
                name = "main"
                options = {
                    {
                        title: "Головна",
                        tabBarIcon: ({ color }) => <Icons.HomeIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen 
                name = "my_publications"
                options = {
                    {
                        title: "Мої публікації",
                        tabBarIcon: ({ color }) => <Icons.GaleryIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen 
                name = "friends"
                options = {
                    {
                        title: "Друзі",
                        tabBarIcon: ({ color }) => <Icons.FriendsIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen 
                name = "chats"
                options = {
                    {
                        title: "Чати",
                        tabBarIcon: ({ color }) => <Icons.ChatsIcon color = {color}/>,
                        tabBarLabelStyle: {
                            fontFamily: "GTWP Medium",
                            fontSize: 14,
                            color: COLORS.blue
                        },
                        tabBarIconStyle: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            />
            <Tabs.Screen
                name="(notab)/settings"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="(notab)/friends"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="(notab)/chats_add"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="(notab)/user"
                options={{
                    href: null
                }}
            />
        </Tabs>
    </View>
            )
        }
    }
    return bodyOOO
}