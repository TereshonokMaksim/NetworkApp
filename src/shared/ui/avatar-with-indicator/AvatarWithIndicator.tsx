import { View } from "react-native";
import { Image } from "expo-image";
import type { AvatarWithIndicatorProps } from "./avatar-with-indicator.types";
import { stylesBase } from "./avatar-with-indicator.styles";
import { useRouter } from "expo-router";
import { BACK_HOST } from "../../constants/api-data";
import { useFriendContext } from "../../context/friends/friends.context";
import { useEffect, useState } from "react";


export function AvatarWithIndicator(props: AvatarWithIndicatorProps) {
	const {
		originalImagePath,
		compressedImagePath,
		isOnline,
		styles,
		imageStyles,
		indicatorStyles,
	} = props;

	const { contactsUserIds } = useFriendContext()
	const [currentlyOnline, setCurrentlyOnline] = useState(false)
	function getOnline(){
		if (props.isOnline === "auto"){
			const userId = props.userId
			if (contactsUserIds.has(userId)){
				setCurrentlyOnline(contactsUserIds.get(userId)!)
			}
		}
		else {
			setCurrentlyOnline(props.isOnline)
		}
	}
	useEffect(getOnline, [contactsUserIds])
	return (
		<View style={[stylesBase.imageBlock, styles]}>
			<Image
				source={originalImagePath ? `${BACK_HOST}/media/thumbnail/${originalImagePath}` : require("../../../assets/images/defaultAva.png")}
				placeholder={(compressedImagePath == originalImagePath && !compressedImagePath) ? require("../../../assets/images/defaultAva.png") : compressedImagePath}
				style={[stylesBase.avatarImage, imageStyles]}
			/>
			<View style = {[
                stylesBase.avatarIndicator,
                currentlyOnline ? stylesBase.indicatorOnline : stylesBase.indicatorOffline,
                indicatorStyles
            ]}/>
		</View>
	);
}
