'use client'

import type { JSX } from 'react'

interface Props {
    loading?: boolean
    error?: string | null
    empty?: boolean
    emptyText?: string
    children: React.ReactNode
}

export const StateWrapper = ({
    loading,
    error,
    empty,
    emptyText = 'Нічого не знайдено',
    children,
}: Props): JSX.Element => {
    if (loading) {
        return (
            <div className='flex items-center justify-center py-20 text-gray-400'>
                <svg
                    className='animate-spin h-6 w-6 mr-3'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                    />
                    <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v8z'
                    />
                </svg>
                Завантаження...
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex items-center justify-center py-20 text-red-500'>
                <span className='mr-2'>⚠</span> {error}
            </div>
        )
    }

    if (empty) {
        return (
            <div className='flex items-center justify-center py-20 text-gray-400'>{emptyText}</div>
        )
    }

    return <>{children}</>
}
