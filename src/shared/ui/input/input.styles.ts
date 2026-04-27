
import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    inputWrapperGen: {
        flexDirection: "column",
        gap: 6
    },
	label: {
		fontSize: 16,
		color: COLORS.blue,
		fontWeight: 400,
	},
	inputContainer: {
		width: "100%",
		paddingHorizontal: 16,
        paddingVertical: 0,
		backgroundColor: COLORS.white,
        borderColor: COLORS.blue20,
        borderWidth: 1,
		borderRadius: 10,
        borderStyle: "solid",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
	},
	errorContainer: {
		flexDirection: "row",
		gap: 2,
		alignItems: "center",
	},
	input: {
		color: "#000",
		flex: 1,
		fontSize: 16,
        fontFamily: "GTWP Regular"
	},
	errorText: {
		color: "#ff0000",
	},
	passwordButton: {
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	inactiveInput: {
		borderColor: COLORS.blue50,
		color: COLORS.blue50
	},
	inactiveLabel: {
		color: COLORS.blue50
	},
});