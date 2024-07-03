import {
  CalendarIcon,
  GlobeAmericasIcon,
  HandThumbUpIcon,
  PresentationChartLineIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline"
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import { CubeIcon, UploadIcon } from "@radix-ui/react-icons"
import { Boxes, ReceiptText, TargetIcon } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const k360Navigation: TSidebarItem[] = [
  {
    name: "K360",
    href: "/k360",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Dashboard",
        href: "/k360/dashboard",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "A2A",
            href: "/k360/dashboard/a2a",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "D2D",
            href: "/k360/dashboard/d2d",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "Warehouse Performance Matrix",
            href: "/k360/dashboard/warehouse-performance-matrix",
            icon: CubeIcon,
            current: false,
          },
        ],
      },
      {
        name: "Orders",
        href: "#",
        icon: GlobeAmericasIcon,
        current: false,
        children: [
          { name: "New Orders", href: "#", current: false },
          {
            name: "View Orders",
            icon: CubeIcon,
            href: "#",
            current: false,
            children: [
              { name: "D2D", href: "/k360/orders/view/d2d", current: false },
              { name: "A2A", href: "/k360/orders/view/a2a", current: false },
            ],
          },
          {
            name: "Order Docs",
            href: "#",
            icon: ServerStackIcon,
            current: false,
            children: [
              {
                name: "Upload Cargo Acceptance Slip",
                href: "/k360/orders/cargo-acceptance-slip",
                current: false,
              },
            ],
          },
          { name: "Download POD", href: "#", current: false },
          {
            name: "AWB Epouch",
            href: "/k360/orders/awb-epouch",
            current: false,
          },
          {
            name: "Maintain AWB",
            href: "/k360/orders/maintain-awb",
            current: false,
          },
        ],
      },
      {
        name: "Scheduling",
        href: "#",
        icon: CalendarIcon,
        current: false,
        children: [
          {
            name: "Active Flights",
            href: "/k360/scheduling/active-flights",
            current: false,
          },
          {
            name: "Flight Master",
            href: "/k360/scheduling/flight-master",
            current: false,
          },
          {
            name: "New Flight",
            href: "/k360/scheduling/new-flight",
            current: false,
          },
          {
            name: "Cargo Loadplan",
            href: "/k360/scheduling/cargo-loadplan",
            current: false,
          },
        ],
      },
      {
        name: "Operation",
        href: "#",
        icon: WrenchScrewdriverIcon,
        current: false,
        children: [
          {
            name: "D2D",
            href: "#",
            current: false,
            children: [
              {
                name: "Mother Bag",
                href: "/k360/operation/mother-bag",
                current: false,
              },
              {
                name: "Truck Export",
                href: "/k360/operation/truck-export",
                current: false,
              },
              {
                name: "Track Mother Bag List",
                href: "/k360/operation/track-mother-bag-list",
                current: false,
              },
            ],
          },
          {
            name: "Stock Alocation",
            href: "/k360/operation/stock-allocation",
            current: false,
          },
          {
            name: "Flight Planning",
            href: "/k360/operation/flight-planning",
            current: false,
          },
          {
            name: "Export Manifest",
            href: "#",
            current: false,
            children: [
              {
                name: "Export Manifest",
                href: "/k360/operation/export-manifest/export-manifest",
                current: false,
              },
              {
                name: "Flight Epouch",
                href: "/k360/operation/export-manifest/flight-epouch",
                current: false,
              },
            ],
          },
          {
            name: "Arrival Manifest",
            href: "#",
            current: false,
            children: [
              {
                name: "Arrival Manifest",
                href: "/k360/operation/arrival-manifest/arrival-manifest",
                current: false,
              },
              {
                name: "Break ULD",
                href: "/k360/operation/arrival-manifest/break-uld",
                current: false,
              },
            ],
          },
          {
            name: "Delivery Cargo",
            href: "/k360/operation/delivery-cargo",
            current: false,
          },
          {
            name: "Transfer",
            href: "#",
            current: false,
            children: [
              {
                name: "CTM IN",
                href: "/k360/operation/transfer/ctm-in",
                current: false,
              },
              {
                name: "CTM OUT",
                href: "/k360/operation/transfer/ctm-out",
                current: false,
              },
            ],
          },
        ],
      },
      {
        name: "Accounting",
        href: "#",
        icon: ReceiptText,
        current: false,
        children: [
          {
            name: "Agent",
            href: "#",
            current: false,
            children: [
              {
                name: "Agent Invoice",
                href: "/k360/accounting/agent/invoice",
                current: false,
              },
              {
                name: "Invoice Collection",
                href: "/k360/accounting/agent/invoice-collection",
                current: false,
              },
              {
                name: "Debit Credit Memo",
                href: "/k360/accounting/agent/debit-credit-memo",
                current: false,
              },
              {
                name: "CCA",
                href: "/k360/accounting/agent/charge-correction",
                current: false,
              },
            ],
          },
          {
            name: "Charter",
            href: "/k360/accounting/charter",
            current: false,
          },
        ],
      },
      {
        name: "Track/Audit",
        href: "#",
        icon: TargetIcon,
        current: false,
        children: [
          {
            name: "Master Audit Log",
            href: "/k360/track/master-audit-log",
            current: false,
          },
          {
            name: "Ratefilling Audit Log",
            href: "/k360/track/ratefilling-audit-log",
            current: false,
          },
          {
            name: "Accounting Audit log",
            href: "/k360/track/accounting-audit-log",
            current: false,
          },
          {
            name: "Master AWB",
            href: "/k360/track/master-awb",
            current: false,
          },
          {
            name: "AWB Audit Log",
            href: "/k360/track/awb-audit-log",
            current: false,
          },
          {
            name: "Pomail Audit Log",
            href: "/k360/track/pomail-audit-log",
            current: false,
          },
          {
            name: "Spicewall",
            href: "/k360/track/spicewall",
            current: false,
          },
          {
            name: "Master Capacity Log",
            href: "/k360/track/master-capacity-log",
            current: false,
          },
          {
            name: "Messaging",
            href: "#",
            current: false,
            children: [
              {
                name: "MVT Message",
                href: "/k360/track/messaging-mvt",
                current: false,
              },
              {
                name: "Messaging Log",
                href: "/k360/track/messaging-log",
                current: false,
              },
            ],
          },
          {
            name: "POD Upload Log",
            href: "/k360/track/pod-upload-log",
            current: false,
          },
          {
            name: "Email Audit Log",
            href: "/k360/track/email-audit-log",
            current: false,
          },
          {
            name: "User Audit Log",
            href: "/k360/track/user-audit-log",
            current: false,
          },
          {
            name: "Login Log",
            href: "/k360/track/login-log",
            current: false,
          },
          {
            name: "Master Upload Log",
            href: "#",
            children: [
              {
                name: "Pincode",
                href: "/k360/track/master-pin-code",
                current: false,
              },
              {
                name: "Customer/Employee",
                href: "/k360/track/customer-log",
                current: false,
              },
              {
                name: "Rateline",
                href: "/k360/track/rateline-log",
                current: false,
              },
              {
                name: "OCDC",
                href: "/k360/track/ocdc-log",
                current: false,
              },
            ],
            current: false,
          },
          {
            name: "Flight Scheduling Log",
            href: "#",
            current: false,
            children: [
              {
                name: "Flight",
                href: "/k360/track/flight-audit-log",
                current: false,
              },
              {
                name: "Active Flight",
                href: "/k360/track/flight-active-audit-log",
                current: false,
              },
            ],
          },
          {
            name: "Ekart Audit Log",
            href: "/k360/track/ekart-audit-log",
            current: false,
          },
        ],
      },
      {
        name: "Organize",
        href: "#",
        icon: Boxes,
        children: [
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
                    href: "/k360/organize/masters/finance/cart",
                  },
                  {
                    name: "Country",
                    href: "/k360/organize/masters/finance/country",
                  },
                  {
                    name: "Currency",
                    href: "/k360/organize/masters/finance/currency",
                  },
                  {
                    name: "Freight Forwarder",
                    href: "/k360/organize/masters/finance/freight-forwarder",
                  },
                  {
                    name: "HS Code",
                    href: "/k360/organize/masters/finance/hs-code",
                  },
                  {
                    name: "Priority",
                    href: "/k360/organize/masters/finance/priority",
                  },
                  {
                    name: "Region",
                    href: "/k360/organize/masters/finance/region",
                  },
                  {
                    name: "State",
                    href: "/k360/organize/masters/finance/state",
                  },
                  {
                    name: "Vendor",
                    href: "/k360/organize/masters/finance/vendor",
                  },
                  {
                    name: "Zone",
                    href: "/k360/organize/masters/finance/zone",
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
                    href: "/k360/organize/masters/operation/aircraft",
                    current: false,
                  },
                  {
                    name: "Aircraft Positioning Configuration",
                    href: "/k360/organize/masters/operation/aircraft-positioning-configuration",
                    current: false,
                  },
                  {
                    name: "Airport/Warehouse",
                    href: "/k360/organize/masters/operation/airport",
                    current: false,
                  },
                  {
                    name: "Commodity Code",
                    href: "/k360/organize/masters/operation/commodity",
                    current: false,
                  },
                  {
                    name: "Equipment",
                    href: "/k360/organize/masters/operation/equipment",
                    current: false,
                  },
                  {
                    name: "Partner",
                    href: "/k360/organize/masters/operation/partner",
                    current: false,
                  },
                  {
                    name: "Pincode",
                    href: "/k360/organize/masters/operation/pincode",
                    current: false,
                  },
                  {
                    name: "Product Type",
                    href: "/k360/organize/masters/operation/product-type",
                    current: false,
                  },
                  {
                    name: "Special Handling Code",
                    href: "/k360/organize/masters/operation/special-handling-code",
                    current: false,
                  },
                  {
                    name: "Val Box",
                    href: "/k360/organize/masters/operation/val-box",
                    current: false,
                  },
                  {
                    name: "Vehicle",
                    href: "/k360/organize/masters/operation/vehicle",
                    current: false,
                  },
                  {
                    name: "CuttOff Time",
                    href: "/k360/organize/masters/operation/cutoff-time",
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
                    href: "/k360/organize/masters/uld",
                    current: false,
                  },
                  {
                    name: "ULD Category",
                    href: "/k360/organize/masters/uld/category",
                    current: false,
                  },
                  {
                    name: "UCR",
                    href: "/k360/organize/masters/uld/ucr",
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
                href: "/k360/organize/user",
                current: false,
              },
              {
                name: "Role Master",
                href: "/k360/organize/user/role",
                current: false,
              },
            ],
          },
          {
            name: "Customer",
            href: "/k360/organize/customer",
            current: false,
          },
          {
            name: "Consignee",
            href: "/k360/organize/consignee",
            current: false,
          },
          {
            name: "Ratefilling",
            href: "#",
            current: false,
            children: [
              {
                name: "Supplier GSTIN",
                href: "/k360/organize/ratefilling/supplier-gstin",
                current: false,
              },
              {
                name: "Rate Line",
                href: "/k360/organize/ratefilling/rate-line",
                current: false,
              },
              {
                name: "Other Charges",
                href: "/k360/organize/ratefilling/other-charges",
                current: false,
              },
              {
                name: "Exchange Rates",
                href: "/k360/organize/ratefilling/exchange-rates",
                current: false,
              },
              {
                name: "Pro-Rate Factor",
                href: "/k360/organize/ratefilling/prorate-factor",
                current: false,
              },
              {
                name: "Taxline",
                href: "/k360/organize/ratefilling/taxline",
                current: false,
              },
              {
                name: "ATF Price",
                href: "/k360/organize/ratefilling/atf-price",
                current: false,
              },
              {
                name: "Additional FSC",
                href: "/k360/organize/ratefilling/additional-fsc",
                current: false,
              },
              {
                name: "OCDC",
                href: "/k360/organize/ratefilling/ocdc",
                current: false,
              },
              {
                name: "Spot Rate",
                href: "/k360/organize/ratefilling/spot-rate",
                current: false,
              },
              {
                name: "Capacity Allocation  ",
                href: "/k360/organize/ratefilling/capacity-allocation",
                current: false,
              },
              {
                name: "SAC Master",
                href: "/k360/organize/ratefilling/sac",
                current: false,
              },
              {
                name: "Cost Code",
                href: "/k360/organize/ratefilling/cost-code",
                current: false,
              },
              {
                name: "Cost Line",
                href: "/k360/organize/ratefilling/cost-line",
                current: false,
              },
            ],
          },
          {
            name: "Master Upload",
            href: "/k360/organize/master-upload",
            current: false,
          },
          {
            name: "Message Configuration",
            href: "/k360/organize/message-configuration",
            current: false,
          },
          {
            name: "DB-changes",
            href: "/k360/organize/db-changes",
            current: false,
            children: [
              {
                name: "DB Changes",
                href: "/k360/organize/db-changes",
                current: false,
              },
              {
                name: "Upload Serviceable Postal Code",
                href: "/k360/organize/db-changes/upload-serviceable-postal-code",
                current: false,
              },
            ],
          },
          {
            name: "FTP",
            href: "/k360/organize/ftp",
            current: false,
          },
        ],
      },
      {
        name: "Reports",
        href: "#",
        icon: PresentationChartLineIcon,
        current: false,
        children: [
          {
            name: "Finance",
            href: "#",
            current: false,
            children: [
              {
                name: "Cancel Invoice Report",
                href: "/k360/reports/finance/cancel-invoice",
                current: false,
              },
              {
                name: "Consignee Reconciliation Report",
                href: "/k360/reports/finance/consignee-reconciliation",
                current: false,
              },
              {
                name: "DO Invoice Report",
                href: "/k360/reports/finance/do-invoice",
                current: false,
              },
              {
                name: "PO Mail Summary",
                href: "/k360/reports/finance/po-mail-summary",
                current: false,
              },
              {
                name: "Un-Invoiced Agent AWB's Report",
                href: "/k360/reports/finance/uninvoiced-agent-awb",
                current: false,
              },
            ],
          },
          {
            name: "Operation",
            href: "#",
            current: false,
            children: [
              {
                name: "E-Pouch Report",
                href: "/k360/reports/operation/epouch-report",
                current: false,
              },
              {
                name: "Flight Performance Report",
                href: "/k360/reports/operation/flight-performance-report",
                current: false,
              },
              {
                name: "Offload",
                href: "/k360/reports/operation/offload",
                current: false,
              },
              {
                name: "Tonnage",
                href: "/k360/reports/operation/tonnage",
                current: false,
              },
              {
                name: "Unbilled AWB Report",
                href: "/k360/reports/operation/unbilled-awb-report",
                current: false,
              },
              {
                name: "DO Report",
                href: "/k360/reports/operation/do-report",
                current: false,
              },
              {
                name: "MAWB Report",
                href: "/k360/reports/operation/mawb-report",
                current: false,
              },
            ],
          },
          {
            name: "User Performance",
            href: "/k360/reports/user-performance",
            current: false,
          },
        ],
      },
      {
        name: "Manual",
        href: "#",
        icon: UploadIcon,
        current: false,
        children: [
          {
            name: "Upload Manual",
            href: "/k360/manual/upload-manual",
            current: false,
          },
        ],
      },
      {
        name: "Rewards",
        href: "#",
        icon: HandThumbUpIcon,
        current: false,
        children: [
          {
            name: "Appreciation",
            href: "/k360/rewards/appreciation",
            current: false,
          },
          {
            name: "Appreciation Report",
            href: "/k360/rewards/appreciation-report",
            current: false,
          },
        ],
      },
    ],
  },
]
