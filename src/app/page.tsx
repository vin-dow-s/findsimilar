import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-4 text-4xl font-bold">🎯 Find Similar</h1>
            <p className="mb-10 max-w-xl text-lg text-gray-400">
                Type one title. Get 3 similar picks. Instantly.
                <br />
                Books, games, movies — all in one place.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                    href="/books"
                    className="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
                >
                    Books
                </Link>
                <Link
                    href="/games"
                    className="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
                >
                    Games
                </Link>
                <Link
                    href="/movies"
                    className="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
                >
                    Movies
                </Link>
            </div>

            <div className="mb-10 flex w-full items-center justify-center">
                <p className="flex flex-col justify-center text-center text-sm text-gray-400 md:flex-row">
                    Help shape the next version
                    <span className="mx-1 max-md:hidden"> - </span>
                    <a href="/join" className="text-indigo-400 underline">
                        Get early access & launch offer →
                    </a>
                </p>
            </div>
        </main>
    )
}
