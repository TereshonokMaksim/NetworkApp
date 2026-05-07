import { ScrollView } from "react-native";
import { PostShow } from "../showPost/showPost";
import type { PostToShow } from "../../api/post-api.types";
import { styles } from "./post-list.styles";


interface PostListProps {
    posts: PostToShow[]
}
// 
export function PostList(props: PostListProps){
    const {posts} = props
    return (
        <ScrollView style = {styles.postsAll} contentContainerStyle = {styles.postsAllContainer}>
            {posts.map((el) => <PostShow post = {el} key = {el.id}/>)}
        </ScrollView>
    )
}