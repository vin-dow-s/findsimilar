'use client'

import { Book } from '@/lib/types'
import Image from 'next/image'

type Props = {
    suggestions: Book[]
    onSelect: (suggestion: Book) => void
}

const BookSuggestions = ({ suggestions, onSelect }: Props) => {
    return (
        <ul className="absolute top-14 left-0 z-10 w-full rounded-md border border-gray-300 bg-white shadow-lg">
            {suggestions.map((suggestion) => (
                <li
                    key={suggestion.etag}
                    className="flex h-16 cursor-pointer items-center justify-between border-b px-4 py-2 text-black last:border-b-0 hover:bg-gray-100"
                    onMouseDown={() => onSelect(suggestion)}
                >
                    <div className="flex-1 truncate">
                        <span
                            className="block truncate"
                            style={{ maxWidth: '90%' }}
                        >
                            {suggestion.volumeInfo.title}
                        </span>
                    </div>
                    {suggestion.volumeInfo.imageLinks?.thumbnail && (
                        <Image
                            src={suggestion.volumeInfo.imageLinks.thumbnail.replace(
                                'http:',
                                'https:',
                            )}
                            alt={`Cover of the book ${suggestion.volumeInfo.title}`}
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

export default BookSuggestions
