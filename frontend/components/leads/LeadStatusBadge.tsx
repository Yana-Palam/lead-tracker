'use client'

import type { LeadStatus } from '@/types'
import type { JSX } from 'react'

const CONFIG: Record<LeadStatus, { label: string; className: string }> = {
    NEW: { label: 'Новий', className: 'bg-blue-100 text-blue-700' },
    CONTACTED: { label: 'Контакт', className: 'bg-yellow-100 text-yellow-700' },
    IN_PROGRESS: {
        label: 'В роботі',
        className: 'bg-purple-100 text-purple-700',
    },
    WON: { label: 'Виграно', className: 'bg-green-100 text-green-700' },
    LOST: { label: 'Програно', className: 'bg-red-100 text-red-700' },
}

export const LeadStatusBadge = ({ status }: { status: LeadStatus }): JSX.Element => {
    const { label, className } = CONFIG[status]

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
        >
            {label}
        </span>
    )
}
