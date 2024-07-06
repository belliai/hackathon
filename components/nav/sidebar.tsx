"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Boxes, PlusSquare } from "lucide-react"
import { useFeatureFlagVariantKey } from "posthog-js/react"

import { accountNavigation } from "@/components/nav/data/accountNavigation"
import { operationsNavigation } from "@/components/nav/data/operationsNavigation"
import { settingNavigation } from "@/components/nav/data/settingNavigation"
import { skNavigation } from "@/components/nav/data/skNavigation"

import NewOrderModal from "../dashboard/new-order-modal"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { k360Navigation } from "./data/k360Navigation"
import FavoritesMenu from "./favorites/favorites-menu"
import SidebarMenu from "./SidebarMenu"
import UserDropdown from "./UserDropdown"
import { findActiveItem } from "@/lib/utils/nav-utils"

const SIDEBAR_TYPE = {
  DEFAULT: 1,
  SETTING: 2,
}

export default function SideBar() {
  const searchParams = useSearchParams()
  const settings = searchParams.get("settings")

  const router = useRouter()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [sidebarType, setNavigationType] = useState(SIDEBAR_TYPE.DEFAULT)

  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const variant = useFeatureFlagVariantKey("order-button-test-experiment")

  const isBelliAdmin = userMemberships.data?.some(
    (data) => data.organization.slug === "admin"
  )

  useEffect(() => {
    if (settings === "true") {
      setNavigationType(SIDEBAR_TYPE.SETTING)
    }
  }, [settings])

  const currentNavigation =
    sidebarType === SIDEBAR_TYPE.SETTING ? settingNavigation : skNavigation

  const firstCurrentNavigationItem = currentNavigation[0];

  const pathname = usePathname();
  const activeItem = findActiveItem([...accountNavigation, ...operationsNavigation, ...settingNavigation, ...skNavigation, ...k360Navigation], pathname);

  return (
    <Suspense>
      <div className="no-scrollbar flex grow flex-col overflow-y-auto bg-black-background px-5 pb-4 ring-1 ring-border">
        <div className="flex h-16 shrink-0 items-center justify-between">
          {sidebarType === SIDEBAR_TYPE.DEFAULT && (
            <UserDropdown doChangeNavigation={setNavigationType} />
          )}
          {sidebarType === SIDEBAR_TYPE.SETTING && (
            <div
              className="flex cursor-pointer items-center gap-x-2"
              onClick={() => {
                setNavigationType(SIDEBAR_TYPE.DEFAULT)
                router.push("/belli/home")
              }}
            >
              <ChevronLeftIcon
                className="h-5 w-5 text-zinc-500"
                aria-hidden="true"
              />
              <span className="font-bold text-white">Settings</span>
            </div>
          )}
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <ul role="list" className="-mx-2">
              {sidebarType === SIDEBAR_TYPE.DEFAULT && (
                <li>
                  <NewOrderModal>
                    <Button
                      variant="ghost"
                      onClick={() => setDialogOpen(true)}
                      className={`mb-5 h-8 w-full justify-start rounded-sm px-2 text-[13px] text-white ${activeItem?.item?.isCanCreate ? '' : 'bg-button-primary hover:bg-button-primary/80'}`}
                    >
                      <PlusSquare className="mr-2.5 h-4 w-4" />
                      {variant && variant === "test" ? "Create" : "New"} Order
                    </Button>
                  </NewOrderModal>
                </li>
              )}
              {sidebarType === SIDEBAR_TYPE.SETTING && (
                <li className="mb-2 flex items-center gap-x-[7px] text-zinc-500">
                  <span className="flex items-center justify-center rounded-sm p-0.5 transition-colors duration-200">
                    <firstCurrentNavigationItem.icon
                      className="h-[18px] w-[18px] shrink-0"
                      aria-hidden="true"
                    />
                  </span>
                  {firstCurrentNavigationItem.name}
                </li>
              )}
              <ul className="flex flex-col gap-1">
                {sidebarType === SIDEBAR_TYPE.DEFAULT ? (
                  <>
                    <FavoritesMenu />
                    <SidebarMenu items={operationsNavigation} collapsible />
                  </>
                ) : (
                  <SidebarMenu items={settingNavigation[0].children ?? []} />
                )}
              </ul>
              {sidebarType === SIDEBAR_TYPE.SETTING && (
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
                    <SidebarMenu items={accountNavigation} />
                  </ul>
                </>
              )}
            </ul>
          </ul>
          {/* {isBelliAdmin && (
            <Button className="mt-4" size="sm" variant="button-primary" asChild>
              <Link href="/admin/organization/organization-members">Admin</Link>
            </Button>
          )} */}
          <SidebarMenu
            items={skNavigation[0].children ?? []}
            sectionTitle="SK"
            collapsible
          />
          <SidebarMenu
            items={k360Navigation[0].children ?? []}
            sectionTitle="K360"
            collapsible
          />
        </nav>
      </div>
    </Suspense>
  )
}
