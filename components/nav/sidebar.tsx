"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  CalendarIcon,
  Cog6ToothIcon,
  GlobeAmericasIcon,
  PresentationChartLineIcon,
  ServerStackIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  AvatarIcon,
  CubeIcon,
  LinkBreak2Icon,
  TargetIcon,
  FileIcon,
  DividerHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import NewOrder from "@/components/new-order";
import { Boxes } from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: CubeIcon,
    current: true,
  },
  {
    name: "Orders",
    href: "#",
    icon: GlobeAmericasIcon,
    current: false,
    children: [
      { name: "New Orders", href: "#", current: false },
      {
        name: "View Orders",
        icon: CubeIcon,
        href: "#",
        current: false,
        children: [
          { name: "D2D", href: "#", current: false },
          { name: "A2A", href: "#", current: false },
        ],
      },
      {
        name: "Order Docs",
        href: "#",
        icon: ServerStackIcon,
        current: false,
        children: [
          { name: "Upload Cargo Acceptance Slip", href: "#", current: false },
        ],
      },
      { name: "Download POD", href: "#", current: false },
      { name: "AWB Epouch", href: "#", current: false },
      { name: "Maintain AWB", href: "#", current: false },
    ],
  },
  { name: "Scheduling", href: "#", icon: CalendarIcon, current: false },
  {
    name: "Operation",
    href: "#",
    icon: WrenchScrewdriverIcon,
    current: false,
    children: [
      { name: "Mother Bag", href: "/operation/mother-bag", current: false },
      { name: "Truck Export", href: "#", current: false },
      { name: "Track Mother Bag List", href: "#", current: false },
    ],
  },
  {
    name: "Accounting",
    href: "#",
    icon: ChartBarIcon,
    current: false,
  },
  { name: "Track/Audit", href: "#", icon: TargetIcon, current: false },
  {
    name: "Organize",
    href: "#",
    icon: Boxes,
    children: [
      {
        name: "Masters",
        href: "#",
        current: false,
        submenus: [
          {
            name: "Finance",
            href: "#",
            current: false,
            submenus: [
              {
                name: "Cart",
                href: "/organize/masters/finance/cart",
              },
              {
                name: "Country",
                href: "/organize/masters/finance/country",
              }
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Reports",
    href: "#",
    icon: PresentationChartLineIcon,
    current: false,
  },
  { name: "Manual", href: "#", icon: LinkBreak2Icon, current: false },
];

export default function SideBar() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-4 ring-1 ring-white/10">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <AvatarIcon className="h-6 w-6" />
              <span className="text-white">Belli</span>
              <ChevronDownIcon
                className="h-4 w-4 text-zinc-500"
                aria-hidden="true"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-x-4">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-white"
            aria-hidden="true"
          />
          <PencilSquareIcon
            className="h-5 w-5 text-white cursor-pointer"
            aria-hidden="true"
            onClick={() => setDialogOpen(true)}
          />
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="hidden">Open Dialog</button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl bg-zinc-900 border-none">
              <DialogTitle className="text-xl font-bold ml-2">
                New Orders
              </DialogTitle>
              <NewOrder />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {item.children ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value={item.name} className="border-none">
                        <AccordionTrigger
                          className={cn(
                            item.current
                              ? "bg-zinc-800 text-white"
                              : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                            "group flex justify-between items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:no-underline"
                          )}
                        >
                          <div className="flex items-center gap-x-3">
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.children.map((childMenu: any) => {
                            if (childMenu?.submenus) {
                              return (
                                <Accordion
                                  type="single"
                                  collapsible
                                  key={childMenu.name}
                                >
                                  <AccordionItem
                                    value={childMenu.name}
                                    className="border-none"
                                  >
                                    <AccordionTrigger
                                      className={cn(
                                        childMenu.current
                                          ? "bg-zinc-800 text-white"
                                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                        "group flex justify-between items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:no-underline"
                                      )}
                                    >
                                      <div className="flex items-center gap-x-3 pl-4">
                                        {childMenu.name}
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      {childMenu.submenus.map(
                                        (submenu: any) => (
                                          <Link
                                            key={submenu.name}
                                            href={submenu.href}
                                            className={cn(
                                              submenu.current
                                                ? "bg-zinc-800 text-white"
                                                : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                              "group flex justify-between items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                            )}
                                          >
                                            {submenu?.submenus ? (
                                              <DropdownMenu>
                                                <DropdownMenuTrigger
                                                  asChild
                                                  className="w-full"
                                                >
                                                  <div className="flex items-center justify-between gap-x-3 pl-8">
                                                    {submenu.name}
                                                    <ChevronRightIcon
                                                      className="h-4 w-4 text-zinc-400"
                                                      aria-hidden="true"
                                                    />
                                                  </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right">
                                                  {submenu.submenus.map(
                                                    (subsubmenu: any) => (
                                                      <DropdownMenuItem
                                                        key={subsubmenu.name}
                                                        className="cursor-pointer"
                                                      >
                                                        <Link
                                                          href={subsubmenu.href}
                                                        >
                                                          {subsubmenu.name}
                                                        </Link>
                                                      </DropdownMenuItem>
                                                    )
                                                  )}
                                                </DropdownMenuContent>
                                              </DropdownMenu>
                                            ) : (
                                              <div className="flex items-center gap-x-3 pl-8">
                                                {submenu.name}
                                              </div>
                                            )}
                                          </Link>
                                        )
                                      )}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              );
                            }

                            return (
                              <Link
                                key={childMenu.name}
                                href={childMenu.href}
                                className={cn(
                                  childMenu.current
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                  "group flex justify-between items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <div className="flex items-center gap-x-3 pl-4">
                                  {childMenu.name}
                                </div>
                              </Link>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                        "group flex justify-between items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <div className="flex items-center gap-x-3">
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-auto">
            <Link
              href="#"
              className="group -mx-2 flex justify-between items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <div className="flex items-center gap-x-3">
                <Cog6ToothIcon
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                Settings
              </div>
              <ChevronRightIcon
                className="h-5 w-5 text-zinc-400"
                aria-hidden="true"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
