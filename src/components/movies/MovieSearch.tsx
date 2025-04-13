'use client'

import { useMovieSuggestions } from '@/hooks/movies/useMovieSuggestions'
import { Movie } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import LoadingSkeleton from '../LoadingSkeleton'
import MovieSuggestions from './MovieSuggestions'
import SimilarMovies from './SimilarMovies'
import { useSimilarMovies } from '@/hooks/movies/useSimilarMovies'

export default function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

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
            className={`relative flex w-full flex-col items-center ${loadingSimilarMovies || similarMovies.length > 0
                ? 'justify-center'
                : 'justify-start lg:justify-start 2xl:pt-24'
                } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="mt-12 text-white xl:text-[52px] text-5xl text-center cinzel">
                <span className="font-bold josefin">FindSimilar</span> <span className="font-normal text-emerald-400">Movies</span>
            </h1>
            <p className="mt-4 max-w-2xl text-gray-400 max-sm:text-base text-lg text-center">
                No sign-up. Just 3 instant recommendations.            </p>

            <form className="my-12 w-full max-w-lg">
                <div className="relative flex items-center w-full max-w-lg">
                    <input
                        type="text"
                        value={movieTitle}
                        onChange={(e) => {
                            setMovieTitle(e.target.value)
                            setShowSuggestions(true)
                        }}
                        placeholder="Enter the title of a movie..."
                        required
                        className="flex-1 bg-[#2B2A33] px-6 py-3 border-gray-300 focus:border-emerald-700 rounded-l-md focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                        onBlur={() => {
                            setTimeout(() => setShowSuggestions(false), 100)
                        }}
                        onFocus={() => {
                            setShowSuggestions(true)
                        }}
                    />
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
                        className="relative flex justify-center items-center bg-emerald-600 hover:bg-emerald-700 focus:ring-opacity-50 rounded-r-md focus:outline-hidden focus:ring-2 focus:ring-emerald-700 w-16 h-12 text-white"
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
                <p className="mt-2 text-gray-500 text-sm italic">
                    Recommendations have a similar core theme, style of storytelling, and/or emotional tone to your provided movie.
                </p>
            </form>

            <div className="flex justify-center w-full">
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
        </div >
    )
}
