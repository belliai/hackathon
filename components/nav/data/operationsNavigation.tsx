import {
  HomeIcon,
  CalendarIcon,
  GlobeAmericasIcon,
  HandThumbUpIcon,
  PresentationChartLineIcon,
  ServerStackIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  CircleStackIcon,
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  CursorArrowRippleIcon, 
  ClipboardIcon
} from "@heroicons/react/24/outline";
import { PlaneIcon } from "lucide-react";

import { CubeIcon, PaperPlaneIcon } from "@radix-ui/react-icons"

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
        icon: HomeIcon,
        current: false,
      },
      {
        name: "Flight Planning",
        href: "/belli/flight-planning",
        icon: ClipboardIcon,
        current: false,
      },
      {
        name: "Flight Master",
        href: "/belli/flight-master",
        icon: PaperPlaneIcon,
        current: false,
      },
      {
        name: "Booking Modal",
        href: "/belli/booking-modal",
        icon: CursorArrowRippleIcon,
        current: false,
      },
      {
        name: "Aircraft",
        href: "/belli/aircraft",
        icon: PlaneIcon,
        current: false,
      },
    ],
  },


  //
];

export const getIconByHref = (href: string): React.ElementType | null => {
  for (const section of operationsNavigation) {
    if (section.children) {
      const foundItem = section.children.find((item) => item.href === href);
      if (foundItem) {
        return foundItem.icon;
      }
    }
  }
  return null; // Return null if href is not found
};

