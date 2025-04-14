import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
    title: 'Give Feedback & Get Early Access - FindSimilar: Instant Book/Game/Movie Recommendations',
    description:
        'FindSimilar helps you discover books, games, and movies in seconds. Share your thoughts, get early access, and help build the smartest recommendation tool.',
}

const FeedbackPage = () => {
    return (
        <main className="flex flex-col flex-1 justify-center items-center px-4 py-16">
            <div className="top-2 left-2 z-20 fixed flex gap-2 text-sm">
                <Link href="/" className="p-2 text-gray-400 hover:text-gray-300 transition-colors">← Back</Link>
            </div>
            <h1 className="mb-8 font-bold max-sm:text-3xl text-4xl text-center">
                Help shape FindSimilar in 30 seconds <span aria-hidden="true">👇</span>
            </h1>
            <div className="flex flex-col gap-2 mb-16 text-left">
                <p className="text-gray-400 text-base sm:text-lg text-left">
                    <span aria-hidden="true">🛠</span> Let&apos;s build the simplest way to get recommendations for books, games & movies
                </p>
                <p className="text-gray-400 text-base sm:text-lg text-left">
                    <span aria-hidden="true">🚀</span> Get early access & a special launch offer
                </p>
            </div>
            <div className="w-full max-w-xl">
                <iframe
                    title="Feedback for FindSimilar"
                    aria-label="FindSimilar Feedback Form"
                    data-tally-src="https://www.tally.so/embed/3jzj66?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&theme=dark"
                    loading="lazy"
                    width="100%"
                    height="500px"
                    className="w-full"
                ></iframe>
            </div>
            <Script
                src="https://www.tally.so/widgets/embed.js"
                strategy="lazyOnload"
            />
        </main>
    )
}

export default FeedbackPage
