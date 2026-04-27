import { View } from "react-native";
import { VerifForm } from "../../modules/auth/ui/verif-form/VerifForm";


export default function RegPage() {
    return (
        <View style = {{alignItems: "center", backgroundColor: "#E9E5EE", height: "100%", justifyContent: "center"}}>
            <VerifForm/>
        </View>
    )
}