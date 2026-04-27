import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        borderColor: COLORS.plum,
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        alignItems: "center",
        gap: 8
    },
    icon: {
        width: 20,
        height: 20
    },
    text: {
        fontWeight: 500,
        fontSize: 14,
        color: COLORS.plum
    }
})