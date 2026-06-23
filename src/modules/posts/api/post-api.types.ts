import { AppDispatch } from "../../../shared/api/dispatcher"

export type CreatePost = {
    images: string[],
    title: string,
    tagIds: number[],
    topic: string,
    text: string,
    links: string[]
}

export type EditPost = {
    postId: number,
    images: string[],
    title: string,
    tagIds: number[],
    topic: string,
    text: string,
    links: string[]
}

export type PostImage = {
    id: number;
    originalImagePath: string;
    compressedImagePath: string | null;
    postOriginalId: number | null;
}

export type PostTag = {
    name: string;
    id: number;
}

export type PostToShow = {
    id: number;
    authorId: number;
    title: string;
    topic: string;
    text: string;
    likes: number;
    hearted: number;
    watched: number;
    images: PostImage[];
    tags: PostTag[];
    links: string[];
    authorAvatarPath: string | null
    authorUsername: string
}

export interface Tag {
    id: number
    name: string
}

export type PostApiActionsContract = {
    toggleLike: (
        dispatcher: AppDispatch,
        postId: number,
        clientId: number
    ) => Promise<void>
    toggleHeart: (
        dispatcher: AppDispatch,
        postId: number,
        clientId: number
    ) => Promise<void>

}