import type { ViewStyle } from "react-native"
import type { ImageStyle } from "expo-image"


export interface AvatarWithIndicatorProps {
    originalImagePath: string | undefined
    compressedImagePath: string | undefined
    isOnline: boolean
    styles?: ViewStyle
    imageStyles?: ImageStyle
    indicatorStyles?: ViewStyle
}