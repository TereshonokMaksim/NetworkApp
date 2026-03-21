import { View, Text } from "react-native";
import { COLORS } from "../../shared/constants/colors";


export default function MyPublicationsScreen(){
    // setInterval(() => {console.log(isFocused)}, 1000)
    // setInterval(() => {console.log(useIsFocused())}, 1000)
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <Text>
                My Publications Page
            </Text>
            <View style = {{width: "25%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "25%", }}></View>
        </View>
    )
}