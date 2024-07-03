import { CubeIcon } from "@radix-ui/react-icons"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const operationsNavigation: TSidebarItem[] = [
  {
    name: "Belli",
    href: "/belli",
    current: false,
    children: [
      {
        name: "Home",
        href: "/belli/home",
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
