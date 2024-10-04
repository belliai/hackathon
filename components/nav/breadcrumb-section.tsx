"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { CogIcon, Loader, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { operationsNavigation } from "@/components/nav/data/operationsNavigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import ActiveUsers from "./active-users"
import { belliSettingsNavigation } from "./data/belliSettingsNavigation"
import { customDataFieldsNavigation } from "./data/customDataFieldsNavigation"
import { k360Navigation } from "./data/k360Navigation"
import { settingNavigation } from "./data/settingNavigation"
import { skNavigation } from "./data/skNavigation"
import { Path, useFavorites } from "./favorites/favorites-provider"
import { TSidebarItem } from "./SidebarItem"

const findCurrentPaths = (
  items: TSidebarItem[],
  pathname: string,
  path: TSidebarItem[] = []
): TSidebarItem[] | null => {
  for (const item of items) {
    // Create a new path array including the current item
    const currentPath: TSidebarItem[] = [
      ...path,
      {
        name: item.name,
        href: item.href,
        children: undefined,
        hasSetting: item.hasSetting,
      },
    ]

    // Check if the current item's href matches the pathname
    if (pathname.startsWith(item.href)) {
      return currentPath
    }

    // If the item has children, search recursively in the children

    if (item.children) {
      const result = findCurrentPaths(item.children, pathname, currentPath)
      if (result) {
        return result
      }
    }
  }

  // If no match is found in this branch, return null
  return null
}

//Function to format the tab into a proper string
const transformTabName = (tab: string) => {
  return tab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const getCurrentPaths = (pathname: string, searchParams: URLSearchParams) => {
  let currentPaths: TSidebarItem[] = []
  const navMenus: TSidebarItem[] = [
    ...settingNavigation,
    ...skNavigation,
    ...k360Navigation,
    ...operationsNavigation,
    ...belliSettingsNavigation,
    ...customDataFieldsNavigation,
  ]

  // Use the helper function to find the current path
  const result = findCurrentPaths(navMenus, pathname)
  if (result) {
    currentPaths = result
  }

  const section = searchParams.get("section")
  if (section) {
    currentPaths.push({
      name: transformTabName(section),
      href: `${pathname}?section=${section}`,
      children: undefined,
    })
  }

  const tab = searchParams.get("tab")
  if (tab) {
    currentPaths.push({
      name: transformTabName(tab),
      href: `${pathname}?tab=${tab}`,
      children: undefined,
    })
  }

  return currentPaths
}

const getSection = (pathname: string, items: TSidebarItem[]): boolean => {
  for (const item of items) {
    if (item.href === pathname) {
      return true
    }
    if (item.children?.length) {
      if (getSection(pathname, item.children)) {
        return true
      }
    }
  }
  return false
}

export default function BreadCrumbSection() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { insertPath, isPathFavorited, deletePathByHref, favorites } =
    useFavorites()

  const isFavorited = useMemo(
    () => isPathFavorited(pathname),
    [pathname, isPathFavorited]
  )

  const currentPaths = getCurrentPaths(pathname, searchParams)
  const currentPage = currentPaths.find((item) => item.href === pathname)

  return (
    <div className="sticky top-0 z-10 flex h-12 w-full flex-row items-center justify-between gap-4 border-b bg-background/40 px-4 backdrop-blur-sm">
      <div className="flex flex-row items-center gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            {currentPaths.map((path, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={cn(
                      index === currentPaths.length - 1 &&
                        "text-zinc-900 hover:text-button-primary dark:text-white"
                    )}
                    href={path.href}
                  >
                    {path.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {currentPage?.hasSetting && (
          <Link
            href={`${pathname}/settings`}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <CogIcon className="size-4" />
            Settings
          </Link>
        )}

        {/* <Button
          onClick={() => {
            if (isFavorited) {
              deletePathByHref(pathname)
              return
            }
            insertPath(currentPaths.at(-1) as Path)
          }}
          variant={"ghost"}
          size={"icon"}
          className="h-6 w-6 text-muted-foreground"
        >
          <StarIcon
            className="size-4"
            fill={isFavorited ? "hsl(var(--foreground))" : undefined}
          />
        </Button> */}
      </div>
      <ClientSideSuspense fallback={<></>}>
        <ActiveUsers />
      </ClientSideSuspense>
    </div>
  )
}
