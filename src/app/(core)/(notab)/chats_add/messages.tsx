import { View, Text, TextInput, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { Icons } from "../../../../shared/ui/icons/icons";
import { StyleSheet } from "react-native";
import { AvatarWithIndicator } from "../../../../shared/ui/avatar-with-indicator";
import { useRouter } from "expo-router";
import { useGetPersonalChatListQuery, useGetUnreadDataQuery } from "../../../../modules/friends/api/friends-api";
import { useUserContext } from "../../../../shared/context/user";
import { EnhancedIcons } from "../../../../shared/ui/icons-enhanced";

const blockStyles = StyleSheet.create({
	main: {
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.blue20,
		borderStyle: "solid",
		paddingVertical: 16,
		borderRadius: 10,
		gap: 20,
	},
	top: {
		flexDirection: "row",
		width: "100%",
		gap: 8,
		alignItems: "center",
		marginHorizontal: 16,
	},
	name: {
		color: COLORS.blue50,
		fontSize: 20,
		fontFamily: "GTWP Medium",
	},
	searchBox: {
		width: "92%",
		gap: 10,
		paddingVertical: 0,
		paddingHorizontal: 16,
		borderColor: COLORS.blue20,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
	},
	searchInput: {
		color: COLORS.blue,
		fontSize: 16,
		fontFamily: "GTWP Regular",
		flex: 1,
	},
	contactList: {
		gap: 16,
		maxHeight: 418,
		width: "100%",
	},
	contact: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
		alignItems: "center",
		height: 62,
		paddingHorizontal: 16,
		paddingVertical: 8
	},
	contactImage: {
		borderRadius: 76.88,
		width: 46,
		height: 46,
	},
	contactUsername: {
		fontSize: 16,
		color: COLORS.blue,
		fontFamily: "GTWP Medium",
	},
	selected: {
		backgroundColor: COLORS.plum50,
	},
	textData: {
		gap: 4,
		flex: 1,
	},
	message: {
		fontSize: 14,
		color: COLORS.blue,
		fontFamily: "GTWP Medium",
		maxWidth: 300
	},
	timeText: {
		fontSize: 12,
		color: COLORS.blue50,
		fontFamily: "GTWP Medium",
	},
	contactTop: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	bottomHalf: {
		width: "100%",
		gap: 8,
		justifyContent: "space-between",
		flexDirection: "row",
		paddingRight: 4
	},
	unreadIndicator: {
		width: 20,
		height: 20,
		backgroundColor: COLORS.plum,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		marginTop: -6
	},
	unreadNumber: {
		color: COLORS.white,
		fontSize: 12
	}
});

interface UserMess {
	id: number;
	avatar?: string;
	username: string;
	pseudonym: string;
	lastMessage: string;
	lastTime: string;
	read: boolean;
	isOnline: boolean;
}

export default function MessagesScreen() {
	const { data } = useGetPersonalChatListQuery({});
	const router = useRouter();
	const { user } = useUserContext()

	return (
		<View style={{ backgroundColor: "#FAF8FF", height: "100%" }}>
			<Submenu
				reversed={true}
				links={[
					{
						name: "Контакти",
						href: "chats",
						icon: <Icons.FriendsIcon />,
					},
					{
						name: "Повідомлення",
						href: "chats_add/messages",
						icon: EnhancedIcons.messagesIcon(),
						choosed: true
					},
					{
						name: "Групові чати",
						href: "chats_add/groups",
						icon: EnhancedIcons.groupsIcon(),
					},
				]}
			/>
			<View style={blockStyles.main}>
				<View style={blockStyles.top}>
					{EnhancedIcons.messagesIcon()}
					<Text style={blockStyles.name}>Повідомлення</Text>
				</View>
				<View style={blockStyles.searchBox}>
					<Icons.GlassIcon />
					<TextInput
						style={blockStyles.searchInput}
						placeholder="Пошук"
						placeholderTextColor={COLORS.blue50}
					/>
				</View>
				<ScrollView style={blockStyles.contactList}>
					{Array.isArray(data) &&
						data.map((el) => {
							let timeText = "";
							let hour, minute;
							if (el.lastMessage?.created_at){
								const [year, month, day] = `${el.lastMessage.created_at}`.split("T")[0].split("-");
								const [currentYear, currentMonth, currentDay] = new Date().toISOString().split("T")[0].split("-")
								if (year != currentYear || month != currentMonth || day != currentDay){
									timeText = `${day}.${month}.${year}`
								}
								else {
									[hour, minute] = `${el.lastMessage.created_at}`
										.split("T")[1]
										.split(":")
										.slice(0, 2);
									hour=+hour+2
									timeText = `${hour}:${minute}`
								}
							}
							// if (el.lastMessage) console.log(el.lastMessage.messageReaders.filter(i => i.user.id === user?.id).length, el.lastMessage.messageReaders)
							const read = el.lastMessage ? !!(el.lastMessage.messageReaders.filter(i => i.user.id === user?.id).length) : true
							return (
								<TouchableOpacity
									style={[blockStyles.contact, !read && blockStyles.selected]}
									key={el.id}
									onPress={() => {
										router.push(`chats_add/1h${el.userId}`);
									}}
								>
									<View style={blockStyles.contactImage}>
										<AvatarWithIndicator
											originalImagePath={el.avatar}
											compressedImagePath={el.avatar}
											isOnline={"auto"}
											styles={blockStyles.contactImage}
											imageStyles={blockStyles.contactImage}
											indicatorStyles={{
												right: 3,
												bottom: 3,
												width: 12,
												height: 12,
											}}
											userId = {el.userId}
										/>
									</View>
									<View style={blockStyles.textData}>
										<View style={blockStyles.contactTop}>
											<Text style={blockStyles.contactUsername}>
												{el.name}
											</Text>
											<Text style={blockStyles.timeText}>{timeText}</Text>
										</View>
										<View style = {blockStyles.bottomHalf}>
											<Text style={blockStyles.message}>{el.lastMessage?.text}</Text>
											{el.messagesUnread > 0 && (
												<View style = {blockStyles.unreadIndicator}>
													<Text style = {blockStyles.unreadNumber}>
														{el.messagesUnread < 100 ? el.messagesUnread : 99}
													</Text>
												</View>
											)}
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
				</ScrollView>
			</View>
			<View
				style={{
					width: "15%",
					height: 2,
					backgroundColor: COLORS.plum,
					position: "absolute",
					bottom: 0,
					left: "80%",
				}}
			></View>
		</View>
	);
}
