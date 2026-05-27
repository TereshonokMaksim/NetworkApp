import { View } from "react-native";
import { Image } from "expo-image";
import type { AvatarWithIndicatorProps } from "./avatar-with-indicator.types";
import { stylesBase } from "./avatar-with-indicator.styles";
import { useRouter } from "expo-router";


export function AvatarWithIndicator(props: AvatarWithIndicatorProps) {
	const {
		originalImagePath,
		compressedImagePath,
		isOnline,
		styles,
		imageStyles,
		indicatorStyles,
	} = props;

	return (
		<View style={[stylesBase.imageBlock, styles]}>
			<Image
				source={originalImagePath ? originalImagePath : require("../../../assets/images/defaultAva.png")}
				placeholder={(compressedImagePath == originalImagePath && !compressedImagePath) ? require("../../../assets/images/defaultAva.png") : compressedImagePath}
				style={[stylesBase.avatarImage, imageStyles]}
			/>
			<View style = {[
                stylesBase.avatarIndicator,
                isOnline ? stylesBase.indicatorOnline : stylesBase.indicatorOffline,
                indicatorStyles
            ]}/>
		</View>
	);
}
