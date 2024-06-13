import { TSidebarItem } from "@/components/nav/SidebarItem";
import { CubeIcon } from "@radix-ui/react-icons";

export const settingNavigation: TSidebarItem[] = [
  {
    name: "Configuration",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Users",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "User/Login",
            href: "/configuration/users",
            current: false,
            children: [
              { name: "List", href: "/configuration/users", current: false },
              { name: "New", href: "/configuration/users/new", current: false },
            ],
          },
          {
            name: "Change Password",
            href: "/configuration/users/change-password",
            current: false,
          },
          {
            name: "Role Master",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/users/roles",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/users/roles/new",
                current: false,
              },
            ],
          },
        ],
      },
      {
        name: "Masters",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Country",
            href: "/configuration/masters/country",
            current: false,
          },
          {
            name: "Region",
            href: "/configuration/masters/region",
            current: false,
          },
          {
            name: "Currency",
            href: "/configuration/masters/currency",
            current: false,
          },
          {
            name: "Zone Master",
            href: "/configuration/masters/zone",
            current: false,
          },
          {
            name: "Airline Route",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/masters/airline-route",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/masters/airline-route/new",
                current: false,
              },
            ],
          },
          {
            name: "Airport",
            href: "/configuration/masters/airport",
            current: false,
          },
          {
            name: "Aircraft Position Configuration",
            href: "/configuration/masters/aircraft-position-configuration",
            current: false,
          },
          {
            name: "Aircraft",
            href: "#",
            current: false,
            children: [
              {
                name: "Aircraft",
                href: "/configuration/masters/aircraft",
                current: false,
              },
              {
                name: "Equipment",
                href: "/configuration/masters/aircraft/equipment",
                current: false,
              },
            ],
          },
          {
            name: "ULD",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/masters/uld",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/masters/uld/new",
                current: false,
              },
              {
                name: "ULD Category",
                href: "/configuration/masters/uld/category",
                current: false,
              },
            ],
          },
          { name: "Cart", href: "/configuration/masters/cart", current: false },
          {
            name: "Priority",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/masters/priority/list",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/masters/priority/new",
                current: false,
              },
              {
                name: "Priority Master",
                href: "/configuration/masters/priority",
                current: false,
              },
            ],
          },
          {
            name: "Commodity",
            href: "#",
            current: false,
            children: [
              {
                name: "Commodity Master",
                href: "/configuration/masters/commodity",
                current: false,
              },
            ],
          },
          {
            name: "Special Handling Code",
            href: "/configuration/masters/special-handling-code",
            current: false,
          },
          {
            name: "CutOff Time",
            href: "/configuration/masters/cutoff",
            current: false,
          },
          {
            name: "Product Type",
            href: "/configuration/masters/product-type",
            current: false,
          },
          {
            name: "Irregularity Code",
            href: "/configuration/masters/irregularity-codes",
            current: false,
          },
          {
            name: "Exchange Rate",
            href: "/configuration/masters/exchange-rate",
            current: false,
          },
          {
            name: "Other Charges",
            href: "/configuration/masters/other-charges",
            current: false,
          },
          {
            name: "Entity Master",
            href: "/configuration/masters/entity",
            current: false,
          },
        ],
      },
      {
        name: "Capacity",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Capacity Master",
            href: "/configuration/capacity/master",
            current: false,
          },
          {
            name: "Flight Pax Information",
            href: "/configuration/capacity/pax",
            current: false,
          },
        ],
      },
      {
        name: "Rates",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Rate Card",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/rate-card",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/rate-card/new",
                current: false,
              },
            ],
          },
          {
            name: "Rate Line",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/rate-line",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/rate-line/new",
                current: false,
              },
            ],
          },
          {
            name: "Cost Line",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/cost-line",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/cost-line/new",
                current: false,
              },
            ],
          },
          {
            name: "Rate Parameter Priority",
            href: "/configuration/rates/rate-parameter-priority",
            current: false,
          },
          {
            name: "Other Charges",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/other-charges",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/other-charges/new",
                current: false,
              },
            ],
          },
          {
            name: "Spot Rates",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/spot-rates",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/spot-rates/new",
                current: false,
              },
              {
                name: "Approval",
                href: "/configuration/rates/spot-rates/approval",
                current: false,
              },
            ],
          },
          {
            name: "Tax Line",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/tax-line",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/tax-line/new",
                current: false,
              },
            ],
          },
          {
            name: "Config Line",
            href: "#",
            current: false,
            children: [
              {
                name: "List",
                href: "/configuration/rates/config-line",
                current: false,
              },
              {
                name: "New",
                href: "/configuration/rates/config-line/new",
                current: false,
              },
            ],
          },
          {
            name: "Deals",
            href: "#",
            current: false,
            children: [
              {
                name: "New Deal",
                href: "/configuration/rates/deals/new-deal",
                current: false,
              },
              {
                name: "Apply Deal",
                href: "/configuration/rates/deals/apply-deal",
                current: false,
              },
              {
                name: "List Deal",
                href: "/configuration/rates/deals",
                current: false,
              },
              {
                name: "Deal Audit",
                href: "/configuration/rates/deals/deal-audit",
                current: false,
              },
            ],
          },
          {
            name: "Airline Proration",
            href: "/configuration/rates/airline-proration",
            current: false,
          },
          {
            name: "Vol. Exemption",
            href: "#",
            current: false,
            children: [
              { name: "List", href: "#", current: false },
              { name: "New", href: "#", current: false },
            ],
          },
          {
            name: "PLI",
            href: "#",
            current: false,
            children: [
              { name: "New PLI", href: "#", current: false },
              { name: "Apply PLI", href: "#", current: false },
              { name: "List PLI", href: "#", current: false },
              { name: "PLI Audit", href: "#", current: false },
            ],
          },
          { name: "MSR Rate", href: "#", current: false },
        ],
      },
      {
        name: "Booking Modal",
        icon: CubeIcon,
        href: "/configuration/booking-modal",
        current: false,
      },
      {
        name: "Partner",
        href: "#",
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
        ],
      },
      {
        name: "Agent",
        href: "#",
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
          { name: "Agent MGP", href: "#", current: false },
        ],
      },
      {
        name: "Shipper Consignee",
        href: "#",
        current: false,
        children: [{ name: "Shipper Consignee", href: "#", current: false }],
      },
      {
        name: "Vendor Master",
        href: "#",
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
        ],
      },
      {
        name: "Message Config",
        href: "#",
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
        ],
      },
      {
        name: "Upload Master",
        href: "#",
        current: false,
        children: [{ name: "Upload Master", href: "#", current: false }],
      },
      {
        name: "Notification",
        href: "#",
        current: false,
        children: [{ name: "Notification", href: "#", current: false }],
      },
    ],
  },
];
