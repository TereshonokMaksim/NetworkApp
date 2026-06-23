import { Stack } from "expo-router";
import { AuthHeader } from "../../shared/ui/auth-header";


export default function UserLayout() {
	return (
		<Stack screenOptions={{ header: (props: any) => <AuthHeader {...props}/>, animation: "none" }}>
			<Stack.Screen name="registration" />
			<Stack.Screen name="login" />
			<Stack.Screen name="verification" />
		</Stack>
	);
}