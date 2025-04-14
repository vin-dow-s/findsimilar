import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { titles } = await req.json()

    if (!Array.isArray(titles) || titles.length === 0) {
        return NextResponse.json({ error: 'No titles provided' }, { status: 400 })
    }

    const apiKey = process.env.TMDB_API_CLIENT_KEY

    try {
        const movies = await Promise.all(
            titles.map(async (title: string) => {
                try {
                    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                        title,
                    )}&api_key=${apiKey}&page=1`

                    const res = await fetch(url)
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