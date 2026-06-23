import { AvatarWithIndicator } from "../../../../shared/ui/avatar-with-indicator";
import { Button } from "../../../../shared/ui/button";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import type { QuickUserViewProps } from "./quick-user-view.types";
import { stylesBase } from "./quick-user-view.styles";
import { useRouter } from "expo-router";
import { useState } from "react";


export function QuickUserView(props: QuickUserViewProps) {
	const { profile, actionOnProceed, actionOnDelete, actionText, notAutoThrow } = props;
    const [ visible, setVisible ] = useState(false)
    const [killed, setKilled] = useState(false)
    const router = useRouter()
    if (killed){
        return
    }
	return (
		<View style = {stylesBase.wholeQuickView}>
			<TouchableOpacity style = {stylesBase.quickTopView} onPress = {() => {router.push(`user/${profile.id}`)}}>
				<AvatarWithIndicator
					originalImagePath={profile.avatar}
					compressedImagePath={profile.avatar}
					isOnline={false}
                    styles={{width: 96, height: 96}}
				/>
				<View style = {stylesBase.quickTopTextual}>
                    <Text style = {stylesBase.quickTopPseudonym}>
                        {profile.username}
                    </Text>
                    <Text style = {stylesBase.quickTopUsername}>
                        {profile.pseudonym}
                    </Text>
                </View>
			</TouchableOpacity>
			<View style = {stylesBase.quickBottomButtons}>
                <Button variant = "primary" paddingVar = "small" title = {actionText} onPress = {() => {actionOnProceed(profile.id); !notAutoThrow && router.push(`user/${profile.id}`)}}/>
                <Button variant = "secondary" paddingVar = "small" title = "Видалити" onPress = {() => {setVisible(true)}}/>
            </View>
            <Modal
                visible={visible}
                animationType="none"
                transparent={true}
                onRequestClose={() => {
                    setVisible(false)
                }}
                statusBarTranslucent
            >
                <View style = {stylesBase.modalBg}>
                    <View style = {stylesBase.modal}>
                        <Text style = {stylesBase.modalTitle}>
                            Підтвердити дію
                        </Text>
                        <Text style = {stylesBase.modalDesc}>  
                            Ви дійсно хочете видалити користувача?
                        </Text>
                        <View style = {stylesBase.modalButtonBox}>
                            <Button title = "Скасувати" paddingVar = "small" variant = "secondary" bordersOn = {true} onPress = {() => {setVisible(false)}}/>
                            <Button title = "Підтвердити" paddingVar = "small" variant = "primary" bordersOn = {true} onPress = {() => {setVisible(false); actionOnDelete(profile.id); setKilled(true)}}/>
                        </View>
                    </View>
                </View>
            </Modal>
		</View>
	);
}
