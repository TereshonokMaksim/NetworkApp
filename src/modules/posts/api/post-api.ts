import type {
    PostToShow,
    CreatePost,
    Tag,
    EditPost
} from "./post-api.types";
import { baseApi } from "../../../shared/api/api";

export const postApi = baseApi.enhanceEndpoints({ addTagTypes: ["posts", "postTags", "postsPersonal"] }).injectEndpoints({
    endpoints: (build) => {
        return {
            createPost: build.mutation<PostToShow, CreatePost>({
                query: (body) => {
                    const { images, ...elseBody } = body;
                    const newFormData = new FormData();
                    if (images) {
                        images.forEach((img, index) => {
                            newFormData.append("media", {
                                uri: img,
                                type: "image/jpeg",
                                name: `${Date.now()}-${index}.jpeg`,
                            } as any);
                        });
                    }
					Object.entries(elseBody).forEach(([key, value]) => {
                        
						if (value) { 
                            if (typeof value === "string" || typeof value === "number") newFormData.append(key, String(value));
                            else newFormData.append(key, JSON.stringify(value));
                        }
					});
                    return {
                        url: `posts/`,
                        method: "POST",
                        body: newFormData,
                    };
                },
                invalidatesTags: ["posts", "postsPersonal"]
            }),
            getAllPosts: build.query<PostToShow[], { pageNumber: number | string }>({
                query: (body) => ({
                    url: `posts/${body.pageNumber}`,
                    method: "GET",
                }), 
                providesTags: ["posts"], 
            }),
            getMyPosts: build.query<PostToShow[], object>({
                query: (body?) => ({
                    url: `posts/mine`,
                    method: "GET"
                }), 
                providesTags: ["postsPersonal"], 
            }),
            editPost: build.mutation<object, EditPost>({
                query: (body) => {
                    const { postId, images, ...elseBody } = body;
                    const newFormData = new FormData();
                    if (images) {
                        images.forEach((img, index) => {
                            newFormData.append("media", {
                                uri: img,
                                type: "image/jpeg",
                                name: `${Date.now()}-${index}.jpeg`,
                            } as any);
                        });
                    }
					Object.entries(elseBody).forEach(([key, value]) => {
						if (value) { 
                            if (typeof value === "string" || typeof value === "number") newFormData.append(key, String(value));
                            else newFormData.append(key, JSON.stringify(value));
                        }
					});
                    return {
                        url: `posts/${postId}`,
                        method: "PATCH",
                        body: newFormData,
                    };
                },
                invalidatesTags: ["posts", "postsPersonal"]
            }),
            deletePost: build.mutation<object, {id: number}>({
                query: (body) => ({
                    url: `posts/${body.id}`,
                    method: "DELETE"
                }), 
                invalidatesTags: ["posts", "postsPersonal"], 
            }),
            getSomeonePosts: build.query<PostToShow[], {userId: number}>({
                query: (body) => ({
                    url: `posts/someone?someoneId=${body.userId}&pageNumber=0`,
                    method: "GET"
                })
            })
            
        };
    },
});


export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetMyPostsQuery,
    useEditPostMutation,
    useDeletePostMutation,
    useGetSomeonePostsQuery,
    util: postApiUtil
} = postApi;

