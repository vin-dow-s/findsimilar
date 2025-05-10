'use client'

import { Movie } from '@/lib/types'
import Image from 'next/image'

type Props = {
    movies: Movie[]
}

const SimilarMovies = ({ movies }: Props) => {
    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim()
    }

    return (
        <div className="mt-4 mb-6 w-full max-sm:mt-16">
            <ul className="flex list-none justify-center max-sm:flex-wrap">
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className="flex w-full flex-col items-center justify-center gap-2 self-start p-8 max-sm:mb-16 md:w-1/3"
                    >
                        <a
                            href={`https://www.themoviedb.org/movie/${movie.id}-${createSlug(movie.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full flex-col items-center text-center"
                        >
                            <div className="relative h-48 w-32 cursor-pointer rounded-sm">
                                {movie.poster_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={`Cover of the movie ${movie.title}`}
                                        sizes="100vw"
                                        width={0}
                                        height={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        className="rounded-sm opacity-100 transition-opacity duration-200 ease-in-out hover:opacity-50"
                                    />
                                ) : (
                                    <div className="flex h-48 w-32 items-center justify-center rounded-sm bg-gray-300">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="w-full content-center text-center">
                                <h3 className="mt-4 line-clamp-1 text-2xl font-semibold">
                                    {movie.title}
                                </h3>
                                <p className="pt-1 text-base text-gray-400">
                                    {movie?.release_date?.substring(0, 4)}
                                </p>
                                <p className="line-clamp-4 pt-6 text-left text-sm text-gray-500">
                                    {' '}
                                    {movie.overview ??
                                        'No description available.'}
                                </p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SimilarMovies
