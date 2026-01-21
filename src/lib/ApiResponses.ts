type ObjectIDHex = string
export interface Tools {
    _id: ObjectIDHex
    name: string
    images_uris: Array<string>
    image_ext: Array<"image/jpeg" | "image/png" | "image/jpg">
    desc: string,
    categories: Array<string>
    author: ObjectIDHex,
    author_info: {
        _id: string,
        username: string,
        email: string,
        password: string
    },
    location: string,
    price: Number,
    borrower: string
}

export type CreateToolsResponse =  Array<Tools>

export interface APIResponse<T> {
    success: boolean
    data: T
}