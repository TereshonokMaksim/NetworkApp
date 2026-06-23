import { ReactNode } from "react";
import type { TouchableOpacityProps } from "react-native";

export interface HeaderButtonProps extends TouchableOpacityProps {
    label: string,
    text?: string,
	iconLeft?: ReactNode
}