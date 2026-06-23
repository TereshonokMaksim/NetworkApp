import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";


export const styles = StyleSheet.create({
    wrapper: {
        width: 20,
        height: 20,
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
    },
    indicator: {
        backgroundColor: COLORS.red,
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        borderWidth: 2.25,
        borderStyle: "solid",
        borderColor: COLORS.white,
        borderRadius: 60,
        position: "absolute",
        right: -6,
        top: -6
    },
    indicatorText: {
        fontSize: 11,
        color: COLORS.white
    }
})