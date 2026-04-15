import { View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
    uri: string;
    onView?: () => void;
    onDelete?: () => void;
};

export const PhotoCard = ({ uri, onView, onDelete }: Props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={styles.image} />

            <View style={styles.actions}>
                <TouchableOpacity onPress={onView} style={styles.button} />
                <TouchableOpacity onPress={onDelete} style={styles.button} />
            </View>
        </View>
    );
};