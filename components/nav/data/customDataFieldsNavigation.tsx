import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import {
  Boxes,
  Building2,
  CreditCard,
  Plane,
  PlaneTakeoff,
  Users,
} from "lucide-react"

import { TSidebarItem } from "../SidebarItem"

export const customDataFieldsNavigation: TSidebarItem[] = [
  {
    name: "Custom Data Fields",
    href: "#",
    current: false,
    icon: ClipboardDocumentIcon,
    children: [
      {
        name: "Airway Bills",
        href: "/data-fields/airway-bills",
        icon: Boxes,
      },
      {
        name: "Payments",
        href: "/data-fields/payments",
        icon: CreditCard,
      },
      {
        name: "Organizations",
        href: "/data-fields/organizations",
        icon: Building2,
      },
      {
        name: "Customers",
        href: "/data-fields/customers",
        icon: Users,
      },
    ],
  },
]
