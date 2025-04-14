import GameSearch from '@/components/games/GameSearch'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'


export const metadata: Metadata = {
    title: 'FindSimilar Games - Instant AI-Powered Recommendations',
    description:
        'Just enter a game you loved and get 3 similar recommendations. No sign-up. Fast & Free. Powered by AI & IGDB.',
    openGraph: {
        title: 'FindSimilar Games - Instant AI-Powered Recommendations',
        description:
            'Just enter a game you loved and get 3 similar recommendations. No sign-up. Fast & Free. Powered by AI & IGDB.',
        url: 'https://findsimilar.vercel.app/games',
        images: [
            {
                url: 'https://findsimilar.vercel.app/assets/games/findsimilar-games-og.webp',
                width: 1200,
                height: 630,
                alt: 'Games OG Image',
            },
        ],
    },
}


const GamesPage = () => {
    return (
        <main className="flex flex-col flex-1 justify-between items-center w-full min-h-full">
            <div className="top-2 left-2 z-20 fixed flex gap-2 text-sm">
                <Link href="/" className="p-2 text-gray-400 hover:text-gray-300 transition-colors">← Back</Link>
            </div>
            <GameSearch />
            <div className="flex justify-center items-center mb-10 w-full">
                <p className="flex md:flex-row flex-col justify-center text-gray-400 text-sm text-center">
                    Help shape the next version
                    <span className="max-md:hidden mx-1"> - </span>
                    <a href="/feedback" className="text-orange-400 underline">
                        Get early access & launch offer →
                    </a>
                </p>
            </div>

            <a
                href="https://www.igdb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="right-4 bottom-0 z-10 fixed opacity-60 hover:opacity-100 fill-white transition-opacity"
            >
                <Image
                    src="/icons/games/IGDB.svg"
                    alt="IGDB Logo"
                    width={60}
                    height={16}
                />
            </a>
        </main>
    )
}

export default GamesPage
