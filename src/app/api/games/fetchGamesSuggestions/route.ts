import { Game } from '@/lib/types'
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

    const accessToken = process.env.IGDB_ACCESS_TOKEN
    const clientId = process.env.IGDB_API_CLIENT_KEY

    const escaped = title.replace(/"/g, '\\"')
    const body = `
    search "${escaped}";
    fields name, slug, first_release_date, cover.url, genres.name, platforms.name, summary;
    where version_parent = null & parent_game = null;
    limit 20;
  `

    try {
        const res = await fetchWithServerTimeout(
            'https://api.igdb.com/v4/games',
            {
                method: 'POST',
                headers: {
                    'Client-ID': clientId!,
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain',
                },
                body,
            },
            8000,
        )

        if (!res.ok) {
            const details = await res.text()
            return NextResponse.json(
                { error: 'Failed to fetch suggestions from IGDB', details },
                { status: res.status },
            )
        }

        const data = await res.json()
        const sortedData = sortByTitleMatch(data, title)
        return NextResponse.json(sortedData.slice(0, 5))
    } catch (error) {
        console.error('Timeout or error fetching game suggestions:', error)
        return NextResponse.json(
            { error: 'Request timed out or failed' },
            { status: 500 },
        )
    }
}

const sortByTitleMatch = (games: Game[], keyword: string) => {
    const lowerKeyword = keyword.toLowerCase()

    return games.sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()

        const aStartsWith = aName.startsWith(lowerKeyword)
        const bStartsWith = bName.startsWith(lowerKeyword)

        if (aStartsWith && !bStartsWith) return -1
        if (!aStartsWith && bStartsWith) return 1

        const aIndex = aName.indexOf(lowerKeyword)
        const bIndex = bName.indexOf(lowerKeyword)

        if (aIndex !== bIndex) return aIndex - bIndex

        return aName.length - bName.length
    })
}
