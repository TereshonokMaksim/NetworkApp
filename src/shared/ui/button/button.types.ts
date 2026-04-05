import type { TextStyle, TouchableOpacityProps } from "react-native";


export interface ButtonProps extends TouchableOpacityProps {
    variant: "primary" | "secondary";
    paddingVar: "big" | "small";
    bordersOn?: boolean;
	title?: string;
    titleStyle?: TextStyle
}