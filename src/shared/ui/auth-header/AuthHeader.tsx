import { styles } from "./auth-header.styles";
import { View } from "react-native";
import { Images } from "../images";
import { SafeAreaView } from "react-native-safe-area-context";


export function AuthHeader(props?: any) {
    return (
        <View style = {styles.headerBar}>
            <Images.LogoImage style = {styles.headerImage}/>
        </View>
    )
}