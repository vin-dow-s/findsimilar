import { cn } from '@/lib/utils'

type SkeletonProps = {
    className?: string
}

const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={cn('animate-pulse rounded-sm bg-gray-600', className)}
        />
    )
}

export default Skeleton
