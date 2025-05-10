'use client'

import { Game } from '@/lib/types'
import Image from 'next/image'

type Props = {
    games: Game[]
}

const SimilarGames = ({ games }: Props) => {
    return (
        <div className="mt-4 mb-6 w-full max-sm:mt-16">
            <ul className="flex list-none justify-center max-sm:flex-wrap">
                {games.map((game) => (
                    <li
                        key={game.id}
                        className="flex w-full flex-col items-center justify-center gap-2 self-start p-8 max-sm:mb-16 md:w-1/3"
                    >
                        <a
                            href={`https://www.igdb.com/games/${encodeURIComponent(
                                game.slug,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full flex-col items-center text-center"
                        >
                            <div className="relative h-48 w-32 cursor-pointer rounded-sm">
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
                                    {game.name}
                                </h3>
                                <p className="pt-1 text-base text-gray-400">
                                    {game?.genres ? (
                                        game?.genres
                                            ?.slice(0, 3)
                                            .map(
                                                (genre: { name: string }) =>
                                                    genre.name,
                                            )
                                            .join(', ')
                                    ) : (
                                        <span className="h-7">-</span>
                                    )}
                                </p>
                                <p className="line-clamp-4 pt-6 text-left text-sm text-gray-500">
                                    {' '}
                                    {game.summary ??
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

export default SimilarGames
