import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import type { JSX } from 'react'
import Providers from '@/app/providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
    title: 'Lead Tracker',
    description: 'Міні-CRM для ведення лідів',
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang='uk'>
            <body className={`${inter.className} bg-gray-50 min-h-screen`}>
                <Providers>
                    <header className='bg-white border-b border-gray-100 shadow-sm'>
                        <div className='max-w-6xl mx-auto px-4 py-3 flex items-center gap-3'>
                            <span className='text-xl'>📊</span>
                            <span className='font-semibold text-gray-900 text-lg'>
                                Lead Tracker
                            </span>
                        </div>
                    </header>
                    <main className='max-w-6xl mx-auto px-4 py-8'>{children}</main>
                </Providers>
            </body>
        </html>
    )
}
