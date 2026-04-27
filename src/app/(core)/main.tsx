import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../shared/constants/colors";
import { Link, Redirect, router } from "expo-router";
import { useUserContext } from "../../shared/context";
import { FForm } from "../../modules/auth/ui/finish-form/finish-form";


export default function MainScreen(){
    return (

        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <Text>
                Main Page
            </Text>
            <Link href = "user/registration"><Text>To reg</Text></Link>
            <Link href = "user/login"><Text>To log</Text></Link>
            <Link href = "user/verification"><Text>To verification</Text></Link>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "5%", }}></View>
        </View>
    )
}