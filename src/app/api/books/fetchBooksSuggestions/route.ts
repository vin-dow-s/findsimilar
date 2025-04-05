// src/app/api/fetchBooksSuggestions/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')

    if (!title) {
        return NextResponse.json({ error: 'Missing title' }, { status: 400 })
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        title,
    )}&langRestrict=en&maxResults=5&key=${process.env.GOOGLE_BOOKS_API_KEY}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        return NextResponse.json(data.items || [])
    } catch (err) {
        console.error('Fetch failed:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
