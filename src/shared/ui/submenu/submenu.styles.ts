import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    submenu: {
        marginTop: 23.75,
        marginLeft: 16.33,
        flexDirection: "row",
        gap: 16,
        backgroundColor: "#FAF8FF",
        marginBottom: 10
    },
    submenuReversed: {
        paddingTop: 23.75,
        paddingLeft: 26,
        paddingRight: 26,
        flexDirection: "row",
        gap: 16,
        backgroundColor: "white",
        marginBottom: 10,
        width: "100%",
        justifyContent: "space-between"
    },
    textBase: {
        borderWidth: 0,
        fontSize: 16,
        minHeight: 26,
        maxHeight: 26,
        fontFamily: "GTWP Medium",
        color: COLORS.blue50
    },
    textBaseReversed: {
        borderWidth: 0,
        fontSize: 16,
        minHeight: 26,
        maxHeight: 26,
        fontFamily: "GTWP Medium",
        color: COLORS.blue
    },
    textActivated: {
        display: 'flex',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        minHeight: 26,
        maxHeight: 26,
        fontSize: 16,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: COLORS.plum,
        fontFamily: "GTWP Bold",
        color: COLORS.plum
    },
    textActivatedReversed: {
        display: 'flex',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        minHeight: 26,
        maxHeight: 26,
        fontSize: 16,
        fontFamily: "GTWP Bold",
        color: COLORS.blue
    },
    reversedActiveLink: {
        borderColor: COLORS.plum,
    },
    reversedLink: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 8,
        borderTopWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent"
    }
})