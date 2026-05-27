import type { ViewStyle } from "react-native"
import type { ImageStyle } from "expo-image"


export interface AvatarWithIndicatorProps {
    originalImagePath: string | undefined | null
    compressedImagePath: string | undefined | null
    isOnline: boolean
    styles?: ViewStyle
    imageStyles?: ImageStyle
    indicatorStyles?: ViewStyle
}