import React from 'react';
import { View, Alert } from 'react-native';
import { CreatePostForm } from '../../modules/post/ui/create-post-form/create-post-form';
import { createPost } from '../../modules/post/api/post-api';

export default function CreatePostScreen() {
    const handleSubmit = async (data: any) => {
        const formattedData = {
            ...data,
            tags: data.tags.split(',').map((tag: string) => tag.trim()),
        };

        await createPost(formattedData);

        Alert.alert('Успех', 'Пост создан');
    };

    return (
        <View>
            <CreatePostForm onSubmit={handleSubmit} />
        </View>
    );
}