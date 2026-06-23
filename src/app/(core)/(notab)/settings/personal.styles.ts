import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";
// import { Fonts } from "../../../../shared/constants/fonts"


export const styles = StyleSheet.create({
    fullBlock: {
        backgroundColor: "#fff",
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CDCED2",
        paddingHorizontal: 14,
        paddingVertical: 16,
        gap: 24
    },
    topBlock: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textOfBlock: {
        fontSize: 16,
        color: COLORS.blue,
        fontWeight: 500,
        fontFamily: "GTWP Medium"
    },
    blockRandomContainer: {
        width: "100%",
        gap: 24,
        alignItems: "center",
        flexDirection: "column"
    },
    blockTextRandom: {
        gap: 10,
        alignItems: "center",
        flexDirection: "column"
    },
    blockTextTop: {
        fontSize: 24,
        color: COLORS.blue,
        fontWeight: 700,
        fontFamily: "GTWP Bold"
    },
    blockTextHelp: {
        fontSize: 16,
        color: COLORS.blue,
        fontWeight: 700,
        fontFamily: "GTWP Medium"
    },
    blockContainer: {
        width: "100%",
        flexDirection: "column",
        gap: 16
    },
    filler: {
        height: 8
    },
    avaFill: {
        width: 96,
        height: 96,
        backgroundColor: COLORS.blue50,
        borderRadius: 999
    },
    avatarImage: {
        width: 96,
        height: 96,
        borderRadius: 100000000000
    },
    avaTitle: {
        fontFamily: "GTWP Regular",
        fontSize: 16,
        color: COLORS.blue
    },
    avatarChoose: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24
    },
    avaButton: {
        backgroundColor: "transparent",
        borderWidth: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    avaPlusBut: {
        fontFamily: "GTWP Bold",
        fontSize: 30,
        color: COLORS.plum
    },
    butText: {
        fontFamily: "GTWP Medium",
        fontSize: 16,
        color: COLORS.plum
    },
    avaFullBlock: {
        width: "100%",
        gap: 24,
        alignItems: "center",
        flexDirection: "column"
    }
})