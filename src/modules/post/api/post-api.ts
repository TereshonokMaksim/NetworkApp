import { CreatePostDto } from '../model/post.types';

export const createPost = async (data: CreatePostDto) => {
    /////////////
    console.log('POST DATA:', data);

    return Promise.resolve();
};