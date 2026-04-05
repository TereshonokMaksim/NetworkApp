import { TextInputProps, TextStyle, ViewStyle } from "react-native";


export interface InputProps extends TextInputProps {
	label?: string;
	error?: string | null;
	inputContainerStyle?: ViewStyle;
	labelStyle?: TextStyle;
}