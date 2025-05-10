'use client'

import { useMovieSuggestions } from '@/hooks/movies/useMovieSuggestions'
import { useSimilarMovies } from '@/hooks/movies/useSimilarMovies'
import { Movie } from '@/lib/types'
import Image from 'next/image'
import { useRef, useState } from 'react'
import LoadingSkeleton from '../LoadingSkeleton'
import MovieSuggestions from './MovieSuggestions'
import SimilarMovies from './SimilarMovies'

export default function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const suppressNextFocus = useRef(false)

    const { suggestions, loading: loadingSuggestions } =
        useMovieSuggestions(movieTitle)
    const { similarMovies, loading: loadingSimilarMovies } = useSimilarMovies(
        selectedMovie?.overview || '',
    )

    const handleSelectMovie = (movie: Movie) => {
        setMovieTitle(movie.title)
        setSelectedMovie(movie)
        setShowSuggestions(false)
    }

    return (
        <div
            className={`relative flex w-full flex-col items-center ${
                loadingSimilarMovies || similarMovies.length > 0
                    ? 'justify-center'
                    : 'justify-start lg:justify-start 2xl:pt-24'
            } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="cinzel mt-24 text-center text-5xl text-white sm:mt-12 xl:text-[52px]">
                <span className="josefin font-bold">FindSimilar</span>{' '}
                <span className="font-normal text-emerald-400">Movies</span>
            </h1>
            <p className="mt-8 max-w-2xl text-center text-sm text-gray-400 sm:mt-4 sm:text-base">
                No sign-up. Just 3 instant recommendations.
            </p>
            <form className="w-full max-w-lg max-sm:mt-8 sm:my-8">
                <div className="relative flex w-full max-w-lg items-center">
                    <div className="flex w-full max-w-lg items-center rounded-l-md bg-[#2B2A33] focus-within:ring-2 focus-within:ring-emerald-600 focus:outline-hidden">
                        <input
                            ref={inputRef}
                            type="text"
                            value={movieTitle}
                            onChange={(e) => {
                                setMovieTitle(e.target.value)
                                setShowSuggestions(true)
                            }}
                            placeholder="Enter the title of a movie..."
                            required
                            className="flex-1 rounded-l-md bg-[#2B2A33] px-6 py-3 text-white placeholder-gray-400 focus:outline-none"
                            onBlur={() => {
                                if (selectedMovie) setShowSuggestions(false)
                            }}
                            onFocus={() => {
                                if (suppressNextFocus.current) {
                                    suppressNextFocus.current = false
                                    return
                                }
                                setShowSuggestions(true)
                            }}
                        />
                        {movieTitle && (
                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    setMovieTitle('')
                                    setSelectedMovie(null)
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
                        <MovieSuggestions
                            suggestions={suggestions}
                            onSelect={handleSelectMovie}
                        />
                    )}

                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            if (selectedMovie) {
                                const currentMovie = selectedMovie
                                setSelectedMovie(null)
                                setTimeout(() => {
                                    setSelectedMovie(currentMovie)
                                }, 0)
                            }
                        }}
                        type="submit"
                        disabled={loadingSuggestions || loadingSimilarMovies}
                        className="focus:ring-opacity-50 relative flex h-12 w-16 items-center justify-center rounded-r-md bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                        {loadingSuggestions || loadingSimilarMovies ? (
                            <div className="dot-flashing dot-flashing-movies"></div>
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
                    Recommendations have a similar core theme, style of
                    storytelling, and/or emotional tone to your provided movie.
                </p>
            </form>

            <div className="flex w-full justify-center">
                <div className="w-full max-w-[1500px]">
                    {loadingSimilarMovies ? (
                        <LoadingSkeleton />
                    ) : (
                        similarMovies.length > 0 && (
                            <SimilarMovies movies={similarMovies} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
