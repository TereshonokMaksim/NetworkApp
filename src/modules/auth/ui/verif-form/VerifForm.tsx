import { Input } from "../../../../shared/ui/input";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { styles } from "./verif-form.styles";
import { useVerifyMutation } from "../../../../shared/api/api";
import { useRef } from "react";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";


interface VerifFormSchema { 
    num1: string
    num2: string
    num3: string
    num4: string
    num5: string
    num6: string
}

export function VerifForm(){
	const { handleSubmit, control, setValue, getValues } = useForm({defaultValues: {
        num1: "",
        num2: "",
        num3: "",
        num4: "",
        num5: "",
        num6: ""
    }});
    const [modMut] = useVerifyMutation()
	function onSubmit(data: VerifFormSchema) {
        const codeT = `${data.num1}${data.num2}${data.num3}${data.num4}${data.num5}${data.num6}`
        modMut({code: codeT})
        router.navigate("main")
	}
    const inputs = useRef<(TextInput | null)[]>([]);
    const handleChange = (text: string, index: number, onChange: (text: string) => void) => {
        if (!/^\d?$/.test(text)) return;

        // update RHF field
        onChange(text);

        // move focus
        if (text && index < 6) {
            inputs.current[index + 1]?.focus();
        }
    };
    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === "Backspace") {
            const fields = ["num1", "num2", "num3", "num4", "num5", "num6"] as const
            const currentValue = getValues(fields[index-1]);
        if (!currentValue && index > 0) {
            inputs.current[index - 1]?.focus();
        }
        }
    };
    return (
        <View style = {styles.mainForm}>
            <Text style = {styles.formTitle}>
                Підтвердження пошти
            </Text>
            <Text style = {styles.formText}>
                Ми надіслали 6-значний код на вашу пошту (you@example.com). Введіть його нижче, щоб підтвердити акаунт
            </Text>
            <View style = {styles.formInputs}>
                <Text style = {styles.inputsName}>Код підтвердження</Text>
                <View style = {styles.inputsPlace}>
                    <View style = {styles.doubleInput}>
                        <Controller
                            control={control}
                            name="num1"
                            render = {({ field, fieldState }) => {
                                return <TextInput
                                    style={styles.inputItself}
                                    ref={(ref) => {inputs.current[1] = ref}}
                                    placeholder="_"
                                    autoCapitalize={"none"}
                                    autoComplete="off"
                                    autoCorrect={false}
                                    inputMode="numeric"
                                    onChangeText={(text) => handleChange(text, 1, field.onChange)}
                                    onKeyPress={(e) => handleKeyPress(e, 1)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            }}
                        />
                        <Controller
                            control={control}
                            name="num2"
                            render = {({ field, fieldState }) => {
                                return <TextInput
                                    style={styles.inputItself}
                                    ref={(ref) => {inputs.current[2] = ref}}
                                    placeholder="_"
                                    autoCapitalize={"none"}
                                    autoComplete="off"
                                    autoCorrect={false}
                                    inputMode="numeric"
                                    onChangeText={(text) => handleChange(text, 2, field.onChange)}
                                    onKeyPress={(e) => handleKeyPress(e, 2)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            }}
                        />
                    </View>
                    <View style = {styles.doubleInput}>
                        <Controller
                            control={control}
                            name="num3"
                            render = {({ field, fieldState }) => {
                                return <TextInput
                                    style={styles.inputItself}
                                    ref={(ref) => {inputs.current[3] = ref}}
                                    placeholder="_"
                                    autoCapitalize={"none"}
                                    autoComplete="off"
                                    autoCorrect={false}
                                    inputMode="numeric"
                                    onChangeText={(text) => handleChange(text, 3, field.onChange)}
                                    onKeyPress={(e) => handleKeyPress(e, 3)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            }}
                        />
                        <Controller
                            control={control}
                            name="num4"
                            render = {({ field, fieldState }) => {
                                return <TextInput
                                    style={styles.inputItself}
                                    ref={(ref) => {inputs.current[4] = ref}}
                                    placeholder="_"
                                    autoCapitalize={"none"}
                                    autoComplete="off"
                                    autoCorrect={false}
                                    inputMode="numeric"
                                    onChangeText={(text) => handleChange(text, 4, field.onChange)}
                                    onKeyPress={(e) => handleKeyPress(e, 4)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            }}
                        />
                    </View>
                    <View style = {styles.doubleInput}>
                        <Controller
                            control={control}
                            name="num5"
                            render = {({ field, fieldState }) => {
                                return <TextInput
                                    style={styles.inputItself}
                                    ref={(ref) => {inputs.current[5] = ref}}
                                    placeholder="_"
                                    autoCapitalize={"none"}
                                    autoComplete="off"
                                    autoCorrect={false}
                                    inputMode="numeric"
                                    onChangeText={(text) => handleChange(text, 5, field.onChange)}
                                    onKeyPress={(e) => handleKeyPress(e, 5)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            }}
                        />
                        <Controller
                            control={control}
                            name="num6"
                            render = {({ field, fieldState }) => {
                                return <TextInput
                                    style={styles.inputItself}
                                    ref={(ref) => {inputs.current[6] = ref}}
                                    placeholder="_"
                                    autoCapitalize={"none"}
                                    autoComplete="off"
                                    autoCorrect={false}
                                    inputMode="numeric"
                                    onChangeText={(text) => handleChange(text, 6, field.onChange)}
                                    onKeyPress={(e) => handleKeyPress(e, 6)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            }}
                        />
                    </View>
                </View>
            </View>
            <Button variant = "primary" paddingVar = "big" onPress = {handleSubmit(onSubmit)} title = "Підтвердити"/>
        </View>
    )
}