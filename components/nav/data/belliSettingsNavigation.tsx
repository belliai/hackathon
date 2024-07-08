import { CursorArrowRippleIcon, UserIcon } from "@heroicons/react/24/outline"
import { PlaneIcon } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const belliSettingsNavigation: TSidebarItem[] = [
  {
    name: "Settings",
    href: "#",
    current: false,
    children: [
      {
        name: "Profile",
        href: "/profile",
        icon: UserIcon,
      },
      {
        name: "Data Fields",
        href: "/belli/data-fields",
        icon: CursorArrowRippleIcon,
        isCanCreate: true,
      },
      {
        name: "Users",
        href: "/users",
        icon: UserIcon,
      },
      {
        name: "Aircraft",
        href: "/belli/aircraft",
        icon: PlaneIcon,
        current: false,
        isCanCreate: true,
      },
    ],
  },
]
