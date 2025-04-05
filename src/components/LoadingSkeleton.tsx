import Skeleton from '@/components/ui/Skeleton'

const LoadingSkeleton = () => {
    return (
        <div className="mt-4 mb-6 w-full max-w-[1500px]">
            <ul className="flex list-none justify-center max-sm:flex-wrap">
                {Array.from({ length: 3 }, (_, index) => (
                    <li
                        key={index}
                        className="flex w-full flex-col items-center gap-2 p-8 max-sm:mb-16 md:w-1/3"
                    >
                        <Skeleton className="mb-4 h-48 w-32" />
                        <Skeleton className="mb-2 h-8 w-44 text-center" />
                        <Skeleton className="mb-6 h-4 w-16" />

                        <div className="flex flex-col items-start space-y-1">
                            <Skeleton className="h-3 w-md max-sm:w-72" />
                            <Skeleton className="h-3 w-96 max-sm:w-64" />
                            <Skeleton className="h-3 w-72 max-sm:w-56" />
                            <Skeleton className="h-3 w-80 max-sm:w-72" />
                            <Skeleton className="h-3 w-80 max-sm:w-72" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoadingSkeleton
