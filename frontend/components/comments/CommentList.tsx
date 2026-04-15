'use client'

import type { Comment } from '@/types'
import type { JSX } from 'react'

export const CommentList = ({ comments }: { comments: Comment[] }): JSX.Element => {
    const date = (s: string): string =>
        new Date(s).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })

    return (
        <ul className='space-y-3'>
            {comments.map((c) => (
                <li
                    key={c.id}
                    className='bg-gray-50 rounded-xl px-4 py-3'
                >
                    <p className='text-sm text-gray-800 whitespace-pre-wrap'>{c.text}</p>
                    <p className='text-xs text-gray-400 mt-1.5'>{date(c.createdAt)}</p>
                </li>
            ))}
        </ul>
    )
}
