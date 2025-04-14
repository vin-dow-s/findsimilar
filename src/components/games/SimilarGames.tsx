'use client'

import { Game } from '@/lib/types'
import Image from 'next/image'

type Props = {
    games: Game[]
}

const SimilarGames = ({ games }: Props) => {
    return (
        <div className="mt-4 max-sm:mt-16 mb-6 w-full">
            <ul className="flex max-sm:flex-wrap justify-center list-none">
                {games.map((game) => (
                    <li
                        key={game.id}
                        className="flex flex-col justify-center items-center gap-2 max-sm:mb-16 p-8 w-full md:w-1/3"
                    >
                        <a
                            href={`https://www.igdb.com/games/${encodeURIComponent(
                                game.slug,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center w-full text-center"
                        >
                            <div className="relative rounded-sm w-32 h-48 cursor-pointer">
                                {game.cover ? (
                                    <Image
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.url
                                            .split('/')
                                            .pop()}`}
                                        alt={`Cover of the game ${game.name}`}
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
                                    {game.name}
                                </h3>
                                <p className="pt-1 text-gray-400 text-base">
                                    {game?.genres?.slice(0, 3)
                                        .map(
                                            (genre: { name: string }) =>
                                                genre.name,
                                        )
                                        .join(', ')}
                                </p>
                                <p className="pt-6 text-gray-500 text-sm text-left line-clamp-4">
                                    {' '}
                                    {game.summary ??
                                        'No description available.'}
                                    ...
                                </p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SimilarGames
