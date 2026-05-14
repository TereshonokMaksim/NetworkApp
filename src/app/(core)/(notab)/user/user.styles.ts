import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 10,
    },

    back: {
        fontSize: 24,
        color: "#000",
    },

    profileBlock: {
        alignItems: "center",
        paddingHorizontal: 20,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },

    name: {
        marginTop: 12,
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
    },

    username: {
        marginTop: 4,
        fontSize: 14,
        color: "#777",
    },

    statsContainer: {
        flexDirection: "row",
        marginTop: 24,
        width: "100%",
        justifyContent: "space-around",
    },

    statItem: {
        alignItems: "center",
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },

    statLabel: {
        marginTop: 4,
        fontSize: 13,
        color: "#888",
    },

    buttonsContainer: {
        flexDirection: "row",
        marginTop: 24,
        gap: 12,
    },

    followButton: {
        backgroundColor: "#5B3A5E",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },

    followButtonText: {
        color: "#FFF",
        fontWeight: "600",
    },

    messageButton: {
        borderWidth: 1,
        borderColor: "#5B3A5E",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },

    messageButtonText: {
        color: "#5B3A5E",
        fontWeight: "600",
    },

    section: {
        marginTop: 30,
        paddingHorizontal: 16,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },

    showAll: {
        color: "#5B3A5E",
        fontSize: 14,
    },

    albumTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#070A1C",
    },

    albumDate: {
        marginTop: 4,
        marginBottom: 12,
        color: "#81818D",
    },

    albumImage: {
        width: "100%",
        height: 180,
        borderRadius: 16,
    },

    post: {
        marginTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    postAvatar: {
        width: 46,
        height: 46,
        borderRadius: 18,
        marginRight: 10,
    },
});