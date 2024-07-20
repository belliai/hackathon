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
    children: [
      {
        name: "Aircrafts",
        href: "/data-fields/aircrafts",
        icon: Plane,
      },
      {
        name: "Flights",
        href: "/data-fields/flights",
        icon: PlaneTakeoff,
      },
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
