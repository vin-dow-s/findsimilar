'use client'

import { Book } from '@/lib/types'
import Image from 'next/image'

type Props = {
    suggestions: Book[]
    onSelect: (suggestion: Book) => void
}

const BookSuggestions = ({ suggestions, onSelect }: Props) => {
    /**
     * Extrait l'année de publication à partir du format de date de Google Books
     * Format possible: YYYY ou YYYY-MM ou YYYY-MM-DD
     */
    const getPublishedYear = (publishedDate?: string): string => {
        if (!publishedDate) return '';
        // Extrait l'année (les 4 premiers caractères) de la date
        const match = publishedDate.match(/^(\d{4})/);
        return match ? match[1] : '';
    };

    return (
        <ul className="top-14 left-0 z-10 absolute bg-white shadow-lg border border-gray-300 rounded-md w-full">
            {suggestions.map((suggestion) => (
                <li
                    key={suggestion.etag}
                    className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 border-b last:border-b-0 h-16 text-black cursor-pointer"
                    onMouseDown={() => onSelect(suggestion)}
                >
                    <div className="flex-1 truncate">
                        <span
                            className="block truncate"
                            style={{ maxWidth: '90%' }}
                        >
                            {suggestion.volumeInfo.title}
                            {suggestion.volumeInfo.publishedDate && (
                                <span className="ml-1 text-gray-500 text-sm">
                                    ({getPublishedYear(suggestion.volumeInfo.publishedDate)})
                                </span>
                            )}
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
