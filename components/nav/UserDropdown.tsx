"use client"

import React, { Dispatch, SetStateAction, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignOutButton,
  useAuth,
  useOrganization,
  useOrganizationList,
  UserButton,
  useUser,
} from "@clerk/nextjs"
import { Check, ChevronDownIcon, User } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Skeleton } from "../ui/skeleton"

export type UserDropdownItem = {
  icon?: React.ReactNode
  shortcut?: string
  route: string
  label: string
  separator?: boolean
  changeNavigation?: boolean
}

interface UserDropdownProps {
  doChangeNavigation: Dispatch<SetStateAction<number>>
}

export default function UserDropdown({
  doChangeNavigation = () => {},
}: UserDropdownProps) {
  const router = useRouter()

  const auth = useAuth()
  const userSession = useUser()

  const hasActiveOrg = !!auth.orgId

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const org = useOrganization()

  useEffect(() => {
    // Force active org if none is selected
    if (!hasActiveOrg && isLoaded) {
      const orgs = userMemberships.data

      // Set first org as default
      const firstOrg = orgs[0]

      setActive({
        organization: firstOrg?.organization.id,
      })
    }
  }, [hasActiveOrg, isLoaded, userMemberships.data])

  const ITEMS: UserDropdownItem[] = [
    // {
    //   icon: <User className="mr-2 h-4 w-4" />,
    //   // shortcut: "⇧⌘P",
    //   route: "/profile",
    //   label: "Profile",
    //   separator: true,
    // },
    // {
    //   route: "/k360/organize/masters/finance/cart",
    //   label: "Settings",
    //   changeNavigation: true,
    // },
  ]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-x-2">
            <ClerkLoading>
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="h-2 w-12 rounded-md" />
            </ClerkLoading>
            <SignedIn>
              <UserButton
                appearance={{
                  layout: {
                    shimmer: false,
                  },
                  elements: {
                    userPreviewAvatarContainer: "rounded-md w-6 h-6",
                    avatarBox: "rounded-md w-6 h-6",
                  },
                }}
              />
              <span className="text-sm text-white">
                {userSession.user?.fullName}
              </span>
              <ChevronDownIcon
                className="h-4 w-4 text-zinc-500"
                aria-hidden="true"
              />
            </SignedIn>
            <SignedOut>
              <Avatar className="h-6 w-6 rounded-md">
                <AvatarImage src="/jeff.webp" />
                <AvatarFallback className="h-6 w-6 rounded-md">
                  B
                </AvatarFallback>
              </Avatar>
              <span className="text-white">Belli</span>
              <ChevronDownIcon
                className="h-4 w-4 text-zinc-500"
                aria-hidden="true"
              />
            </SignedOut>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="rounded-xl bg-zinc-950"
          align="start"
          sideOffset={8}
        >
          {!isLoaded ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            // Only show when the user is a member of more than one org
            userMemberships.data.length > 1 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="min-w-40 cursor-pointer rounded-lg px-3.5 py-2">
                  Change Organization
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {userMemberships.data.map((orgmem) => {
                    const organization = orgmem.organization
                    const isActive = organization.id === auth.orgId

                    return (
                      <DropdownMenuItem disabled={isActive} key={orgmem.id}>
                        {organization.name}{" "}
                        {isActive && <Check size={14} className="ml-1" />}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )
          )}
          {ITEMS.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  className="min-w-40 cursor-pointer rounded-lg px-3.5 py-2"
                  onClick={() => {
                    if (item.changeNavigation) doChangeNavigation(2)
                    router.push(item.route)
                  }}
                >
                  {/* {item.icon} */}
                  <span className="mr-4">{item.label}</span>
                  {item.shortcut && (
                    <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
                {item.separator && <DropdownMenuSeparator />}
              </React.Fragment>
            )
          })}
          <SignedIn>
            <SignOutButton>
              <DropdownMenuItem className="min-w-40 cursor-pointer rounded-lg px-3.5 py-2">
                Logout
              </DropdownMenuItem>
            </SignOutButton>
          </SignedIn>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
