import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 140,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    actions: {
        position: "absolute",
        bottom: 8,
        right: 8,
        flexDirection: "row",
        gap: 8,
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#fff",
    },
});