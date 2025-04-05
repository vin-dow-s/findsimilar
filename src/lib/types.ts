export type VolumeInfo = {
    title: string
    description?: string
    authors?: string[]
    infoLink?: string
    imageLinks?: {
        thumbnail?: string
    }
}

export type Book = {
    id?: string
    etag?: string
    volumeInfo: VolumeInfo
}

export type Game = {
    id: number
    name: string
    summary?: string
    cover?: {
        url: string
    }
    genres?: {
        name: string
    }[]
    platforms?: {
        name: string
    }[]
}
