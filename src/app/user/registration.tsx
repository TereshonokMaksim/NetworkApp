import { View } from "react-native";
import { RegForm } from "../../modules/auth/ui/reg-form/RegForm";


export default function RegPage() {
    return (
        <View style = {{alignItems: "center", backgroundColor: "#E9E5EE", height: "100%"}}>
            <RegForm/>
        </View>
    )
}