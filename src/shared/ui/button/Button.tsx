import { Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.types";
import { styles } from "./button.styles";


export function Button(props: ButtonProps) {
	const { variant, paddingVar, bordersOn, title, style, titleStyle, ...restProps } = props;
	return (
		<TouchableOpacity
			style={[variant === "primary" ? styles.buttonPrim : styles.buttonSec,
                    paddingVar === "big" ? styles.buttonBigPadding : styles.buttonSmallPadding,
                    bordersOn && styles.bordersON, style]}
			{...restProps}
		>
			<Text style={[variant === "primary" ? styles.textPrim : styles.textSec, titleStyle]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}