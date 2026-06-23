import { Input } from "../../../../shared/ui/input";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { styles } from "./finish-form.styles";
import { useUserContext } from "../../../../shared/context/user";
import { useLoginMutation, useMeQuery, useModifyMutation } from "../../../../shared/api/api";
import { useEffect } from "react";


interface FFormSchema { 
    username: string,
    nickname: string
}

export function FForm(){
	const { handleSubmit, control } = useForm({
		defaultValues: {
			username: "",
			nickname: ""
		},
	});
    const { setUser, user } = useUserContext()
    const [logMut] = useModifyMutation()
    const { refetch, data } = useMeQuery();

	async function onSubmit(data: FFormSchema) {
        await logMut({username: data.username, nickname: data.nickname}).unwrap()
        refetch()
	}
    useEffect(() => {setUser(data ? data : null)},[data])

    return (
        <View style = {styles.bgBlur}>
            <View style = {styles.mainForm}>
                <Text style = {styles.formTitle}>
                    Додай деталі про себе
                </Text>
                <View style = {styles.formInputs}>
                    <Controller
                        control={control}
                        name="username"
                        render = {({ field, fieldState }) => {
                            return <Input
                                placeholder="Введіть Псевдонім автора"
                                label="Псевдонім автора"
                                autoCapitalize={"words"}
                                autoComplete="off"
                                autoCorrect={false}
                                inputMode="text"
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                error={fieldState.error?.message}
                            />
                        }}
                    />
                    <Controller
                        control={control}
                        name="nickname"
                        render = {({ field, fieldState }) => {
                            return <Input
                                placeholder="@"
                                label="Ім’я користувача"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                inputMode="text"
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                error={fieldState.error?.message}
                            />
                        }}
                    />
                    <Text style = {styles.textLol}>
                        Або оберіть: <Text style = {styles.greenLol}>
                            (Запропоновані варіанти відповідно до Ім’я та Прізвища)
                        </Text>
                    </Text>
                </View>
                <View style = {styles.buttonRight}>
                    <Button style = {{width: 160}} variant = "primary" paddingVar = "big" onPress = {handleSubmit(onSubmit)} title = "Продовжити"/>
                </View>
            </View>
        </View>
    )
}