import { Input } from "../../../../shared/ui/input";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Modal, Pressable } from "react-native";
import { styles } from "./prof-form.styles";

interface ProfFormSchema { 
    nickname: string;
    username: string;
}

interface ProfFormProps {
    visible: boolean;
    onClose: () => void;
}

export function ProfForm({ visible, onClose }: ProfFormProps) {
    const { handleSubmit, control } = useForm<ProfFormSchema>({
        defaultValues: {
            nickname: "",
            username: "",
        },
    });

    function onSubmit(data: ProfFormSchema) {
        console.log("Данные профиля:", data);
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {/* Overlay - затемнение фона */}
            <Pressable style={styles.overlay} onPress={onClose}>
                
                {/* Сама форма */}
                <View style={styles.mainForm} onStartShouldSetResponder={() => true}>
                    <Text style={styles.formTitle}>
                        Додай деталі про себе
                    </Text>

                    <View style={styles.formInputs}>
                        <Controller
                            control={control}
                            name="nickname"
                            render={({ field, fieldState }) => (
                                <Input
                                    placeholder="Введіть Псевдонім автора"
                                    label="Псевдонім автора"
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <View>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field, fieldState }) => (
                                    <Input
                                        placeholder="username"
                                        label="Ім’я користувача"
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Text style={{ fontSize: 11, color: '#A0A0A0', marginTop: 8 }}>
                                Або оберіть: <Text style={{ color: '#27AE60' }}>(Запропоновані варіанти...)</Text>
                            </Text>
                        </View>
                    </View>

                    <Button 
                        variant="primary" 
                        paddingVar="big" 
                        onPress={handleSubmit(onSubmit)} 
                        title="Продовжити"
                    />
                </View>
            </Pressable>
        </Modal>
    );
}
