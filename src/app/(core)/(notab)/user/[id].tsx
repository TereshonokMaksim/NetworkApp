import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { styles } from "./user.styles";

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>{"<"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileBlock}>
                <Image
                    source={{
                        uri: "",
                    }}
                    style={styles.avatar}
                />

                <Text style={styles.name}>Yehor Aung</Text>

                <Text style={styles.username}>@thellii</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Дописи</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12.1K</Text>
                        <Text style={styles.statLabel}>Читачі</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>222</Text>
                        <Text style={styles.statLabel}>Друзі</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followButtonText}>
                            Підтвердити
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton}>
                        <Text style={styles.messageButtonText}>
                            Видалити
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Альбоми</Text>
                    <Image 
                        source={{
                            uri:""
                        }}
                    />

                    <TouchableOpacity>
                        <Text style={styles.showAll}>
                            Дивитись всі
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <Text style={styles.albumTitle}></Text>

                <Text style={styles.albumDate}></Text> */}

                <Image
                    source={{
                        uri: "",
                    }}
                    style={styles.albumImage}
                />
            </View>

            <View style={styles.post}>
                <View style={styles.postHeader}>
                    <Image
                        source={{
                            uri: "https://i.pravatar.cc/100",
                        }}
                        style={styles.postAvatar}
                    />
                </View>
            </View>
        </ScrollView>
    );
}