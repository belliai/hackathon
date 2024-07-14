"use client"

import React, { useMemo } from "react"
import { usePathname } from "next/navigation"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { Loader, StarIcon } from "lucide-react"

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
import ActiveUsers from "./active-users"
import { belliSettingsNavigation } from "./data/belliSettingsNavigation"
import { k360Navigation } from "./data/k360Navigation"
import { settingNavigation } from "./data/settingNavigation"
import { skNavigation } from "./data/skNavigation"
import { Path, useFavorites } from "./favorites/favorites-provider"
import { TSidebarItem } from "./SidebarItem"
import { customDataFieldsNavigation } from "./data/customDataFieldsNavigation"

const findCurrentPaths = (
  items: TSidebarItem[],
  pathname: string,
  path: TSidebarItem[] = []
): TSidebarItem[] | null => {
  for (const item of items) {
    // Create a new path array including the current item
    const currentPath: TSidebarItem[] = [
      ...path,
      { name: item.name, href: item.href, children: undefined },
    ]
    
    // Check if the current item's href matches the pathname
    if (item.href === pathname) {
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

const getCurrentPaths = (pathname: string) => {
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
  const { insertPath, isPathFavorited, deletePathByHref, favorites } =
    useFavorites()

  const isFavorited = useMemo(
    () => isPathFavorited(pathname),
    [pathname, isPathFavorited]
  )

  const currentPaths = getCurrentPaths(pathname)

  return (
    <div className="sticky top-0 z-10 flex h-12 w-full flex-row items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur-sm">
      <div className="flex flex-row items-center gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            {currentPaths.map((path, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={cn(
                      index === 0 && "text-foreground",
                      index === currentPaths.length - 1 && "text-white bg-button-primary hover:bg-button-primary/80 rounded-sm px-2 pt-0 pb-1 text-sm"
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
        <Button
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
        </Button>
      </div>
      <ClientSideSuspense fallback={<></>}>
        <ActiveUsers />
      </ClientSideSuspense>
    </div>
  )
}
