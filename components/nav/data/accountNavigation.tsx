import { TSidebarItem } from "@/components/nav/SidebarItem"

export const accountNavigation: TSidebarItem[] = [
  {
    name: "Profile",
    href: "/settings/profile"
  },
  {
    name: "Users",
    href: "/settings/users",
  },
  {
    name: "Preferences",
    href: "/setting/preferences",
    current: false,
  },
  {
    name: "Notifications",
    href: "/setting/notifications",
    current: false,
  },
  {
    name: "Data Fields",
    href: "/settings/data-fields",
    current: false,
  },
  {
    name: "Aircraft Setup",
    href: "/settings/aircraft-setup",
    current: false,
  },
]
