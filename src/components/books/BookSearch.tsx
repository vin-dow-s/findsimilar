'use client'

import { useBookSuggestions } from '@/hooks/books/useBookSuggestions'
import { useSimilarBooks } from '@/hooks/books/useSimilarBooks'
import { Book } from '@/lib/types'
import Image from 'next/image'
import { useRef, useState } from 'react'
import LoadingSkeleton from '../LoadingSkeleton'
import BookSuggestions from './BookSuggestions'
import SimilarBooks from './SimilarBooks'

export default function BookSearch() {
    const [bookTitle, setBookTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const suppressNextFocus = useRef(false)

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
            className={`relative flex w-full flex-col items-center ${
                loadingSimilarBooks || similarBooks.length > 0
                    ? 'justify-center'
                    : 'justify-start lg:justify-start 2xl:pt-24'
            } px-4 py-2 sm:px-6 lg:px-8`}
        >
            <h1 className="lora mt-24 text-center text-5xl text-white sm:mt-12 lg:text-[52px]">
                <span className="josefin font-bold">FindSimilar</span>{' '}
                <span className="text-violet-400">Books</span>
            </h1>
            <p className="mt-8 max-w-2xl text-center text-sm text-gray-400 sm:mt-4 sm:text-base">
                No sign-up. Just 3 instant recommendations.
            </p>

            <form className="w-full max-w-lg max-sm:mt-8 sm:my-8">
                <div className="relative flex w-full max-w-lg items-center">
                    <div className="flex w-full max-w-lg items-center rounded-l-md bg-[#2B2A33] focus-within:ring-2 focus-within:ring-violet-600">
                        <input
                            ref={inputRef}
                            type="text"
                            value={bookTitle}
                            onChange={(e) => {
                                setBookTitle(e.target.value)
                                setShowSuggestions(true)
                            }}
                            placeholder="Enter the title of a book..."
                            required
                            className="flex-1 rounded-l-md bg-[#2B2A33] px-6 py-3 text-white placeholder-gray-400 focus:outline-none"
                            onBlur={() => {
                                if (selectedBook) setShowSuggestions(false)
                            }}
                            onFocus={() => {
                                if (suppressNextFocus.current) {
                                    suppressNextFocus.current = false
                                    return
                                }
                                setShowSuggestions(true)
                            }}
                        />
                        {bookTitle && (
                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    setBookTitle('')
                                    setSelectedBook(null)
                                    suppressNextFocus.current = true
                                    inputRef.current?.focus()
                                }}
                                className="px-4 py-3 text-gray-400 hover:text-white"
                                aria-label="Clear input"
                            >
                                <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 8L16 16"
                                        stroke="#99a1af"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 8L8 16"
                                        stroke="#99a1af"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

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
                        className="focus:ring-opacity-50 relative flex h-12 w-16 cursor-pointer items-center justify-center rounded-r-md bg-violet-600 text-white hover:bg-violet-700 focus:ring-2 focus:ring-violet-600 focus:outline-hidden"
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
                <p className="mt-2 text-sm text-gray-500 italic">
                    Recommendations have a similar core theme, narrative style,
                    and/or setting to your provided book.
                </p>
            </form>

            <div className="flex w-full justify-center">
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
