import { HomeIcon, TvIcon } from "@heroicons/react/24/outline"
import { CubeIcon, DashboardIcon, ReaderIcon } from "@radix-ui/react-icons"
import {
  BarChartBigIcon,
  CogIcon,
  ContainerIcon,
  Handshake,
  SettingsIcon,
  Waypoints,
} from "lucide-react"

import { NAV_TYPE } from "@/types/nav/enums"
import { TSidebarItem } from "@/components/nav/SidebarItem"

export const operationsNavigation: TSidebarItem[] = [
  {
    name: "Dashboards",
    href: "#",
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
        name: "Load Planning",
        href: "/dashboards/load-planning",
        icon: ContainerIcon,
        current: false,
        isCanCreate: false,
        hasSetting: false,
        shortcut: "L",
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
  {
    name: "Partners",
    href: "/dashboards/partners",
    icon: Handshake,
    current: false,
    isCanCreate: false,
    hasSetting: true,
    shortcut: "P",
    disabled: true,
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
    name: "Settings",
    href: "#",
    viewToggle: NAV_TYPE.BELLI_SETTING,
    icon: SettingsIcon,
    current: false,
    isCanCreate: false,
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
