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
        console.log("🚀 ~ handleSelectGame ~ game:", game)
        setGameTitle(game.name)
        setSelectedGame(game)
        setShowSuggestions(false)
    }

    return (
        <div
            className={`relative flex w-full flex-col items-center ${loadingSimilarGames || similarGames.length > 0
                ? 'justify-center'
                : 'justify-start lg:justify-start 2xl:pt-24'
                } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="mt-24 sm:mt-12 text-white lg:text-[52px] text-5xl text-center poppins">
                <span className="font-bold josefin">FindSimilar</span> <span className="font-normal text-[40px] text-orange-400 lg:text-[50px]">Games</span>
            </h1>
            <p className="mt-8 sm:mt-4 max-w-2xl text-gray-400 text-sm sm:text-base text-center">
                No sign-up. Just 3 instant recommendations.
            </p>
            <form className="sm:my-12 max-sm:mt-8 w-full max-w-lg">
                <div className="relative flex items-center w-full max-w-lg">
                    <input
                        type="text"
                        value={gameTitle}
                        onChange={(e) => {
                            setGameTitle(e.target.value)
                            setShowSuggestions(true)
                        }}
                        placeholder="Enter the title of a game..."
                        required
                        className="flex-1 bg-[#2B2A33] px-6 py-3 border-gray-300 focus:border-orange-600 rounded-l-md focus:outline-hidden focus:ring-2 focus:ring-orange-600"
                        onBlur={() => {
                            if (selectedGame)
                                setShowSuggestions(false)
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
                        className="relative flex justify-center items-center bg-orange-600 hover:bg-orange-700 focus:ring-opacity-50 rounded-r-md focus:outline-hidden focus:ring-2 focus:ring-orange-600 w-16 h-12 text-white"
                    >
                        {loadingSuggestions || loadingSimilarGames ? (
                            <div className="dot-flashing dot-flashing-games"></div>
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
                <p className="mt-2 text-gray-500 text-sm italic">
                    Recommendations have similar gameplay mechanics, world design, and/or user experience to your provided game.
                </p>
            </form>

            <div className="flex justify-center w-full">
                <div className="w-full max-w-[1500px]">
                    {loadingSimilarGames ? (
                        <LoadingSkeleton />
                    ) : (
                        selectedGame && (
                            similarGames.length > 0 ? (
                                <SimilarGames games={similarGames} />
                            ) : (
                                <p className="text-gray-400 text-center">
                                    No similar games found 🤔
                                </p>
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
