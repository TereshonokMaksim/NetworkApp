import { View, ScrollView } from "react-native";
import { Submenu } from "../../shared/ui/submenu/submenu";
import { COLORS } from "../../shared/constants/colors";
import { FullUserList } from "../../modules/friends/ui/fullUserList";
import {
	testFriendProfiles,
	testRecomendationProfiles,
	testRequestProfiles,
} from "../../modules/friends/TEST_DATA";

export default function FriendsMainScreen() {
	return (
		<View style={{ backgroundColor: "#FAF8FF", height: "100%" }}>
			<Submenu
				links={[
					{
						name: "Головна",
						href: "friends",
					},
					{
						name: "Запити",
						href: "friends/requests",
					},
					{
						name: "Рекомендації",
						href: "friends/recomendations",
					},
					{
						name: "Всі друзі",
						href: "friends/allFriends",
					},
				]}
			/>
            <ScrollView>
                <FullUserList
                    friends={testFriendProfiles}
                    requests={testRequestProfiles}
                    recomendations={testRecomendationProfiles}
                ></FullUserList>
            </ScrollView>
			<View
				style={{
					width: "15%",
					height: 2,
					backgroundColor: COLORS.plum,
					position: "absolute",
					bottom: 0,
					left: "55%",
				}}
			/>
		</View>
	);
}
