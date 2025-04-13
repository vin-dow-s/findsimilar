import { Poppins, Cinzel, Inter, Lora, Josefin_Sans } from 'next/font/google'

export const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['300', '400'],
    variable: '--font-josefin',
    display: 'swap',
})

export const lora = Lora({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-lora',
    display: 'swap',
})

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400'],
    variable: '--font-poppins',
    display: 'swap',

})

export const cinzel = Cinzel({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-cinzel',
    display: 'swap',
})

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
