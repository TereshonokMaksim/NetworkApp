import { Input } from "../../../../shared/ui/input";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { styles } from "./reg-form.styles";


interface RegFormSchema { 
    email: string,
    password: string,
    passwordConf: string
}

export function RegForm(){
	const { handleSubmit, control } = useForm({
		defaultValues: {
			email: "",
			password: "",
            passwordConf: ""
		},
	});

	function onSubmit(data: RegFormSchema) {
		console.log(data);
	}
    return (
        <View style = {styles.mainForm}>
            <View style = {styles.formTop}>
                <Link href = "user/registration" asChild>
                    <Text style = {StyleSheet.flatten([styles.formHeaderLink, styles.formHeaderActive])}>Рєстрація</Text>
                </Link>
                <Link href = "user/login" asChild>
                    <Text style = {StyleSheet.flatten([styles.formHeaderLink])}>Авторизація</Text>
                </Link>
            </View>
            <Text style = {styles.formTitle}>
                Приєднуйся до WorldIT
            </Text>
            <View style = {styles.formInputs}>
                <Controller
                    control={control}
                    name="email"
                    render = {({ field, fieldState }) => {
                        return <Input
                            placeholder="you@example.com"
                            label="Електрона пошта"
                            autoCapitalize={"none"}
                            autoComplete="email"
                            autoCorrect={false}
                            inputMode="email"
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                            error={fieldState.error?.message}
                        />
                    }}
                />
                <Controller
                    control={control}
                    name="password"
                    render = {({ field, fieldState }) => {
                        return <Input.Password
                            placeholder="Введи пароль"
                            label="Пароль"
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
                <Controller
                    control={control}
                    name="passwordConf"
                    render = {({ field, fieldState }) => {
                        return <Input.Password
                            placeholder="Повтори пароль"
                            label="Підтверди пароль"
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
            </View>
            <Button variant = "primary" paddingVar = "big" onPress = {() => {handleSubmit(onSubmit)}} title = "Створити акаунт"/>
        </View>
    )
}