'use client'

import type { JSX } from 'react'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getLead, deleteLead, getComments, getApiError } from '@/lib/api'
import type { Lead, Comment } from '@/types'
import { Modal, StateWrapper } from '@/components/ui'
import { LeadForm, LeadStatusBadge } from '@/components/leads'
import { CommentForm, CommentList } from '@/components/comments'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function LeadDetailPage(): JSX.Element {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [showEdit, setShowEdit] = useState(false)

    const leadQuery = useQuery<Lead>({
        queryKey: ['lead', id],
        queryFn: () => getLead(id),
    })

    const commentsQuery = useQuery<Comment[]>({
        queryKey: ['comments', id],
        queryFn: () => getComments(id),
    })

    const deleteLeadMutation = useMutation({
        mutationFn: () => deleteLead(id),
        onSuccess: () => {
            router.push('/leads')
        },
        onError: (err) => {
            alert(getApiError(err))
        },
    })

    const date = (s: string): string =>
        new Date(s).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })

    return (
        <div className='space-y-8 max-w-3xl'>
            <div className='flex items-center gap-3'>
                <button
                    onClick={() => router.back()}
                    className='text-gray-400 hover:text-gray-600 transition-colors text-sm cursor-pointer'
                >
                    ← Назад
                </button>
            </div>

            <StateWrapper
                loading={leadQuery.isLoading}
                error={leadQuery.error && getApiError(leadQuery.error)}
            >
                {leadQuery.data && (
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5'>
                        <div className='flex items-start justify-between gap-4'>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-900'>
                                    {leadQuery.data.name}
                                </h1>
                                <div className='flex items-center gap-3 mt-1.5'>
                                    <LeadStatusBadge status={leadQuery.data.status} />
                                    {leadQuery.data.value && (
                                        <span className='text-sm text-gray-500'>
                                            ₴{leadQuery.data.value.toLocaleString('uk-UA')}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-2 shrink-0'>
                                <button
                                    onClick={() => setShowEdit(true)}
                                    className='px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                                >
                                    Редагувати
                                </button>
                                <button
                                    onClick={() => deleteLeadMutation.mutate()}
                                    className='px-3 py-1.5 text-sm text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-colors'
                                >
                                    Видалити
                                </button>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4 text-sm'>
                            {leadQuery.data.email && (
                                <div>
                                    <p className='text-xs text-gray-400 mb-0.5'>Email</p>
                                    <p className='text-gray-800'>{leadQuery.data.email}</p>
                                </div>
                            )}
                            {leadQuery.data.company && (
                                <div>
                                    <p className='text-xs text-gray-400 mb-0.5'>Компанія</p>
                                    <p className='text-gray-800'>{leadQuery.data.company}</p>
                                </div>
                            )}
                            <div>
                                <p className='text-xs text-gray-400 mb-0.5'>Створено</p>
                                <p className='text-gray-800'>{date(leadQuery.data.createdAt)}</p>
                            </div>
                            <div>
                                <p className='text-xs text-gray-400 mb-0.5'>Оновлено</p>
                                <p className='text-gray-800'>{date(leadQuery.data.updatedAt)}</p>
                            </div>
                        </div>

                        {leadQuery.data.notes && (
                            <div>
                                <p className='text-xs text-gray-400 mb-1'>Нотатки</p>
                                <p className='text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-xl px-4 py-3'>
                                    {leadQuery.data.notes}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </StateWrapper>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5'>
                <h2 className='text-lg font-semibold text-gray-900'>Коментарі</h2>

                <StateWrapper
                    loading={commentsQuery.isLoading}
                    error={commentsQuery.error && getApiError(commentsQuery.error)}
                    empty={!commentsQuery.isLoading && commentsQuery.data?.length === 0}
                    emptyText='Коментарів поки немає'
                >
                    {commentsQuery.data && <CommentList comments={commentsQuery.data} />}
                </StateWrapper>

                {leadQuery.data && (
                    <div className='pt-2 border-t border-gray-100'>
                        <CommentForm leadId={leadQuery.data.id} />
                    </div>
                )}
            </div>

            {showEdit && leadQuery.data && (
                <Modal
                    title='Редагувати лід'
                    onClose={() => setShowEdit(false)}
                >
                    <LeadForm
                        initial={leadQuery.data}
                        mode='edit'
                        onCancel={() => setShowEdit(false)}
                    />
                </Modal>
            )}
        </div>
    )
}
