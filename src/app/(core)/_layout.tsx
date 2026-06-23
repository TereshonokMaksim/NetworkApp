import { Tabs } from "expo-router";
import { Icons } from "../../shared/ui/icons/icons";
import { COLORS } from "../../shared/constants/colors";
import { Header } from "../../shared/ui/header/Header";
import { useUserContext } from "../../shared/context/user";
import { View, StyleSheet, Text } from "react-native"
import { FForm } from "../../modules/auth/ui/finish-form/finish-form";
import { EnhancedIcons } from "../../shared/ui/icons-enhanced/";


export default function TabLayOut(){
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
                            height: 20,
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
                        tabBarIcon: ({ color }) => <EnhancedIcons.chatsIcon/>,
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