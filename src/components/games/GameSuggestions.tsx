'use client'

import { Game } from '@/lib/types'
import Image from 'next/image'

type Props = {
    suggestions: Game[]
    onSelect: (suggestion: Game) => void
}

const GameSuggestions = ({ suggestions, onSelect }: Props) => {
    return (
        <ul className="absolute top-14 left-0 z-10 w-full rounded-md border border-gray-300 bg-white shadow-lg">
            {suggestions.map((suggestion) => (
                <li
                    key={suggestion.id}
                    className="flex h-16 cursor-pointer items-center justify-between border-b px-4 py-2 text-black last:border-b-0 hover:bg-gray-100"
                    onMouseDown={() => onSelect(suggestion)}
                >
                    <div className="flex-1 truncate">
                        <span
                            className="block truncate"
                            style={{ maxWidth: '90%' }}
                        >
                            {suggestion.name}
                        </span>
                    </div>
                    {suggestion.cover && (
                        <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${suggestion.cover.url
                                .split('/')
                                .pop()}`}
                            alt={`Cover of the game ${suggestion.name}`}
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

export default GameSuggestions
