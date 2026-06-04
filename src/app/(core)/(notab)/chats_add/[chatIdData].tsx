import { View, TouchableOpacity, Text, StyleSheet, TextInput, Modal, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Image } from "expo-image";
import { COLORS } from "../../../../shared/constants/colors";
import { useEffect, useState } from "react";
import { ClientSocket } from "../../../../shared/socket/socket";
import { useUserContext } from "../../../../shared/context";
import {
	friendUtil,
	useGetPersonalChatQuery,
	useMarkMessageMutation,
	useSendMessageWithImagesMutation,
} from "../../../../modules/friends/api/friends-api";
import { BACK_HOST } from "../../../../shared/constants/api-data";
import { NewMessage } from "../../../../shared/socket/socket.contracts";
import { MessageFull } from "../../../../modules/friends/api/friends-api.types";
import { pickImage } from "../../../../shared/tools/img-pick";

const IMAGES_PER_MESSAGE_LIMIT = 7;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 660,
		borderColor: COLORS.blue20,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		padding: 16,
		backgroundColor: COLORS.white,
	},
	top: {
		width: "100%",
		gap: 10,
	},
	topTop: {
		position: "relative",
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
	topData: {
		flexDirection: "row",
		gap: 24,
		height: 48,
	},
	topBack: {
		height: "100%",
		justifyContent: "center",
	},
	topChatData: {
		flexDirection: "row",
		gap: 10,
		height: "100%",
		alignItems: "center",
	},
	topAvatar: {
		width: 46,
		height: 46,
		borderRadius: 1000,
	},
	topTextData: {
		gap: 5,
	},
	topUsername: {
		color: COLORS.blue,
		fontSize: 24,
		fontFamily: "GTWP Medium",
	},
	topPersonal: {
		color: COLORS.blue50,
		fontSize: 14,
		fontFamily: "GTWP Regular",
	},
	borderView: {
		width: "100%",
		height: 1,
		backgroundColor: COLORS.blue20,
	},
	sendBlock: {
		width: "100%",
		flexDirection: "row",
		gap: 24,
		alignItems: "flex-end",
	},
	sendInput: {
		color: COLORS.blue,
		fontSize: 16,
		fontFamily: "GTWP Regular",
		flex: 1,
		gap: 10,
		paddingVertical: 0,
		paddingHorizontal: 16,
		borderColor: COLORS.blue20,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		minHeight: 40,
	},
	imageButton: {
		borderRadius: 1000,
		borderWidth: 1,
		borderColor: COLORS.plum,
		borderStyle: "solid",
		padding: 10,
		width: 40,
		height: 40,
	},
	planeButton: {
		borderRadius: 1000,
		backgroundColor: COLORS.plum,
		padding: 10,
		width: 40,
		height: 40,
	},
	messageWhole: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		borderRadius: 6,
		maxWidth: 300,
	},
	messageImage: {
		width: 46,
		height: 46,
		borderRadius: 23,
	},
	messageItself: {
		padding: 10,
		borderRadius: 6,
		gap: 10,
		borderWidth: 1,
		borderColor: COLORS.plum50,
		borderStyle: "solid",
		alignItems: "flex-end",
		flexDirection: "row",
	},
	messageTextData: {
		gap: 4,
	},
	messageUsername: {
		color: COLORS.plum,
		fontSize: 10,
		fontFamily: "GTWP Regular",
	},
	messageContent: {
		color: COLORS.blue,
		fontSize: 14,
		fontFamily: "GTWP Regular",
		maxWidth: 230,
	},
	addDataMessage: {
		flexDirection: "row",
		gap: 3,
		alignItems: "flex-end",
	},
	timeMessage: {
		color: COLORS.blue50,
		fontSize: 10,
		fontFamily: "GTWP Regular",
	},
	messageWrapper: {
		width: "100%",
		flexDirection: "row",
	},
	myMessageWrapper: {
		justifyContent: "flex-end",
	},
	alienMessageWrapper: {
		justifyContent: "flex-start",
	},
	myMessageBackground: {
		backgroundColor: COLORS.blue20,
	},
	totalMessageWrapper: {
		width: "100%",
		alignItems: "center",
		gap: 10,
	},
	todayText: {
		paddingVertical: 4,
		paddingHorizontal: 6,
		backgroundColor: COLORS.plum50,
		color: COLORS.blue50,
		textAlign: "center",
		fontFamily: "GTWP Regular",
		fontSize: 16,
		borderRadius: 4,
	},
});

const dropDownStyles = StyleSheet.create({
	thingy: {
		width: 300,
		borderRadius: 10,
		backgroundColor: COLORS.plum50,
		gap: 16,
		padding: 16,
		position: "absolute",
		top: -2,
		right: -16,
		zIndex: 10,
	},
	tripleOffset: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	dataBlock: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	dataText: {
		fontFamily: "GTWP Medium",
		fontSize: 16,
		color: COLORS.blue,
	},
	dataBorder: {
		width: "100%",
		height: 1,
		backgroundColor: COLORS.blue20,
	},
});

const modalStyles = StyleSheet.create({
	modalBg: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignContent: "center",
	},
	modalItself: {
		height: 600,
		width: "100%",
		padding: 20,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		alignItems: "center",
	},
	crossOffset: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	textTitle: {
		color: COLORS.blue,
		fontSize: 34,
		fontFamily: "GTWP Medium",
	},
});
function getAva(avatar: string | null | undefined) {
	if (avatar) {
		return BACK_HOST + "/media/original/" + avatar;
	}
	return require("../../../../assets/images/defaultAva.png");
}

type MessageProps = {
	data: NewMessage;
	myMessage: boolean;
	previousMessageDate: string | null;
	firstMessage: boolean;
	unread: boolean;
	readByBoth: boolean;
};

const MONTHS = [
	"січня",
	"лютого",
	"березня",
	"квітня",
	"травня",
	"червня",
	"липня",
	"серпня",
	"вересня",
	"жовтня",
	"листопаду",
	"грудня",
];

function Message(props: MessageProps) {
	const { data, myMessage, previousMessageDate, firstMessage, unread, readByBoth } = props;
	// console.log("Message preparations");
	// console.log(data);
	let name = "";
	if (data.sender.name || data.sender.surname) {
		if (data.sender.name) name += `${data.sender.name} `;
		if (data.sender.surname) name += data.sender.surname;
	} else {
		name = "Unnamed";
	}
	const [hour, minute] = `${data.created_at}`.split("T")[1].split(":").slice(0, 2);
	let [currentYear, currentMonth, currentDay] = `${data.created_at}`.split("T")[0].split("-");
	let datesDifferent = false;
	let previousText = "";
	if (!previousMessageDate) datesDifferent = false;
	else {
		const [year, month, day] = previousMessageDate.split("T")[0].split("-");
		if (year != currentYear || month != currentMonth || day != currentDay) {
			datesDifferent = true;
			previousText = `${day} ${MONTHS[+month - 1]} ${year}`;
		}
	}
	const todayText = `${currentDay} ${MONTHS[+currentMonth - 1]} ${currentYear}`;
	return (
		<View style={[styles.totalMessageWrapper]}>
			{unread && <UnreadBlock />}
			{firstMessage && <Text style={styles.todayText}>{todayText}</Text>}
			<View
				style={[
					styles.messageWrapper,
					myMessage ? styles.myMessageWrapper : styles.alienMessageWrapper,
				]}
			>
				<View style={[styles.messageWhole, myMessage && styles.myMessageBackground]}>
					{!myMessage && (
						<Image
							source={getAva(data.sender.profile?.avatar)}
							style={styles.messageImage}
						/>
					)}
					<View style={styles.messageItself}>
						<View style={styles.messageTextData}>
							{!myMessage && <Text style={styles.messageUsername}>{name}</Text>}
							<Text style={styles.messageContent}>{data.text}</Text>
						</View>
						<View style={styles.addDataMessage}>
							<Text style={styles.timeMessage}>{`${+hour + 2}:${minute}`}</Text>
							<Image
								source={require("../../../../assets/images/checkmark.png")}
								style={{ width: 10, height: 10 }}
							/>
							{readByBoth && (
								<Image
									source={require("../../../../assets/images/checkmark.png")}
									style={{ width: 10, height: 10, marginLeft: -9 }}
								/>
							)}
						</View>
					</View>
				</View>
			</View>
			{datesDifferent && <Text style={styles.todayText}>{previousText}</Text>}
		</View>
	);
}

const unreadStyles = StyleSheet.create({
	whole: {
		width: "100%",
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
		paddingBottom: 10,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: COLORS.blue10,
	},
	text: {
		color: COLORS.blue50,
		fontFamily: "GTWP Regular",
		fontSize: 16,
		textAlign: "center",
	},
});

export function UnreadBlock() {
	return (
		<View style={unreadStyles.whole}>
			<View style={unreadStyles.line} />
			<Text style={unreadStyles.text}>Нові повідомлення</Text>
			<View style={unreadStyles.line} />
		</View>
	);
}

// interface ImagesPreparationBlockProps {
// 	images: string[];
// 	removeImage: (imageUri: string) => void;
// }

// const stylesImPrepBlock = StyleSheet.create({
//     imPrepBlock: {
//         width: "100%",
//         padding: 10,
//         flexDirection: "row",
//         gap: 10,
//         flexWrap: "wrap",
//         alignItems: "flex-end"
//     },
//     imageBlock: {
//         width: 100,
//     }
// });

// function ImagesPreparationBlock(props: ImagesPreparationBlockProps) {
// 	const { images, removeImage } = props;
// 	return (
// 		<View style = {stylesImPrepBlock.imPrepBlock}>
// 			{images.map((el, elIn) => (
// 				<View style = {stylesImPrepBlock.imageBlock}>
// 					<Image
// 						source={el}
// 						key={`messageSendImage-${elIn}`}
// 						style={stylesImPrepBlock.image}
// 					/>
// 					<TouchableOpacity 
//                         style={stylesImPrepBlock.cancelButton}
//                         onPress={() => {removeImage(el)}}
//                     >
// 						<Icons.CrossIcon />
// 					</TouchableOpacity>
// 				</View>
// 			))}
// 		</View>
// 	);
// }

export default function ChatScreen() {
	const [messageText, setMessageText] = useState<string>("");
	const { chatIdData } = useLocalSearchParams();
	const [isPersonal, chatId] = Array.isArray(chatIdData)
		? chatIdData[0].split("h")
		: chatIdData.split("h");
	const [unreadShow, setUnreadShow] = useState(true);
	const router = useRouter();
	const { user, token } = useUserContext();
	const { data: chatData } = useGetPersonalChatQuery({ userId: +chatId });
	useEffect(() => {
		friendUtil.invalidateTags(["unreadData"]);
	}, [chatData]);
	// const otherMessages = [
	// 	{
	// 		avatar: "https://picsum.photos/seed/10000/200",
	// 		messageContent: "Hello!",
	// 		messageUsername: isPersonal === "0" ? "Umka" : "Guy",
	// 		read: false,
	// 		timeSent: "10:30",
	// 	},
	// ];
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [sendMessageF] = useSendMessageWithImagesMutation();
	function sendMessage() {
		const text = messageText.trim();
		if (!text.length) return;
		setUnreadShow(false);
		console.log("Sending is in progress...");
		setMessageText("");
		// ClientSocket.emit("sendMessage", {
		// 	senderId: user!.id,
		// 	chatId: +chatData!.id,
		// 	text: text,
		// 	messageImages: [],
		// });
		sendMessageF({
			senderId: user!.id,
			chatId: +chatData!.id,
			text: text,
			messageImages: images,
		});
		friendUtil.invalidateTags(["unreadData"]);
	}
	const [additionalMessages, setAdditionalMessages] = useState<MessageFull[]>([]);
	const [messagesFull, setMessagesFull] = useState<MessageFull[]>([]);
	const data = {
		username: isPersonal === "0" ? "GroupName" : chatData?.name,
		avatar: getAva(chatData?.avatar),
		isOnline: false,
	};
	const [markMessage] = useMarkMessageMutation();
	useEffect(() => {
		let messaga: MessageFull[] = [];
		if (Array.isArray(chatData?.messages)) {
			messaga = [...chatData.messages];
		}
		if (Array.isArray(additionalMessages)) {
			messaga = [...messaga, ...additionalMessages];
		}
		setMessagesFull(messaga.toReversed());
	}, [chatData?.messages, additionalMessages]);
	function messageReceiverHandler(msg: NewMessage) {
		markMessage({ messageId: msg.id });
		const newMsg = {
			...msg,
			sender: { ...msg.sender, profile: msg.sender.profile! },
			messageImages: [],
			messageReaders: [],
		};
		setAdditionalMessages((prev) => {
			return [...prev, newMsg];
		});
	}

	useEffect(() => {
		if (!chatData?.id) return;
		ClientSocket.emit("enterChat", { chatId: +chatData!.id });
	}, [chatData]);

	useEffect(() => {
		console.log(`Connecting to room ${chatId}`);
		ClientSocket.auth = { token: `Bearer ${token}` };
		ClientSocket.connect();
		ClientSocket.on("newChatMessage", messageReceiverHandler);
		return () => {
			ClientSocket.off("newChatMessage", messageReceiverHandler);
			ClientSocket.disconnect();
			console.log(`Disconnecting from room ${chatId}.`);
		};
	}, []);
	const [images, setImages] = useState<string[]>([]);
	async function getImages() {
		const result = await pickImage(false, {
			selectionLimit: IMAGES_PER_MESSAGE_LIMIT - images.length,
			allowsMultipleSelection: true,
			allowsEditing: false,
			mediaTypes: "images",
		});
		if (result.status === "error") {
			console.log("User cancelled image selection.");
			return;
		}
		const newImages = result.assets.map((el) => el.uri);
		setImages(() => [...images, ...newImages]);
	}

	let unread = -1;
	// const unread = !item.messageReaders.filter(
	//     (i) => i.user.id === user?.id,
	// ).length;
	// let force = false
	// if (unread && createNewUnread) {
	//     createNewUnread = false
	//     force = true
	// }
	// console.log("Unread check...", (createNewUnread || force) && unreadShow && unread, unreadShow, force, createNewUnread, unread)
	// console.log(item.messageReaders.filter(
	//     (i) => i.user.id === user?.id,
	// ))
	for (let msg of messagesFull.toReversed()) {
		if (!msg.messageReaders.filter((i) => i.user.id === user?.id).length) {
			unread = msg.id;
			break;
		}
	}
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
						icon: <Icons.ChatsIcon />,
					},
					{
						name: "Групові чати",
						href: "chats_add/groups",
						icon: <Icons.ChatsIcon />,
					},
				]}
			/>
			<View style={styles.container}>
				<Modal
					visible={modalVisible}
					animationType="none"
					transparent={true}
					onRequestClose={() => {
						setModalVisible(false);
					}}
					statusBarTranslucent
				>
					<View style={modalStyles.modalBg}>
						<View style={modalStyles.modalItself}>
							<View style={modalStyles.crossOffset}>
								<Icons.CrossIcon
									onPress={() => {
										setModalVisible(false);
									}}
								/>
							</View>
							<Text style={modalStyles.textTitle}>Редагування групи</Text>
						</View>
					</View>
				</Modal>
				<View style={styles.top}>
					<View style={styles.topTop}>
						<View style={styles.topData}>
							<View style={styles.topBack}>
								<TouchableOpacity
									onPress={() => {
										router.back();
									}}
								>
									<Icons.BackIcon />
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								style={styles.topChatData}
								onPress={() => {
									if (isPersonal === "0") {
										setModalVisible(true);
									}
								}}
							>
								<Image style={styles.topAvatar} source={data.avatar} />
								<View style={styles.topTextData}>
									<Text style={styles.topUsername}>{data.username}</Text>
									<Text style={styles.topPersonal}>
										{isPersonal
											? data.isOnline
												? "В мережі"
												: "Не в мережі"
											: "3 учасники, 1 в мережі"}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						{isPersonal === "0" && (
							<TouchableOpacity>
								<Icons.TripleDotIcon
									onPress={() => {
										setDropdownVisible(true);
									}}
								/>
							</TouchableOpacity>
						)}
						{dropdownVisible && (
							<View style={dropDownStyles.thingy}>
								<TouchableOpacity style={dropDownStyles.tripleOffset}>
									<Icons.TripleDotIcon
										onPress={() => {
											setDropdownVisible(false);
										}}
									/>
								</TouchableOpacity>
								<TouchableOpacity style={dropDownStyles.dataBlock}>
									<Icons.GaleryIcon />
									<Text style={dropDownStyles.dataText}>Медіа</Text>
								</TouchableOpacity>
								<View style={dropDownStyles.dataBorder} />
								<TouchableOpacity style={dropDownStyles.dataBlock}>
									<Icons.LogoutIcon />
									<Text style={dropDownStyles.dataText}>Покинути групу</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
					<View style={styles.borderView} />
				</View>
				<View style={{ flex: 1, justifyContent: "flex-end" }}>
					<FlatList
						style={{ width: "100%", height: "90%", paddingBottom: 0 }}
						contentContainerStyle={{ minHeight: "90%", gap: 8, paddingVertical: 24 }}
						data={Array.isArray(chatData?.messages) ? messagesFull : []}
						showsVerticalScrollIndicator={false}
						horizontal={false}
						renderItem={({ index, item }) => {
							return (
								<View style={{ width: "100%" }}>
									{/* {((createNewUnread || force) && unreadShow && unread) && <UnreadBlock />} */}
									<Message
										data={item}
										myMessage={user?.id === item.senderId}
										previousMessageDate={
											index === 0
												? null
												: `${messagesFull[index - 1].created_at}`
										}
										firstMessage={index + 1 === messagesFull.length}
										unread={item.id === unread && unreadShow}
										readByBoth={item.messageReaders.length > 1}
									/>
								</View>
							);
						}}
						keyExtractor={(item) => `${item.id}`}
						inverted
					/>
					<View style={styles.sendBlock}>
						<TextInput
							placeholder="Повідомлення"
							placeholderTextColor={COLORS.blue50}
							style={styles.sendInput}
							onChangeText={(data) => {
								setMessageText(data);
							}}
							value={messageText}
							multiline
						/>
						<TouchableOpacity style={styles.imageButton}>
							<Icons.GaleryIcon />
						</TouchableOpacity>
						<TouchableOpacity style={styles.planeButton} onPress={sendMessage}>
							<Icons.PlaneIcon color={COLORS.white} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}
