'use client'

import { FormTextarea } from '@/components/ui'
import { createComment } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { JSX } from 'react'
import { useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import z from 'zod'

interface CommentFormProps {
    leadId: string
}

export const CommentForm = ({ leadId }: CommentFormProps): JSX.Element => {
    const [apiError, setApiError] = useState<string | null>(null)
    const queryClient = useQueryClient()

    const schema = z.object({
        text: z
            .string()
            .min(1, 'Коментар не може бути порожнім')
            .max(500, 'Макс. довжина 500 символів'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            text: '',
        },
    })

    const createMutation = useMutation({
        mutationFn: (text: string) => createComment(leadId, text),
        onSuccess: () => {
            methods.reset()
            queryClient.invalidateQueries({ queryKey: ['comments', leadId] })
        },
        onError: (err) => {
            const msg = err instanceof Error ? err.message : 'Не вдалося додати коментар'

            setApiError(msg)
        },
    })

    const text = useWatch({ control: methods.control, name: 'text' })

    const handlerSubmit = (data: z.infer<typeof schema>): void => {
        setApiError(null)
        createMutation.mutate(data.text)
    }

    return (
        <FormProvider {...methods}>
            <form
                className='space-y-2'
                onSubmit={methods.handleSubmit(handlerSubmit)}
            >
                <FormTextarea
                    name='text'
                    label='Новий коментар'
                    placeholder='Напишіть коментар... (макс. 500 символів)'
                />
                <div className='flex items-center justify-between'>
                    <span className='text-xs text-gray-400'>{text.length}/500</span>
                    <button
                        type='submit'
                        disabled={createMutation.isPending || !methods.getValues('text').trim()}
                        className='px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors'
                    >
                        {createMutation.isPending ? 'Додаємо...' : 'Додати'}
                    </button>
                </div>
                {apiError && <p className='text-xs text-red-500'>{apiError}</p>}
            </form>
        </FormProvider>
    )
}
