import { Tabs } from "expo-router";
import { Icons } from "../../shared/ui/icons/icons";
import { COLORS } from "../../shared/constants/colors";


export default function TabLayOut(){
    return (
        <Tabs screenOptions={{headerShown: false}}>
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
        </Tabs>
    )
}