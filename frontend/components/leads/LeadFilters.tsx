'use client'

import type { JSX } from 'react'
import { useCallback } from 'react'
import type { LeadStatus, LeadsQueryParams } from '@/types'

const STATUSES: { value: LeadStatus | ''; label: string }[] = [
    { value: '', label: 'Всі статуси' },
    { value: 'NEW', label: 'Новий' },
    { value: 'CONTACTED', label: 'Контакт' },
    { value: 'IN_PROGRESS', label: 'В роботі' },
    { value: 'WON', label: 'Виграно' },
    { value: 'LOST', label: 'Програно' },
]

interface Props {
    params: LeadsQueryParams
    search: string
    onChange: (params: Partial<LeadsQueryParams>, search?: string) => void
}

export const LeadFilters = ({ params, search, onChange }: Props): JSX.Element => {
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({ page: 1 }, e.target.value)
        },
        [onChange]
    )

    return (
        <div className='flex flex-wrap gap-3'>
            <input
                type='text'
                placeholder='Пошук по імені, email, компанії...'
                value={search}
                onChange={handleSearch}
                className='flex-1 min-w-[220px] px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />

            <select
                value={params.status ?? ''}
                onChange={(e) => onChange({ status: e.target.value as LeadStatus | '', page: 1 })}
                className='px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer'
            >
                {STATUSES.map(({ value, label }) => (
                    <option
                        key={value}
                        value={value}
                    >
                        {label}
                    </option>
                ))}
            </select>

            <select
                value={`${params.sort ?? 'createdAt'}_${params.order ?? 'desc'}`}
                onChange={(e) => {
                    const [sort, order] = e.target.value.split('_') as [
                        LeadsQueryParams['sort'],
                        LeadsQueryParams['order'],
                    ]

                    onChange({ sort, order, page: 1 })
                }}
                className='px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer'
            >
                <option value='createdAt_desc'>Новіші спочатку</option>
                <option value='createdAt_asc'>Старіші спочатку</option>
                <option value='updatedAt_desc'>Нещодавно змінені</option>
            </select>
        </div>
    )
}
