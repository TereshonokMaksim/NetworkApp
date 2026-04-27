import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";


export const styles = StyleSheet.create({
    albumWhole: {
        width: "100%",
        borderColor: COLORS.blue50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        gap: 16,
        backgroundColor: COLORS.white,
        position: "relative"
    },
    albumTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    },
    albumName: {
        fontSize: 16,
        color: COLORS.blue,
        fontFamily: "GTWP Medium"
    },
    albumRight: {
        alignItems: "center",
        gap: 24,
        flexDirection: "row"
    },
    albumDot: {
        fontSize: 24,
        color: COLORS.blue50,
        fontFamily: "GTWP Bold"
    },
    albumMiddle: {
        gap: 16,
        flexDirection: "row"
    },
    tagNameAlbum: {
        color: COLORS.blue,
        fontSize: 16
    },
    yearAlbum: {
        color: COLORS.blue50,
        fontSize: 16
    },
    albumBorder: {
        width: "100%",
        height: 1,
        backgroundColor: COLORS.blue20
    },
    albumPhotoTitle: {
        fontSize: 16,
        fontFamily: "GTWP Medium",
        color: COLORS.blue
    },
    albumImagesArea: {
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 30
    },
    albumCreateImageZone: {
        marginTop: 10,
        width: 162,
        height: 162,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: COLORS.blue50,
        alignItems: "center",
        justifyContent: "center"
    },
    albumImageWhole: {
        marginTop: 10,
        width: 162,
        height: 162,
        position: "relative",
        borderRadius: 10
    },
    albumImageImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 10
    },
    albumImageControl: {
        position: "absolute",
        bottom: 10,
        right: 10,
        gap: 10,
        flexDirection: "row"
    },
    albumMiddleGapper: {
        gap: 16,
        width: "100%"
    }
})


export const modalStyles = StyleSheet.create({
    dropdown: {
        height: 42,
        borderColor: COLORS.blue50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        width: "100%"
    },
    selectView: {
        gap: 6,
        width: "100%"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    placeholder: {
        fontFamily: "GTWP Regular",
        fontSize: 16,
        color: COLORS.blue50,
    },
    selectedText: {
        fontFamily: "GTWP Regular",
        fontSize: 16,
        color: COLORS.blue,
    },
    inputSearch: {
        fontFamily: "GTWP Regular",
        fontSize: 16,
        color: COLORS.blue,
        borderRadius: 8,
    },
    modalLayerBG: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalWindow: {
        width: 375,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 44,
        backgroundColor: COLORS.white
    },
    crossView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "GTWP Medium",
        fontSize: 34,
        color: COLORS.blue
    },
    inputBox: {
        paddingVertical: 20,
        gap: 16,
        alignItems: "center"
    },
    buttonBox: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10
    }
})

export const createStyles = StyleSheet.create({
    mainBlock: {
        width: "100%",
        padding: 16,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderColor: COLORS.blue20,
        borderWidth: 1,
        borderStyle: "solid",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        zIndex: 1000
    },
    mainBlockText: {
        fontFamily: "GTWP Medium",
        fontSize: 16,
        color: COLORS.blue,
        textAlign: "center",
        height: 18
    }
})

export const genericStyles = StyleSheet.create({
    all: {
        flexDirection: "column",
        gap: 8,
        width: "100%",
        paddingBottom: 65,
        marginTop: 20
    }
})

export const editSubWindowStyles = StyleSheet.create({
    subWhole: {
        width: 343,
        padding: 16,
        gap: 16,
        backgroundColor: COLORS.plum50,
        borderRadius: 10,
        position: "absolute",
        top: 10,
        right: 0,
        zIndex: 10
    },
    tripleDotContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    subMainButton: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    subMainButtonText: {
        fontSize: 16,
        color: COLORS.blue,
        fontFamily: "GTWP Medium"
    },
    subMainBorder: {
        backgroundColor: COLORS.blue50,
        width: "100%",
        height: 1
    }
})