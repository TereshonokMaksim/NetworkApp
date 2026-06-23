import type { ViewStyle } from "react-native"
import type { ImageStyle } from "expo-image"


export type AvatarWithIndicatorProps = {
    originalImagePath: string | undefined | null
    compressedImagePath: string | undefined | null
    styles?: ViewStyle
    imageStyles?: ImageStyle
    indicatorStyles?: ViewStyle
} & ({
    isOnline: boolean 
} | {
    isOnline: "auto",
    userId: number
})