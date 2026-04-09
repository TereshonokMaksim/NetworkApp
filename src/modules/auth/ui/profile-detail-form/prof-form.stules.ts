import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";
import { Fonts } from "../../../../shared/constants/fonts";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    },
    mainForm: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: COLORS.white,
        width: 343,
        borderRadius: 20,
        alignItems: 'center',
    },
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
        fontWeight: "500",
        color: COLORS.blue
    },
    formInputs: {
        width: 311,
        gap: 16,
        flexDirection: "column"
    },
    submitButton: {
        width: 311,
        height: 56,
        backgroundColor: COLORS.plum,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    submitButtonText: {
        color: COLORS.white,
        fontFamily: "GTWP Bold",
        fontSize: 16
    }
});