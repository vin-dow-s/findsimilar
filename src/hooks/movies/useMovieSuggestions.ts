import fetchWithTimeout from '@/lib/fetchWithTimeout'
import { Movie } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useMovieSuggestions = (movieTitle: string) => {
    const [suggestions, setSuggestions] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!movieTitle) {
            setSuggestions([])
            return
        }

        const fetchSuggestions = async () => {
            setLoading(true)

            try {
                const response = await fetchWithTimeout(
                    `/api/movies/fetchMoviesSuggestions?title=${encodeURIComponent(
                        movieTitle,
                    )}`,
                    {},
                    7000,
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch suggestions')
                }

                const data: Movie[] = await response.json()
                setSuggestions(data || [])
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Error fetching movie suggestions:', err)
                    setError(`Failed to fetch suggestions: ${err.message}`)
                }
            } finally {
                setLoading(false)
            }
        }

        const debounceTimeout = setTimeout(fetchSuggestions, 700)
        return () => clearTimeout(debounceTimeout)
    }, [movieTitle])

    return { suggestions, loading, error }
}
