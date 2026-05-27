import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useDeleteRequestMutation, useDeleteFriendMutation, useMakeFriendMutation, useMakeRequestMutation } from "../../../../modules/friends/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./styles"
import { AvatarWithIndicator } from "../../../../shared/ui/avatar-with-indicator";
import { useGetProfileQuery } from "../../../../shared/api/api";
import { PostList } from "../../../../modules/posts/ui/postList";
import { useGetSomeonePostsQuery } from "../../../../modules/posts/api/post-api";
import { Icons } from "../../../../shared/ui/icons/icons";
import { Button } from "../../../../shared/ui/button";


export default function FriendsRequestsScreen(){
    const { id } = useLocalSearchParams();
    const user = useGetProfileQuery({userId: +id})
    const router = useRouter()
    let deleteFunction: (data: {userId: number}) => void = () => {};
    let approveFunction: (data: {userId: number}) => void = () => {};
    let statButton = "Додати"
    const [df] = useDeleteFriendMutation()
    const [dr] = useDeleteRequestMutation()
    const [mf] = useMakeFriendMutation()
    const [mr] = useMakeRequestMutation()
    if (user.data?.status === "friends"){
        statButton = "Повідомлення";``
        deleteFunction = (data) => {df(data); router.navigate("friends")}
        approveFunction = (data) => {router.navigate("chats")}
    }
    else if (user.data?.status === "request"){
        statButton = "Підтвердити"
        deleteFunction = (data) => {dr(data); router.navigate("friends")}
        approveFunction = (data) => {mf(data); router.navigate("friends")}
    }
    else {
        deleteFunction = (data) => {router.navigate("friends")}
        approveFunction = (data) => {mr(data); router.navigate("friends")}
    }
    const albumsExist = false
    const {data: postsData, isFetching: postsFetching} = useGetSomeonePostsQuery({userId: +id})
    console.log(`ID: ${id}\nSTATUS: ${user.data?.status}`)
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <ScrollView>
                <View style = {styles.profBlock}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.navigate("friends")}>
                            <Icons.BackIcon style = {{paddingRight: 40}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileBlock}>
                        <AvatarWithIndicator
                            originalImagePath = {user.data?.avatar}
                            compressedImagePath = {user.data?.avatar}
                            isOnline = {!!(user.data?.isOnline)}
                        />
                        <View style = {styles.textProf}>
                            <Text style={styles.name}>{user.data?.username}</Text>

                            <Text style={styles.username}>{user.data?.pseudonym}</Text>
                        </View>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.data ? user.data?.postsTotal : 0}</Text>
                            <Text style={styles.statLabel}>Дописи</Text>
                        </View>

                        <View style={styles.verticalLine} />

                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.data ? user.data?.readers : 0}</Text>
                            <Text style={styles.statLabel}>Читачі</Text>
                        </View>

                        <View style={styles.verticalLine} />

                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.data ? user.data?.friends : 0}</Text>
                            <Text style={styles.statLabel}>Друзі</Text>
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Button title = {statButton} variant = "primary" paddingVar = "small" bordersOn = {true} onPress = {() => {approveFunction({userId: user.data!.id })}}/>
                        <Button title = "Видалити" variant = "secondary" paddingVar = "small" bordersOn = {true} onPress = {() => {deleteFunction({userId: user.data!.id})}}/>
                    </View>

                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style = {styles.sectionStart}>
                            <Icons.GaleryIcon/>
                            <Text style={styles.sectionTitle}>Альбоми</Text>
                        </View>

                        <TouchableOpacity>
                            <Text style={[styles.showAll, !albumsExist && styles.noAlbumsColor]}>
                                Дивитись всі
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.horizLine}/>
                    {albumsExist ? <View/> : <Text style = {styles.noAlbums}>Цей користувач немає альбомів</Text>}
                </View>
                    
                {postsFetching ? <Text style = {styles.addText}>Завантаження...</Text> : (Array.isArray(postsData) ? (!!postsData.length ? <PostList posts={postsData}></PostList> : <Text style = {styles.addText}>Цей користувач немає постів</Text>) : <Text style = {styles.addText}>Цей користувач немає постів</Text>)}
            </ScrollView>
        </View>
    )
}