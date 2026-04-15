'use client'

import Link from 'next/link'
import type { Lead } from '@/types'
import type { JSX } from 'react'
import { LeadStatusBadge } from '@/components/leads'

interface Props {
    leads: Lead[]
    onDelete: (id: string) => void
}

export const LeadTable = ({ leads, onDelete }: Props): JSX.Element => {
    const fmt = (v?: number): string => (v ? `₴${v.toLocaleString('uk-UA')}` : '—')

    const date = (s: string): string =>
        new Date(s).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })

    return (
        <div className='overflow-x-auto rounded-xl border border-gray-100 shadow-sm'>
            <table className='min-w-full divide-y divide-gray-100 text-sm'>
                <thead className='bg-gray-50'>
                    <tr>
                        {["Ім'я", 'Компанія', 'Email', 'Статус', 'Цінність', 'Створено', ''].map(
                            (h) => (
                                <th
                                    key={h}
                                    className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'
                                >
                                    {h}
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-50'>
                    {leads.map((lead) => (
                        <tr
                            key={lead.id}
                            className='hover:bg-gray-50/60 transition-colors'
                        >
                            <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap'>
                                <Link
                                    href={`/leads/${lead.id}`}
                                    className='hover:text-indigo-600 transition-colors'
                                    prefetch={false}
                                >
                                    {lead.name}
                                </Link>
                            </td>
                            <td className='px-4 py-3 text-gray-500'>{lead.company ?? '—'}</td>
                            <td className='px-4 py-3 text-gray-500'>{lead.email ?? '—'}</td>
                            <td className='px-4 py-3'>
                                <LeadStatusBadge status={lead.status} />
                            </td>
                            <td className='px-4 py-3 text-gray-500'>{fmt(lead.value)}</td>
                            <td className='px-4 py-3 text-gray-400 whitespace-nowrap'>
                                {date(lead.createdAt)}
                            </td>
                            <td className='px-4 py-3'>
                                <div className='flex items-center gap-2'>
                                    <Link
                                        href={`/leads/${lead.id}`}
                                        className='text-xs text-indigo-600 hover:underline'
                                        prefetch={false}
                                    >
                                        Деталі
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Видалити "${lead.name}"?`))
                                                onDelete(lead.id)
                                        }}
                                        className='text-xs text-red-500 hover:underline cursor-pointer'
                                    >
                                        Видалити
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
