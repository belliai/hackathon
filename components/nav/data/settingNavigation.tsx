import { TSidebarItem } from "@/components/nav/SidebarItem";

export const settingNavigation: TSidebarItem[] = [
  {
    name: "Masters",
    href: "#",
    current: false,
    children: [
      {
        name: "Finance",
        href: "#",
        current: false,
        children: [
          {
            name: "Cart",
            href: "/organize/masters/finance/cart",
          },
          {
            name: "Country",
            href: "/organize/masters/finance/country",
          },
          {
            name: "Currency",
            href: "/organize/masters/finance/currency",
          },
          {
            name: "Freight Forwarder",
            href: "/organize/masters/finance/freight-forwarder",
          },
          {
            name: "HS Code",
            href: "/organize/masters/finance/hs-code",
          },
          {
            name: "Priority",
            href: "/organize/masters/finance/priority",
          },
          {
            name: "Region",
            href: "/organize/masters/finance/region",
          },
          {
            name: "State",
            href: "/organize/masters/finance/state",
          },
          {
            name: "Vendor",
            href: "/organize/masters/finance/vendor",
          },
          {
            name: "Zone",
            href: "/organize/masters/finance/zone",
          },
        ],
      },
      {
        name: "Operation",
        href: "#",
        current: false,
        children: [
          {
            name: "Aircraft",
            href: "/organize/masters/operation/aircraft",
            current: false,
          },
          {
            name: "Aircraft Positioning Configuration",
            href: "/organize/masters/operation/aircraft-positioning-configuration",
            current: false,
          },
          {
            name: "Airport/Warehouse",
            href: "/organize/masters/operation/airport",
            current: false,
          },
          {
            name: "Commodity Code",
            href: "/organize/masters/operation/commodity",
            current: false,
          },
          {
            name: "Equipment",
            href: "/organize/masters/operation/equipment",
            current: false,
          },
          {
            name: "Partner",
            href: "/organize/masters/operation/partner",
            current: false,
          },
          {
            name: "Pincode",
            href: "/organize/masters/operation/pincode",
            current: false,
          },
          {
            name: "Product Type",
            href: "/organize/masters/operation/product-type",
            current: false,
          },
          {
            name: "Special Handling Code",
            href: "/organize/masters/operation/special-handling-code",
            current: false,
          },
          {
            name: "Val Box",
            href: "/organize/masters/operation/val-box",
            current: false,
          },
          {
            name: "Vehicle",
            href: "/organize/masters/operation/vehicle",
            current: false,
          },
          {
            name: "CuttOff Time",
            href: "/organize/masters/operation/cutoff-time",
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
            name: "ULD",
            href: "/organize/masters/uld",
            current: false,
          },
          {
            name: "ULD Category",
            href: "/organize/masters/uld/category",
            current: false,
          },
          {
            name: "UCR",
            href: "/organize/masters/uld/ucr",
          },
        ],
      },
    ],
  },
  {
    name: "User",
    href: "#",
    current: false,
    children: [
      {
        name: "Login",
        href: "/organize/user",
        current: false,
      },
      {
        name: "Role Master",
        href: "/organize/user/role",
        current: false,
      },
    ],
  },
  {
    name: "Customer",
    href: "/organize/customer",
    current: false,
  },
  {
    name: "Consignee",
    href: "/organize/consignee",
    current: false,
  },
  {
    name: "Ratefilling",
    href: "#",
    current: false,
    children: [
      {
        name: "Supplier GSTIN",
        href: "/organize/ratefilling/supplier-gstin",
        current: false,
      },
      {
        name: "Rate Line",
        href: "/organize/ratefilling/rate-line",
        current: false,
      },
      {
        name: "Other Charges",
        href: "/organize/ratefilling/other-charges",
        current: false,
      },
      {
        name: "Exchange Rates",
        href: "/organize/ratefilling/exchange-rates",
        current: false,
      },
      {
        name: "Pro-Rate Factor",
        href: "/organize/ratefilling/prorate-factor",
        current: false,
      },
      {
        name: "Taxline",
        href: "/organize/ratefilling/taxline",
        current: false,
      },
      {
        name: "ATF Price",
        href: "/organize/ratefilling/atf-price",
        current: false,
      },
      {
        name: "Additional FSC",
        href: "/organize/ratefilling/additional-fsc",
        current: false,
      },
      {
        name: "OCDC",
        href: "/organize/ratefilling/ocdc",
        current: false,
      },
      {
        name: "Spot Rate",
        href: "/organize/ratefilling/spot-rate",
        current: false,
      },
      {
        name: "Capacity Allocation  ",
        href: "/organize/ratefilling/capacity-allocation",
        current: false,
      },
      {
        name: "SAC Master",
        href: "/organize/ratefilling/sac",
        current: false,
      },
      {
        name: "Cost Code",
        href: "/organize/ratefilling/cost-code",
        current: false,
      },
      {
        name: "Cost Line",
        href: "/organize/ratefilling/cost-line",
        current: false,
      },
    ],
  },
  {
    name: "Master Upload",
    href: "/organize/master-upload",
    current: false,
  },
  {
    name: "Message Configuration",
    href: "/organize/message-configuration",
    current: false,
  },
  {
    name: "DB-changes",
    href: "/organize/db-changes",
    current: false,
    children: [
      {
        name: "DB Changes",
        href: "/organize/db-changes",
        current: false,
      },
      {
        name: "Upload Serviceable Postal Code",
        href: "/organize/db-changes/upload-serviceable-postal-code",
        current: false,
      },
    ],
  },
  {
    name: "FTP",
    href: "/organize/ftp",
    current: false,
  },
];
