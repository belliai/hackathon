import { Boxes, Building2, CreditCard, Plane } from "lucide-react"

import { TSidebarItem } from "../SidebarItem"

export const customDataFieldsNavigation: TSidebarItem[] = [
  {
    name: "Custom Data Fields",
    href: "#",
    current: false,
    children: [
      {
        name: "Shipments",
        href: "/data-fields/shipments",
        icon: Boxes,
      },
      {
        name: "Organizations",
        href: "/data-fields/organizations",
        icon: Building2,
      },
      {
        name: "Payments",
        href: "/data-fields/payments",
        icon: CreditCard,
      },
      // {
      //   name: "Aircrafts",
      //   href: "/data-fields/aircrafts",
      //   icon: Plane,
      // },
    ],
  },
]