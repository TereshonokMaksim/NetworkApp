import { View, Text } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";


export default function PersonalInfoScreen(){
    return (
        <View style = {{backgroundColor: "#FAF8FF"}}>
            <Submenu
                links = {
                    [
                        {
                            name: "Особиста інформація",
                            href: "settings/personal"
                        },
                        {
                            name: "Альбоми",
                            href: "settings/albums"
                        }
                    ]
                }
            />
            <Text style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
                My Personal Information Page
            </Text>
        </View>
    )
}