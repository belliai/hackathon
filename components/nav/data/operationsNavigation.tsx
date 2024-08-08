import { HomeIcon, TvIcon } from "@heroicons/react/24/outline"
import { CubeIcon, DashboardIcon, ReaderIcon } from "@radix-ui/react-icons"
import { BarChartBigIcon, CogIcon, Handshake, Waypoints } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const operationsNavigation: TSidebarItem[] = [
  {
    name: "Dashboards",
    href: "/dashboards",
    current: false,
    icon: TvIcon,
    disabled: true,
    children: [
      {
        name: "Flights",
        href: "/dashboards/flights",
        icon: DashboardIcon,
        current: false,
        isCanCreate: false,
        hasSetting: true,
        shortcut: "F",
        children: [
          {
            name: "Settings",
            href: "/dashboards/flights/settings",
            icon: CogIcon,
            current: false,
            isCanCreate: false,
          },
        ],
      },
      {
        name: "Airway Bills",
        href: "/dashboards/airway-bills",
        icon: HomeIcon,
        current: false,
        isCanCreate: false,
        hasSetting: true,
        shortcut: "A",
        children: [
          {
            name: "Settings",
            href: "/dashboards/airway-bills/settings",
            icon: CogIcon,
            current: false,
            isCanCreate: false,
          },
        ],
      },
      {
        name: "Partners",
        href: "/dashboards/partners",
        icon: Handshake,
        current: false,
        isCanCreate: false,
        hasSetting: true,
        shortcut: "P",
        children: [
          {
            name: "Settings",
            href: "/dashboards/partners/settings",
            icon: CogIcon,
            current: false,
            isCanCreate: false,
          },
        ],
      },
      {
        name: "Data",
        href: "/dashboards/data",
        icon: Waypoints,
        current: false,
        isCanCreate: false,
        shortcut: "D",
      },
      {
        name: "Reports",
        href: "/dashboards/reports",
        icon: BarChartBigIcon,
        current: false,
        isCanCreate: false,
        shortcut: "R",
      },
    ],
  },
]

export const getIconByHref = (href: string): React.ElementType | null => {
  for (const section of operationsNavigation) {
    if (section.children) {
      const foundItem = section.children.find((item) => item.href === href)
      if (foundItem) {
        return foundItem.icon
      }
    }
  }
  return null // Return null if href is not found
}
