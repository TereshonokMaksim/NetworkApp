import { Stack } from "expo-router";


export default function SettingLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, animation: "none" }}>
			<Stack.Screen name="[id]" />
		</Stack>
	);
}