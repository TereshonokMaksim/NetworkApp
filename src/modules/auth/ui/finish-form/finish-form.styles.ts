import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";
// import { Fonts } from "../../../../shared/constants/fonts"


export const styles = StyleSheet.create({
    bgBlur: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "#00000044",
        zIndex: 999,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 200
    },
    mainForm: {
        paddingHorizontal: 16,
        paddingVertical: 44,
        backgroundColor: COLORS.white,
        gap: 24,
        flexDirection: "column",
        alignItems: "center",
        width: 343,
        borderRadius: 20,
        marginTop: 40
    },
    formTop: {
        flexDirection: "row",
        gap: 24
    },
    formHeaderLink: {
        height: 35,
        fontFamily: "GTWP Medium",
        color: COLORS.blue50,
        fontSize: 22,
        textAlign: "center",
        width: 137
    },
    formHeaderActive: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.plum,
        borderStyle: "solid",
        fontFamily: "GTWP Bold",
        color: COLORS.blue
    },
    formTitle: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "GTWP Medium",
        fontWeight: 500,
        color: COLORS.blue
    },
    formInputs: {
        width: 311,
        gap: 16,
        flexDirection: "column"
    },
    buttonRight: {
        width: "100%",
        alignItems: "flex-end"
    },
    textLol: {
        maxWidth: "100%",
        fontSize: 12,
        fontFamily: "GTWP Regular"
    },
    greenLol: {
        maxWidth: "100%",
        fontSize: 12,
        fontFamily: "GTWP Regular",
        color: "#22C55E"
    }
})