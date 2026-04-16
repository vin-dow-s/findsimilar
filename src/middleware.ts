import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, rateLimitHeaders, getClientIp } from './lib/rateLimit'

const ALLOWED_ORIGINS = new Set([
    'https://www.findsimilar.app',
    'https://findsimilar.app',
    ...(process.env.NODE_ENV !== 'production'
        ? ['http://localhost:3000', 'http://127.0.0.1:3000']
        : []),
])

export function middleware(req: NextRequest) {
    const ip = getClientIp(req)
    const global = rateLimit(`global:${ip}`, 60, 60_000)
    if (!global.success) {
        return new NextResponse(
            JSON.stringify({ error: 'Too many requests' }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    ...rateLimitHeaders(global),
                },
            },
        )
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        const origin = req.headers.get('origin')
        const referer = req.headers.get('referer')
        const source = origin || (referer ? new URL(referer).origin : null)
        if (!source || !ALLOWED_ORIGINS.has(source)) {
            return new NextResponse(
                JSON.stringify({ error: 'Forbidden origin' }),
                { status: 403, headers: { 'Content-Type': 'application/json' } },
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*'],
}
