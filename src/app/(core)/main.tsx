import { View, Text } from "react-native";
import { COLORS } from "../../shared/constants/colors";
import { Link } from "expo-router";

export default function MainScreen(){
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <Text>
                Main Page
            </Text>
            <Link href = "user/registration"><Text>To reg</Text></Link>
            <Link href = "user/login"><Text>To log</Text></Link>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "5%", }}></View>
        </View>
    )
}