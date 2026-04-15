'use client'

import type { JSX } from 'react'

interface FormFieldWrapperProps {
    label: string
    error?: string
    children: React.ReactNode
}

export const FormFieldWrapper = ({
    label,
    error,
    children,
}: FormFieldWrapperProps): JSX.Element => {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
            {children}
            {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
        </div>
    )
}
