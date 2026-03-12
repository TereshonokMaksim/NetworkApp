import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    Text 
} from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';

// Визначення типів для маршрутів (згідно з TS стандартами)
interface Route {
    key: string;
    title: string;
    focusedIcon: string;
    badge?: number | boolean;
}

export const HomeScreen: React.FC = () => {
    const [index, setIndex] = useState<number>(0);
    const [routes] = useState<Route[]>([
        { key: 'home', title: 'Головна', focusedIcon: 'home' },
        { key: 'posts', title: 'Мої публікації', focusedIcon: 'image-multiple' },
        { key: 'friends', title: 'Друзі', focusedIcon: 'account-group' },
        { key: 'chats', title: 'Чати', focusedIcon: 'chat-processing', badge: 2 },
    ]);

    // Верхня частина (Header)
    const Header = () => (
        <Appbar.Header style={styles.header}>
            <Appbar.Content 
                title="WORLD IT" 
                titleStyle={styles.headerTitle} 
            />
            <Appbar.Action icon="plus-circle-outline" onPress={() => {}} />
            <Appbar.Action icon="cog-outline" onPress={() => {}} />
            <Appbar.Action icon="logout-variant" onPress={() => {}} />
        </Appbar.Header>
    );

    // Центральна частина (Placeholder для контенту)
    const Feed = () => (
        <ScrollView style={styles.container}>
            <View style={styles.contentPlaceholder}>
                <Text style={styles.placeholderText}>Стрічка новин</Text>
            </View>
        </ScrollView>
    );

    // Мапінг сцен для нижньої навігації
    const renderScene = BottomNavigation.SceneMap({
        home: Feed,
        posts: Feed,
        friends: Feed,
        chats: Feed,
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={styles.footer}
                activeColor="#4A2B4D"
            />
        </SafeAreaView>
    );
};