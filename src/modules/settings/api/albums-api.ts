import {
	Album,
	AlbumCreate,
	AlbumEdit,
	AlbumImageCreate,
	AlbumImageEdit,
	AlbumImageForShow,
	Tag,
} from "../../../shared/albums";
import { baseApi } from "../../../shared/api/api";

export const albumApi = baseApi.enhanceEndpoints({ addTagTypes: ["albums", "albumImages"] }).injectEndpoints({
	endpoints: (build) => {
		return {
			getAllTags: build.query<Tag[], object>({
				query: (body?) => ({
					url: "albums/tags",
					method: "GET",
				})
			}),
			getTag: build.query<Tag, { id: number | string }>({
				query: (body) => ({
					url: `albums/tags/${body.id}`,
					method: "GET",
				}),
			}),
			createAlbum: build.mutation<Album, AlbumCreate>({
				query: (body) => {console.log("HOW EYYYY"); return {
					url: `albums`,
					method: "POST",
					body,
				}}, 
                invalidatesTags: ["albums"],
                
			}),
			editAlbum: build.mutation<Album, AlbumEdit>({
				query: (body) => {
                    const {albumId, ...newbody} = body
                    return {
                        url: `albums/${albumId}`,
                        method: "PATCH",
                        body: newbody,
                    }
				},
                invalidatesTags: ["albums"]
			}),
            deleteAlbum: build.mutation<Album, {id: number}>({
                query: (body) => {return{
                    url: `albums/${body.id}`,
                    method: "DELETE"
                }},
                invalidatesTags: ['albums']
            }),
			getAllUserAlbums: build.query<Album[], object>({
				query: (body?) => {console.log("Why are you not refreshing"); return {
					url: "albums",
					method: "GET",
				}},
                providesTags: ["albums"]
			}),
			getAlbumImages: build.query<AlbumImageForShow[], { albumId: number | string }>({
				query: (body) => ({
					url: `albums/${body.albumId}/images`,
					method: "GET",
				}),
                providesTags: ["albumImages", "avatarImages"]
			}),
			createAlbumImage: build.mutation<AlbumImageForShow[], AlbumImageCreate>({
				query: (body) => {
					const { image, ...elseBody } = body;
					const newFormData = new FormData();
					if (image) {
						newFormData.append("image", {
							uri: image,
							type: "images/jpeg",
							name: `${Date.now()}.jpeg`,
						} as any);
					}
					return {
						url: `albums/${elseBody.albumId}/images`,
						method: "POST",
						body: newFormData,
					};
				},
                invalidatesTags: ["albumImages"]
			}),
            deleteAlbumImage: build.mutation<AlbumImageForShow, {id: number, albumId: number}>({
                query: (body) => ({
                    url: `albums/${body.albumId}/images/${body.id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["albumImages"]
            }),
            editAlbumImage: build.mutation<AlbumImageForShow, AlbumImageEdit>({
                query: (body) => {
                    const {albumId, imageId, shown} = body
                    return {
                        url: `albums/${albumId}/images/${imageId}`,
                        method: "PATCH",
                        body: {shown}
                    }
                },
                invalidatesTags: ["albumImages"]
            })
		};
	},
});


export const {
	useGetAllTagsQuery,
	useGetTagQuery,
	useGetAlbumImagesQuery,
	useGetAllUserAlbumsQuery,
	useCreateAlbumImageMutation,
	useCreateAlbumMutation,
	useEditAlbumMutation,
    useDeleteAlbumImageMutation,
    useEditAlbumImageMutation,
    useDeleteAlbumMutation
} = albumApi;
