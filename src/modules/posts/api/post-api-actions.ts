import { postApiUtil } from "./post-api";
import { PostApiActionsContract } from "./post-api.types"


export const postApiActions: PostApiActionsContract = {
    async toggleLike(dispatcher, postId, clientId) {
        dispatcher(
            postApiUtil.updateQueryData(
                "getAllPosts",
                {},
                (draft) => {}
            )
        )
    },
}