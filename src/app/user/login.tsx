import { View } from "react-native";
import { LogForm } from "../../modules/auth/ui/login-form/LogForm";

export default function LoginView() {
    return <View style = {{alignItems: "center", backgroundColor: "#E9E5EE", height: "100%"}}>
        <LogForm/>
    </View>
}