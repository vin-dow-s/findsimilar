'use client'

import { Game } from '@/lib/types'
import Image from 'next/image'

type Props = {
    suggestions: Game[]
    onSelect: (suggestion: Game) => void
}

const GameSuggestions = ({ suggestions, onSelect }: Props) => {
    return (
        <ul className="top-14 left-0 z-10 absolute bg-white shadow-lg border border-gray-300 rounded-md w-full">
            {suggestions.map((suggestion) => (
                <li
                    key={suggestion.id}
                    className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 border-b last:border-b-0 h-16 text-black cursor-pointer"
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
