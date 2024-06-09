"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Boxes, PlusSquare } from "lucide-react";
import { Button } from "../ui/button";
import UserDropdown from "./UserDropdown";
import NewOrderModal from "../dashboard/new-order-modal";
import SidebarMenu from "./SidebarMenu";
import { useRouter } from "next/navigation";
import { accountNavigation } from "@/components/nav/data/accountNavigation";
import { settingNavigation } from "@/components/nav/data/settingNavigation";
import { defaultNavigation } from "@/components/nav/data/defaultNavigation";

const SIDEBAR_TYPE = {
  DEFAULT: 1,
  SETTING: 2,
};

export default function SideBar() {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [sidebarType, setNavigationType] = useState(SIDEBAR_TYPE.DEFAULT);

  const currentNavigation =
    sidebarType === SIDEBAR_TYPE.SETTING
      ? settingNavigation
      : defaultNavigation;

  const currentNavigationItems =
    sidebarType === SIDEBAR_TYPE.SETTING
      ? settingNavigation[0].children ?? []
      : defaultNavigation;
      
  const firstCurrentNavigationItem = currentNavigation[0];

  return (
    <div className="flex grow flex-col overflow-y-auto px-5 pb-4 ring-border ring-1 no-scrollbar bg-black-background">
      <div className="flex h-16 shrink-0 items-center justify-between">
        {sidebarType === SIDEBAR_TYPE.DEFAULT && (
          <UserDropdown doChangeNavigation={setNavigationType} />
        )}
        {sidebarType === SIDEBAR_TYPE.SETTING && (
          <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => {
              setNavigationType(SIDEBAR_TYPE.DEFAULT);
              router.push("/dashboard");
            }}
          >
            <ChevronLeftIcon
              className="h-5 w-5 text-zinc-500"
              aria-hidden="true"
            />
            <span className="text-white font-bold">Settings</span>
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
                    className="px-2 w-full h-8 justify-start mb-5 text-[13px] text-white bg-button-primary/60 hover:bg-button-primary/100 rounded-sm"
                  >
                    <PlusSquare className="mr-2.5 h-4 w-4" />
                    New Order
                  </Button>
                </NewOrderModal>
              </li>
            )}
            {sidebarType === SIDEBAR_TYPE.SETTING && (
              <li className="flex items-center gap-x-[7px] text-zinc-500 mb-2">
                <span className="flex items-center justify-center p-0.5 rounded-sm transition-colors duration-200">
                  <firstCurrentNavigationItem.icon
                    className="h-[18px] w-[18px] shrink-0"
                    aria-hidden="true"
                  />
                </span>
                {firstCurrentNavigationItem.name}
              </li>
            )}
            <ul className="flex flex-col gap-1">
              <SidebarMenu items={currentNavigationItems} />
            </ul>
            {sidebarType === SIDEBAR_TYPE.SETTING && (
              <>
                <li className="flex items-center gap-x-[7px] text-zinc-500 mt-5 mb-2">
                  <span className="flex items-center justify-center p-0.5 rounded-sm transition-colors duration-200">
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
      </nav>
    </div>
  );
}
