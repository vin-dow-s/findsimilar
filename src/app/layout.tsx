import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { bubblegum, inter, lobster } from '../../public/fonts/fonts'
import './globals.css'

export const metadata: Metadata = {
    title: 'Find Similar – Smart AI Recommendations',
    description:
        'Instant  recommendations powered by AI. No sign-up. Fast & Free. Just enter a title and get 3 recommendations in seconds.',
    keywords: [
        'book recommendations',
        'AI books',
        'book recs',
        'find similar books',
        'next read',
        'similar novels',
    ],
    openGraph: {
        title: 'Find Similar – Smart AI Recommendations',
        description:
            'Find your next obsession in seconds. Enter any book/game/movie title and get 3 similar recommendations, powered by AI.',
        url: 'https://findsimilar.vercel.app/',
        siteName: 'Find Similar',
        images: [
            {
                url: 'https://findsimilar.vercel.app/assets/og-image.webp',
                width: 1200,
                height: 630,
                alt: 'Find Similar',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Find Similar',
        description:
            'Discover 3 similar books/games/movies to any title – instantly. Powered by AI.',
        creator: '@rayzark',
        images: ['https://findsimilar.vercel.app/assets/og-image.webp'],
    },
    metadataBase: new URL('https://findsimilar.vercel.app/'),
    icons: {
        icon: '/icons/favicon.ico',
    },
}

export const viewport: Viewport = {
    themeColor: '#1c1b22',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn(
                inter.variable,
                lobster.variable,
                bubblegum.variable,
                'h-dvh',
            )}
        >
            <body className="flex min-h-dvh flex-col antialiased">
                {children}
                <Analytics />
                <Footer />
            </body>
        </html>
    )
}
