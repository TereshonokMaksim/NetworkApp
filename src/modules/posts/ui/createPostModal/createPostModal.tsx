import type { PostTag, CreatePost, EditPost } from "../../api/post-api.types";
import { View, ScrollView, Text, TextInput, Modal, TouchableOpacity, Alert } from "react-native";
import { stylesImage, stylesModal, stylesTag } from "./create-post-modal.styles";
import { pickImage } from "../../../../shared/tools/img-pick";
import { HeaderButton } from "../../../../shared/ui/header-button/HeaderButton";
import { Image } from "expo-image";
import { Icons } from "../../../../shared/ui/icons/icons";
import { useCreatePostMutation, useEditPostMutation } from "../../api/post-api";
import { useGetAllTagsQuery } from "../../../tags/api"
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { useEffect, useState } from "react";

interface TagComponentProps {
	tag: PostTag;
	selected: boolean;
	onPress: () => void;
}

function TagComponent(props: TagComponentProps) {
	const { tag, selected, onPress } = props;
	return (
		<TouchableOpacity
			style={[stylesTag.baseTagBg, selected && stylesTag.selectedTagBg]}
			onPress={onPress}
		>
			<Text style={[stylesTag.tagText, selected && stylesTag.selectedTagText]}>#{tag.name}</Text>
		</TouchableOpacity>
	);
}

interface ImageComponentProps {
	uri: string;
	onDelete: () => void;
}

function ImageComponent(props: ImageComponentProps) {
	const { uri, onDelete } = props;
	return (
		<View style={stylesImage.wholeImage}>
			<Image source={uri} style = {stylesImage.imageItself} />
			<View style={stylesImage.buttonBlock}>
				<HeaderButton
					label=""
					iconLeft={<Icons.TrashIcon />}
					onPress={() => {
						onDelete();
					}}
                    style = {{backgroundColor: "#fff"}}
				/>
			</View>
		</View>
	);
}

interface CreatePostModalProps {
    editMode?: boolean
    editData?: EditPost
	visible: boolean;
	onClose: () => void;
}

export function CreatePostModal(props: CreatePostModalProps) {
	const { visible, onClose, editMode, editData } = props;
	const { data: tags, isLoading: tagsLoading } = useGetAllTagsQuery({});
    const [ inited, setInited ] = useState(false)
	const [ editPostMutation ] = useEditPostMutation();
	const [ createPostMutation ] = useCreatePostMutation();
    const [activatedTags, setActivatedTags] = useState<number[]>([])
    const [activatedTagNames, setActivatedTagNames] = useState<string[]>([])
    const [images, setImages] = useState<string[]>([])
	const { control, setValue, formState, handleSubmit, clearErrors, getValues } = useForm<CreatePost>(
        { defaultValues: 
            { links: [""], 
              images: [], 
              tagIds: [] 
            } 
        });
    useEffect(() => {
        if (editMode){
            setEditData(editData!)
        }
    }, [editData])
    function setEditData(data: EditPost) {
		setValue("images", [...data.images]);
		setValue("title", data.title);
		setValue("tagIds", [...data.tagIds]);
		setValue("topic", data.topic);
		setValue("text", data.text);
		setValue("links", [...data.links]);
        setImages([...data.images])
        setActivatedTags([...data.tagIds])
        // let tagNames:  = []
        // data.tagIds.map(el => {tagNames = [...tagNames, ...tags!.filter(elT => elT.id === el)]})
        // setActivatedTagNames()
		clearErrors();
    }
	function clearInputs() {
		setValue("images", []);
		setValue("title", "");
		setValue("tagIds", []);
		setValue("topic", "");
		setValue("text", "");
		setValue("links", [""]);
        setImages([])
        setActivatedTags([])
		clearErrors();
	}
	function onSubmit(data: CreatePost) {
        if (editMode){
            console.log(data)
            editPostMutation({postId: editData!.postId, ...data})
        }
        else {createPostMutation(data)}
        setInited(false)
        clearInputs()
        onClose()
    }
	return (
		<Modal
			visible={visible}
			animationType="none"
			transparent={true}
			onRequestClose={() => {
				clearInputs();
				onClose();
			}}
			statusBarTranslucent
		>
			<View style={stylesModal.overallBG}>
                <View style = {stylesModal.scrollWrapLimiter}>
                    <ScrollView
                        style={stylesModal.modalBG}
                        contentContainerStyle={stylesModal.modalContainerBG}
                    >
                        <View style={stylesModal.modalTop}>
                            <TouchableOpacity
                                onPress={() => {
                                    clearInputs();
                                    onClose();
                                }}
                            >
                                <Icons.CrossIcon />
                            </TouchableOpacity>
                        </View>
                        <Text style={stylesModal.modalTitle}>{editMode ? "Редагування публікації" : "Створення публікації"}</Text>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        placeholder="Введіть назву публікації"
                                        inputMode="text"
                                        keyboardType="default"
                                        autoCapitalize="sentences"
                                        autoCorrect={true}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label="Введіть назву"
                                        error={fieldState.error?.message}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="topic"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        placeholder="Напишіть тему публікації"
                                        inputMode="text"
                                        keyboardType="default"
                                        autoCapitalize="sentences"
                                        autoCorrect={true}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label="Тема публікації"
                                        error={fieldState.error?.message}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="tagIds"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <View style={stylesModal.tagBlock}>
                                        {tagsLoading || !Array.isArray(tags) ? (
                                            <Text style={stylesModal.tagPlaceholder}>
                                                Будь ласка зачекайте...
                                            </Text>
                                        ) : (
                                            tags.map((el) => {
                                                const isSelected = activatedTags.includes(el.id);
                                                return (
                                                    <TagComponent
                                                        key = {el.id}
                                                        tag={el}
                                                        selected={isSelected}
                                                        onPress={() => {
                                                            if (isSelected) {
                                                                field.value.splice(
                                                                    field.value.indexOf(el.id),
                                                                    1,
                                                                );
                                                                const selectedTags = [...activatedTags]
                                                                selectedTags.splice(
                                                                    selectedTags.indexOf(el.id),
                                                                    1,
                                                                );
                                                                const selectedSTags = [...activatedTagNames]
                                                                selectedSTags.splice(
                                                                    selectedSTags.indexOf(el.name),
                                                                    1,
                                                                );
                                                                setActivatedTags(selectedTags)
                                                                setActivatedTagNames(selectedSTags)
                                                                return;
                                                            }
                                                            setActivatedTags([...activatedTags, el.id])
                                                            setActivatedTagNames([...activatedTagNames, el.name])
                                                            field.value.push(el.id);
                                                        }}
                                                    />
                                                );
                                            })
                                        )}
                                    </View>
                                );
                            }}
                        />
                        <Controller
                            name="text"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <View style = {stylesModal.areaTextModal}>
                                        <TextInput
                                            style={stylesModal.areaTextInput}
                                            placeholder="Напишіть опис публікації"
                                            inputMode="text"
                                            keyboardType="default"
                                            autoCapitalize="sentences"
                                            autoCorrect={true}
                                            onChangeText={field.onChange}
                                            value={field.value}
                                            multiline={true}
                                        />
                                        {!!activatedTagNames.length && <Text style = {stylesModal.tagsAreaModal}>
                                            #{activatedTagNames.join(' #')}
                                        </Text>}
                                    </View>
                                );
                            }}
                        />
                        <Controller
                            name="links"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <View style = {stylesModal.linksBlockFull}>
                                        <Text style={stylesModal.linksLabel}>Посилання</Text>
                                        {field.value.map((el, elIndex) => {
                                            return (
                                                <View style={stylesModal.linksBlock} key = {elIndex}>
                                                    <TextInput
                                                        style={stylesModal.linksInput}
                                                        placeholder="Посилання"
                                                        inputMode="text"
                                                        keyboardType="url"
                                                        autoCapitalize="none"
                                                        autoCorrect={true}
                                                        onChangeText={(value) => {
                                                            const linksCopy = [...field.value];
                                                            linksCopy[elIndex] = value;
                                                            setValue("links", linksCopy);
                                                        }}
                                                        value={el}
                                                        key={elIndex}
                                                    />
                                                    {elIndex == field.value.length - 1 && (
                                                        <HeaderButton
                                                            label=""
                                                            iconLeft={<Icons.PlusIcon />}
                                                            onPress={() => {
                                                                setValue("links", [...field.value, ""]);
                                                            }}
                                                        />
                                                    )}
                                                    {elIndex != 0 && (
                                                        <HeaderButton
                                                            label=""
                                                            iconLeft={<Icons.CrossIcon />}
                                                            onPress={() => {
                                                                const linksCopy = [...field.value];
                                                                delete linksCopy[elIndex];
                                                                setValue("links", linksCopy);
                                                            }}
                                                        />
                                                    )}
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            }}
                        />
                        <View style={stylesModal.imagesBlock}>
                            {images.map((el, elIn) => {
                                return (
                                    <ImageComponent
                                        key = {elIn}
                                        uri={el}
                                        onDelete={() => {
                                            const imagesCopy = [...getValues("images")];
                                            delete imagesCopy[elIn];
                                            setValue("images", imagesCopy);
                                            setImages(imagesCopy)
                                        }}
                                    />
                                );
                            })}
                        </View>
                        <View style={stylesModal.bottomButtonsBlock}>
                            <HeaderButton
                                label=""
                                iconLeft={<Icons.GaleryIcon />}
                                onPress={async () => {
                                    const result = await pickImage(false, {
                                        selectionLimit: 1,
                                        allowsMultipleSelection: false,
                                        allowsEditing: false,
                                        mediaTypes: "images",
                                    });
                                    if (result.status === "error") {
                                        Alert.alert("IMAGE DIED AAAAAAAAAAAAAAAAAAA", result.message);
                                        return;
                                    }
                                    const image = result.assets[0];
                                    const newImageArray = [...getValues("images"), image.uri]
                                    setValue("images", newImageArray);
                                    setImages(newImageArray)
                                }}
                            />
                            <HeaderButton label="" iconLeft={<Icons.SmileIcon />} />
                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                style={stylesModal.submitButton}
                            >
                                <Text style={stylesModal.submitButtonText}>{editMode ? "Зберегти" : "Публікація"}</Text>
                                <Icons.PlaneIcon />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
			</View>
		</Modal>
	);
}
