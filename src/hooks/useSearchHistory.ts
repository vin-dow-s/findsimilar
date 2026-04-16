'use client'

import { useCallback, useEffect, useState } from 'react'

const MAX_ITEMS = 5

export function useSearchHistory<T>(storageKey: string) {
    const [history, setHistory] = useState<T[]>([])

    useEffect(() => {
        try {
            const raw = localStorage.getItem(storageKey)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) setHistory(parsed as T[])
            }
        } catch {}
    }, [storageKey])

    const add = useCallback(
        (item: T, isEqual: (a: T, b: T) => boolean) => {
            setHistory((prev) => {
                const filtered = prev.filter((p) => !isEqual(p, item))
                const next = [item, ...filtered].slice(0, MAX_ITEMS)
                try {
                    localStorage.setItem(storageKey, JSON.stringify(next))
                } catch {}
                return next
            })
        },
        [storageKey],
    )

    const clear = useCallback(() => {
        try {
            localStorage.removeItem(storageKey)
        } catch {}
        setHistory([])
    }, [storageKey])

    return { history, add, clear }
}
