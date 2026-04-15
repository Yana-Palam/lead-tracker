'use client'

import type { JSX } from 'react'

interface Props {
    page: number
    total: number
    limit: number
    onChange: (page: number) => void
}

export const Pagination = ({ page, total, limit, onChange }: Props): JSX.Element | null => {
    const totalPages = Math.ceil(total / limit)

    if (totalPages <= 1) return null

    return (
        <div className='flex items-center gap-2 justify-center mt-6'>
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className='px-3 py-1.5 rounded-md border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors'
            >
                ← Назад
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
                        p === page
                            ? 'bg-indigo-600 text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className='px-3 py-1.5 rounded-md border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors'
            >
                Вперед →
            </button>
        </div>
    )
}
