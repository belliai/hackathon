import { TSidebarItem } from "@/components/nav/SidebarItem";
import { CubeIcon } from "@radix-ui/react-icons";

export const operationsNavigation: TSidebarItem[] = [
  {
    name: "Operations",
    href: "/operations",
    current: false,
    children: [
      {
        name: "Home",
        href: "/dashboard",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Flight Planning",
        href: "/operations/flight-planning",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Flight Master",
        href: "/operations/flight-master",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Booking Modal",
        href: "/operations/booking-modal",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Aircraft",
        href: "/operations/aircraft",
        icon: CubeIcon,
        current: false,
      },
    ],
  },

  //
];
