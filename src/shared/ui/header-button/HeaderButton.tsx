import { Text, TouchableOpacity } from "react-native";
import { HeaderButtonProps } from "./header-button.types";
import { styles } from "./header-button.styles";

export function HeaderButton(props: HeaderButtonProps) {
    const {iconLeft, label, style, text, ...restProps} = props

    return (
        <TouchableOpacity style= {[styles.button, style]} {...restProps}>
            {text && <Text style={styles.text}>{text}</Text>}
            {iconLeft}
        </TouchableOpacity>    
    )
}