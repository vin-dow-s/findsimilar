import fetchWithTimeout from '@/lib/fetchWithTimeout'
import { Game } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useSimilarGames = (description: string) => {
    const [similarGames, setSimilarGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        setSimilarGames([])

        if (!description || description.length < 40) return

        const fetchSimilarGames = async () => {
            setLoading(true)

            try {
                const titles = await fetchSimilarGameTitles(description)
                const games = await fetchGameDetails(titles)
                setSimilarGames(games)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('Error fetching similar games:', err)
                    setError(`Failed to fetch similar games: ${err.message}`)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchSimilarGames()
    }, [description])

    const fetchSimilarGameTitles = async (
        description: string,
    ): Promise<string[]> => {
        const response = await fetchWithTimeout(
            '/api/games/getThreeSimilarGamesTitles',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            },
            5000,
        )

        if (!response.ok) {
            throw new Error('Fetching similar games titles failed')
        }

        const { titles } = (await response.json()) as { titles: string[] }
        return titles
    }

    const fetchGameDetails = async (titles: string[]): Promise<Game[]> => {
        const response = await fetchWithTimeout(
            '/api/games/fetchIGDB',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titles }),
            },
            5000,
        )

        if (!response.ok) {
            throw new Error('Fetching similar games details failed')
        }

        const data = (await response.json()) as { games: Game[] }
        return data.games.slice(0, 3)
    }

    return { similarGames, loading, error }
}
