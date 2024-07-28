import { PaperPlaneIcon, ReaderIcon } from "@radix-ui/react-icons"
import { PlaneIcon, Waypoints } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export const belliSettingsNavigation: TSidebarItem[] = [
  {
    name: "Settings",
    href: "#",
    current: false,
    icon: Cog6ToothIcon,
    children: [
      {
        name: "Aircrafts",
        href: "/settings/aircrafts",
        icon: PlaneIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Flights",
        href: "/settings/flights",
        icon: PaperPlaneIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Data",
        href: "/settings/data",
        icon: Waypoints,
        current: false,
        isCanCreate: false,
      },
      {
        name: "Load Planner",
        href: "/settings/load-planner",
        icon: ReaderIcon,
        current: false,
        isCanCreate: false,
      },
    ],
  },
]
