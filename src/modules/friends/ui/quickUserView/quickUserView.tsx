import { AvatarWithIndicator } from "../../../../shared/ui/avatar-with-indicator";
import { Button } from "../../../../shared/ui/button";
import { View, Text } from "react-native";
import type { QuickUserViewProps } from "./quick-user-view.types";
import { stylesBase } from "./quick-user-view.styles";


export function QuickUserView(props: QuickUserViewProps) {
	const { profile, actionOnProceed, actionText } = props;

	return (
		<View style = {stylesBase.wholeQuickView}>
			<View style = {stylesBase.quickTopView}>
				<AvatarWithIndicator
					originalImagePath={profile.avatar}
					compressedImagePath={profile.avatar}
					isOnline={false}
                    styles={{width: 96, height: 96}}
				/>
				<View style = {stylesBase.quickTopTextual}>
                    <Text style = {stylesBase.quickTopPseudonym}>
                        {profile.user.username}
                    </Text>
                    <Text style = {stylesBase.quickTopUsername}>
                        {profile.preudonym}
                    </Text>
                </View>
			</View>
			<View style = {stylesBase.quickBottomButtons}>
                <Button variant = "primary" paddingVar = "small" title = {actionText}  onPress = {() => {actionOnProceed(profile.id)}}/>
                <Button variant = "secondary" paddingVar = "small" title = "Видалити"/>
            </View>
		</View>
	);
}
