import type { Metadata } from "next"

import "./globals.css"

import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { GoogleTagManager } from "@next/third-parties/google"
import * as changeCase from "change-case"

import { cn } from "@/lib/utils"
import { findActiveItem } from "@/lib/utils/nav-utils"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import UIWrapper from "@/components/ui/wrapper"
import { BookingProvider } from "@/components/dashboard/BookingContext"
import { RouteRoom } from "@/components/liveblocks/route-room"
import { accountNavigation } from "@/components/nav/data/accountNavigation"
import { k360Navigation } from "@/components/nav/data/k360Navigation"
import { operationsNavigation } from "@/components/nav/data/operationsNavigation"
import { settingNavigation } from "@/components/nav/data/settingNavigation"
import { skNavigation } from "@/components/nav/data/skNavigation"
import { FavoritesProvider } from "@/components/nav/favorites/favorites-provider"
import { PHProvider } from "@/components/posthog-provider"
import QueryProvider from "@/components/query-provider"
import StiggProvider from "@/components/stigg-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export async function generateMetadata() {
  const pathname = headers().get("x-pathname")
  let tab = headers().get("x-tab")

  const defaultMetadata: Metadata = {
    title: "Belli",
    description: "Next-gen Air Cargo SaaS",
  }

  let newMetadata: Metadata = defaultMetadata

  newMetadata = defaultMetadata

  if (tab) {
    tab = changeCase.capitalCase(tab)
    newMetadata.title = `${newMetadata.title} - ${tab}`
  }

  if (!pathname) return newMetadata

  const menuItem = findActiveItem(
    [
      ...skNavigation,
      ...k360Navigation,
      ...settingNavigation,
      ...accountNavigation,
      ...operationsNavigation,
    ],
    pathname
  )

  if (!menuItem) return defaultMetadata

  newMetadata = {
    title: menuItem.item.name + (tab ? ` - ${tab}` : ""),
    description: "Belli - Next-gen Air Cargo SaaS",
  }

  return newMetadata
}

const PostHogPageView = dynamic(() => import("@/components/posthog-pageview"), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === "production"
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html
        lang="en"
        className={cn(
          "scrollbar dark h-full scroll-smooth antialiased",

          ` ${inter.className}`
        )}
      >
        {isProduction && gtmId && <GoogleTagManager gtmId={gtmId} />}

        <PHProvider>
          <body className="h-full overflow-y-hidden bg-background text-white">
            {/* <ProgressBar />
      <Nav /> */}
            <PostHogPageView />
            <QueryProvider>
              <SignedIn>
                <StiggProvider>
                  <TooltipProvider>
                    <BookingProvider>
                      <FavoritesProvider>
                        <RouteRoom>
                          <UIWrapper>{children}</UIWrapper>
                        </RouteRoom>
                      </FavoritesProvider>
                      <Toaster />
                    </BookingProvider>
                  </TooltipProvider>
                </StiggProvider>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </QueryProvider>
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  )
}
