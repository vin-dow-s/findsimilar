import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { titles } = await req.json()

    if (!Array.isArray(titles) || titles.length === 0) {
        return NextResponse.json(
            { error: 'No titles provided' },
            { status: 400 },
        )
    }

    const books = await Promise.all(
        titles.map(async (title: string) => {
            const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                title,
            )}&key=${process.env.GOOGLE_BOOKS_API_KEY}`

            try {
                const res = await fetch(url)
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
