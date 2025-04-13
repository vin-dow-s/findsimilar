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
    slug: string
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

export type Movie = {
    id: number
    title: string
    slug: string
    overview: string
    poster_path: string | null
    release_date: string
    genre_ids: { id: number; name: string }[]
}

