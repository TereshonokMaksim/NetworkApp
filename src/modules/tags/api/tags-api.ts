import type { Tag, TagCreatePayload } from "./tags-api.types";
import { baseApi } from "../../../shared/api/api";

export const tagsApi = baseApi
	.enhanceEndpoints({ addTagTypes: ["tags"] })
	.injectEndpoints({ endpoints: (build) => {
        return {
            getAllTags: build.query<Tag[], object>({
                query: (body?) => ({
                    url: "tags/",
                    method: "GET"
                })
            }),
            getTagById: build.query<Tag, {id: number}>({
                query: (body) => ({
                    url: `tags/${body.id}`,
                    method: "GET"
                })
            })   
        }
    } 
});

export const {
    useGetAllTagsQuery,
    useGetTagByIdQuery
} = tagsApi