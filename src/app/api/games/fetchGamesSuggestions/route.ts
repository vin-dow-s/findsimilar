// src/app/api/games/fetchGamesSuggestions/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')

    if (!title) {
        return NextResponse.json({ error: 'Missing title' }, { status: 400 })
    }

    const accessToken = process.env.IGDB_ACCESS_TOKEN
    const clientId = process.env.IGDB_API_CLIENT_KEY

    const body = `search "${title}"; fields name, slug, cover.url, genres.name, platforms.name, summary; limit 5;`

    try {
        const res = await fetch('https://www.api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': clientId!,
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'text/plain',
            },
            body,
        })

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch suggestions from IGDB' },
                { status: res.status }
            )
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Timeout or error fetching game suggestions:', error)
        return NextResponse.json({ error: 'Request timed out or failed' }, { status: 500 })
    }
}
