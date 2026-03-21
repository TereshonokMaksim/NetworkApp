import { Stack } from "expo-router";


export default function SettingLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, animation: "none" }}>
			<Stack.Screen name="allFriends" />
			<Stack.Screen name="requests" />
			<Stack.Screen name="recomendations" />
		</Stack>
	);
}