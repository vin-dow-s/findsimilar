import { LRUCache } from 'lru-cache'
import { createHash } from 'crypto'

const cache = new LRUCache<string, object>({
    max: 2_000,
    ttl: 1000 * 60 * 60 * 24 * 7,
})

export function cacheKey(namespace: string, input: string): string {
    const normalized = input.trim().toLowerCase().replace(/\s+/g, ' ')
    const hash = createHash('sha256').update(normalized).digest('hex').slice(0, 24)
    return `${namespace}:${hash}`
}

export function getCached<T extends object>(key: string): T | undefined {
    return cache.get(key) as T | undefined
}

export function setCached<T extends object>(key: string, value: T): void {
    cache.set(key, value)
}
