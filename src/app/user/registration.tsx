import { useState } from "react"; // 1. Добавь useState
import { View } from "react-native";
import { RegForm } from "../../modules/auth/ui/reg-form/RegForm";
import { ProfForm } from "../../modules/auth/ui/profile-detail-form/ProfForm";

export default function RegPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <View style={{ alignItems: "center", backgroundColor: "#E9E5EE", height: "100%", justifyContent: "center" }}>
            
            <RegForm />
            <ProfForm 
                visible={isModalVisible} 
                onClose={() => setIsModalVisible(false)} 
            />
        </View>
    )
}
