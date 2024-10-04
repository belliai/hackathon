"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// import {
//   ClerkLoading,
//   SignedIn,
//   SignedOut,
//   SignOutButton,
//   useAuth,
//   useOrganization,
//   useOrganizationList,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs"
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
  doChangeNavigation = () => {},
  isExpanded = true,
}: UserDropdownProps) {
  const router = useRouter()

  const [switched, setSwitched] = useState<boolean>(false)

  const ITEMS: UserDropdownItem[] = [
    {
      label: "Profile",
      route: "/settings/profile",
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
        <DropdownMenuContent
          className="rounded-xl dark:bg-zinc-950"
          align="start"
          sideOffset={8}
        ></DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
