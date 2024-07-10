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
        href: "/settings/profile",
        icon: UserIcon,
      },
      {
        name: "Data Fields",
        href: "/settings/data-fields",
        icon: CursorArrowRippleIcon,
        isCanCreate: true,
      },
      {
        name: "Users",
        href: "/settings/users",
        icon: UserIcon,
      },
      {
        name: "Aircraft Setup",
        href: "/settings/aircraft-setup",
        icon: PlaneIcon,
        current: false,
        isCanCreate: true,
      },
    ],
  },
]
