'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { useState, type JSX } from 'react'

export default function Providers({ children }: { children: React.ReactNode }): JSX.Element {
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60,
                    refetchOnWindowFocus: false,
                    retry: (failureCount, error) => {
                        if (
                            axios.isAxiosError(error) &&
                            error.response &&
                            error.response.status >= 400 &&
                            error.response.status < 500
                        ) {
                            return false
                        }

                        return failureCount < 2
                    },
                },
            },
        })
    )

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
