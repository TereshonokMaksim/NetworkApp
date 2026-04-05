import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
	buttonPrim: {
		backgroundColor: COLORS.plum,
		borderRadius: 1234,
		alignItems: "center",
		justifyContent: "center"
	},
	textPrim: {
		fontSize: 16,
		color: COLORS.white,
		textAlign: "center",
		fontWeight: 500,
        fontFamily: "GTWP Medium"
	},
    buttonSec: {
		backgroundColor: "transparent",
		borderRadius: 1234,
		alignItems: "center",
		justifyContent: "center"
    },
    textSec: {
		fontSize: 16,
		color: COLORS.plum,
		textAlign: "center",
		fontWeight: 500,
        fontFamily: "GTWP Medium"
    },
    buttonBigPadding: {
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    buttonSmallPadding: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    bordersON: {
        borderColor: COLORS.plum,
        borderWidth: 1,
        borderStyle: "solid"
    }
});