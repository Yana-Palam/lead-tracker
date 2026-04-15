'use client'

import { FormFieldWrapper } from '@/components/ui'
import clsx from 'clsx'
import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface FormTextareaProps {
    name: string
    label: string
    placeholder?: string
}

export const FormTextarea = ({ name, label, placeholder }: FormTextareaProps): JSX.Element => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormFieldWrapper
                    label={label}
                    error={error?.message}
                >
                    <textarea
                        value={value}
                        onChange={onChange}
                        rows={3}
                        placeholder={placeholder}
                        className={clsx(
                            `w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                                error ? 'border-red-400' : 'border-gray-200'
                            }`
                        )}
                    />
                </FormFieldWrapper>
            )}
        />
    )
}
