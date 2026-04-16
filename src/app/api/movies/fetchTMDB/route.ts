import { NextResponse } from 'next/server'
import { fetchWithServerTimeout } from '@/lib/fetchWithServerTimeout'

const MAX_TITLES = 5
const MAX_TITLE_LEN = 200

export async function POST(req: Request) {
    let body: unknown
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const titles = (body as { titles?: unknown })?.titles
    if (
        !Array.isArray(titles) ||
        titles.length === 0 ||
        titles.length > MAX_TITLES ||
        !titles.every((t) => typeof t === 'string' && t.length > 0 && t.length <= MAX_TITLE_LEN)
    ) {
        return NextResponse.json(
            { error: `titles must be an array of 1–${MAX_TITLES} strings (max ${MAX_TITLE_LEN} chars each)` },
            { status: 400 },
        )
    }

    const apiKey = process.env.TMDB_API_CLIENT_KEY

    try {
        const movies = await Promise.all(
            (titles as string[]).map(async (title) => {
                try {
                    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                        title,
                    )}&api_key=${apiKey}&page=1`

                    const res = await fetchWithServerTimeout(url, {}, 8000)
                    const data = await res.json()

                    return data.results && data.results.length > 0 ? data.results[0] : null
                } catch (error) {
                    console.error(`Error fetching movie: ${title}`, error)
                    return null
                }
            }),
        )

        return NextResponse.json({ movies: movies.filter(Boolean) })
    } catch (error) {
        console.error('Error fetching TMDB data:', error)
        return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: 500 })
    }
}
