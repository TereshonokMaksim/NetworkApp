import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
    title: string;
    year?: string;
    onPress?: () => void;
};

export const AlbumCard = ({ title, year, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            {year && <Text style={styles.year}>{year}</Text>}
        </TouchableOpacity>
    );
};