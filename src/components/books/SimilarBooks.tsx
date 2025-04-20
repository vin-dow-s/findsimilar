'use client'

import { Book } from '@/lib/types'
import Image from 'next/image'

type Props = {
    books: Book[]
}

const SimilarBooks = ({ books }: Props) => {
    return (
        <div className="mt-4 max-sm:mt-16 mb-6 w-full">
            <ul className="flex max-sm:flex-wrap justify-center list-none">
                {books.map((book) => (
                    <li
                        key={book.id}
                        className="flex flex-col justify-center items-center self-start gap-2 max-sm:mb-16 p-8 w-full md:w-1/3"
                    >
                        <a
                            href={book.volumeInfo?.infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center w-full text-center"
                        >
                            <div className="relative rounded-sm w-32 h-48 cursor-pointer">
                                {book.volumeInfo?.imageLinks?.thumbnail ? (
                                    <Image
                                        src={book.volumeInfo?.imageLinks?.thumbnail?.replace(
                                            'http:',
                                            'https:',
                                        )}
                                        alt={`Cover of the book ${book.volumeInfo?.title}`}
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
                                    {book.volumeInfo.title}
                                </h3>
                                <p className="pt-1 text-gray-400 text-base">
                                    {book.volumeInfo?.authors?.[0] ??
                                        'Unknown author'}

                                </p>
                                <p className="pt-6 text-gray-500 text-sm text-left line-clamp-4">
                                    {' '}
                                    {book.volumeInfo.description ?? 'No description available.'}
                                </p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SimilarBooks
