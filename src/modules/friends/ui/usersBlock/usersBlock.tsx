import { View, Text } from "react-native";
import { QuickUserView } from "../quickUserView";
import { stylesBase } from "./users-block.styles";
import type { UsersBlockProps } from "./users-block.types";
import { useRouter } from "expo-router";

export function UsersBlock(props: UsersBlockProps) {
	const { name, profiles, actionOnProceed, actionText, lookAllLink, dontShowAllLink } = props;
	const router = useRouter();
	return (
		<View style={stylesBase.blockWhole}>
			<View style={stylesBase.blockTop}>
				<Text style={stylesBase.blockName}>{name}</Text>
				{!dontShowAllLink && (
					<Text
						style={stylesBase.blockLookAll}
						onPress={() => {
							lookAllLink && router.navigate(lookAllLink);
						}}
					>
						Дивитись всі
					</Text>
				)}
			</View>
			<View style={stylesBase.blockList}>
				{profiles.map((el) => (
					<QuickUserView
						profile={el}
						actionOnProceed={actionOnProceed}
						actionText={actionText}
						key={el.id}
					/>
				))}
			</View>
		</View>
	);
}
