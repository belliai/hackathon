import { Banknote } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export const underConstructionNavigation: TSidebarItem[] = [
  {
    name: "Pages Under Construction",
    href: "#",
    current: false,
    children: [
      {
        name: "Pricing",
        href: "/plans?tab=pricing",
        icon: Banknote,
        current: false,
        isCanCreate: true,
      },
    ],
  },
]
