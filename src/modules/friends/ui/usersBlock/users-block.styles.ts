import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";


export const stylesBase = StyleSheet.create({
    blockWhole: {
        width: "100%",
        backgroundColor: COLORS.white,
        gap: 16,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        borderStyle: "solid"
    },
    blockTop: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    blockName: {
        fontFamily: "GTWP Medium",
        fontWeight: 500,
        fontSize: 16,
        color: COLORS.blue
    },
    blockLookAll: {
        fontFamily: "GTWP Medium",
        fontWeight: 500,
        fontSize: 16,
        color: COLORS.plum
    },
    blockList: {
        width: "100%",
        gap: 8
    }
})