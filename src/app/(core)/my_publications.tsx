import { View } from "react-native";
import { COLORS } from "../../shared/constants/colors";
import { useGetMyPostsQuery } from "../../modules/posts/api/post-api";
import { PostList } from "../../modules/posts/ui/postList";


export default function MyPublicationsScreen(){
    const {data: posts} = useGetMyPostsQuery({pageNumber: 0})
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <PostList posts = {posts ? posts : []}/>
            <View style = {{width: "25%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "25%", }}></View>
        </View>
    )
}