import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
    title: string;
    topic: string;
    tags: string;
}

interface Props {
    onSubmit: (data: FormData) => void;
}

export const CreatePostForm: React.FC<Props> = ({ onSubmit }) => {
    const { control, handleSubmit } = useForm<FormData>();

    return (
        <View>
            <Text>Назва</Text>
            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Ввведіть назву"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />

            <Text>Тема</Text>
            <Controller
                control={control}
                name="topic"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Введіть тему"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />

            <Text>Теги</Text>
            <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Ващі Теги"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />

            <Button title="Створити пост" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};