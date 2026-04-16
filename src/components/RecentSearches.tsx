'use client'

import Image from 'next/image'

type RecentItem = {
    key: string
    label: string
    thumbnail?: string | null
}

type Props = {
    items: RecentItem[]
    accentClassName: string
    onSelect: (key: string) => void
    onClear: () => void
}

export default function RecentSearches({
    items,
    accentClassName,
    onSelect,
    onClear,
}: Props) {
    if (items.length === 0) return null

    return (
        <div className="mx-auto mt-4 mb-10 w-full max-w-2xl px-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className={`text-sm font-medium ${accentClassName}`}>
                    Your last searches
                </h2>
                <button
                    onClick={onClear}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                    Clear
                </button>
            </div>
            <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <li key={item.key}>
                        <button
                            onClick={() => onSelect(item.key)}
                            className="flex items-center gap-2 rounded-md bg-[#2B2A33] px-3 py-2 text-sm text-gray-200 hover:bg-[#3a3942] transition-colors"
                        >
                            {item.thumbnail ? (
                                <Image
                                    src={item.thumbnail}
                                    alt=""
                                    width={24}
                                    height={32}
                                    unoptimized
                                    className="h-8 w-6 rounded-sm object-cover"
                                />
                            ) : null}
                            <span className="max-w-[220px] truncate">
                                {item.label}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
