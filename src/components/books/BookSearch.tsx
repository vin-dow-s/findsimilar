'use client'

import { useBookSuggestions } from '@/hooks/books/useBookSuggestions'
import { useSimilarBooks } from '@/hooks/books/useSimilarBooks'
import { Book } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import BookSuggestions from './BookSuggestions'
import LoadingSkeleton from '../LoadingSkeleton'
import SimilarBooks from './SimilarBooks'

export default function BookSearch() {
    const [bookTitle, setBookTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)

    const { suggestions, loading: loadingSuggestions } =
        useBookSuggestions(bookTitle)
    const { similarBooks, loading: loadingSimilarBooks } = useSimilarBooks(
        selectedBook?.volumeInfo?.description || '',
    )

    const handleSelectBook = (book: Book) => {
        setBookTitle(book.volumeInfo.title)
        setSelectedBook(book)
        setShowSuggestions(false)
    }

    return (
        <div
            className={`relative flex w-full flex-col items-center ${loadingSimilarBooks || similarBooks.length > 0
                ? 'justify-center'
                : 'justify-start lg:justify-start 2xl:pt-24'
                } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="mt-24 sm:mt-12 text-white lg:text-[52px] text-5xl text-center lora">
                <span className="font-bold josefin">FindSimilar</span> <span className="text-violet-400">Books</span>
            </h1>
            <p className="mt-8 sm:mt-4 max-w-2xl text-gray-400 text-sm sm:text-base text-center">
                No sign-up. Just 3 instant recommendations.
            </p>

            <form className="sm:my-12 max-sm:mt-8 w-full max-w-lg">
                <div className="relative flex items-center w-full max-w-lg">
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => {
                            setBookTitle(e.target.value)
                            setShowSuggestions(true)
                        }}
                        placeholder="Enter the title of a book..."
                        required
                        className="flex-1 bg-[#2B2A33] px-6 py-3 border-gray-300 focus:border-violet-600 rounded-l-md focus:outline-hidden focus:ring-2 focus:ring-violet-600"
                        onBlur={() => {
                            if (selectedBook)
                                setShowSuggestions(false)
                        }}
                        onFocus={() => {
                            setShowSuggestions(true)
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <BookSuggestions
                            suggestions={suggestions}
                            onSelect={handleSelectBook}
                        />
                    )}

                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            if (selectedBook) {
                                const currentBook = selectedBook
                                setSelectedBook(null)
                                setTimeout(() => {
                                    setSelectedBook(currentBook)
                                }, 0)
                            }
                        }}
                        type="submit"
                        disabled={loadingSuggestions || loadingSimilarBooks}
                        className="relative flex justify-center items-center bg-violet-600 hover:bg-violet-700 focus:ring-opacity-50 rounded-r-md focus:outline-hidden focus:ring-2 focus:ring-violet-600 w-16 h-12 text-white"
                    >
                        {loadingSuggestions || loadingSimilarBooks ? (
                            <div className="dot-flashing dot-flashing-books"></div>
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
                    Recommendations have a similar core theme, narrative style, and/or
                    setting to your provided book.
                </p>
            </form>

            <div className="flex justify-center w-full">
                <div className="w-full max-w-[1500px]">
                    {loadingSimilarBooks ? (
                        <LoadingSkeleton />
                    ) : (
                        similarBooks.length > 0 && (
                            <SimilarBooks books={similarBooks} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
