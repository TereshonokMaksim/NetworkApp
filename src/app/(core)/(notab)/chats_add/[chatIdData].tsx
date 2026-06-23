import { View, TouchableOpacity, Text, StyleSheet, TextInput, Modal, FlatList } from "react-native";
import { useIsFocused, useLocalSearchParams, useRouter } from "expo-router";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Image } from "expo-image";
import { COLORS } from "../../../../shared/constants/colors";
import { useEffect, useState } from "react";
import { ClientSocket, SocketActions } from "../../../../shared/socket/socket";
import { useUserContext } from "../../../../shared/context/user";
import {
	friendUtil,
	useDeleteChatMutation,
	useGetGroupChatQuery,
	useGetPersonalChatQuery,
	useGetUnreadDataQuery,
	useMarkMessageMutation,
	useSendMessageWithImagesMutation,
} from "../../../../modules/friends/api/friends-api";
import { BACK_HOST } from "../../../../shared/constants/api-data";
import { GroupOnlineData, NewMessage } from "../../../../shared/socket/socket.contracts";
import { MessageFull } from "../../../../modules/friends/api/friends-api.types";
import { pickImage } from "../../../../shared/tools/img-pick";
import { CreateGroupModal } from "../../../../modules/chats/ui";
import { useFriendContext } from "../../../../shared/context/friends/friends.context";
import { useAppDispatch } from "../../../../shared/api/dispatcher";
import { EnhancedIcons } from "../../../../shared/ui/icons-enhanced";
import { FriendApiActions } from "../../../../modules/friends/api/friends-api-actions";

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
		// gap: 10,
		borderWidth: 1,
		borderColor: COLORS.plum50,
		borderStyle: "solid",
		// alignItems: "flex-end",
		// flexDirection: "row",
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
		marginBottom: -4,
		// height: "100%"
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
	messageBottom: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "space-between",
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

interface MessageImageBlockProps {
	images: string[];
}
const messageImBlockStyles = StyleSheet.create({
	mesImage: {
		width: 83,
		height: 83,
		borderRadius: 5,
	},
	extendedMesImage: {
		width: 126,
	},
	mesImageBlock: {
		maxWidth: 260,
		gap: 8,
		alignItems: "center",
	},
	mesImagesRow: {
		flexDirection: "row",
		gap: 8,
	},
});

function MessageImageBlock(props: MessageImageBlockProps) {
	const { images } = props;
	if (!images.length) return;
	const SCHEMA = [2, 3, 2];
	const row1 = images.splice(0, SCHEMA[0]);
	const row2 = images.splice(0, SCHEMA[1]);
	const row3 = images.splice(0, SCHEMA[2]);
	return (
		<View style={messageImBlockStyles.mesImageBlock}>
			<View style={messageImBlockStyles.mesImagesRow}>
				{row1.map((el, elIn) => (
					<Image
						style={[
							messageImBlockStyles.mesImage,
							messageImBlockStyles.extendedMesImage,
						]}
						source={BACK_HOST + "/media/" + el}
						key={elIn}
					/>
				))}
			</View>
			<View style={messageImBlockStyles.mesImagesRow}>
				{row2.map((el, elIn) => (
					<Image
						style={[
							messageImBlockStyles.mesImage,
							row2.length < 3 && messageImBlockStyles.extendedMesImage,
						]}
						source={BACK_HOST + "/media/" + el}
						key={elIn}
					/>
				))}
			</View>
			<View style={messageImBlockStyles.mesImagesRow}>
				{row3.map((el, elIn) => (
					<Image
						style={[
							messageImBlockStyles.mesImage,
							messageImBlockStyles.extendedMesImage,
						]}
						source={BACK_HOST + "/media/" + el}
						key={elIn}
					/>
				))}
			</View>
		</View>
	);
}

function Message(props: MessageProps) {
	const { data, myMessage, previousMessageDate, firstMessage, unread, readByBoth } = props;
	let name = "";
	if (data.sender.username) {
		name = data.sender.username;
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
						{!myMessage && <Text style={styles.messageUsername}>{name}</Text>}
						<MessageImageBlock images={data.messageImages.map((el) => el.image)} />
						<View style={styles.messageBottom}>
							<Text style={styles.messageContent}>{data.text}</Text>
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

interface ImagesPreparationBlockProps {
	images: string[];
	removeImage: (imageUri: string) => void;
}

const stylesImPrepBlock = StyleSheet.create({
	imPrepBlock: {
		width: "100%",
		padding: 10,
		flexDirection: "row",
		gap: 5,
		flexWrap: "wrap",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	imageBlock: {
		width: 115,
		height: 115,
		borderColor: COLORS.blue20,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		position: "relative",
	},
	image: {
		width: 115,
		height: 115,
		objectFit: "cover",
		borderRadius: 10,
	},
	extendedBlock: {
		width: 160,
	},
	overExtendedBlock: {
		width: 200,
	},
	cancelButton: {
		backgroundColor: COLORS.plum50,
		padding: 2,
		borderRadius: 1234,
		borderColor: COLORS.blue,
		borderStyle: "solid",
		borderWidth: 1,
		position: "absolute",
		top: 2,
		right: 0,
	},
});

function ImagesPreparationBlock(props: ImagesPreparationBlockProps) {
	const { images, removeImage } = props;
	const PER_ROW = 3;
	return (
		<View style={stylesImPrepBlock.imPrepBlock}>
			{images.map((el, elIn) => {
				const row = Math.floor(elIn / PER_ROW);
				const isBlockLimit = images.slice(row * 3, (row + 1) * 3).length < PER_ROW;
				const isOverExtended = images.slice(row * 3, (row + 1) * 3).length === 1;
				return (
					<View
						style={[
							stylesImPrepBlock.imageBlock,
							isOverExtended
								? stylesImPrepBlock.overExtendedBlock
								: isBlockLimit && stylesImPrepBlock.extendedBlock,
						]}
						key={elIn}
					>
						<Image
							source={el}
							style={[
								stylesImPrepBlock.image,
								isOverExtended
									? stylesImPrepBlock.overExtendedBlock
									: isBlockLimit && stylesImPrepBlock.extendedBlock,
							]}
						/>
						<TouchableOpacity
							style={stylesImPrepBlock.cancelButton}
							onPress={() => {
								removeImage(el);
							}}
						>
							<Icons.CrossIcon />
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
}

interface IsOnlineTextProps {
	userId: number;
}

function OnlineText(props: IsOnlineTextProps) {
	const { userId } = props;
	const { contactsUserIds } = useFriendContext();
	const [isOnline, setIsOnline] = useState(false);
	useEffect(() => {
		if (contactsUserIds) {
			setIsOnline(!!contactsUserIds.get(userId));
			return;
		}
		setIsOnline(false);
	}, [contactsUserIds]);
	return <Text style={styles.topPersonal}>{isOnline ? "В мережі" : "Не в мережі"}</Text>;
}

interface OnlineGroupInfoProps {
	isFocused: boolean;
}

function OnlineGroupInfo(props: OnlineGroupInfoProps) {
	const { isFocused } = props;
	const [data, setData] = useState<GroupOnlineData | null>();
	useEffect(() => {
		if (isFocused) {
			SocketActions.listenToGroupOnlineUpdate((membersTotal, membersOnline) => {
				setData({ membersTotal, membersOnline });
			});
		} else {
			SocketActions.removeToGroupOnlineUpdateListener();
		}
	}, [isFocused]);
	return (
		<Text style={styles.topPersonal}>
			{`${data?.membersTotal ? data.membersTotal : 1} учасники, ${data?.membersOnline ? data.membersOnline : 1} в мережі`}
		</Text>
	);
}

export default function ChatScreen() {
	const [messageText, setMessageText] = useState<string>("");
	const { currentChatId, setCurrentChatId } = useFriendContext();
	const { chatIdData } = useLocalSearchParams();
	const [isPersonal, chatId] = Array.isArray(chatIdData)
		? chatIdData[0].split("h")
		: chatIdData.split("h");
	const [unreadShow, setUnreadShow] = useState(true);
	const router = useRouter();
	const { user, token } = useUserContext();
	const { data: chatData } =
		isPersonal === "1"
			? useGetPersonalChatQuery({ userId: +chatId })
			: useGetGroupChatQuery({ chatId: +chatId });
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [sendMessageF] = useSendMessageWithImagesMutation();
	function sendMessage() {
		const text = messageText.trim();
		if (!text.length && !images.length) return;
		setUnreadShow(false);
		console.log("Sending message");
		setMessageText("");
		setImages([]);
		sendMessageF({
			senderId: user!.id,
			chatId: +chatData!.id,
			text: text,
			messageImages: images,
		});
	}
	const data = {
		username: chatData ? chatData.name : "Loading...",
		avatar: getAva(chatData?.avatar),
		isOnline: false,
	};
	const isFocused = useIsFocused();
	const [markMessage] = useMarkMessageMutation();
	// useEffect(() => {
	// 	let messaga: MessageFull[] = [];
	// 	if (Array.isArray(chatData?.messages)) {
	// 		messaga = [...chatData.messages];
	// 	}
	// 	if (Array.isArray(additionalMessages)) {
	// 		messaga = [...messaga, ...additionalMessages];
	// 	}
	// 	setMessagesFull(messaga.toReversed());
	// }, [chatData?.messages, additionalMessages]);
	function messageReceiverHandler(msg: NewMessage) {
		markMessage({ messageId: msg.id });
	}
	useEffect(() => {
		if (isFocused) {
			console.log("Mount");
			SocketActions.listenToNewMessage(messageReceiverHandler);
		} else {
			if (!chatData?.id) return;
			console.log("Dismount");
			SocketActions.leaveChat(+chatData.id);
			SocketActions.removeToNewMessageListener();
		}
	}, [isFocused]);

	function sendMessagesRead() {
		if (!chatData || !user) return;
		for (let messageInd = chatData.messages.length - 1; messageInd >= 0; messageInd--) {
			if (chatData.messages[messageInd].messageReaders.some((u) => u.user.id === user.id)) {
				break;
			}
			markMessage({ messageId: chatData.messages[messageInd].id });
		}
	}

	useEffect(() => {
		if (isFocused) {
			if (!chatData) return;
			setCurrentChatId(+chatData.id);
			FriendApiActions.readChatCompletely(dispatch, isPersonal !== "1", chatData.id);
			FriendApiActions.readChatMessages(
				dispatch,
				isPersonal !== "1",
				isPersonal === "1" ? +chatId : chatData.id,
				user!.id,
			);
			sendMessagesRead();
		} else {
			setCurrentChatId(null);
		}
	}, [isFocused, chatData]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!chatData?.id) return;
		SocketActions.enterChat(+chatData.id);
	}, [chatData]);

	const [images, setImages] = useState<string[]>([]);
	const [deleteChat] = useDeleteChatMutation();
	async function getImages() {
		console.log("Choosing images with limit of ", IMAGES_PER_MESSAGE_LIMIT - images.length);
		const limit = IMAGES_PER_MESSAGE_LIMIT - images.length;
		if (!limit) return;
		const result = await pickImage(false, {
			selectionLimit: limit,
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
	if (chatData && Array.isArray(chatData.messages)) {
		for (let msg of chatData?.messages) {
			if (!msg.messageReaders.some((i) => i.user.id === user?.id)) {
				unread = msg.id;
				break;
			}
		}
	}
	const [editOpened, setEditOpened] = useState(false);
	const messagesLength = chatData?.messages?.length;
	return (
		<View style={{ backgroundColor: "#FAF8FF", height: "100%" }}>
			<CreateGroupModal
				modalVisible={editOpened}
				closeModal={() => {
					setEditOpened(false);
				}}
				onClose={() => {
					setEditOpened(false);
				}}
				editData={{
					chatId: chatData?.id ? chatData.id : -1,
					name: chatData?.name ? chatData?.name : "Unnamed",
					avatar: chatData?.avatar && BACK_HOST + "/media/original/" + chatData?.avatar,
					members: chatData?.memberIds
						? chatData.memberIds.filter((el) => el != user?.id)
						: [],
				}}
				necessaryUsers={[]}
			/>
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
						choosed: isPersonal === "1",
					},
					{
						name: "Групові чати",
						href: "chats_add/groups",
						icon: EnhancedIcons.groupsIcon(),
						choosed: isPersonal === "0",
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
										setEditOpened(true);
									}
								}}
							>
								<Image style={styles.topAvatar} source={data.avatar} />
								<View style={styles.topTextData}>
									<Text style={styles.topUsername}>{data.username}</Text>
									{isPersonal === "0" ? (
										<OnlineGroupInfo isFocused={isFocused} />
									) : (
										<OnlineText userId={1} />
									)}
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
						{dropdownVisible &&
							(!chatData?.userIsAdmin ? (
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
							) : (
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
									<TouchableOpacity
										style={dropDownStyles.dataBlock}
										onPress={() => {
											setEditOpened(true);
										}}
									>
										<Icons.PencilIcon />
										<Text style={dropDownStyles.dataText}>
											Редагувати групу
										</Text>
									</TouchableOpacity>
									<View style={dropDownStyles.dataBorder} />
									<TouchableOpacity style={dropDownStyles.dataBlock}>
										<Icons.TrashIcon />
										<Text
											style={dropDownStyles.dataText}
											onPress={() => {
												router.push("/chats_add/groups");
												deleteChat({ chatId: chatData!.id }).unwrap();
											}}
										>
											Видалити чат
										</Text>
									</TouchableOpacity>
								</View>
							))}
					</View>
					<View style={styles.borderView} />
				</View>
				<View style={{ flex: 1, justifyContent: "flex-end" }}>
					<FlatList
						style={{ width: "100%", height: "90%", paddingBottom: 0 }}
						contentContainerStyle={{ minHeight: "90%", gap: 8, paddingVertical: 24 }}
						data={chatData?.messages ? chatData.messages.toReversed() : []}
						showsVerticalScrollIndicator={false}
						horizontal={false}
						renderItem={({ index, item }) => {
							// console.log("Item", item)
							// console.log("Displaying message with id", item.id)
							// console.log("No user?", user)
							return (
								<View style={{ width: "100%" }} key={`messageWrapper${item.id}`}>
									{/* {((createNewUnread || force) && unreadShow && unread) && <UnreadBlock />} */}
									<Message
										data={item}
										myMessage={user?.id === item.senderId}
										previousMessageDate={
											index === 0
												? null
												: `${chatData?.messages[messagesLength! - index].created_at}`
										}
										firstMessage={index + 1 === chatData?.messages?.length}
										unread={item.id === unread && unreadShow}
										readByBoth={item.messageReaders.length > 1}
									/>
								</View>
							);
						}}
						keyExtractor={(item) => `${item.id}`}
						inverted
					/>
					<ImagesPreparationBlock
						images={images}
						removeImage={(imageUrl: string) => {
							let newImages = [...images];
							const index = newImages.indexOf(imageUrl);
							if (index === -1) return;
							if (newImages.includes(undefined!)) {
								setImages([]);
								return;
							}
							newImages.splice(index, 1);
							setImages(() => newImages);
						}}
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
						<TouchableOpacity style={styles.imageButton} onPress={getImages}>
							<Icons.GaleryIcon />
						</TouchableOpacity>
						<TouchableOpacity style={styles.planeButton} onPress={sendMessage}>
							<Icons.PlaneIcon color={COLORS.white} />
						</TouchableOpacity>
					</View>
				</View>
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
			/>
		</View>
	);
}
