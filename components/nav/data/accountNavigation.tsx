import { TSidebarItem } from "@/components/nav/SidebarItem";

export const accountNavigation: TSidebarItem[] = [
  {
    name: "Profile",
    href: "/setting/profile",
    current: false,
  },
  {
    name: "Auth",
    href: "#",
    children: [
      {
        name: "Clerk",
        href: "/clerk",
      },
      {
        name: "Supabase",
        href: "/supabase",
      },
    ],
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
