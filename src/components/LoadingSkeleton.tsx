import Skeleton from '@/components/ui/Skeleton'

const LoadingSkeleton = () => {
    return (
        <div className="mt-4 max-sm:mt-16 mb-6 w-full">
            <ul className="flex max-sm:flex-wrap justify-center list-none">
                {Array.from({ length: 3 }, (_, index) => (
                    <li
                        key={index}
                        className="flex flex-col justify-center items-center gap-2 max-sm:mb-16 p-8 w-full md:w-1/3"
                    >
                        <div className="flex flex-col items-center w-full text-center">
                            <div className="relative rounded-sm w-32 h-48">
                                <Skeleton className="rounded-sm w-full h-full" />
                            </div>
                            <div className="content-center w-full text-center">
                                <Skeleton className="mx-auto mt-4 w-[60%] max-w-[200px] h-6" />
                                <Skeleton className="mx-auto mt-2 w-[40%] max-w-[140px] h-5" />
                            </div>
                            <div className="flex flex-col justify-left space-y-2 mt-6 w-full text-left">
                                <Skeleton className="w-[90%] max-w-[540px] h-3" />
                                <Skeleton className="w-[80%] max-w-[240px] h-3" />
                                <Skeleton className="w-[80%] max-w-[220px] h-3" />
                                <Skeleton className="w-[75%] max-w-[200px] h-3" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoadingSkeleton
