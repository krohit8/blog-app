import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 1000 * 60 *5,
            cacheTime: 1000 *60 *10,
            retry: 2,
            refetchOnWindowFocus: false
        }
    }
})

export const QueryProvider = ({children}:{children: React.ReactNode}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
