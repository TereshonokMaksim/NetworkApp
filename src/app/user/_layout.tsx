import { Stack } from "expo-router";


export default function UserLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, animation: "none" }}>
			<Stack.Screen name="registration" />
			<Stack.Screen name="login" />
		</Stack>
	);
}