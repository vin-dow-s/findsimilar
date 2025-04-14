import BookSearch from '@/components/books/BookSearch'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'FindSimilar Books - Instant AI-Powered Recommendations',
    description:
        'Just enter a book you loved and get 3 similar recommendations. No sign-up. Fast & Free. Powered by AI & Google Books.',
    openGraph: {
        title: 'FindSimilar Books - Instant AI-Powered Recommendations',
        description:
            'Just enter a book you loved and get 3 similar recommendations. No sign-up. Fast & Free. Powered by AI & Google Books.',
        url: 'https://www.findsimilar.app/books',
        images: [
            {
                url: 'https://www.findsimilar.app/assets/books/findsimilar-books-og.webp',
                width: 1200,
                height: 630,
                alt: 'Books OG Image',
            },
        ],
    },
}


const BooksPage = () => {
    return (
        <main className="flex flex-col flex-1 justify-between items-center w-full min-h-full">
            <div className="top-2 left-2 z-20 fixed flex gap-2 text-sm">
                <Link href="/" className="p-2 text-gray-400 hover:text-gray-300 transition-colors">← Back</Link>
            </div>
            <BookSearch />
            <div className="flex justify-center items-center mb-10 w-full">
                <p className="flex md:flex-row flex-col justify-center text-gray-400 text-sm text-center">
                    Help shape the next version
                    <span className="max-md:hidden mx-1"> - </span>
                    <a href="/feedback" className="text-violet-400 underline">
                        Get early access & launch offer →
                    </a>
                </p>
            </div>
            <a
                href="https://www.books.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="right-4 bottom-4 z-10 fixed opacity-60 hover:opacity-100 fill-white transition-opacity"
            >
                <Image
                    src="/icons/books/GoogleBooks.svg"
                    alt="Google Books Logo"
                    width={60}
                    height={16}
                />
            </a>
        </main>
    )
}

export default BooksPage
