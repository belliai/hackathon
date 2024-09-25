import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { PaperPlaneIcon, ReaderIcon } from "@radix-ui/react-icons"
import {
  BellIcon,
  BoxesIcon,
  Building2Icon,
  CreditCardIcon,
  PlaneIcon,
  UsersIcon,
  Waypoints,
} from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const belliSettingsNavigation: TSidebarItem[] = [
  {
    name: "Settings",
    href: "#",
    current: false,
    icon: Cog6ToothIcon,
    children: [
      {
        name: "Aircrafts",
        href: "/dashboards/flights/settings?section=aircraft-types",
        icon: PlaneIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Flights",
        href: "/dashboards/flights/settings?section=flight-scheduler",
        icon: PaperPlaneIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Airway Bills",
        href: "/data-fields/airway-bills",
        icon: BoxesIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Notifications",
        href: "/settings/notifications",
        icon: BellIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Payments",
        href: "/data-fields/payments",
        icon: CreditCardIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Organizations",
        href: "/data-fields/organizations",
        icon: Building2Icon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Customers",
        href: "/data-fields/customers",
        icon: UsersIcon,
        current: false,
        isCanCreate: true,
      },
    ],
  },
]
