'use client'

import type { JSX } from 'react'
import { useState } from 'react'
import { getLeads, deleteLead, getApiError } from '@/lib/api'
import type { Lead, LeadsQueryParams, PaginatedResponse } from '@/types'
import { LeadFilters, LeadForm, LeadTable } from '@/components/leads'
import { Modal, Pagination, StateWrapper } from '@/components/ui'
import { omitBy } from 'lodash'
import { useDebounce } from 'use-debounce'
import { useMutation, useQuery } from '@tanstack/react-query'

const DEFAULT_PARAMS: LeadsQueryParams = {
    page: 1,
    limit: 10,
    sort: 'createdAt',
    order: 'desc',
}

export default function LeadsPage(): JSX.Element {
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebounce(search, 500)
    const [params, setParams] = useState<LeadsQueryParams>(DEFAULT_PARAMS)
    const [showCreate, setShowCreate] = useState(false)

    const leadsQuery = useQuery<PaginatedResponse<Lead>>({
        queryKey: ['leads', params, debouncedSearch],
        queryFn: () =>
            getLeads(
                omitBy(
                    { ...params, q: debouncedSearch },
                    (value) => value === '' || value === undefined
                )
            ),
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteLead(id),
        onSuccess: () => {
            leadsQuery.refetch()
        },
        onError: (err) => {
            alert(getApiError(err))
        },
    })

    const updateParams = (patch: Partial<LeadsQueryParams>, search?: string): void => {
        setParams((prev) => ({ ...prev, ...patch, q: undefined }))
        setSearch(search ?? '')
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Ліди</h1>
                    {!leadsQuery.isLoading && !leadsQuery.error && (
                        <p className='text-sm text-gray-400 mt-0.5'>
                            Всього: {leadsQuery.data?.total}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer'
                >
                    + Новий лід
                </button>
            </div>

            <LeadFilters
                params={params}
                search={search}
                onChange={updateParams}
            />

            <StateWrapper
                loading={leadsQuery.isLoading}
                error={leadsQuery.error && getApiError(leadsQuery.error)}
                empty={!leadsQuery.isLoading && leadsQuery.data?.data.length === 0}
                emptyText='Лідів не знайдено. Створіть перший!'
            >
                <LeadTable
                    leads={leadsQuery.data?.data ?? []}
                    onDelete={(id) => deleteMutation.mutate(id)}
                />
                <Pagination
                    page={params.page ?? 1}
                    total={leadsQuery.data?.total ?? 0}
                    limit={params.limit ?? 10}
                    onChange={(page) => updateParams({ page })}
                />
            </StateWrapper>

            {showCreate && (
                <Modal
                    title='Новий лід'
                    onClose={() => setShowCreate(false)}
                >
                    <LeadForm
                        onCancel={() => setShowCreate(false)}
                        mode='create'
                        submitLabel='Створити'
                    />
                </Modal>
            )}
        </div>
    )
}
