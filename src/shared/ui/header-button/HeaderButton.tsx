import { Text, TouchableOpacity } from "react-native";
import { HeaderButtonProps } from "./header-button.types";
import { styles } from "./header-button.styles";

export function HeaderButton(props: HeaderButtonProps) {
    const {iconLeft, label, style, ...restProps} = props

    return (
        <TouchableOpacity style= {[styles.button, style]} {...restProps}>
            {iconLeft}
            {/* {text && <Text style={styles.text}>{label}</Text>} */}
        </TouchableOpacity>    
    )
}