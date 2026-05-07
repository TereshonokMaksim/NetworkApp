import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { styles } from "./personal.styles"
import { HeaderButton } from "../../../../shared/ui/header-button/HeaderButton";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Input } from "../../../../shared/ui/input/Input";
import { ScrollView } from "react-native";
import { useUserContext } from "../../../../shared/context";
import { router } from "expo-router";
import { pickImage } from "../../../../shared/tools/img-pick";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { COLORS } from "../../../../shared/constants/colors";
import { useModifyMutation } from "../../../../shared/api/api";
import { Image } from "expo-image"
import { BACK_HOST } from "../../../../shared/constants/api-data";


interface TopDataType {
    nickname: string | null
    avatar: string | null
}

interface MidDataType {
    name: string |  null,
    surname: string |  null,
    birthday: string |  null,
    email: string |  null
}

interface PassDataType {
    password: "********",
    passwordConf: ""
}

export default function PersonalInfoScreen(){
    const { user, isInited, setUser } = useUserContext()
    const [mod] = useModifyMutation()
    const { handleSubmit: handleSubmitTop, control: controlTop, setError: topSetError } = useForm({
        defaultValues: {
            nickname: user?.nickname ? user?.nickname : "",
            avatar: user?.avatarPath ? `${BACK_HOST}/media/${user.avatarPath}` : null
        },
    });
    const { handleSubmit: handleSubmitMid, control: controlMid, setError: midSetError } = useForm({
        defaultValues: {
            name: user?.name ? user?.name : "",
            surname: user?.surname ? user?.surname : "",
            birthday: user?.birthday ? user?.birthday : "",
            email: user?.email ? user?.email : ""
        },
    });     
    const { handleSubmit: handleSubmitPass, control: controlPass, setError: passSetError } = useForm({
        defaultValues: {
            password: "********",
            passwordConf: ""
        },
    });   
    
    const [topInputsUnlocked, setTopInputsUnlocked] = useState(false)
    const [midInputsUnlocked, setMidInputsUnlocked] = useState(false)
    const [passInputsUnlocked, setPassInputsUnlocked] = useState(false)
    const [bottomInputsUnlocked, bottomTopInputsUnlocked] = useState(false)

    if (!user){
        // if (isInited){
        //     router.push("user/login")
        // }
        return
    }
    async function topSubmit(data: TopDataType){
        if (!data.nickname){
            topSetError("nickname", {message: "Ім'я користувача обов'язкове"})
            return
        }
        setTopInputsUnlocked(false)
        const res = await mod({nickname: data.nickname, avatar: data.avatar ? data.avatar : null}).unwrap()
        setUser(res)
    }
    async function midSubmit(data: MidDataType){
        if (!data.name){
            midSetError("name", {message: "Ім'я обов'язкове"})
            return
        }
        if (!data.surname){
            midSetError("name", {message: "Прізвище обов'язкове"})
            return
        }
        if (!data.birthday){
            midSetError("name", {message: "День народження обов'язкове"})
            return
        }
        if (!data.email){
            midSetError("name", {message: "Електронна пошта обов'язкова"})
            return
        }
        setMidInputsUnlocked(false)
        const res = await mod({name: data.name, surname: data.surname, birthday: data.birthday, email: data.email}).unwrap()
        setUser(res)
    }

    return (
        <View style = {{backgroundColor: "#FAF8FF"}}>
            <Submenu
                links = {
                    [
                        {
                            name: "Особиста інформація",
                            href: "settings/personal"
                        },
                        {
                            name: "Альбоми",
                            href: "settings/albums"
                        }
                    ]
                }
            />
            <ScrollView style = {{flexDirection: "column", height: 700}}>
                <View style = {styles.fullBlock}>
                    <View style = {styles.topBlock}>
                        <Text style = {styles.textOfBlock}>
                            Картка профілю
                        </Text>
                        {topInputsUnlocked ? 
                            <HeaderButton label = "" text = "Зберегти" iconLeft = {<Icons.PencilIcon/>} style = {{backgroundColor: COLORS.plum50}}  onPress = {handleSubmitTop(topSubmit)}></HeaderButton>
                            :<HeaderButton label = "" iconLeft = {<Icons.PencilIcon/>} onPress = {() => {setTopInputsUnlocked(true)}}></HeaderButton>
                        }
                    </View>
                    <View style = {styles.blockRandomContainer}>
                        {topInputsUnlocked ? 
                            <Controller
                                control={controlTop}
                                name="avatar"
                                render = {({ field, fieldState }) => 
                                    <View style = {styles.avaFullBlock}>
                                        <Text style = {styles.avaTitle}>Оберіть або завантажте фото профілю</Text>
                                        <Image style = {styles.avatarImage} source = {field.value ? field.value : require("../../../../assets/images/defaultAva.png")}/>
                                        <View style = {styles.avatarChoose}>
                                            <TouchableOpacity style = {styles.avaButton}>
                                                <Text style = {styles.avaPlusBut}>+</Text>
                                                <Text style = {styles.butText}onPress={async () => {
                                                const result = await pickImage(false, {
                                                    selectionLimit: 1,
                                                    allowsMultipleSelection: false,
                                                    allowsEditing: false,
                                                    mediaTypes: "images",
                                                });
                                                if (result.status === "error") {
                                                    Alert.alert(
                                                        "Avatar upload failed",
                                                        result.message,
                                                    );
                                                    return;
                                                }
                                                const avatar = result.assets[0];
                                                field.onChange(avatar.uri);
                                            }}>Додайте фото</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style = {styles.avaButton}>
                                                <Icons.GaleryIcon/>
                                                <Text style = {styles.butText}>Оберіть фото</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            />
                        :(<Image style = {styles.avatarImage} source = {user.avatarPath ? `${BACK_HOST}/media/${user.avatarPath}` : require("../../../../assets/images/defaultAva.png")}/>)}
                        <View style = {styles.blockTextRandom}>
                            <Text style = {styles.blockTextTop}>{user.username}</Text>
                            {topInputsUnlocked ? 
                                <Controller
                                    control={controlTop}
                                    name="nickname"
                                    render = {({ field, fieldState }) => {
                                        return <View style = {{width: 300}}><Input
                                            
                                            placeholder="Ваше ім'я користувача"
                                            label="Ім'я користувача"
                                            autoCapitalize={"none"}
                                            autoCorrect={false}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value ? field.value : undefined}
                                            error={fieldState.error?.message}
                                        /></View>
                                    }}
                                />
                                :<Text style = {styles.blockTextHelp}>{user.nickname}</Text>
                            }
                        </View>
                    </View>
                </View>
                <View style = {styles.filler}></View>
                <View style = {styles.fullBlock}>
                    <View style = {styles.topBlock}>
                        <Text style = {styles.textOfBlock}>
                            Особиста інформація
                        </Text>
                        {midInputsUnlocked ? 
                            <HeaderButton label = "" text = "Зберегти" iconLeft = {<Icons.PencilIcon/>} style = {{backgroundColor: COLORS.plum50}}  onPress = {handleSubmitMid(midSubmit)}></HeaderButton>
                            :<HeaderButton label = "" iconLeft = {<Icons.PencilIcon/>} onPress = {() => {setMidInputsUnlocked(true)}}></HeaderButton>
                        }
                    </View>
                    <View style = {styles.blockContainer}>
                        <Controller
                            control={controlMid}
                            name="name"
                            disabled = {!midInputsUnlocked}
                            render = {({ field, fieldState }) => {
                                return <Input
                                    
                                    placeholder="Ваше ім'я"
                                    label="Ім'я"
                                    autoCapitalize={"words"}
                                    autoCorrect={false}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value ? field.value : undefined}
                                    error={fieldState.error?.message}
                                    editable = {midInputsUnlocked}
                                />}}
                        />
                        <Controller
                            control={controlMid}
                            name="surname"
                            disabled = {!midInputsUnlocked}
                            render = {({ field, fieldState }) => {
                                return <Input
                                    
                                    placeholder="Ваше прізвище"
                                    label="Прізвище"
                                    autoCapitalize={"words"}
                                    autoCorrect={false}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value ? field.value : undefined}
                                    error={fieldState.error?.message}
                                    editable = {midInputsUnlocked}
                                />}}
                        />
                        <Controller
                            control={controlMid}
                            name="birthday"
                            disabled = {!midInputsUnlocked}
                            render = {({ field, fieldState }) => {
                                return <Input
                                    placeholder="Ваша дата народження"
                                    label="Дата народження"
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value ? field.value : undefined}
                                    error={fieldState.error?.message}
                                    editable = {midInputsUnlocked}
                                />}}
                        />
                        <Controller
                            control={controlMid}
                            name="email"
                            disabled = {!midInputsUnlocked}
                            render = {({ field, fieldState }) => {
                                return <Input
                                    placeholder="Ваша електронна адреса"
                                    label="Електронна адреса"
                                    autoCapitalize={"words"}
                                    autoCorrect={false}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    autoComplete="email"
                                    value={field.value ? field.value : undefined}
                                    error={fieldState.error?.message}
                                    editable = {midInputsUnlocked}
                                />}}
                        />
                        <View style = {styles.topBlock}>
                            <Text style = {styles.textOfBlock}>
                                Пароль
                            </Text>
                            <HeaderButton label = "" iconLeft = {<Icons.PencilIcon/>}><Icons.PencilIcon/></HeaderButton>
                        </View>
                        <Input label="Пароль" placeholder="*****"/>
                    </View>
                </View>
                <View style = {styles.filler}></View>
                <View style = {styles.fullBlock}>
                    <View style = {styles.topBlock}>
                        <Text style = {styles.textOfBlock}>
                            Варіанти підпису
                        </Text>
                        <HeaderButton label = "" iconLeft = {<Icons.PencilIcon/>}></HeaderButton>
                    </View>
                    <View style = {styles.blockRandomContainer}>
                        <View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}