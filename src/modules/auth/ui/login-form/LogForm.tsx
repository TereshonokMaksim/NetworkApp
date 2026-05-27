import { Input } from "../../../../shared/ui/input";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { styles } from "./log-form.styles";
import { useUserContext } from "../../../../shared/context";
import { useLoginMutation } from "../../../../shared/api/api";


interface LogFormSchema { 
    email: string,
    password: string,
    passwordConf: string
}

export function LogForm(){
	const { handleSubmit, control } = useForm({
		defaultValues: {
			email: "",
			password: "",
            passwordConf: ""
		},
	});
    const { setToken } = useUserContext()
    const [logMut] = useLoginMutation()

	async function onSubmit(data: LogFormSchema) {
        const result = await logMut({email: data.email, password: data.password}).unwrap()
        if ("token" in result){
            setToken(result.token)
            router.navigate("main")
        }
	}
    return (
        <View style = {styles.mainForm}>
            <View style = {styles.formTop}>
                <Link href = "user/registration" asChild>
                    <Text style = {StyleSheet.flatten([styles.formHeaderLink])}>Рєстрація</Text>
                </Link>
                <Link href = "user/login" asChild>
                    <Text style = {StyleSheet.flatten([styles.formHeaderLink, styles.formHeaderActive])}>Авторизація</Text>
                </Link>
            </View>
            <Text style = {styles.formTitle}>
                З поверненням!
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
            </View>
            <Button variant = "primary" paddingVar = "big" onPress = {handleSubmit(onSubmit)} title = "Ввійти"/>
        </View>
    )
}