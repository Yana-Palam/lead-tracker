'use client'

import { useEffect, type JSX } from 'react'

interface Props {
    title: string
    onClose: () => void
    children: React.ReactNode
}

export const Modal = ({ title, onClose, children }: Props): JSX.Element => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
                className='absolute inset-0 bg-black/40'
                onClick={onClose}
            />
            <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 z-10'>
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer transition-colors'
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
