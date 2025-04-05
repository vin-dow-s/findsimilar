import fetchWithTimeout from '@/lib/fetchWithTimeout'
import { Game } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useGameSuggestions = (gameTitle: string) => {
    const [suggestions, setSuggestions] = useState<Game[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!gameTitle) {
            setSuggestions([])
            return
        }

        const fetchSuggestions = async () => {
            setLoading(true)

            try {
                const response = await fetchWithTimeout(
                    `/api/fetchGamesSuggestions?title=${encodeURIComponent(
                        gameTitle,
                    )}`,
                    {},
                    7000,
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch suggestions')
                }

                const data: Game[] = await response.json()
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
    }, [gameTitle])

    return { suggestions, loading, error }
}
