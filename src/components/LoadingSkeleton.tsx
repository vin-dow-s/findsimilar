import Skeleton from '@/components/ui/Skeleton'

const LoadingSkeleton = () => {
    return (
        <div className="mt-4 mb-6 w-full">
            <ul className="flex list-none justify-center max-sm:flex-wrap">
                {Array.from({ length: 3 }, (_, index) => (
                    <li
                        key={index}
                        className="flex w-full flex-col items-center justify-center gap-2 p-8 max-sm:mb-16 md:w-1/3"
                    >
                        <div className="flex w-full flex-col items-center text-center">
                            <div className="relative h-48 w-32 rounded-sm">
                                <Skeleton className="w-full h-full rounded-sm" />
                            </div>
                            <div className="w-full content-center text-center">
                                <Skeleton className="mt-4 h-6 w-[60%] max-w-[200px] mx-auto" />
                                <Skeleton className="mt-2 h-5 w-[40%] max-w-[140px] mx-auto" />
                            </div>
                            <div className="w-full mt-6 flex flex-col justify-left space-y-2 text-left">
                                <Skeleton className="h-3 w-[90%] max-w-[540px]" />
                                <Skeleton className="h-3 w-[80%] max-w-[240px]" />
                                <Skeleton className="h-3 w-[80%] max-w-[220px]" />
                                <Skeleton className="h-3 w-[75%] max-w-[200px]" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoadingSkeleton
