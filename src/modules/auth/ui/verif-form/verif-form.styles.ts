import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";
// import { Fonts } from "../../../../shared/constants/fonts"


export const styles = StyleSheet.create({
    mainForm: {
        paddingHorizontal: 16,
        paddingVertical: 44,
        backgroundColor: COLORS.white,
        gap: 36,
        flexDirection: "column",
        alignItems: "center",
        width: 343,
        borderRadius: 20,
        marginTop: -60
    },
    formTitle: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "GTWP Medium",
        fontWeight: 500,
        color: COLORS.blue
    },
    formText: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: "GTWP Medium",
        fontWeight: 500,
        color: COLORS.blue,
        maxWidth: 311
    },
    formInputs: {
        width: 311,
        gap: 16,
        flexDirection: "column"
    },
    inputsName: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "GTWP Regular",
        fontWeight: 500,
        color: COLORS.blue,
        maxWidth: 311
    },
    inputsPlace: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    doubleInput: {
        flexDirection: "row",
        gap: 8
    },
    inputItself: {
        color: "#000",
        backgroundColor: COLORS.white,
        borderColor: COLORS.blue20,
        borderRadius: 10,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})