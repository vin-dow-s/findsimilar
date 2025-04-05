import BookSearch from '@/components/books/BookSearch'

const BooksPage = () => {
    return (
        <main className="flex min-h-full w-full flex-1 flex-col items-center justify-between">
            <BookSearch />
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

export default BooksPage
