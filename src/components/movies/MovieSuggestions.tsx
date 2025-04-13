'use client'

import { Movie } from '@/lib/types'
import Image from 'next/image'

type Props = {
    suggestions: Movie[]
    onSelect: (suggestions: Movie) => void
}

const MovieSuggestions = ({ suggestions, onSelect }: Props) => {
    return (
        <ul className="top-14 left-0 z-10 absolute bg-white shadow-lg border border-gray-300 rounded-md w-full">
            {suggestions.map((movie) => (
                <li
                    key={movie.id}
                    className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 border-b last:border-b-0 h-16 text-black cursor-pointer"
                    onMouseDown={() => onSelect(movie)}
                >
                    <div className="flex-1 truncate">
                        <span
                            className="block truncate"
                            style={{ maxWidth: '90%' }}
                        >
                            {movie.title} <span className="text-gray-500 text-sm">({movie.release_date.split('-')[0]})</span>
                        </span>
                    </div>
                    {movie.poster_path && (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={`Cover of the movie ${movie.title}`}
                            width={32}
                            height={48}
                            className="rounded-sm"
                        />
                    )}
                </li>
            ))}
        </ul>
    )
}

export default MovieSuggestions
