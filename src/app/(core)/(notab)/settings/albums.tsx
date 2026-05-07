import { View, Text, ScrollView, Modal, TouchableOpacity, unstable_TextAncestorContext, TextInput, Alert } from "react-native";
import { Submenu } from "../../../../shared/ui/submenu/submenu";
import { styles, modalStyles, createStyles, genericStyles, editSubWindowStyles } from "./album.styles";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Input } from "../../../../shared/ui/input";
import { HeaderButton } from "../../../../shared/ui/header-button/HeaderButton";
import { 
    useGetAlbumImagesQuery, 
    useCreateAlbumImageMutation, 
    useEditAlbumMutation, 
    useCreateAlbumMutation, 
    useGetAllUserAlbumsQuery, 
    useDeleteAlbumImageMutation, 
    useEditAlbumImageMutation,
    useDeleteAlbumMutation
} from "../../../../modules/settings/api";
import {
    useGetTagByIdQuery, 
    useGetAllTagsQuery, 
} from "../../../../modules/tags/api"
import { Album, AlbumImageForShow } from "../../../../shared/albums";
import { Image } from "expo-image"
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown"
import { Button } from "../../../../shared/ui/button";
import { useEffect, useState } from "react";
import { COLORS } from "../../../../shared/constants/colors";
import { pickImage } from "../../../../shared/tools/img-pick";
import { BACK_HOST } from "../../../../shared/constants/api-data";

interface AlbumEditData {
    albumId: number,
    name: string,
    tagId: number,
    year: number
}

type AlbumProps = {
	album: Album,
    setEditData: (data: AlbumEditData) => void
};

type AlbumImageProps = {
    image: AlbumImageForShow
}

function AlbumImageComp(props: AlbumImageProps){
    const { image } = props
    const [deleteImage] = useDeleteAlbumImageMutation({})
    const [editImage] = useEditAlbumImageMutation({})
    return (
        <View style = {styles.albumImageWhole}>
            <Image source = {`${BACK_HOST}/media/${image.originalImagePath}`} style = {styles.albumImageImage}/>
            <View style = {styles.albumImageControl}>
                <HeaderButton label = "" iconLeft = {
								image.shown ? (
									<Icons.EyeOpenedIcon/>
								) : (
									<Icons.EyeClosedIcon/>
								)
							} style = {{backgroundColor: COLORS.white}} onPress = {() => {editImage({imageId: image.id, albumId: image.albumId, shown: !image.shown})}} activeOpacity={1}/>
                <HeaderButton label = "" iconLeft = {<Icons.TrashIcon/>}  activeOpacity={1} style = {{backgroundColor: COLORS.white}} onPress = {() => {deleteImage({id: image.id, albumId: image.albumId})}}/>
            </View>
        </View>
    )
}

function AlbumComp(props: AlbumProps) {
	const { album, setEditData } = props;
    const {data: images} = useGetAlbumImagesQuery({albumId: album.id})
    const {data: tag} = useGetTagByIdQuery({id: album.tagId})
    const [editAlbum] = useEditAlbumMutation({})
    const [addAlbumImage] = useCreateAlbumImageMutation({})
    const [deleteAlbum] = useDeleteAlbumMutation()
    const [editTripleShown, setEditTripleShown] = useState(false)

    function toggleAlbumVisibility(){
        editAlbum({shown: !album.shown, albumId: album.id}) 
    }

    async function addImage(){
        const result = await pickImage(false, {
            selectionLimit: 1,
            allowsMultipleSelection: false,
            allowsEditing: false,
            mediaTypes: "images",
        });
        if (result.status === "error") {
            Alert.alert(
                "Avatar upload failed",
                result.message,
            );
            return;
        }
        addAlbumImage({image: result.assets[0].uri, albumId: album.id})
    
    }

    return (
        <View style = {styles.albumWhole}>
            {editTripleShown && (
                <View style = {editSubWindowStyles.subWhole}>
                    <View style = {editSubWindowStyles.tripleDotContainer}>
                        <TouchableOpacity onPress={() => {setEditTripleShown(false)}}>
                            <Icons.TripleDotIcon/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style = {editSubWindowStyles.subMainButton}
                        onPress = {() => {toggleAlbumVisibility(); setEditTripleShown(false)}}>
                        {album.shown ? (
                            <Icons.EyeOpenedIcon/>
                        ) : (
                            <Icons.EyeClosedIcon/>
                        )}
                        <Text style = {editSubWindowStyles.subMainButtonText}>
                            {album.shown ? (
                                "Зробити цей альбом приватним"
                            ) : (
                                "Зробити цей альбом публічним"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {editSubWindowStyles.subMainButton} onPress = {() => {setEditData({albumId: album.id, name: album.name, tagId: album.tagId, year: album.year}); setEditTripleShown(false)}}>
                        <Icons.PencilIcon/>
                        <Text style = {editSubWindowStyles.subMainButtonText}>Редагувати альбом</Text>
                    </TouchableOpacity>
                    <View style = {editSubWindowStyles.subMainBorder}/>
                    <TouchableOpacity style = {editSubWindowStyles.subMainButton} onPress = {() => {deleteAlbum({id: album.id}); setEditTripleShown(false)}}>
                        <Icons.TrashIcon/>
                        <Text style = {editSubWindowStyles.subMainButtonText}>Видалити альбом</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style = {styles.albumTop}>
                <Text style = {styles.albumName}>{album.name}</Text>
                {album.avatarOnly ? <HeaderButton label = "" text = "Додати фото" iconLeft = {<Icons.GaleryIcon/>} onPress = {addImage}/> :
                <View style = {styles.albumRight}>
                    <HeaderButton
                        label=""
                        iconLeft={
                            album.shown ? (
                                <Icons.EyeOpenedIcon/>
                            ) : (
                                <Icons.EyeClosedIcon/>
                            )
                        }
                        onPress = {toggleAlbumVisibility}
                    />
                    <Icons.TripleDotIcon fill={COLORS.blue50} onPress={() => {setEditTripleShown(true)}}/>
                </View>}
            </View>
            {!album.avatarOnly && (
                <View style = {styles.albumMiddleGapper}>
                    <View style = {styles.albumMiddle}>
                        <Text style = {styles.tagNameAlbum}>{tag?.name}</Text>
                        <Text style = {styles.yearAlbum}>{album.year} рік</Text>
                    </View>
                    <View style = {styles.albumBorder}/>
                    <Text style = {styles.albumPhotoTitle}>Фотографії</Text>
                </View>
            )}
            <View style = {styles.albumImagesArea}>
                {images?.map((el) => <AlbumImageComp key = {el.id} image = {el}/>)}
                {!album.avatarOnly && <View style = {styles.albumCreateImageZone}>
                    <HeaderButton label = "" iconLeft = {<Icons.PlusIcon/>} onPress={addImage}/>
                </View>}
            </View>
        </View>
    );
}


interface CreateAlbumModalProps {
    editAlbumData?: AlbumEditData | null
    visible: boolean
    onClose: () => void
}

interface CreateAlbumData {
    albumName: string,
    tagId: number | null,
    year: number | null
}

function CreateAlbumModal(props: CreateAlbumModalProps){
    const { visible, onClose, editAlbumData } = props
    const tags = useGetAllTagsQuery({})

    const [createAlbumQuery, {data, error, isLoading}] = useCreateAlbumMutation()
    const [editAlbumQuery] = useEditAlbumMutation()
    const { handleSubmit, control, setError, setValue, clearErrors } = useForm<CreateAlbumData>()
    function clearInputs(){
        setValue("albumName", "")
        setValue("tagId", null)
        setValue("year", null)
        clearErrors()
    }
    function onSubmit(data: CreateAlbumData){
        if (!data.tagId){
            setError("tagId", {message: "Tag is required"})
            return
        }
        if (!data.year){
            setError("year", {message: "Year is required"})
            return
        }
        if (!editAlbumData) {
            createAlbumQuery({name: data.albumName, tagId: data.tagId, year: +data.year})
        }
        else {
            editAlbumQuery({name: data.albumName, tagId: data.tagId, year: +data.year, albumId: editAlbumData.albumId})
        }
        onClose()
        clearInputs()
    }
    
    useEffect(() => {
        if (!!editAlbumData) {
            setValue("albumName", editAlbumData.name)
            setValue("tagId", editAlbumData.tagId)
            setValue("year", editAlbumData.year)
        }
    }, [editAlbumData])
    return (
        <Modal
			visible={visible}
			animationType="none"
			transparent={true}
			onRequestClose={() => {
				clearInputs();
                onClose()
			}}
			statusBarTranslucent
        >
            <View style = {modalStyles.modalLayerBG}>
                <View style = {modalStyles.modalWindow}>
                    <View style = {modalStyles.crossView}>
                        <Text style = {modalStyles.title}>{!editAlbumData ? "Створити Альбом" : "Редагувати альбом"}</Text>
                        <TouchableOpacity onPress = {() => {clearInputs(); onClose()}}>
                            <Icons.CrossIcon/>
                        </TouchableOpacity>
                    </View>
                    <View style = {modalStyles.inputBox}>
                        <Controller
                            name="albumName"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        placeholder="Введіть назву"
                                        inputMode="text"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect={false}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label="Назва альбому"
                                        error={fieldState.error?.message}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="tagId"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value, onBlur },
                            }) => {;
                                const options = Array.isArray(tags.currentData)
                                    ? tags.currentData.map((tag) => ({
                                            value: tag.id,
                                            label: tag.name,
                                        }))
                                    : [];
                                return (
                                    <View style={modalStyles.selectView}>
                                        <Text style={modalStyles.selectedText}>
                                            Оберіть тему
                                        </Text>
                                        <Dropdown
                                            style={[modalStyles.dropdown]}
                                            placeholderStyle={
                                                modalStyles.placeholder
                                            }
                                            selectedTextStyle={
                                                modalStyles.selectedText
                                            }
                                            search
                                            inputSearchStyle = {modalStyles.inputSearch}
                                            
                                            containerStyle={{marginTop: -30,}}
                                            data={options}
                                            dropdownPosition="bottom"
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Оберіть тему"
                                            searchPlaceholder="Пошук..."
                                            value={value}
                                            onBlur={() => {
                                                onBlur();
                                            }}
                                            onChange={(item) => {
                                                onChange(item.value);
                                            }}
                                        />
                                    </View>
                                );
                            }}
                        />
                        <Controller
                            name="year"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        placeholder="Введіть рік"
                                        inputMode="numeric"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect={false}
                                        onChangeText={field.onChange}
                                        keyboardType="numeric"
                                        value={field.value ? String(field.value) : ""}
                                        label="Рік альбому"
                                        error={fieldState.error?.message}
                                    />
                                );
                            }}
                        />
                    </View>
                    <View style = {modalStyles.buttonBox}>
                        <Button variant="secondary" paddingVar="small" title = "Скасувати" onPress = {() => {clearInputs(); onClose()}} bordersOn = {true}/>
                        <Button variant="primary" paddingVar = "small" title = "Зберегти" onPress = {handleSubmit(onSubmit)}></Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

interface CreateAlbumBlockProps {
    // If true, then it outputs "Немає ще жодного альбому"
    firstNewAlbum: boolean
    editData?: AlbumEditData | null
    setEditData: (newEditData: AlbumEditData | null) => void
}

function CreateAlbumBlock(props: CreateAlbumBlockProps){
    const {firstNewAlbum, editData, setEditData} = props
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (!!editData) setVisible(true)
    }, [editData])
    return (
        <View style = {createStyles.mainBlock}>
            <CreateAlbumModal visible = {visible} onClose = {() => {setVisible(false), setEditData(null)}} editAlbumData={editData}/>
            <Text style = {createStyles.mainBlockText}>
                {firstNewAlbum ? "Немає ще жодного альбому" : "Створіть ще альбом"}
            </Text>
            <HeaderButton onPress = {() => {setVisible(true)}} iconLeft = {<Icons.PlusIcon/>} label = ""/>
        </View>
    )
}

export default function AlbumsScreen() {
    const {data: albums} = useGetAllUserAlbumsQuery({})
    const [albumEditData, setAlbumEditData] = useState<null | AlbumEditData>(null)
	return (
		<View style={{ backgroundColor: "#FAF8FF", flex: 1 }}>
			<Submenu
				links={[
					{
						name: "Особиста інформація",
						href: "settings/personal",
					},
					{
						name: "Альбоми",
						href: "settings/albums",
					},
				]}
			/>
            <ScrollView contentContainerStyle = {genericStyles.all}>
                {albums?.map((el) => {return <AlbumComp setEditData={setAlbumEditData} album={el} key = {el.id}/>})}
                <CreateAlbumBlock firstNewAlbum = {albums ? !(albums.length-1) : true} editData={albumEditData} setEditData={setAlbumEditData}/>
            </ScrollView>
		</View>
	);
}
