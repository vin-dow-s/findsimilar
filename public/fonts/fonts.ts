import { Bubblegum_Sans, Inter, Lobster_Two } from 'next/font/google'

export const lobster = Lobster_Two({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-lobster',
    display: 'swap',
})

export const bubblegum = Bubblegum_Sans({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bubblegum',
    display: 'swap',
})

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
