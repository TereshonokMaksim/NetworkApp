export interface Tag {
    id: number
    name: string
    createdAt: string
}

export interface TagCreatePayload {
    name: string
}