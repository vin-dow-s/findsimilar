'use client'

import { useGameSuggestions } from '@/hooks/games/useGameSuggestions'
import { useSimilarGames } from '@/hooks/games/useSimilarGames'
import { Game } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import LoadingSkeleton from '../LoadingSkeleton'
import GameSuggestions from './GameSuggestions'
import SimilarGames from './SimilarGames'

export default function GameSearch() {
    const [gameTitle, setGameTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedGame, setSelectedGame] = useState<Game | null>(null)

    const { suggestions, loading: loadingSuggestions } =
        useGameSuggestions(gameTitle)
    const { similarGames, loading: loadingSimilarGames } = useSimilarGames(
        selectedGame?.summary || '',
    )

    const handleSelectGame = (game: Game) => {
        setGameTitle(game.name)
        setSelectedGame(game)
        setShowSuggestions(false)
    }

    return (
        <div
            className={`relative flex w-full flex-col items-center ${
                loadingSimilarGames || similarGames.length > 0
                    ? 'justify-center'
                    : 'justify-start lg:justify-start lg:pt-24'
            } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="lobster mt-16 text-5xl font-bold text-white lg:text-6xl">
                Find Similar Games
            </h1>
            <p className="mt-4 max-w-2xl text-center text-lg text-gray-400 max-sm:text-base">
                No sign-up. Fast & Free. Get 3 game recommendations in seconds.
            </p>

            <form className="my-12 w-full max-w-lg">
                <div className="relative flex w-full max-w-lg items-center">
                    <input
                        type="text"
                        value={gameTitle}
                        onChange={(e) => {
                            setGameTitle(e.target.value)
                            setShowSuggestions(true)
                        }}
                        placeholder="Enter the title of a game..."
                        required
                        className="flex-1 rounded-l-md border-gray-300 bg-[#2B2A33] px-6 py-3 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                        onBlur={() => {
                            setTimeout(() => setShowSuggestions(false), 100)
                        }}
                        onFocus={() => {
                            setShowSuggestions(true)
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <GameSuggestions
                            suggestions={suggestions}
                            onSelect={handleSelectGame}
                        />
                    )}

                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            if (selectedGame) {
                                const currentGame = selectedGame
                                setSelectedGame(null)
                                setTimeout(() => {
                                    setSelectedGame(currentGame)
                                }, 0)
                            }
                        }}
                        type="submit"
                        disabled={loadingSuggestions || loadingSimilarGames}
                        className="focus:ring-opacity-50 relative flex h-12 w-16 items-center justify-center rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                    >
                        {loadingSuggestions || loadingSimilarGames ? (
                            <div className="dot-flashing"></div>
                        ) : (
                            <Image
                                src="/icons/refresh-line.svg"
                                alt="Refresh Icon"
                                width={24}
                                height={24}
                            />
                        )}
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 italic">
                    The results are
                </p>
            </form>

            <div>
                {loadingSimilarGames ? (
                    <LoadingSkeleton />
                ) : (
                    similarGames.length > 0 && (
                        <SimilarGames games={similarGames} />
                    )
                )}
            </div>
        </div>
    )
}
