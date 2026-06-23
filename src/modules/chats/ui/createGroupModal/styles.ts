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
    },


    inputModalBlock: {
        width: "100%",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderColor: COLORS.blue20,
        borderStyle: "solid",
        borderWidth: 1,
        paddingVertical: 0,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    modalInputText: {
        width: "100%",
        fontSize: 16,
        fontFamily: "GTWP Regular",
        color: COLORS.blue
    },
    selectedMembersNumber: {
        color: COLORS.blue50,
        fontFamily: "GTWP Medium",
        fontSize: 14
    },
    potMemberData: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center"
    },
    potMemberAva: {
        width: 46,
        height: 46,
        borderRadius: 23
    },
    potMemberName: {
        color: COLORS.blue,
        fontSize: 16,
        fontFamily: "GTWP Medium"
    },
    potMemberApprove: {
        borderRadius: 2,
        borderWidth: 2,
        borderColor: COLORS.plum,
        borderStyle: "solid",
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    potMember: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        marginTop: -1
    },
    selectedMembersNumberReplace: {
        width: "100%",
        alignItems: "flex-start"
    },
    potBorders: {
        borderBottomColor: COLORS.blue10,
        borderBottomWidth: 1,
        borderTopColor: COLORS.blue10,
        borderTopWidth: 1,
        borderStyle: "solid",
    }
})