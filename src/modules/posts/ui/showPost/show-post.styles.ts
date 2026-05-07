import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";


export const styles = StyleSheet.create({
    postWhole: {
        width: "96%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: COLORS.blue20,
        borderRadius: 10,
        backgroundColor: COLORS.white
    },
    postHeader: {
        padding: 16,
        gap: 8,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: COLORS.blue20,
        width: "100%"
    },
    postHeaderHead: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    },
    postHeaderLeft: {
        gap: 10,
        alignItems: "center",
        flexDirection: "row"
    },
    postHeaderAva: {
        width: 46,
        height: 46,
        borderRadius: 23
    },
    postHeaderUsername: {
        fontFamily: "GTWP Medium",
        color: COLORS.blue,
        fontSize: 14
    },
    postBody: {
        padding: 16,
        gap: 16,
        width: "100%"
    },
    postTitle: {
        fontFamily: "GTWP Medium",
        color: COLORS.blue,
        fontSize: 16,
    },
    descBlock: {
        flexDirection: "column",
        gap: 0,
        width: "100%"
    },
    postText: {
        fontFamily: "GTWP Regular",
        color: COLORS.blue,
        fontSize: 14
    },
    postTags: {
        width: "100%",
        gap: 4,
        flexDirection: "row"
    },
    postTagEl: {
        fontFamily: "GTWP Regular",
        color: COLORS.plum,
        fontSize: 14
    },
    imageBlock: {
        width: "100%",
        paddingHorizontal: 16,
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 20
    },
    postImage: {
        minWidth: "42%",
        maxWidth: "80%",
        height: 203,
        borderRadius: 16
    },
    linksBlock: {
        gap: 4
    },
    link: {
        fontSize: 16,
        color: COLORS.plum, 
        fontFamily: "GTWP Regular"
    },
    descBlockFull: {
        gap: 0
    },
    infoPart: {
        flexDirection: "row",
        gap: 8,
        alignItems: 'center'
    },
    infoText: {
        color: COLORS.blue,
        fontFamily: "GTWP Regular",
        fontSize: 15
    },
    footerTop: {
        gap: 16,
        flexDirection: "row"
    },
    footerInfo: {
        gap: 16
    }
})

export const imageListStyles = StyleSheet.create({
    list: {
        gap: 8
    },
    block: {
        width: "100%",
        gap: 8,
        flexDirection: "row",
        maxHeight: 200,
        justifyContent: "center"
    },
    image: {
        flex: 1,
        borderRadius: 16,
        height: 200,
        maxWidth: "80%"
    }
})