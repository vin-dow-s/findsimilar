'use client'

import { Book } from '@/lib/types'
import Image from 'next/image'

type Props = {
    books: Book[]
}

const SimilarBooks = ({ books }: Props) => {
    return (
        <div className="mt-4 mb-6 w-full max-w-[1500px]">
            <ul className="flex list-none justify-center max-sm:flex-wrap">
                {books.map((book) => (
                    <li
                        key={book.id}
                        className="flex w-full flex-col items-center justify-center gap-2 p-8 max-sm:mb-16 md:w-1/3"
                    >
                        <a
                            href={book.volumeInfo?.infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full flex-col items-center text-center"
                        >
                            <div className="relative h-48 w-32 cursor-pointer rounded-sm">
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
                                        className="rounded-sm opacity-100 transition-opacity duration-200 ease-in-out hover:opacity-50"
                                    />
                                ) : (
                                    <div className="flex h-48 w-32 items-center justify-center rounded-sm bg-gray-300">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="w-full content-center text-center">
                                <h3 className="mt-4 text-2xl font-semibold">
                                    {book.volumeInfo.title &&
                                    book.volumeInfo.title?.length > 30
                                        ? book.volumeInfo.title?.substring(
                                              0,
                                              30,
                                          ) + '...'
                                        : book.volumeInfo?.title}
                                </h3>
                                <p className="pt-1 text-base text-gray-400">
                                    {book.volumeInfo?.authors?.[0] ||
                                        'Unknown author'}
                                </p>
                                <p className="line-clamp-4 pt-6 text-left text-sm text-gray-500">
                                    {' '}
                                    {book.volumeInfo.description?.substring(
                                        0,
                                        400,
                                    ) ?? 'No description available.'}
                                    ... ...
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
