import { TSidebarItem } from "@/components/nav/SidebarItem";
import { CubeIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
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


export const operationsNavigation: TSidebarItem[] = [
  {
    name: "Operations",
    href: "/operations",
    current: false,
    children: [
      {
        name: "Home",
        href: "/dashboard",
        icon: HomeIcon,
        current: false,
      },
      {
        name: "Flight Planning",
        href: "/operations/flight-planning",
        icon: ClipboardIcon,
        current: false,
      },
      {
        name: "Flight Master",
        href: "/operations/flight-master",
        icon: PaperPlaneIcon,
        current: false,
      },
      {
        name: "Booking Modal",
        href: "/operations/booking-modal",
        icon: CursorArrowRippleIcon,
        current: false,
      },
      {
        name: "Aircraft",
        href: "/operations/aircraft",
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