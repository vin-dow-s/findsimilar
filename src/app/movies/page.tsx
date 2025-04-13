import MovieSearch from '@/components/movies/MovieSearch'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'


export const metadata: Metadata = {
    title: 'FindSimilar Movies - Instant AI-Powered Recommendations',
    description:
        'Just enter a movie you loved and get 3 similar recommendations. No sign-up. Fast & Free. Powered by AI & TMDb.',
    openGraph: {
        title: 'FindSimilar Movies - Instant AI-Powered Recommendations',
        description:
            'Just enter a movie you loved and get 3 similar recommendations. No sign-up. Fast & Free. Powered by AI & TMDb.',
        url: 'https://findsimilar.vercel.app/movies',
        images: [
            {
                url: 'https://findsimilar.vercel.app/assets/og-movies.webp',
                width: 1200,
                height: 630,
                alt: 'Movies OG Image',
            },
        ],
    },
}


const MoviesPage = () => {
    return (
        <main className="flex flex-col flex-1 justify-between items-center w-full min-h-full">
            <div className="top-2 left-2 z-20 fixed flex gap-2 text-sm">
                <Link href="/" className="p-2 text-gray-400 hover:text-gray-300 transition-colors">← Back</Link>
            </div>
            <MovieSearch />
            <div className="flex justify-center items-center mb-10 w-full">
                <p className="flex md:flex-row flex-col justify-center text-gray-400 text-sm text-center">
                    Help shape the next version
                    <span className="max-md:hidden mx-1"> - </span>
                    <a href="/feedback" className="text-emerald-500 underline">
                        Get early access & launch offer →
                    </a>
                </p>
            </div>
            <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="right-4 bottom-4 z-10 fixed opacity-60 hover:opacity-100 transition-opacity"
            >
                <Image
                    src="/icons/movies/tmdb.svg"
                    alt="TMDb Logo"
                    width={60}
                    height={16}
                />
            </a>
        </main>
    )
}

export default MoviesPage
