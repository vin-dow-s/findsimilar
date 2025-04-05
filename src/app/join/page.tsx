import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
    title: 'Get Early Access to Find Similar – Smart AI Book Recommendations',
    description:
        'Tell us what would make the perfect AI-powered recommendation tool. Get early access, share your feedback, and help shape what we build next.',
}

const JoinPage = () => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
            <h1 className="mb-8 text-center text-4xl font-bold max-sm:text-3xl">
                📚 Shape the perfect AI-powered recommendation tool
            </h1>
            <div className="mb-16 flex flex-col gap-2 text-left">
                <p className="text-left text-base text-gray-400 sm:text-lg">
                    🔍 Tell us what would make it truly game-changing
                </p>
                <p className="text-left text-base text-gray-400 sm:text-lg">
                    🚀 Get exclusive early access & launch offer
                </p>
            </div>
            <div className="w-full max-w-xl">
                <iframe
                    title="Join the Find Similar Waitlist"
                    aria-label="Find Similar Waitlist Form"
                    data-tally-src="https://tally.so/embed/mJovp4?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&theme=dark"
                    loading="lazy"
                    width="100%"
                    height="500px"
                    className="w-full"
                ></iframe>
            </div>
            <div className="mt-16 flex flex-col items-center justify-center">
                <Link href="/" className="text-sm text-gray-300">
                    ← Back to the app
                </Link>
            </div>
            <Script
                src="https://tally.so/widgets/embed.js"
                strategy="lazyOnload"
            />
        </main>
    )
}

export default JoinPage
