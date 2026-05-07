import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";


export const stylesBase = StyleSheet.create({
    imageBlock: {
        width: 96,
        height: 96,
        position: "relative"
    },
    avatarImage: {
        width: 96,
        height: 96,
        borderRadius: 100000
    },
    avatarIndicator: {
        width: 18,
        height: 18,
        borderWidth: 2.25,
        borderStyle: "solid",
        borderColor: COLORS.white,
        position: "absolute",
        right: 8,
        bottom: 8,
        borderRadius: 9
    },
    indicatorOnline: {
        backgroundColor: COLORS.green
    },
    indicatorOffline: {
        backgroundColor: COLORS.blue20
    }
}) 