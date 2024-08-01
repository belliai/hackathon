"use client"

import React from "react"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import UIWrapper from "@/components/ui/wrapper"
import { BookingProvider } from "@/components/dashboard/BookingContext"
import { RouteRoom } from "@/components/liveblocks/route-room"
import { FavoritesProvider } from "@/components/nav/favorites/favorites-provider"
import StiggProvider from "@/components/stigg-provider"

const InnerRootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
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
    </>
  )
}

export default InnerRootProviders
