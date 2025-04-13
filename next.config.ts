import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: 'books.google.com',
                protocol: 'https',
            },
            {
                hostname: 'images.igdb.com',
                protocol: 'https',
            }, {
                hostname: 'image.tmdb.org',
                protocol: 'https',
            },
        ],
    },
}

export default nextConfig
