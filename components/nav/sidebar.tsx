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
  {
    name: "Scheduling",
    href: "/scheduling",
    icon: CalendarIcon,
    current: false,
    children: [
      {
        name: "Active Flights",
        href: "/scheduling/active-flights",
        current: false,
      },
      {
        name: "Flight Master",
        href: "/scheduling/flight-master",
        current: false,
      },
      { name: "New Flight", href: "/scheduling/new-flight", current: false },
      {
        name: "Cargo Loadplan",
        href: "/scheduling/cargo-loadplan",
        current: false,
      },
    ],
  },
  {
    name: "Operation",
    href: "#",
    icon: WrenchScrewdriverIcon,
    current: false,
    children: [
      { name: "Mother Bag", href: "/operation/mother-bag", current: false },
      { name: "Truck Export", href: "/operation/truck-export", current: false },
      { name: "Track Mother Bag List", href: "/operation/track-mother-bag-list", current: false },
      { name: "Stock Alocation", href: "/operation/stock-allocation", current: false },
      { name: "Flight Planning", href: "/operation/truck-export", current: false },
    ],
  },
  {
    name: "Accounting",
    href: "#",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Track/Audit",
    href: "#",
    icon: TargetIcon,
    current: false,
    children: [
      {
        name: "Master Audit Log",
        href: "/track/master-audit-log",
        current: false,
      },
      {
        name: "Ratefilling Audit Log",
        href: "/track/ratefilling-audit-log",
        current: false,
      },
      {
        name: "Accounting Audit log",
        href: "/track/accounting-audit-log",
        current: false,
      },
      { name: "Master AWB", href: "/track/master-awb", current: false },
      { name: "AWB Audit Log", href: "/track/awb-audit-log", current: false },
      {
        name: "Pomail Audit Log",
        href: "/track/pomail-audit-log",
        current: false,
      },
      {
        name: "Spicewall",
        href: "/track/spicewall",
        current: false,
      },
      {
        name: "Master Capacity Log",
        href: "/track/master-capacity-log",
        current: false,
      },
      {
        name: "Messaging",
        href: "#",
        current: false,
        submenus: [
          {
            name: "MVT Message",
            href: "/track/messaging-mvt",
            current: false,
          },
          {
            name: "Messaging Log",
            href: "/track/messaging-log",
            current: false,
          },
        ]
      },
      {
        name: "POD Upload Log",
        href: "/track/pod-upload-log",
        current: false,
      },
      {
        name: "Email Audit Log",
        href: "/track/email-audit-log",
        current: false,
      },
      {
        name: "User Audit Log",
        href: "/track/user-audit-log",
        current: false,
      },
      {
        name: "Login Log",
        href: "/track/login-log",
        current: false,
      },
      {
        name: "Master Upload Log",
        href: "#",
        submenus: [
          {
            name: "Pincode",
            href: "/track/master-pin-code",
            current: false,
          },
          {
            name: "Customer/Employee",
            href: "/track/master-customer",
            current: false,
          },
          {
            name: "Rateline",
            href: "/track/master-rateline",
            current: false,
          },
          {
            name: "OCDC",
            href: "/track/master-ocdc",
            current: false,
          },
        ],
        current: false,
      },
      {
        name: "Flight Scheduling Log",
        href: "#",
        current: false,
        submenus : [
          {
            name: "Flight",
            href: "/track/flight",
            current: false,
          },
          {
            name: "Active Flight",
            href: "/track/flight-active",
            current: false,
          },
        ]
      },
      {
        name: "Ekart Audit Log",
        href: "/track/ekart-audit-log",
        current: false,
      },
    ],
  },
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
              },
              {
                name: "Currency",
                href: "/organize/masters/finance/currency",
              },
              {
                name: "Freight Forwarder",
                href: "/organize/masters/finance/freight-forwarder",
              },
              {
                name: "HS Code",
                href: "/organize/masters/finance/hs-code",
              },
              {
                name: "Priority",
                href: "/organize/masters/finance/priority",
              },
              {
                name: "Region",
                href: "/organize/masters/finance/region",
              },
              {
                name: "State",
                href: "/organize/masters/finance/state",
              },
              {
                name: "Vendor",
                href: "/organize/masters/finance/vendor",
              },
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
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-4 ring-1 ring-white/10 no-scrollbar">
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
                                                <DropdownMenuContent
                                                  side="right"
                                                  align="start"
                                                >
                                                  {submenu.submenus.map(
                                                    (subsubmenu: any) => (
                                                      <DropdownMenuItem
                                                        key={subsubmenu.name}
                                                        className="cursor-pointer"
                                                        asChild
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
