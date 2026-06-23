import { View, Text } from "react-native";
import { Icons } from "../../icons/icons";
import { COLORS } from "../../../constants/colors";
import { styles } from "./enhanced-chat-icon.styles";
import { EnhancedChatIconProps } from "./enhanced-chat-icon.types";


export function EnhancedChatIcon(props: EnhancedChatIconProps){
    const { indNumber } = props
    return (
        <View style = {styles.wrapper}>
            <Icons.ChatsIcon color = {COLORS.plum}/>
            {!!(indNumber && (indNumber ? (indNumber > 0) : false)) && (
                <View style = {styles.indicator}>
                    <Text style = {styles.indicatorText}>{indNumber < 100 ? indNumber : "99"}</Text>
                </View>
            )}
        </View>
    )
}