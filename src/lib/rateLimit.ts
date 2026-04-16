import { LRUCache } from 'lru-cache'

type Bucket = { count: number; reset: number }

const buckets = new LRUCache<string, Bucket>({ max: 10_000 })

export type RateLimitResult = {
    success: boolean
    limit: number
    remaining: number
    reset: number
}

export function rateLimit(
    key: string,
    limit: number,
    windowMs: number,
): RateLimitResult {
    const now = Date.now()
    const existing = buckets.get(key)

    if (!existing || existing.reset <= now) {
        const reset = now + windowMs
        buckets.set(key, { count: 1, reset })
        return { success: true, limit, remaining: limit - 1, reset }
    }

    if (existing.count >= limit) {
        return {
            success: false,
            limit,
            remaining: 0,
            reset: existing.reset,
        }
    }

    existing.count += 1
    return {
        success: true,
        limit,
        remaining: limit - existing.count,
        reset: existing.reset,
    }
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
    return {
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000)),
        ...(result.success
            ? {}
            : { 'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)) }),
    }
}

export function getClientIp(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for')
    if (forwarded) return forwarded.split(',')[0].trim()
    return (
        req.headers.get('x-real-ip') ||
        req.headers.get('cf-connecting-ip') ||
        'unknown'
    )
}
