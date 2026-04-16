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

    const accessToken = process.env.IGDB_ACCESS_TOKEN
    const clientId = process.env.IGDB_API_CLIENT_KEY

    if (!accessToken || !clientId) {
        console.error('Missing IGDB credentials.')
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const games = await Promise.all(
        (titles as string[]).map(async (title) => {
            try {
                const escaped = title.replace(/"/g, '\\"')
                const query = `search "${escaped}"; fields name, slug, cover.url, genres.name, platforms.name, summary; limit 1;`

                const res = await fetchWithServerTimeout(
                    'https://api.igdb.com/v4/games',
                    {
                        method: 'POST',
                        headers: {
                            'Client-ID': clientId,
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'text/plain',
                        },
                        body: query,
                    },
                    8000,
                )

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
