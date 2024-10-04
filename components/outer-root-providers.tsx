"use client"

import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { PHProvider } from "@/components/posthog-provider"
import QueryProvider from "@/components/query-provider"

const OuterRootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ClerkProvider appearance={{ baseTheme: dark }}>
    <PHProvider>
      <QueryProvider>{children}</QueryProvider>
    </PHProvider>
    // </ClerkProvider>
  )
}

export default OuterRootProviders
