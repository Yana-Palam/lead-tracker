'use client'

import { FormFieldWrapper } from '@/components/ui'
import clsx from 'clsx'
import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface FormInputProps {
    name: string
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'number'
}

export const FormInput = ({
    name,
    label,
    placeholder,
    type = 'text',
}: FormInputProps): JSX.Element => {
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
                    <input
                        value={value}
                        onChange={onChange}
                        type={type}
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
