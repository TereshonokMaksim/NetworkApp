import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Icons } from "../../../../shared/ui/icons/icons";
import { PostImage, PostToShow } from "../../api/post-api.types";
import { BACK_HOST } from "../../../../shared/constants/api-data";
import { styles, imageListStyles, editSubWindowStyles } from "./show-post.styles";
import { useState } from "react";
import { useDeletePostMutation, useEditPostMutation } from "../../api/post-api";
import { CreatePostModal } from "../createPostModal/createPostModal";
import { useUserContext } from "../../../../shared/context/user";

interface PostShowProps {
	post: PostToShow;
}

interface PostShowImagesProps {
	images: PostImage[];
}

function PostShowImages(props: PostShowImagesProps) {
	const { images } = props;
	const len = images.length;
	return (
		<View style={imageListStyles.list}>
			{!!len && (
				<View style={imageListStyles.block}>
					{images.slice(0, 2).map((el) => {
						return <Image
							style={imageListStyles.image}
							source={`${BACK_HOST}/media/${el.originalImagePath}`}
							placeholder={`${BACK_HOST}/media/${el.compressedImagePath}`}
							key={el.id}
						/>
					})}
				</View>
			)}
			{len > 2 && (
				<View style={imageListStyles.block}>
					{images.slice(2, 5).map((el) => (
						<Image
							style={imageListStyles.image}
							source={`${BACK_HOST}/media/${el.originalImagePath}`}
							placeholder={`${BACK_HOST}/media/${el.compressedImagePath}`}
							key={el.id}
						/>
					))}
				</View>
			)}
			{len > 5 && (
				<View style={imageListStyles.block}>
					{images.slice(5).map((el) => (
						<Image
							style={imageListStyles.image}
							source={`${BACK_HOST}/media/${el.originalImagePath}`}
							placeholder={`${BACK_HOST}/media/${el.compressedImagePath}`}
							key={el.id}
						/>
					))}
				</View>
			)}
		</View>
	);
}

export function PostShow(props: PostShowProps) {
	const { post } = props;
	const { user } = useUserContext()
	const [tripleShown, setTripleShown] = useState(false);
	const [showEditPost, setShowEditPost] = useState(false);
	const [deletePost] = useDeletePostMutation();

	return (
		<View style={styles.postWhole}>
			<CreatePostModal
				editMode={true}
				editData={{
					postId: post.id,
					images: post.images.map((el) => `${BACK_HOST}/media/original/${el.originalImagePath}`),
					links: post.links,
					tagIds: post.tags.map((el) => el.id),
					title: post.title,
					topic: post.topic,
					text: post.text,
				}}
				visible={showEditPost}
				onClose={() => {
					setShowEditPost(false);
				}}
			/>
			{tripleShown && (
				<View style={editSubWindowStyles.subWhole}>
					<View style={editSubWindowStyles.tripleDotContainer}>
						<TouchableOpacity
							onPress={() => {
								setTripleShown(false);
							}}
						>
							<Icons.TripleDotIcon />
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={editSubWindowStyles.subMainButton}
						onPress={() => {
							setShowEditPost(true);
							setTripleShown(false);
						}}
					>
						<Icons.PencilIcon />
						<Text style={editSubWindowStyles.subMainButtonText}>Редагувати пост</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={editSubWindowStyles.subMainButton}
						onPress={() => {
							deletePost({ id: post.id });
							setTripleShown(false);
						}}
					>
						<Icons.TrashIcon />
						<Text style={editSubWindowStyles.subMainButtonText}>Видалити пост</Text>
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.postHeader}>
				<View style={styles.postHeaderHead}>
					<View style={styles.postHeaderLeft}>
						<Image
							style={styles.postHeaderAva}
							source={
								post.authorAvatarPath
									? `${BACK_HOST}/media/original/${post.authorAvatarPath}`
									: require("../../../../assets/images/defaultAva.png")
							}
						/>
						<Text style={styles.postHeaderUsername}>{post.authorUsername}</Text>
					</View>
					{post.authorId === user?.id && <TouchableOpacity onPress={() => {setTripleShown(!!(post.authorId === user?.id))}}>
						<Icons.TripleDotIcon />
					</TouchableOpacity>}
				</View>
			</View>
			<View style={styles.postBody}>
				<Text style={styles.postTitle}>{post.title}</Text>
				<View style={styles.descBlockFull}>
					<View style={styles.descBlock}>
						<Text style={styles.postText}>{post.text}</Text>
						<View style={styles.postTags}>
							{post.tags.map((el) => (
								<Text style={styles.postTagEl} key={el.id}>
									#{el.name}
								</Text>
							))}
						</View>
					</View>
					<View style={styles.linksBlock}>
						{post.links.map((el, elIn) => {
							return (
								<Text style={styles.link} key={elIn}>
									{el}
								</Text>
							);
						})}
					</View>
				</View>
				<PostShowImages images={post.images} />
				<View style={styles.footerInfo}>
					<View style={styles.footerTop}>
						<View style={styles.infoPart}>
							{<Icons.HeartIcon />}
							<Text style={styles.infoText}>{post.hearted} Вподобань</Text>
						</View>
						<View style={styles.infoPart}>
							{<Icons.LikeIcon />}
							<Text style={styles.infoText}>{post.hearted} Вподобань</Text>
						</View>
					</View>
					<View style={styles.infoPart}>
						{<Icons.EyeOpenedIcon />}
						<Text style={styles.infoText}>{post.hearted} Переглядів</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
