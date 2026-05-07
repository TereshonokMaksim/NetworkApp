import { Input } from "../../../../shared/ui/input";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { styles } from "./reg-form.styles";
import { useRegisterMutation } from "../../../../shared/api/api";
import { useUserContext } from "../../../../shared/context";


interface RegFormSchema { 
    email: string,
    password: string,
    passwordConf: string
}

type PasswordCheckResult = {
  valid: boolean;
  errors: string[];
};

export function validatePassword(password: string): string | boolean {
    const errors: string[] = [];

    if (password.length < 8) {
        return "Длина пароля має бути хоча б 8 символів!"
    }

    if (!/[a-z]/.test(password)) {
        return "У паролю має бути хоча б одна мала літера!"
        errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[A-Z]/.test(password)) {
        return "У паролю має бути хоча б одна велика літера!"
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        return "У паролю має бути хоча б одна цифра!"
        errors.push("Password must contain at least one number.");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        return "У паролю має бути хоча б один спеціальний символ!"
        errors.push("Password must contain at least one special character.");
    }

    if (/^[0-9]+$/.test(password)) {
        return "Пароль не може бути тільки цифрами!"
        errors.push("Password cannot be only numbers.");
    }

    return true;
}

export function RegForm(){
	const { handleSubmit, control, setError } = useForm({
		defaultValues: {
			email: "",
			password: "",
            passwordConf: ""
		},
	});
    const { setToken } = useUserContext()
    const [regMut] = useRegisterMutation()
	async function onSubmit(data: RegFormSchema) {
        if (data.password != data.passwordConf){
            setError("password", {type: "manual", message: "Паролі мають співпадати!"})
            setError("passwordConf", {type: "manual", message: "Паролі мають співпадати!"})
            return
        }
        const passTest = validatePassword(data.password)
        if (typeof passTest === "string"){
            setError("password", {type: "manual", message: passTest})
            return
        }
        const result = await regMut({email: data.email, password: data.password}).unwrap()
        if ("token" in result){
            setToken(result.token)
            router.push("user/verification")
        }
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
            <Button variant = "primary" paddingVar = "big" onPress = {handleSubmit(onSubmit)} title = "Створити акаунт"/>
        </View>
    )
}