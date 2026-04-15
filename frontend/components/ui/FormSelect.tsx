'use client'

import { FormFieldWrapper } from '@/components/ui'
import clsx from 'clsx'
import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface FormSelectProps {
    name: string
    label: string
    options: { value: string; label: string }[]
}

export const FormSelect = ({ name, label, options }: FormSelectProps): JSX.Element => {
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
                    <select
                        value={value}
                        onChange={onChange}
                        className={clsx(
                            `w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                                error ? 'border-red-400' : 'border-gray-200'
                            }`
                        )}
                    >
                        {options?.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </FormFieldWrapper>
            )}
        />
    )
}
