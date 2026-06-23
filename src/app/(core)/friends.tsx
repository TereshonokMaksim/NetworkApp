import { View, ScrollView } from "react-native";
import { Submenu } from "../../shared/ui/submenu/submenu";
import { COLORS } from "../../shared/constants/colors";
import { FullUserList } from "../../modules/friends/ui/fullUserList";
import { useGetFriendsQuery, useGetRecomendationsQuery, useGetRequestsQuery } from "../../modules/friends/api";

export default function FriendsMainScreen() {
    const fData = useGetFriendsQuery({})
    const rcData = useGetRecomendationsQuery({})
    const rqData = useGetRequestsQuery({})
	return (
		<View style={{ backgroundColor: "#FAF8FF", height: "100%" }}>
			<Submenu
				links={[
					{
						name: "Головна",
						href: "friends",
						choosed: true
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
            <ScrollView contentContainerStyle = {{paddingBottom: 10}}>
                <FullUserList
                    friends={fData.data ? fData.data : []}
                    requests={rqData.data ? rqData.data : []}
                    recomendations={rcData.data ? rcData.data : []}
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
