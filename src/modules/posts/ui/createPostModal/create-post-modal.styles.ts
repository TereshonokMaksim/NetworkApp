import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";

export const stylesModal = StyleSheet.create({
    overallBG: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    scrollWrapLimiter: {
        backgroundColor: COLORS.white,
        width: "95%",
        minHeight: 400,
        maxHeight: 800,
        borderRadius: 20
    },
    modalBG: {
        backgroundColor: COLORS.white,
        width: "100%",
        borderRadius: 20
    },
    modalContainerBG: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 24,
        gap: 16
    },
    modalTop: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    modalTitle: {
        fontFamily: "GTWP Medium",
        fontSize: 24, 
        color: COLORS.blue
    },
    tagBlock: {
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10
    },
    tagPlaceholder: {
        fontFamily: "GTWP Regular",
        fontSize: 16,
        color: COLORS.blue,
    },
    areaTextModal: {
        width: "100%",
        borderRadius: 10,
        maxHeight: 120,
        padding: 12,
        borderColor: COLORS.blue20,
        borderWidth: 1,
        borderStyle: "solid",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    areaTextInput: {
        fontFamily: "GTWP Regular",
        color: COLORS.blue,
        fontSize: 16,
        width: "100%"
    },
    tagsAreaModal: {
        fontFamily: "GTWP Regular",
        color: COLORS.plum,
        fontSize: 16,
        width: "100%",
        marginTop: -10
    },
    linksBlockFull: {
        width: "100%",
        gap: 16
    },
    linksLabel: {
        fontFamily: "GTWP Regular",
        color: COLORS.blue,
        fontSize: 16
    },
    linksBlock: {
        width: "100%",
        flexDirection: "row",
        gap: 10,
        alignItems: 'center'
    },
    linksInput: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: COLORS.blue50,
        fontSize: 16,
        fontFamily: "GTWP Regular",
        color: COLORS.blue,
        paddingVertical: 10,
        paddingHorizontal: 16
    },
    imagesBlock: {
        width: "100%",
        gap: 16
    },
    bottomButtonsBlock: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    submitButton: {
        borderRadius: 1234,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: COLORS.plum,
        gap: 8,
        flexDirection: "row"
    },
    submitButtonText: {
        fontFamily: "GTWP Medium",
        color: COLORS.white,
        fontSize: 16
    }
})

export const stylesImage = StyleSheet.create({
    wholeImage: {
        width: "100%",
        height: 225,
        borderRadius: 16,
        position: "relative"
    },
    imageItself: {
        flex: 1,
        borderRadius: 16,
        objectFit: "cover"
    },
    buttonBlock: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})

export const stylesTag = StyleSheet.create({
    baseTagBg: {
        padding: 6,
        borderRadius: 6,
        backgroundColor: COLORS.plum50
    },
    tagText: {
        fontFamily: "GTWP Regular",
        fontSize: 14,
        color: COLORS.plum
    },
    selectedTagBg: {
        backgroundColor: COLORS.plum
    },
    selectedTagText: {
        color: COLORS.white
    }
})

export const stylesLink = StyleSheet.create({

})