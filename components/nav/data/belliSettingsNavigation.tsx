import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { PlaneIcon, Waypoints } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const belliSettingsNavigation: TSidebarItem[] = [
  {
    name: "Settings",
    href: "#",
    current: false,
    children: [
      {
        name: "Aircraft Setup",
        href: "/settings/aircraft-setup",
        icon: PlaneIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Flight Schedule Editor",
        href: "/belli/flight-schedule-editor",
        icon: PaperPlaneIcon,
        current: false,
        isCanCreate: true,
      },
      {
        name: "Integrations",
        href: "/belli/integrations",
        icon: Waypoints,
        current: false,
        isCanCreate: false,
      },
    ],
  },
]
