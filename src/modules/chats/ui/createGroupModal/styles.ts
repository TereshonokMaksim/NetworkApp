import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";


export const styles = StyleSheet.create({
    modalBg: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    modalWin: {
        width: "98%",
        backgroundColor: COLORS.white,
        paddingVertical: 44,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignItems: "center",
        gap: 24
    },
    crossReplace: {
        width: "100%",
        alignItems: "flex-end"
    },
    modalTitle: {
        color: COLORS.blue,
        fontSize: 34,
        fontFamily: "GTWP Medium"
    },
    inputModal: {
        width: "100%",
        gap: 6
    },
    modalLabel: {
        fontSize: 16,
        fontFamily: "GTWP Regular",
        color: COLORS.blue
    },
    modalInput: {
        boxSizing: "border-box",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        borderStyle: "solid",
        fontSize: 16,
        fontFamily: "GTWP Regular",
        color: COLORS.blue
    },
    imageModal: {
        alignItems: "center",
        gap: 24
    },
    modalAva: {
        width: 46,
        height: 46,
        borderRadius: 23
    },
    autoGroupAvatar: {
        width: 46,
        height: 46,
        backgroundColor: COLORS.plum,
        borderRadius: 23,
        alignItems: "center",
        justifyContent: "center"
    },
    autoGroupAvatarText: {
        fontFamily: "GTWP Medium",
        fontSize: 16,
        color: COLORS.white,
    },
    modalAvaButtons: {
        alignItems: "center",
        gap: 24,
        flexDirection: "row"
    },
    modalButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    buttText: {
        color: COLORS.plum,
        fontSize: 16,
        fontFamily: "GTWP Medium"
    },
    modalMembers: {
        width: "100%",
        borderRadius: 6,
        borderWidth: 1,
        gap: 16,
        borderStyle: "solid",
        borderColor: COLORS.blue20,
        padding: 16
    },
    modalMemTop: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalMemTitle: {
        color: COLORS.blue,
        fontSize: 16,
        fontFamily: "GTWP Regular"
    },
    modalButtonsAll: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 16
    }
})