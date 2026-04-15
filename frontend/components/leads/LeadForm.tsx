'use client'

import { useState, type JSX } from 'react'
import type { Lead, CreateLeadDto, LeadStatus, UpdateLeadDto } from '@/types'
import z from 'zod'
import type { Resolver } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, FormSelect, FormTextarea } from '@/components/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLead, getApiError, updateLead } from '@/lib/api'

const STATUSES: Record<LeadStatus, string> = {
    NEW: 'Новий',
    CONTACTED: 'Контакт',
    IN_PROGRESS: 'В роботі',
    WON: 'Виграно',
    LOST: 'Програно',
}

interface Props {
    initial?: Partial<Lead>
    mode: 'create' | 'edit'
    onCancel: () => void
    submitLabel?: string
}

export const LeadForm = ({
    initial,
    mode,
    onCancel,
    submitLabel = 'Зберегти',
}: Props): JSX.Element => {
    const [apiError, setApiError] = useState<string | null>(null)
    const queryClient = useQueryClient()

    const schema = z.object({
        name: z.string().min(1, "Ім'я обов'язкове"),
        email: z.union([z.email('Невалідний email'), z.literal('')]).optional(),
        company: z.string().optional(),
        status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST']),
        value: z.preprocess(
            (val) => (val === '' ? undefined : Number(val)),
            z.number().min(1, 'Цінність повинна бути не менше 1').optional()
        ),
        notes: z.string().optional(),
    })

    type FormData = Omit<z.infer<typeof schema>, 'value'> & { value?: string }

    const methods = useForm<FormData>({
        mode: 'all',
        resolver: zodResolver(schema) as Resolver<FormData>,
        defaultValues: {
            name: initial?.name ?? '',
            email: initial?.email ?? '',
            company: initial?.company ?? '',
            status: initial?.status ?? 'NEW',
            value: initial?.value?.toString() ?? '',
            notes: initial?.notes ?? '',
        },
    })

    const createMutation = useMutation({
        mutationFn: (dto: CreateLeadDto) => createLead(dto),
        onSuccess: () => {
            onCancel()
            queryClient.invalidateQueries({ queryKey: ['leads'] })
        },
        onError: (err) => {
            setApiError(getApiError(err))
        },
    })

    const updateMutation = useMutation({
        mutationFn: (dto: UpdateLeadDto) => {
            if (!initial?.id) {
                throw new Error('ID ліда не вказано')
            }

            return updateLead(initial.id, dto)
        },
        onSuccess: () => {
            onCancel()
            queryClient.invalidateQueries({ queryKey: ['lead', initial?.id] })
        },
        onError: (err) => {
            setApiError(getApiError(err))
        },
    })

    const handlerSubmit = (data: FormData): void => {
        if (mode === 'create') {
            createMutation.mutate({
                ...data,
                email: data.email || undefined,
                company: data.company || undefined,
                value: data.value ? Number(data.value) : undefined,
                notes: data.notes || undefined,
            })
        } else {
            updateMutation.mutate({
                ...data,
                email: data.email || null,
                company: data.company || null,
                value: data.value ? Number(data.value) : null,
                notes: data.notes || null,
            })
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handlerSubmit)}
                className='space-y-4'
            >
                <FormInput
                    name='name'
                    label="Ім'я"
                    placeholder='Іван Петренко'
                />
                <FormInput
                    name='email'
                    label='Email'
                    placeholder='ivan@company.com'
                />
                <FormInput
                    name='company'
                    label='Компанія'
                    placeholder='Назва компанії'
                />
                <div className='grid grid-cols-2 gap-3'>
                    <FormSelect
                        name='status'
                        label='Статус'
                        options={Object.entries(STATUSES).map(([value, label]) => ({
                            value,
                            label,
                        }))}
                    />
                    <FormInput
                        name='value'
                        label='Цінність (₴)'
                        type='number'
                        placeholder='1000'
                    />
                </div>
                <FormTextarea
                    name='notes'
                    label='Нотатки'
                    placeholder='Додаткова інформація...'
                />
                {apiError && (
                    <p className='text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg'>
                        ⚠ {apiError}
                    </p>
                )}
                <div className='flex gap-3 pt-1'>
                    <button
                        type='submit'
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className='flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed'
                    >
                        {createMutation.isPending || updateMutation.isPending
                            ? 'Збереження...'
                            : submitLabel}
                    </button>
                    <button
                        type='button'
                        onClick={onCancel}
                        className='px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                    >
                        Скасувати
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}
