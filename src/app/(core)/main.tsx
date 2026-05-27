import { View } from "react-native";
import { COLORS } from "../../shared/constants/colors";
import { useGetAllPostsQuery } from "../../modules/posts/api/post-api";
import { PostList } from "../../modules/posts/ui/postList";


export default function MainScreen(){
    const {data: posts} = useGetAllPostsQuery({pageNumber: 0})
    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <View style = {{flex: 1, paddingHorizontal: 6}}><PostList posts = {posts ? posts : []}/></View>
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "5%", }}></View>
        </View>
    )
}