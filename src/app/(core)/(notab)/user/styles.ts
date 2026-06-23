import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";


export const styles = StyleSheet.create({
    profBlock: {
        marginTop: 10,
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        borderRadius: 10,
        gap: 16,
        borderStyle: "solid"
    },
    header: {
        width: "100%",
        paddingRight: 40
    },
    profileBlock: {
        width: "100%",
        alignItems: "center",
        gap: 24
    },
    textProf: {
        width: "100%",
        alignItems: "center",
        gap: 10
    },
    name: {
        fontFamily: "GTWP Bold",
        fontSize: 24,
        color: COLORS.blue
    },
    username: {
        fontFamily: "GTWP Bold",
        fontSize: 16,
        color: COLORS.blue
    },
    statsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        height: 48
    },
    statItem: {
        flex: 1,
        gap: 7,
        alignItems: 'center'
    },
    statNumber: {
        color: COLORS.blue,
        fontFamily: "GTWP Bold",
        fontSize: 20,
    },
    statLabel: {
        color: COLORS.blue50,
        fontFamily: "GTWP Medium",
        fontSize: 16
    },
    verticalLine: {
        width: 1,
        height: "100%",
        backgroundColor: COLORS.blue50
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        width: "100%"
    },
    section: {
        marginTop: 10,
        padding: 16,
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        borderRadius: 10,
        gap: 16,
        borderStyle: "solid"
    },
    sectionHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sectionStart: {
        flexDirection: "row",
        gap: 8,
        height: "100%",
        alignItems: "center"
    },
    sectionTitle: {
        color: COLORS.blue50,
        fontSize: 20,
        fontFamily: "GTWP Medium"
    },
    showAll: {
        color: COLORS.plum,
        fontSize: 16,
        fontFamily: "GTWP Medium"
    },
    addText: {
        fontSize: 20,
        width: "100%",
        color: COLORS.blue50,
        fontFamily: "GTWP Regular",
        textAlign: "center",
        paddingTop: 20
    },
    horizLine: {
        width: "95%",
        backgroundColor: COLORS.blue50,
        height: 1
    },
    noAlbums: {
        fontSize: 16,
        color: COLORS.blue50,
        fontFamily: "GTWP Medium"
    },
    noAlbumsColor: {
        color: COLORS.blue50
    }
}) 