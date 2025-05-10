'use client'

import { useGameSuggestions } from '@/hooks/games/useGameSuggestions'
import { useSimilarGames } from '@/hooks/games/useSimilarGames'
import { Game } from '@/lib/types'
import Image from 'next/image'
import { useRef, useState } from 'react'
import LoadingSkeleton from '../LoadingSkeleton'
import GameSuggestions from './GameSuggestions'
import SimilarGames from './SimilarGames'

export default function GameSearch() {
    const [gameTitle, setGameTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedGame, setSelectedGame] = useState<Game | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const suppressNextFocus = useRef(false)

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
                    : 'justify-start lg:justify-start 2xl:pt-24'
            } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="poppins mt-24 text-center text-5xl text-white sm:mt-12 lg:text-[52px]">
                <span className="josefin font-bold">FindSimilar</span>{' '}
                <span className="text-[40px] font-normal text-orange-400 lg:text-[50px]">
                    Games
                </span>
            </h1>
            <p className="mt-8 max-w-2xl text-center text-sm text-gray-400 sm:mt-4 sm:text-base">
                No sign-up. Just 3 instant recommendations.
            </p>
            <form className="w-full max-w-lg max-sm:mt-8 sm:my-8">
                <div className="relative flex w-full max-w-lg items-center">
                    <div className="flex w-full max-w-lg items-center rounded-l-md bg-[#2B2A33] focus-within:ring-2 focus-within:ring-orange-600 focus:outline-hidden">
                        <input
                            ref={inputRef}
                            type="text"
                            value={gameTitle}
                            onChange={(e) => {
                                setGameTitle(e.target.value)
                                setShowSuggestions(true)
                            }}
                            placeholder="Enter the title of a game..."
                            required
                            className="flex-1 rounded-l-md bg-[#2B2A33] px-6 py-3 text-white placeholder-gray-400 focus:outline-none"
                            onBlur={() => {
                                if (selectedGame) setShowSuggestions(false)
                            }}
                            onFocus={() => {
                                if (suppressNextFocus.current) {
                                    suppressNextFocus.current = false
                                    return
                                }
                                setShowSuggestions(true)
                            }}
                        />
                        {gameTitle && (
                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    setGameTitle('')
                                    setSelectedGame(null)
                                    suppressNextFocus.current = true
                                    inputRef.current?.focus()
                                }}
                                className="px-4 py-3 text-gray-400 hover:text-white"
                                aria-label="Clear input"
                            >
                                <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 8L16 16"
                                        stroke="#99a1af"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 8L8 16"
                                        stroke="#99a1af"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

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
                        className="focus:ring-opacity-50 relative flex h-12 w-16 items-center justify-center rounded-r-md bg-orange-600 text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:outline-hidden"
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
                <p className="mt-2 text-sm text-gray-500 italic">
                    Recommendations have similar gameplay mechanics, world
                    design, and/or user experience to your provided game.
                </p>
            </form>

            <div className="flex w-full justify-center">
                <div className="w-full max-w-[1500px]">
                    {loadingSimilarGames ? (
                        <LoadingSkeleton />
                    ) : (
                        selectedGame &&
                        (similarGames.length > 0 ? (
                            <SimilarGames games={similarGames} />
                        ) : (
                            <p className="text-center text-gray-400">
                                No similar games found 🤔
                            </p>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
