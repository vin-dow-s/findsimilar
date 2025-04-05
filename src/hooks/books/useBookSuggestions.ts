import fetchWithTimeout from '@/lib/fetchWithTimeout'
import { Book } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useBookSuggestions = (bookTitle: string) => {
    const [suggestions, setSuggestions] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!bookTitle) {
            setSuggestions([])
            return
        }

        const fetchSuggestions = async () => {
            setLoading(true)

            try {
                const response = await fetchWithTimeout(
                    `/api/fetchBooksSuggestions?title=${encodeURIComponent(bookTitle)}`,
                    {},
                    7000,
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch suggestions')
                }

                const data: Book[] = await response.json()
                setSuggestions(data || [])
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Error fetching book suggestions:', err)
                    setError(`Failed to fetch suggestions: ${err.message}`)
                }
            } finally {
                setLoading(false)
            }
        }

        const debounceTimeout = setTimeout(fetchSuggestions, 700)
        return () => clearTimeout(debounceTimeout)
    }, [bookTitle])

    return { suggestions, loading, error }
}
