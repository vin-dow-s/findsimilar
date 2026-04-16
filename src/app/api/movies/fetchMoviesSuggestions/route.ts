import { NextResponse } from 'next/server'
import { fetchWithServerTimeout } from '@/lib/fetchWithServerTimeout'

const MAX_TITLE_LEN = 200

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')

    if (!title || title.length > MAX_TITLE_LEN) {
        return NextResponse.json(
            { error: `Missing or oversized title (max ${MAX_TITLE_LEN} chars)` },
            { status: 400 },
        )
    }

    const apiKey = process.env.TMDB_API_CLIENT_KEY
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        title,
    )}&api_key=${apiKey}&page=1`

    try {
        const res = await fetchWithServerTimeout(url, {}, 8000)

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch suggestions from TMDb' },
                { status: res.status },
            )
        }

        const data = await res.json()
        return NextResponse.json(data.results.slice(0, 5))
    } catch (error) {
        console.error('Error fetching movie suggestions:', error)
        return NextResponse.json(
            { error: 'Request timed out or failed' },
            { status: 500 },
        )
    }
}
