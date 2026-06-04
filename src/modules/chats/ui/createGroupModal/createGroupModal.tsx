import { View, Modal, TouchableOpacity, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Image } from "expo-image"
import { Button } from "../../../../shared/ui/button";
import { COLORS } from "../../../../shared/constants/colors";
import { useState } from "react";


export type CreateGroupModalProps = {
    modalVisible: boolean,
    closeModal: () => void,
    onClose: () => void
}
interface tdt {
    name: string
    avatar: string
}

const data: tdt[] = [{
        name: "Aeslie Alexander",
        avatar: "https://picsum.photos/seed/213/300"
    },{
        name: "AAA Alexander",
        avatar: "https://picsum.photos/seed/223/300"
    },{
        name: "Not him",
        avatar: "https://picsum.photos/seed/2421/300"
    },
]

export function CreateGroupModal(props: CreateGroupModalProps){
    const { modalVisible, closeModal, onClose } = props
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    function getAutoAvatar(){
        const i = name.trim()
        function onlyCapitalLetters(str: string) {
            return str.replace(/[^A-Z]+/g, "");
        }
        if (i.length < 1){
            return "NG"
        }
        if (i.split(" ").length > 1){
            const n = i.toUpperCase().split(" ")
            return n[0][0] + n[1][0]
        }
        if (i.split("_").length > 1){
            const n = i.toUpperCase().split("_")
            return n[0][0] + n[1][0]
        }
        if (onlyCapitalLetters(i).length > 1){
            return onlyCapitalLetters(i).substring(0, 2)
        }
        return i[0]
    }
    return (
        <Modal
            visible={modalVisible}
            animationType="none"
            transparent={true}
            onRequestClose={() => {
                closeModal();
                onClose()
            }}
            statusBarTranslucent>
            <View style = {styles.modalBg}>
                <View style = {styles.modalWin}>
                    <View style = {styles.crossReplace}>
                        <Icons.CrossIcon onPress = {closeModal}/>
                    </View>
                    <Text style = {styles.modalTitle}>Нова група</Text>
                    <View style = {styles.inputModal}>
                        <Text style = {styles.modalLabel}>
                            Назва
                        </Text>
                        <TextInput style = {styles.modalInput} placeholderTextColor = {COLORS.blue10} onChangeText = {setName} value = {name}/>
                    </View>
                    <View style = {styles.imageModal}>
                        {image.length > 4 ? 
                            <Image source = "https://picsum.photos/seed/242121/300" style = {styles.modalAva}/>
                            : <View style = {styles.autoGroupAvatar}><Text style = {styles.autoGroupAvatarText}>{getAutoAvatar()}</Text></View>}
                        <View style = {styles.modalAvaButtons}>
                            <TouchableOpacity style = {styles.modalButton}>
                                <Icons.PlusIcon color={COLORS.plum}/>
                                <Text style = {styles.buttText}>Додати фото</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.modalButton}>
                                <Icons.GaleryIcon color={COLORS.plum}/>
                                <Text style = {styles.buttText}>Оберіть фото</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {styles.modalMembers}>
                        <View style = {styles.modalMemTop}>
                            <Text style = {styles.modalMemTitle}>Учасники</Text>
                            <TouchableOpacity style = {styles.modalButton}>
                                <Icons.PlusIcon color={COLORS.plum}/>
                                <Text style = {styles.buttText}>Додайте учасника</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {styles.modalButtonsAll}>
                        <Button variant = "secondary" title = "Назад" bordersOn = {true} paddingVar="small" onPress = {closeModal}/>
                        <Button variant = "primary" title = "Створити групу" bordersOn = {false} paddingVar="small"/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}