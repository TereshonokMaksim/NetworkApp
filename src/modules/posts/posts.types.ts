export interface IPost {
    id: number;
    authorId: number;
    userName: string;
    userAvatar?: string;
    publishDate: string;
    content: string;
    postImage?: string;
    likesCount: number;
    commentsCount: number;
}