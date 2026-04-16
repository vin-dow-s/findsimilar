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

    const books = await Promise.all(
        (titles as string[]).map(async (title) => {
            const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                title,
            )}&key=${process.env.GOOGLE_BOOKS_API_KEY}`

            try {
                const res = await fetchWithServerTimeout(url, {}, 8000)
                const data = await res.json()
                return data.items?.[0] || null
            } catch (e) {
                console.error(`Error on title ${title}:`, e)
                return null
            }
        }),
    )

    return NextResponse.json({ items: books.filter(Boolean) })
}
