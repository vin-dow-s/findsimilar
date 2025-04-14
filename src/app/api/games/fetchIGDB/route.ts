import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { titles } = await req.json()

    if (!Array.isArray(titles) || titles.length === 0) {
        return NextResponse.json(
            { error: 'No titles provided' },
            { status: 400 },
        )
    }

    const accessToken = process.env.IGDB_ACCESS_TOKEN
    const clientId = process.env.IGDB_API_CLIENT_KEY

    if (!accessToken || !clientId) {
        console.error('Missing IGDB credentials.')
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const games = await Promise.all(
        titles.map(async (title: string) => {
            try {
                const query = `search "${title}"; fields name, slug, cover.url, genres.name, platforms.name, summary; limit 1;`

                const res = await fetch('https://api.igdb.com/v4/games', {
                    method: 'POST',
                    headers: {
                        'Client-ID': clientId,
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain',
                    },
                    body: query,
                })

                const data = await res.json()
                return data?.[0] || null
            } catch (error) {
                console.error(`Error fetching game: ${title}`, error)
                return null
            }
        }),
    )

    return NextResponse.json({ games: games.filter(Boolean) })
}
