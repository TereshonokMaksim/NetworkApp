import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { InputProps } from "./input.types";
import { Icons } from "../icons/icons";
import { styles } from "./input.styles";
import { useState } from "react";


export function Input(props: InputProps) {
    let {
        label,
        error,
        style,
        inputContainerStyle,
        labelStyle,
        editable,
        ...restProps
    } = props;
    if (!editable && editable != false){
        editable = true
    }
    return (
        <View style = {[styles.inputWrapperGen]}>
            <Text style={[styles.label, !editable ? styles.inactiveLabel : "", labelStyle]}>{label}</Text>
            <View style={[styles.inputContainer, inputContainerStyle]}>
                <TextInput
                    style={[styles.input, !editable ? styles.inactiveInput : "", style]}
                    editable
                    {...restProps}
                ></TextInput>
            </View>

            {!!error && (<Text style={styles.errorText}>{error}</Text>)}
        </View>
    );
}

function Password(props: InputProps) {
    const {
        label,
        error,
        style,
        inputContainerStyle,
        labelStyle,
        ...restProps
    } = props;
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const EyeIcon = isHidden ? (
        <Icons.EyeClosedIcon fill={"none"} width={"100%"} height={"100%"} />
    ) : (
        <Icons.EyeOpenedIcon fill={"none"} width={"100%"} height={"100%"} />
    );
    function handleToggleVisibility() {
        setIsHidden(!isHidden);
    }
    return (
        <View>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <View style={[styles.inputContainer, inputContainerStyle]}>
                <TextInput
                    style={[styles.input, style]}
                    secureTextEntry={isHidden}
                    {...restProps}
                ></TextInput>
                <TouchableOpacity
                    onPress={handleToggleVisibility}
                    style={styles.passwordButton}
                >
                    {EyeIcon}
                </TouchableOpacity>
            </View>

            {error && (<Text style={styles.errorText}>{error}</Text>)}
        </View>
    );
}

Input.Password = Password;

