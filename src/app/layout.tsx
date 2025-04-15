import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { poppins, cinzel, inter, lora, josefin } from '../../public/fonts/fonts'
import './globals.css'

export const metadata: Metadata = {
    title: 'FindSimilar – Instant Book/Game/Movie Recommendations',
    description:
        'Just enter a title you loved and find what you\'ll read/play/watch next. No sign-up. Fast & Free. Powered by AI.',
    keywords: [
        'AI recommendations',
        'book recommendations',
        'movie recommendations',
        'game recommendations',
        'find similar books',
        'find similar games',
        'find similar movies',
        'next read',
        'next game',
        'what to watch next',
    ],
    openGraph: {
        title: 'FindSimilar – Instant Book/Game/Movie Recommendations',
        description:
            'AI-powered book, game & movie recommendations. No sign-up. Fast & Free.Enter any title & get 3 similar ones instantly.',
        siteName: 'FindSimilar',
        images: [
            {
                url: 'https://www.findsimilar.app/assets/findsimilar-og.webp',
                width: 1200,
                height: 630,
                alt: 'FindSimilar Hero Image',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FindSimilar',
        description:
            'AI-powered book, game & movie suggestions. Enter any title & get 3 similar ones instantly.', creator: '@rayzark',
        images: ['https://www.findsimilar.app/assets/findsimilar-og.webp'],
    },
    metadataBase: new URL('https://www.findsimilar.app'),
    icons: {
        icon: [
            { url: '/icons/favicon.ico' },
            { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
        ],
        shortcut: '/icons/favicon.ico',
        apple: '/icons/apple-touch-icon.png',
        other: [
            {
                rel: 'apple-touch-icon',
                url: '/icons/apple-touch-icon.png',
                sizes: '180x180'
            },
            {
                rel: 'mask-icon',
                url: '/icons/favicon.ico',
                color: '#1c1b22'
            },
            {
                rel: 'manifest',
                url: '/manifest.json'
            },
            {
                rel: 'msapplication-config',
                url: '/browserconfig.xml'
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        }
    },
    alternates: {
        canonical: 'https://www.findsimilar.app',
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
                lora.variable,
                poppins.variable,
                cinzel.variable,
                josefin.variable,
                'h-dvh',
            )}
        >
            <body className="flex flex-col min-h-dvh antialiased">
                {children}
                <Analytics />
                <Footer />
            </body>
        </html>
    )
}
