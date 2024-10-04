"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOrganizationList } from "@clerk/nextjs"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { ChevronsLeftIcon } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"

import { NAV_TYPE } from "@/types/nav/enums"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { belliSettingsNavigation } from "@/components/nav//data/belliSettingsNavigation"
import { accountNavigation } from "@/components/nav/data/accountNavigation"
import { operationsNavigation } from "@/components/nav/data/operationsNavigation"
import { settingNavigation } from "@/components/nav/data/settingNavigation"
import { skNavigation } from "@/components/nav/data/skNavigation"

import ThemeSwitcher from "../theme-switcher"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { k360Navigation } from "./data/k360Navigation"
import { underConstructionNavigation } from "./data/underConstructionNavigation"
import useKeyPressNavigation from "./shortcuts/keypress-navigation"
import { TSidebarItem } from "./SidebarItem"
import SidebarMenu from "./SidebarMenu"
import UserDropdown from "./UserDropdown"

export default function SideBar({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}) {
  const searchParams = useSearchParams()
  const settings = searchParams.get("settings")
  const [customTheme, setCustomTheme] = useLocalStorage("custom_theme", "")

  const router = useRouter()
  const [sidebarType, setNavigationType] = useState<NAV_TYPE>(NAV_TYPE.DEFAULT)

  // const { userMemberships } = useOrganizationList({
  //   userMemberships: {
  //     infinite: true,
  //   },
  // })

  // const isBelliAdmin = userMemberships.data?.some(
  //   (data) => data.organization.slug === "admin"
  // )

  useEffect(() => {
    if (settings === "true") {
      setNavigationType(NAV_TYPE.SETTING)
    }
  }, [settings])

  const currentNavigation =
    sidebarType === NAV_TYPE.SETTING ? settingNavigation : skNavigation

  const firstCurrentNavigationItem = currentNavigation[0]

  const adminOnlyItems: TSidebarItem[] = [
    {
      name: "Visible only to Admins",
      href: "#",
      children: [
        ...settingNavigation,
        ...skNavigation,
        ...k360Navigation,
        ...underConstructionNavigation,
      ],
    },
  ]

  useKeyPressNavigation(operationsNavigation)

  useEffect(() => {
    if (sidebarType === NAV_TYPE.BELLI_SETTING) {
      router.push("/dashboards/flights/settings?section=tail-numbers")
    }
  }, [sidebarType])

  return (
    <Suspense>
      <div
        className={cn(
          "no-scrollbar flex grow flex-col overflow-y-auto bg-black-background px-5 pb-4 ring-1 ring-border",
          {
            "bg-black-background/40": customTheme === "skye",
          }
        )}
      >
        <div
          className={`flex ${!isExpanded ? "mt-2 flex-col gap-3" : "flex-row"} h-16 shrink-0 items-center justify-between`}
        >
          {sidebarType === NAV_TYPE.DEFAULT && (
            <UserDropdown
              doChangeNavigation={setNavigationType}
              isExpanded={isExpanded}
            />
          )}
          {(sidebarType === NAV_TYPE.SETTING ||
            sidebarType === NAV_TYPE.BELLI_SETTING) && (
            <div
              className="flex animate-fade-left cursor-pointer items-center gap-2"
              onClick={() => {
                setNavigationType(NAV_TYPE.DEFAULT)
                router.push("/")
              }}
            >
              <ChevronLeftIcon
                className="size-4 text-zinc-500"
                aria-hidden="true"
              />
              {isExpanded && (
                <span className="text-sm font-bold">Settings</span>
              )}
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                size="icon"
              >
                <ChevronsLeftIcon
                  className={`h-4 w-4 ${!isExpanded ? "rotate-180" : ""} transition-transform duration-200`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="border bg-card text-foreground"
              side="right"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </TooltipContent>
          </Tooltip>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <ul role="list" className="-mx-2">
              {sidebarType === NAV_TYPE.SETTING && (
                <li className="mb-2 flex items-center gap-x-[7px] text-zinc-500">
                  <span className="duration-400 flex items-center justify-center rounded-sm p-0.5 transition-colors">
                    <firstCurrentNavigationItem.icon
                      className="h-[18px] w-[18px] shrink-0"
                      aria-hidden="true"
                    />
                  </span>
                  {firstCurrentNavigationItem.name}
                </li>
              )}
              <ul className="flex flex-col gap-1">
                {sidebarType === NAV_TYPE.DEFAULT && (
                  <div className="animate-fade-right">
                    <SidebarMenu
                      onNavTypeChange={setNavigationType}
                      items={operationsNavigation}
                      collapsible
                      isExpanded={isExpanded}
                    />
                  </div>
                )}
                {sidebarType === NAV_TYPE.SETTING && (
                  <SidebarMenu
                    items={settingNavigation[0].children ?? []}
                    onNavTypeChange={setNavigationType}
                  />
                )}
                {sidebarType === NAV_TYPE.BELLI_SETTING && (
                  <div className="animate-fade-left">
                    <SidebarMenu
                      onNavTypeChange={setNavigationType}
                      items={belliSettingsNavigation[0].children ?? []}
                      collapsible
                      isExpanded={isExpanded}
                    />
                    <Separator className="mt-4" />
                    <ThemeSwitcher />
                  </div>
                )}
              </ul>
              {sidebarType === NAV_TYPE.SETTING && (
                <>
                  <li className="mb-2 mt-5 flex items-center gap-x-[7px] text-zinc-500">
                    <span className="flex items-center justify-center rounded-sm p-0.5 transition-colors duration-200">
                      <UserCircleIcon
                        className="h-[18px] w-[18px] shrink-0"
                        aria-hidden="true"
                      />
                    </span>
                    My Account
                  </li>
                  <ul className="flex flex-col gap-1">
                    <SidebarMenu
                      items={accountNavigation}
                      onNavTypeChange={setNavigationType}
                    />
                  </ul>
                </>
              )}
            </ul>
          </ul>
          {/* {isBelliAdmin &&
            isExpanded &&
            sidebarType === NAV_TYPE.BELLI_SETTING && (
              <ul role="list" className="-mx-2">
                <SidebarMenu
                  items={adminOnlyItems}
                  onNavTypeChange={setNavigationType}
                  collapsible
                />
              </ul>
            )} */}
        </nav>
      </div>
    </Suspense>
  )
}
