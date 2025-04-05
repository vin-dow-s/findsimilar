import fetchWithTimeout from '@/lib/fetchWithTimeout'
import { Book } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useSimilarBooks = (description: string) => {
    const [similarBooks, setSimilarBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!description || description.length < 40) return

        const fetchSimilarBooks = async () => {
            setLoading(true)

            try {
                const titles = await fetchSimilarBookTitles(description)
                const books = await fetchBookDetails(titles)
                setSimilarBooks(books)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('Error fetching similar books:', err)
                    setError(`Failed to fetch similar books: ${err.message}`)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchSimilarBooks()
    }, [description])

    const fetchSimilarBookTitles = async (
        description: string,
    ): Promise<string[]> => {
        const response = await fetchWithTimeout(
            '/api/getThreeSimilarBooksTitles',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            },
            10000,
        )

        if (!response.ok) {
            throw new Error('Fetching similar books titles failed')
        }

        const { titles } = (await response.json()) as { titles: string[] }
        return titles
    }

    const fetchBookDetails = async (titles: string[]): Promise<Book[]> => {
        const response = await fetchWithTimeout(
            '/api/fetchGoogleBooks',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titles }),
            },
            10000,
        )

        if (!response.ok) {
            throw new Error('Fetching similar books details failed')
        }

        const data = (await response.json()) as { items: Book[] }
        return data.items.slice(0, 3)
    }

    return { similarBooks, loading, error }
}
