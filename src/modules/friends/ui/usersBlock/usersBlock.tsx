import { View, Text } from "react-native";
import { QuickUserView } from "../quickUserView";
import { stylesBase } from "./users-block.styles";
import type { UsersBlockProps } from "./users-block.types";
import { useRouter } from "expo-router";

export function UsersBlock(props: UsersBlockProps) {
	const { name, profiles, actionOnProceed, actionOnDelete, actionText, lookAllLink, dontShowAllLink, emptyListText, notAutoThrow } = props;
	const router = useRouter();
    const noList = !profiles.length
	return (
		<View style={stylesBase.blockWhole}>
			<View style={stylesBase.blockTop}>
				<Text style={stylesBase.blockName}>{name}</Text>
				{!dontShowAllLink && (
					<Text
						style={[stylesBase.blockLookAll, noList && stylesBase.noListColor]}
						onPress={() => {
							lookAllLink && router.push(lookAllLink);
						}}
					>
						Дивитись всі
					</Text>
				)}
			</View>
            { noList ? <Text style = {stylesBase.noListText}>{emptyListText}</Text> : (<View style={stylesBase.blockList}>
				{profiles.map((el) => (
					<QuickUserView
						profile={el}
						actionOnProceed={actionOnProceed}
						actionOnDelete={actionOnDelete}
						actionText={actionText}
						key={el.id}
						notAutoThrow={notAutoThrow}
					/>
				))}</View>)}
		</View>
	);
}
