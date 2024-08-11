"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import { Check, ChevronDownIcon, User, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Skeleton } from "@/components/ui/skeleton"

export type UserDropdownItem = {
  icon?: React.ReactNode
  shortcut?: string
  route: string
  label: string
  separator?: boolean
  changeNavigation?: number
  isExpanded?: boolean
}

interface UserDropdownProps {
  doChangeNavigation: Dispatch<SetStateAction<number>>
  isExpanded?: boolean
}

export default function UserDropdown({
  doChangeNavigation = () => {}, isExpanded = true
}: UserDropdownProps) {
  const router = useRouter()

  const auth = useAuth()
  const userSession = useUser()
  const [switched, setSwitched] = useState<boolean>(false)

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

  // useEffect(() => {
  //   if (switched) {
  //     window.location.reload()
  //   }
  // }, [switched, isLoaded])

  const handleSetActiveOrg = (orgId: string) => {
    if (setActive) {
      setActive({ organization: orgId })
      // window.location.reload()
    }
  }

  const ITEMS: UserDropdownItem[] = [
    {
      label: "Profile",
      route: "/settings/profile",
    },
    {
      label: "Settings",
      route: "",
      changeNavigation: 3,
    },
    {
      label: "Organization",
      route: "/settings/organization",
    },
    {
      label: "Users",
      route: "/settings/users",
    },
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
              {isExpanded && (
                <>
                  <span className="text-sm text-white">
                    {userSession.user?.fullName}
                  </span>
                  <ChevronDownIcon
                    className="h-4 w-4 text-zinc-500"
                    aria-hidden="true"
                  />
                </>
              )}
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
                <DropdownMenuSubContent className="rounded-xl bg-zinc-950">
                  {userMemberships.data.map((orgmem) => {
                    const organization = orgmem.organization
                    const isActive = organization.id === auth.orgId

                    return (
                      <DropdownMenuItem
                        disabled={isActive}
                        key={orgmem.id}
                        onClick={async () => {
                          await setActive({
                            organization: orgmem.organization.id,
                          })
                          window.location.reload()
                        }}
                      >
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
                    if (item.changeNavigation) doChangeNavigation(item.changeNavigation)
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