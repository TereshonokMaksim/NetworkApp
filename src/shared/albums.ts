export interface Tag {
    name: string,
    id: number
}

export interface Album {
    name: string;
    id: number;
    userId: number;
    previewImageId: number | null;
    shown: boolean;
    tagId: number;
    createdAt: string;
    year: number
    avatarOnly: boolean
}

export interface AlbumCreate {
    name: string;
    tagId: number;
    year: number;
}

export interface AlbumEdit {
    name?: string;
    userId?: number;
    previewImageId?: number | null;
    shown?: boolean;
    tagId?: number;
    year?: number
    albumId: number
}

export interface AlbumImage {
    id: number;
    shown: boolean;
    imageId: number;
    albumId: number;
}

export interface AlbumImageForShow {
    id: number;
    shown: boolean;
    originalImagePath: string;
    albumId: number;
}

export interface AlbumImageCreate {
    image: string
    albumId: number;
}

export interface AlbumImageEdit {
    shown?: boolean;
    imageId: number;
    albumId: number;
}

export interface Tag {
    name: string;
    id: number;
    createdAt: string;
}