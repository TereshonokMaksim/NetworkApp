import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Icons } from "../../../../shared/ui/icons/icons";
import { PostImage, PostToShow } from "../../api/post-api.types";
import { BACK_HOST } from "../../../../shared/constants/api-data";
import { styles, imageListStyles } from "./show-post.styles";

interface PostShowProps {
	post: PostToShow;
}

interface PostShowImagesProps {
	images: PostImage[];
}

function PostShowImages(props: PostShowImagesProps) {
	const { images } = props;
	const len = images.length;
	console.log(images, !!len, images.slice(0, 2))
	return (
		<View style={imageListStyles.list}>
			{!!len && (
				<View style={imageListStyles.block}>
					{images.slice(0, 2).map((el) => (
						<Image
							style={imageListStyles.image}
							source={`${BACK_HOST}/media/${el.originalImagePath}`}
							placeholder={`${BACK_HOST}/media/${el.compressedImagePath}`}
							key={el.id}
						/>
					))}
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

	return (
		<View style={styles.postWhole}>
			<View style={styles.postHeader}>
				<View style={styles.postHeaderHead}>
					<View style={styles.postHeaderLeft}>
						<Image
							style={styles.postHeaderAva}
							source={
								post.authorAvatarPath
									? `${BACK_HOST}/media/${post.authorAvatarPath}`
									: require("../../../../assets/images/defaultAva.png")
							}
						/>
						<Text style={styles.postHeaderUsername}>{post.authorUsername}</Text>
					</View>
					<Icons.TripleDotIcon />
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
				<PostShowImages images = {post.images} />
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
