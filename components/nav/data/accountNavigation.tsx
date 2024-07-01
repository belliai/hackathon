import { TSidebarItem } from "@/components/nav/SidebarItem";

export const accountNavigation: TSidebarItem[] = [
  {
    name: "Profile",
    href: "/setting/profile",
    current: false,
  },
  {
    name: "All Users",
    href: "/users",
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
];
