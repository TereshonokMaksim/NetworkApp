import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";


export const stylesBase = StyleSheet.create({
    wholeQuickView: {
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        gap: 16,
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: COLORS.blue20
    },
    quickTopView: {
        width: "100%",
        alignItems: "center",
        gap: 24
    },
    quickTopTextual: {
        width: "100%",
        gap: 10,
        alignItems: "center"
    },
    quickTopPseudonym: {
        fontFamily: "GTWP Bold",
        fontWeight: 700,
        fontSize: 24,
        color: COLORS.blue
    },
    quickTopUsername: {
        fontFamily: "GTWP Medium",
        fontWeight: 500,
        fontSize: 16,
        color: COLORS.blue
    },
    quickBottomButtons: {
        width: "100%",
        flexDirection: "row",
        gap: 16,
        justifyContent: "center"
    },
    modalBg: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 44,
        gap: 36,
        borderRadius: 20,
        alignItems: "center",
        width: 343
    },
    modalTitle: {
        fontFamily: "GTWP Medium",
        color: COLORS.blue,
        fontSize: 24
    },
    modalDesc: {
        fontFamily: "GTWP Regular",
        color: COLORS.blue,
        fontSize: 16
    },
    modalButtonBox: {
        width: "100%",
        flexDirection: "row",
        gap: 16,
        justifyContent: "flex-end"
    }   
})