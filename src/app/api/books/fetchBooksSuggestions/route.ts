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

    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        title,
    )}&langRestrict=en&maxResults=5&key=${process.env.GOOGLE_BOOKS_API_KEY}`

    try {
        const res = await fetchWithServerTimeout(url, {}, 8000)
        const data = await res.json()
        return NextResponse.json(data.items || [])
    } catch (err) {
        console.error('Fetch failed:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
