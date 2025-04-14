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
            'Just enter a title you loved and instantly get 3 AI-powered suggestions. No login required.', url: 'https://www.findsimilar.app/',
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
        icon: '/icons/favicon.ico',
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
