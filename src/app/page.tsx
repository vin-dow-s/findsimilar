import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="flex flex-col flex-1 justify-between items-center w-full min-h-full">
            <div className="relative flex flex-col flex-1 justify-center items-center gap-8 px-4 sm:px-6 lg:px-8 py-2 w-full min-h-full">
                <h1 className="font-normal text-7xl josefin">FindSimilar</h1>

                <div className="flex flex-row gap-4">
                    <Link
                        href="/books"
                        className="content-center bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-md h-12 text-white text-lg transition lora"
                    >
                        Books
                    </Link>
                    <Link
                        href="/games"
                        className="content-center bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-md h-12 text-white transition poppins"
                    >
                        Games
                    </Link>
                    <Link
                        href="/movies"
                        className="content-center bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-md h-12 text-white transition cinzel"
                    >
                        Movies
                    </Link>
                </div>

                <p className="mb-10 max-w-xl font-normal text-white text-center">
                    <span className="text-2xl josefin">...to the ones you loved.</span>
                    <br />
                    <span className="text-gray-400 text-sm">No sign-up. Just 3 instant recommendations.</span>
                </p>
            </div>

            <div className="flex justify-center items-center mb-10 w-full">
                <p className="flex md:flex-row flex-col justify-center text-gray-400 text-sm text-center">
                    Help shape the next version
                    <span className="max-md:hidden mx-1"> - </span>
                    <Link href="/feedback" className="text-white underline">
                        Get early access & launch offer →
                    </Link>
                </p>
            </div>
        </main>
    )
}