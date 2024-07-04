"use client"

import { useRef, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClientRef = useRef(queryClient)

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  )
}
