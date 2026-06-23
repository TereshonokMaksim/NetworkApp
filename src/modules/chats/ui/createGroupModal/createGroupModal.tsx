import { View, Modal, TouchableOpacity, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Image } from "expo-image";
import { Button } from "../../../../shared/ui/button";
import { COLORS } from "../../../../shared/constants/colors";
import { useEffect, useState } from "react";
import { pickImage } from "../../../../shared/tools/img-pick";
import { useGetFriendsQuery, useCreateGroupChatMutation } from "../../../friends/api/friends-api";
import { BACK_HOST } from "../../../../shared/constants/api-data";
import { UserProfile } from "../../../friends/types/friends.types";
import { useRouter } from "expo-router";
import { AvatarWithIndicator } from "../../../../shared/ui/avatar-with-indicator";
import { FriendApiActions } from "../../../friends/api/friends-api-actions";
import { useAppDispatch } from "../../../../shared/api/dispatcher";
import * as FileSystem from "expo-file-system/legacy";
import { useUserContext } from "../../../../shared/context/user";
import { compressImage } from "../../../../shared/tools/img-compress";
// import { us }

function getAva(avatar: string | null | undefined) {
	if (avatar) {
		return BACK_HOST + "/media/original/" + avatar;
	}
	return require("../../../../assets/images/defaultAva.png");
}

export type CreateGroupModalProps = {
	modalVisible: boolean;
	closeModal: () => void;
	onClose: () => void;
	editData?: {
        chatId: number
		name: string;
		avatar: string | null | undefined;
		members: number[];
	};
	necessaryUsers: UserProfile[];
};

export function CreateGroupModal(props: CreateGroupModalProps) {
	const { modalVisible, closeModal: closeModalFun, onClose, editData, necessaryUsers } = props;
	function closeModal() {
		closeModalFun();
		setName("");
		setImage("");
		setSearch("");
		setMembers([]);
		setMemberData([]);
		setAddMemberOpened(!editData);
	}
	// console.log("SPam")
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [search, setSearch] = useState("");
	const { data: friends } = useGetFriendsQuery({});
	const [potentialMembers, setPotentialMembers] = useState<UserProfile[]>([]);
	const [members, setMembers] = useState<number[]>([]);
	const [memberData, setMemberData] = useState<UserProfile[]>([]);
	const [addMemberOpened, setAddMemberOpened] = useState(!editData);
	// console.log(memberData, members)
	useEffect(() => {
		if (editData) {
			setName(editData.name);
			setMembers(editData.members);
			if (editData.avatar) {
				setImage(editData.avatar);
			}
		}
	}, [editData]);
	useEffect(() => {
		if (editData && potentialMembers) {
			const memData = [];
			for (const memId of editData.members) {
				memData.push(potentialMembers.filter((el) => el.id === memId)[0]);
			}
			setMemberData(memData);
		}
	}, [potentialMembers]);
	useEffect(() => {
		setPotentialMembers(() => {
			let users: UserProfile[] = [];
			if (friends) {
				users = [...users, ...friends];
			}
			if (necessaryUsers) {
				users = [...users, ...necessaryUsers];
			}
			return users;
		});
	}, [friends, necessaryUsers]);
	async function setAvatar() {
		const result = await pickImage(false, {
			allowsMultipleSelection: false,
			allowsEditing: false,
			mediaTypes: "images",
		});
		if (result.status === "error") {
			console.log("User cancelled image selection.");
			return;
		}
		const compressed = await compressImage(result.assets[0].uri, 300, 0.5)
		setImage(compressed)
	}
	function getAutoAvatar() {
		const i = name.trim();
		function onlyCapitalLetters(str: string) {
			return str.replace(/[^A-Z]+/g, "");
		}
		if (i.length < 1) {
			return "NG";
		}
		if (i.split(" ").length > 1) {
			const n = i.toUpperCase().split(" ");
			return n[0][0] + n[1][0];
		}
		if (i.split("_").length > 1) {
			const n = i.toUpperCase().split("_");
			return n[0][0] + n[1][0];
		}
		if (onlyCapitalLetters(i).length > 1) {
			return onlyCapitalLetters(i).substring(0, 2);
		}
		return i[0];
	}
	// const dispatcher = useAppDispatch()
	const { token } = useUserContext()
	const [submitData] = useCreateGroupChatMutation();
	// async function preemptiveSave(imageUrl: string){
	// 	const newUri = FileSystem.documentDirectory + `${Date.now()}.jpg`;

	// 	await FileSystem.copyAsync({
	// 		from: imageUrl,
	// 		to: newUri,
	// 	});
	// 	setImage(newUri)
	// }
	async function submit() {
		let data;
		const info = await FileSystem.getInfoAsync(image);

		console.log("FILE INFO", info);
		const ERRORS_ALLOWED = 3
		try {
			if (editMode){
				// FriendApiActions.updateGroupChat(dispatcher, editData.chatId)
				for (let i = 0; i < ERRORS_ALLOWED; i++){
					try {
						data = await submitData({
							name: name,
							avatar: image.startsWith("file") ? image : null,
							members: members,
							chatId: editData.chatId
						}).unwrap()
						break
					}
					catch (error) {
						console.log("ohno")
						if (i === ERRORS_ALLOWED - 1) console.log("Request didnt succeed")
					}
				}
			}
			else {
				for (let i = 0; i < ERRORS_ALLOWED; i++){
					try {
						data = await submitData({
							name: name,
							avatar: image.startsWith("file") ? image : null,
							members: members
						}).unwrap()
						break
					}
					catch (error) {
						console.log("ohno")
						if (i === ERRORS_ALLOWED - 1) console.log("Request didnt succeed")
					}
				}
			}
		}
		catch (error){
			console.log("Error happened :(")
			console.log(JSON.stringify(error, null, 2))
		}
		console.log("Happened")
		console.log(data)
		router.push("chats_add/groups");
		closeModal();
	}
	const router = useRouter();
	const editMode = !!editData;
	return (
		<Modal
			visible={modalVisible}
			animationType="none"
			transparent={true}
			onRequestClose={() => {
				closeModal();
				onClose();
			}}
			statusBarTranslucent
		>
			<View style={styles.modalBg}>
				{!addMemberOpened ? (
					<View style={styles.modalWin}>
						<View style={styles.crossReplace}>
							<Icons.CrossIcon onPress={closeModal} />
						</View>
						<Text style={styles.modalTitle}>
							{editMode ? "Редагування групи" : "Нова група"}
						</Text>
						<View style={styles.inputModal}>
							<Text style={styles.modalLabel}>Назва</Text>
							<TextInput
								style={styles.modalInput}
								placeholderTextColor={COLORS.blue10}
								onChangeText={setName}
								value={name}
								defaultValue={editData ? editData.name : ""}
							/>
						</View>
						<View style={styles.imageModal}>
							{image.length > 4 ? (
								<Image source={image} style={styles.modalAva} />
							) : (
								<View style={styles.autoGroupAvatar}>
									<Text style={styles.autoGroupAvatarText}>
										{getAutoAvatar()}
									</Text>
								</View>
							)}
							<View style={styles.modalAvaButtons}>
								<TouchableOpacity style={styles.modalButton} onPress={setAvatar}>
									<Icons.PlusIcon color={COLORS.plum} />
									<Text style={styles.buttText}>Додати фото</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.modalButton}>
									<Icons.GaleryIcon color={COLORS.plum} />
									<Text style={styles.buttText}>Оберіть фото</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.modalMembers}>
							<View style={styles.modalMemTop}>
								<Text style={styles.modalMemTitle}>Учасники</Text>
								<TouchableOpacity style={styles.modalButton}>
									<Icons.PlusIcon color={COLORS.plum} />
									<Text
										style={styles.buttText}
										onPress={() => {
											setAddMemberOpened(!addMemberOpened);
										}}
									>
										Додайте учасника
									</Text>
								</TouchableOpacity>
							</View>
							<FlatList
								style={{ width: "100%" }}
								contentContainerStyle={{ paddingVertical: 8 }}
								data={Array.isArray(memberData) ? memberData : []}
								showsVerticalScrollIndicator={true}
								horizontal={false}
								renderItem={({ index, item }) => {
									return (
										<View style={styles.potMember}>
											<View style={styles.potMemberData}>
												<Image
													source={getAva(item.avatar)}
													style={styles.potMemberAva}
												/>
												<Text style={styles.potMemberName}>
													{item.username}
												</Text>
											</View>
											<TouchableOpacity
												onPress={() => {
													const newData = [...memberData];
													newData.splice(newData.indexOf(item), 1);
													const newIds = [...members];
													newIds.splice(newIds.indexOf(item.id), 1);
													setMemberData(newData);
													setMembers(newIds);
												}}
											>
												<Icons.TrashIcon />
											</TouchableOpacity>
										</View>
									);
								}}
								keyExtractor={(item) => `${item.id}`}
							/>
						</View>
						<View style={styles.modalButtonsAll}>
							<Button
								variant="secondary"
								title="Назад"
								bordersOn={true}
								paddingVar="small"
								onPress={
									editData
										? closeModal
										: () => {
												setAddMemberOpened(!addMemberOpened);
											}
								}
							/>
							<Button
								variant="primary"
								title={editMode ? "Зберегти зміни" : "Створити групу"}
								bordersOn={false}
								paddingVar="small"
								onPress={submit}
							/>
						</View>
					</View>
				) : (
					<View style={styles.modalWin}>
						<View style={styles.crossReplace}>
							<Icons.CrossIcon onPress={closeModal} />
						</View>
						<Text style={styles.modalTitle}>
							{editMode ? "Додати учасника" : "Нова група"}
						</Text>
						<View style={styles.inputModalBlock}>
							<Icons.GlassIcon />
							<TextInput
								style={styles.modalInputText}
								placeholderTextColor={COLORS.blue10}
								onChangeText={setSearch}
								value={search}
							/>
						</View>
						<View style={styles.selectedMembersNumberReplace}>
							<Text style={styles.selectedMembersNumber}>
								Вибрано: {members.length}
							</Text>
						</View>
						<FlatList
							style={{ width: "100%" }}
							contentContainerStyle={{ paddingVertical: 8 }}
							data={Array.isArray(potentialMembers) ? potentialMembers : []}
							showsVerticalScrollIndicator={true}
							horizontal={false}
							renderItem={({ index, item }) => {
								return (
									<View style={[styles.potMember, styles.potBorders]}>
										<View style={styles.potMemberData}>
											<AvatarWithIndicator
												originalImagePath={item.avatar}
												compressedImagePath={item.avatar}
												imageStyles={styles.potMemberAva}
												indicatorStyles={{
													width: 12,
													height: 12,
													right: 2,
													bottom: 2
												}}
												styles={styles.potMemberAva}
												isOnline = "auto"
												userId = {item.id}
											/>
											<Text style={styles.potMemberName}>
												{item.username}
											</Text>
										</View>
										<TouchableOpacity
											style={styles.potMemberApprove}
											onPress={() => {
												const newData = [...memberData];
												if (members.includes(item.id)) {
													const newMembers = [...members];
													newMembers.splice(members.indexOf(item.id), 1);
													setMemberData(newData);
													const bad = newData.filter(
														(el) => el.id === item.id,
													);
													if (bad[0]) {
														newData.splice(newData.indexOf(bad[0]), 1);
														setMemberData(newData);
													}
													setMembers(() => newMembers);
												} else {
													newData.push(item);
													setMembers(() => [...members, item.id]);
													setMemberData(newData);
												}
											}}
										>
											{members.includes(item.id) && (
												<Image
													source={require("../../../../assets/images/checkmark.png")}
													style={{ width: 10, height: 10 }}
												/>
											)}
										</TouchableOpacity>
									</View>
								);
							}}
							keyExtractor={(item) => `${item.id}`}
						/>
						<View style={styles.modalButtonsAll}>
							<Button
								variant="secondary"
								title="Скасувати"
								bordersOn={true}
								paddingVar="small"
								onPress={
									editData
										? () => {
												setAddMemberOpened(!addMemberOpened);
											}
										: closeModal
								}
							/>
							<Button
								variant="primary"
								title="Зберегти"
								bordersOn={false}
								paddingVar="small"
								onPress={() => {
									if (members.length > 1) setAddMemberOpened(!addMemberOpened);
								}}
								style = {members.length <= 1 && {backgroundColor: COLORS.blue20}}
								disabled = {members.length <= 1}
							/>
						</View>
					</View>
				)}
			</View>
		</Modal>
	);
}
