import { styles } from "./auth-header.styles";
import { View } from "react-native";
import { Images } from "../images";


export function AuthHeader() {
    return (
        <View style = {styles.headerBar}>
            <Images.LogoImage style = {styles.headerImage}/>
        </View>
    )
}