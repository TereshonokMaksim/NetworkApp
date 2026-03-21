import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    headerBar: {
        width: "100%",
        flexDirection: "row",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: "center",
        justifyContent: "space-between"
    },
    "headerImage": {
        width: 145,
        height: 18,
        objectFit: "contain"
    },
    "headerRight": {
        flexDirection: "row",
        gap: 10
    }
})