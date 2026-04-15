import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PhotoCard } from "../../../../shared/ui/PhotoCard";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { styles } from "./albumpage/styles";

export default function AlbumsScreen() {
    return (
        <View style={{ backgroundColor: "#FAF8FF", flex: 1 }}>
            <Submenu
                links={[
                    {
                        name: "Особиста інформація",
                        href: "settings/personal"
                    },                    {
                        name: "Альбоми",
                        href: "settings/albums"
                    }
                ]}
            />
            <ScrollView style={styles.container}>
            {/* МОЇ ФОТО */}
                <View style={styles.block}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Мої фото</Text>

                        <TouchableOpacity style={styles.addButton}>
                            <Text>Додати фото</Text>
                        </TouchableOpacity>
                    </View>

                    <PhotoCard
                        uri="https://via.placeholder.com/150"
                    />
                </View>

            {/* АЛЬБОМ */}
                <View style={styles.block}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Природа</Text>
                        <Text style={styles.year}>2025 рік</Text>
                    </View>

                    <View style={styles.grid}>
                        <TouchableOpacity style={styles.addPhoto}>
                            <Text style={styles.plus}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
