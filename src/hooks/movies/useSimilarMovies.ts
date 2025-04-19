import fetchWithTimeout from '@/lib/fetchWithTimeout'
import { Movie } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useSimilarMovies = (description: string) => {
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setSimilarMovies([])

        if (!description || description.length < 40) {
            return
        }

        const fetchSimilarMovies = async () => {
            setLoading(true)

            try {
                const titles = await fetchSimilarMovieTitles(description)

                if (titles && titles.length > 0) {
                    const movies = await fetchMovieDetails(titles)
                    setSimilarMovies(movies)
                } else {
                    setSimilarMovies([])
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('Error fetching similar movies:', err)
                    setError(`Failed to fetch similar movies: ${err.message}`)
                } else {
                    console.error('Unknown error:', err)
                    setError('Une erreur inconnue est survenue')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchSimilarMovies()
    }, [description])

    const fetchSimilarMovieTitles = async (
        description: string,
    ): Promise<string[]> => {
        const response = await fetchWithTimeout(
            '/api/movies/getThreeSimilarMoviesTitles',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            },
            5000,
        )

        if (!response.ok) {
            throw new Error(`Fetching similar movies titles failed with status ${response.status}`)
        }

        const data = await response.json()

        const { titles } = data as { titles: string[] }
        return titles
    }

    const fetchMovieDetails = async (titles: string[]): Promise<Movie[]> => {
        const response = await fetchWithTimeout(
            '/api/movies/fetchTMDB',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titles }),
            },
            5000,
        )


        if (!response.ok) {
            throw new Error(`Fetching similar movies details failed with status ${response.status}`)
        }

        const data = await response.json()

        return data.movies.slice(0, 3)
    }

    return { similarMovies, loading, error }
}
