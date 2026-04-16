'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'findsimilar:sale-banner-dismissed'

export default function DomainForSaleBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY) !== '1') setVisible(true)
        } catch {
            setVisible(true)
        }
    }, [])

    if (!visible) return null

    const dismiss = () => {
        try {
            localStorage.setItem(STORAGE_KEY, '1')
        } catch {}
        setVisible(false)
    }

    return (
        <div className="top-0 right-0 left-0 z-30 fixed flex justify-center items-center gap-3 bg-amber-500/10 backdrop-blur-sm px-4 py-2 border-amber-500/30 border-b text-sm">
            <span className="text-amber-200">
                <span className="font-semibold">This domain is for sale.</span>{' '}
                <span className="max-sm:hidden text-amber-200/80">
                    findsimilar.app — make an offer.
                </span>
            </span>
            <a
                href="mailto:contact@vynse.dev?subject=findsimilar.app%20domain%20inquiry"
                className="bg-amber-500 hover:bg-amber-400 px-3 py-1 rounded-md font-medium text-black text-xs transition-colors"
            >
                Contact
            </a>
            <button
                onClick={dismiss}
                aria-label="Dismiss banner"
                className="text-amber-200/60 hover:text-amber-200 text-lg leading-none"
            >
                ×
            </button>
        </div>
    )
}
