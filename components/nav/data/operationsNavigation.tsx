import { CubeIcon } from "@radix-ui/react-icons"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const operationsNavigation: TSidebarItem[] = [
  {
    name: "Belli",
    href: "/belli",
    current: false,
    children: [
      {
        name: "Airway Bill Dashboard",
        href: "/belli/airway-bill-dashboard",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Flight Planning",
        href: "/belli/flight-planning",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Flight Master",
        href: "/belli/flight-master",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Flights Dashboard",
        href: "/belli/flights-dashboard",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Booking Modal",
        href: "/belli/booking-modal",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Aircraft",
        href: "/belli/aircraft",
        icon: CubeIcon,
        current: false,
      },
    ],
  },
]
