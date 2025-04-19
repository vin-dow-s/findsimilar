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
            .trim();
    }

    return (
        <div className="mt-4 max-sm:mt-16 mb-6 w-full">
            <ul className="flex max-sm:flex-wrap justify-center list-none">
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className="flex flex-col justify-center items-center self-start gap-2 max-sm:mb-16 p-8 w-full md:w-1/3"
                    >
                        <a
                            href={`https://www.themoviedb.org/movie/${movie.id}-${createSlug(movie.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center w-full text-center"
                        >
                            <div className="relative rounded-sm w-32 h-48 cursor-pointer">
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
                                        className="opacity-100 hover:opacity-50 rounded-sm transition-opacity duration-200 ease-in-out"
                                    />
                                ) : (
                                    <div className="flex justify-center items-center bg-gray-300 rounded-sm w-32 h-48">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="content-center w-full text-center">
                                <h3 className="mt-4 font-semibold text-2xl line-clamp-1">
                                    {movie.title}
                                </h3>
                                <p className="pt-1 text-gray-400 text-base">
                                    {movie?.release_date?.substring(0, 4)}
                                </p>
                                <p className="pt-6 text-gray-500 text-sm text-left line-clamp-4">
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
