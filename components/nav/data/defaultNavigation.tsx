import {
  CalendarIcon,
  GlobeAmericasIcon,
  HandThumbUpIcon,
  PresentationChartLineIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { CubeIcon, UploadIcon } from "@radix-ui/react-icons";
import { Boxes, ReceiptText, TargetIcon } from "lucide-react";
import { TSidebarItem } from "@/components/nav/SidebarItem";

export const defaultNavigation: TSidebarItem[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: CubeIcon,
    current: false,
  },
  {
    name: "Sales",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Stock Allocation",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Capacity Allocation",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
          { name: "Capacity Usage", href: "#", current: false },
        ],
      },
      {
        name: "Rate Line",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
        ],
      },
      {
        name: "Other Charges",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
        ],
      },
      {
        name: "Spot rate",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
          { name: "Approval", href: "#", current: false },
        ],
      },
    ],
  },
  {
    name: "Planning",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Flight Control",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Manage Capacity",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Flight Schedule",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Fight Master", href: "#", current: false },
          { name: "Active Flights", href: "#", current: false },
          { name: "New Flight", href: "#", current: false },
          {
            name: "Route Control",
            href: "#",
            current: false,
            children: [
              { name: "List", href: "#", current: false },
              { name: "New", href: "#", current: false },
            ],
          },
        ],
      },
      {
        name: "Flight Load Plan",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "List Flight Plan",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
    ],
  },
  {
    name: "Booking",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Cargo",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
          { name: "Templates", href: "#", current: false },
          {
            name: "Dangerous Goods",
            href: "#",
            current: false,
            children: [
              { name: "DGR Approval", href: "#", current: false },
              {
                name: "MSDS",
                href: "#",
                current: false,
                children: [
                  { name: "List", href: "#", current: false },
                  { name: "New", href: "#", current: false },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Flight Load Plan",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "List Flight Plan",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
    ],
  },
  {
    name: "Operations",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Accept",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Cargo Acceptance",
            href: "/operation/accept/cargo-acceptance",
            current: false,
          },
          { name: "Cargo Screening", href: "/operation/accept/cargo-screening", current: false },
        ],
      },
      {
        name: "Plan Flight",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Flight Planning",
            href: "/operation/plan-flight/flight-planning",
            current: false,
          },
        ],
      },
      {
        name: "Export",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Export Manifest", href: "/operation/export/export-manifest", current: false },
          { name: "ePouch Flight", href: "/operation/export/epouch-flight", current: false },
          { name: "Export Summary", href: "#", current: false },
          { name: "Export Inventory", href: "#", current: false },
          { name: "NOTOC Details", href: "#", current: false },
        ],
      },
      {
        name: "Import",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Arrive", href: "/operation/import/arrive", current: false },
          { name: "Break ULD", href: "/operation/import/break-uld", current: false },
          { name: "Import Summary", href: "#", current: false },
          { name: "Import Inventory", href: "#", current: false },
        ],
      },
      {
        name: "Delivery",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [{ name: "Deliver Cargo", href: "/operation/delivery/delivery-cargo", current: false }],
      },
      {
        name: "Transfer",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "CTM Out", href: "/operation/transfer/ctm-out", current: false },
          { name: "CTM In", href: "/operation/transfer/ctm-in", current: false },
        ],
      },
      {
        name: "Disrepancy",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "List", href: "#", current: false },
          { name: "New", href: "#", current: false },
        ],
      },
    ],
  },
  {
    name: "ULD",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "List ULD",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "New ULD",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "List UCR",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "New UCR",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "ULD Management",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "UCM In", href: "#", current: false },
          { name: "UCM Out", href: "#", current: false },
          { name: "ULD Stock Management", href: "#", current: false },
          { name: "Station ULD Stock", href: "#", current: false },
        ],
      },
    ],
  },
  {
    name: "Track/Audit",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Track AWB",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Track AWB", href: "/track/track-awb", current: false },
        ],
      },
      {
        name: "Messaging",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Monitor Messaging",
            href: "/track/messaging/monitor-messaging",
            current: false,
          },
          { name: "ASM/SSM Monitoring", href: "#", current: false },
        ],
      },
      {
        name: "Audit Trail",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "AWB Audit Log",
            href: "/track/audit-trail/awb-audit-log",
            current: false,
          },
          {
            name: "Billing Audit Trail",
            href: "/track/audit-trail/billing-audit-trail",
            current: false,
          },
          { name: "ULD Audit Trail", href: "#", current: false },
          { name: "Page Lock History", href: "#", current: false },
          { name: "Report Log", href: "#", current: false },
          {
            name: "User Login Log",
            href: "/track/audit-trail/user-login-log",
            current: false,
          },
          {
            name: "Master Audit Log",
            href: "/track/audit-trail/master-audit-log",
            current: false,
          },
          { name: "Master Upload Log", href: "#", current: false },
          {
            name: "Flight Audit Log",
            href: "/track/audit-trail/flight-audit-log",
            current: false,
          },
        ],
      },
    ],
  },
  {
    name: "Accounting",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "AWB Rate Audit",
        href: "/accounting/awb-rate-audit",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Agent",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Invoice", href: "/accounting/agent/invoice-listing", current: false },
          {
            name: "Collection",
            href: "#",
            current: false,
            children: [
              { name: "Collection", href: "/accounting/agent/collection/invoice-collection", current: false },
              { name: "List Card Transactions", href: "#", current: false },
              { name: "Upload AWB collection File", href: "#", current: false },
              {
                name: "Upload Invoice Level Collection",
                href: "#",
                current: false,
              },
            ],
          },
          {
            name: "Credit Note",
            href: "#",
            current: false,
            children: [
              { name: "List", href: "/accounting/agent/credit-note/list", current: false },
              { name: "New", href: "/accounting/agent/credit-note/new", current: false },
            ],
          },
          {
            name: "Debit Note",
            href: "#",
            current: false,
            children: [{ name: "List", href: "/accounting/agent/debit-note/list", current: false }],
          },
        ],
      },
      {
        name: "Interline",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "Receivables",
            href: "#",
            current: false,
            children: [
              { name: "Receivables", href: "#", current: false },
              { name: "Create Billing Memo", href: "#", current: false },
              { name: "Create Credit Memo", href: "#", current: false },
            ],
          },
          { name: "Invoice", href: "#", current: false },
          { name: "Payables", href: "#", current: false },
          { name: "File Upload Manager", href: "#", current: false },
          {
            name: "Adhoc SPA",
            href: "#",
            current: false,
            children: [
              { name: "Adhoc SPA New", href: "#", current: false },
              { name: "Adhoc SPA List", href: "#", current: false },
            ],
          },
        ],
      },
      {
        name: "Vendor",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Cost Audit Log", href: "#", current: false },
          { name: "AWB Cost & Revenue", href: "#", current: false },
        ],
      },
      {
        name: "Claims",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "New", href: "#", current: false },
          { name: "List", href: "#", current: false },
          { name: "Track", href: "#", current: false },
        ],
      },
      {
        name: "ERP Interface",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [{ name: "World ACD Interface", href: "#", current: false }],
      },
      {
        name: "Agent Credit Report",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
    ],
  },
  {
    name: "Reports",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Standard",
        href: "#",
        icon: CubeIcon,
        current: false,
        children: [
          { name: "Daily Sales", href: "#", current: false },
          { name: "Agent Perfomance", href: "/reports/standard/agent-performance", current: false },
          { name: "Daily Collections", href: "#", current: false },
          { name: "AWB Detail Report", href: "#", current: false },
          { name: "Delieveries", href: "#", current: false },
          { name: "AWB Movement", href: "#", current: false },
          { name: "StationWise Tonnage", href: "#", current: false },
          { name: "Daily Shift", href: "#", current: false },
          { name: "Flight Perfomance", href: "#", current: false },
          { name: "Offload", href: "#", current: false },
          { name: "Cargo Revenue Tracking", href: "#", current: false },
          { name: "A/R Deposit", href: "#", current: false },
          { name: "Statement of Account", href: "#", current: false },
          { name: "A/R Aging", href: "#", current: false },
          { name: "Proration Report", href: "#", current: false },
          { name: "Screening", href: "#", current: false },
          { name: "GHA Tonnage", href: "#", current: false },
          { name: "AWB Statement", href: "#", current: false },
          { name: "OCDC Report", href: "#", current: false },
          { name: "Square Root Proration", href: "#", current: false },
          { name: "WH App Traffic Report", href: "#", current: false },
          { name: "Tonnage Report", href: "#", current: false },
          { name: "FFM Report", href: "#", current: false },
          { name: "Delivery Report", href: "#", current: false },
        ],
      },
      {
        name: "Dashboard",
        href: "#",
        icon: CubeIcon,
        current: false,
      },
    ],
  },
  {
    name: "Maintenance",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Maintain AWB",
        href: "/maintenance",
        icon: CubeIcon,
        current: false,
      },
    ],
  },
  {
    name: "Configuration",
    href: "?settings=true",
    icon: CubeIcon,
    current: false,
  },
  {
    name: "K360",
    href: "#",
    icon: GlobeAmericasIcon,
    current: false,
    children: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: CubeIcon,
        current: false,
        children: [
          {
            name: "A2A", 
            href:"/dashboard/a2a",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "D2D", 
            href:"/dashboard/d2d",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "Warehouse Performance Matrix", 
            href:"/dashboard/warehouse-performance-matrix",
            icon: CubeIcon,
            current: false,
          },
    
        ]
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
              { name: "D2D", href: "/orders/view/d2d", current: false },
              { name: "A2A", href: "/orders/view/a2a", current: false },
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
                href: "/orders/cargo-acceptance-slip",
                current: false,
              },
            ],
          },
          { name: "Download POD", href: "#", current: false },
          { name: "AWB Epouch", href: "/orders/awb-epouch", current: false },
          {
            name: "Maintain AWB",
            href: "/orders/maintain-awb",
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
            href: "/scheduling/active-flights",
            current: false,
          },
          {
            name: "Flight Master",
            href: "/scheduling/flight-master",
            current: false,
          },
          {
            name: "New Flight",
            href: "/scheduling/new-flight",
            current: false,
          },
          {
            name: "Cargo Loadplan",
            href: "/scheduling/cargo-loadplan",
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
                href: "/operation/mother-bag",
                current: false,
              },
              {
                name: "Truck Export",
                href: "/operation/truck-export",
                current: false,
              },
              {
                name: "Track Mother Bag List",
                href: "/operation/track-mother-bag-list",
                current: false,
              },
            ],
          },
          {
            name: "Stock Alocation",
            href: "/operation/stock-allocation",
            current: false,
          },
          {
            name: "Flight Planning",
            href: "/operation/flight-planning",
            current: false,
          },
          {
            name: "Export Manifest",
            href: "#",
            current: false,
            children: [
              {
                name: "Export Manifest",
                href: "/operation/export-manifest/export-manifest",
                current: false,
              },
              {
                name: "Flight Epouch",
                href: "/operation/export-manifest/flight-epouch",
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
                href: "/operation/arrival-manifest/arrival-manifest",
                current: false,
              },
              {
                name: "Break ULD",
                href: "/operation/arrival-manifest/break-uld",
                current: false,
              },
            ],
          },
          {
            name: "Delivery Cargo",
            href: "/operation/delivery-cargo",
            current: false,
          },
          {
            name: "Transfer",
            href: "#",
            current: false,
            children: [
              {
                name: "CTM IN",
                href: "/operation/transfer/ctm-in",
                current: false,
              },
              {
                name: "CTM OUT",
                href: "/operation/transfer/ctm-out",
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
                href: "/accounting/agent/invoice",
                current: false,
              },
              {
                name: "Invoice Collection",
                href: "/accounting/agent/invoice-collection",
                current: false,
              },
              {
                name: "Debit Credit Memo",
                href: "/accounting/agent/debit-credit-memo",
                current: false,
              },
              {
                name: "CCA",
                href: "/accounting/agent/charge-correction",
                current: false,
              },
            ],
          },
          {
            name: "Charter",
            href: "/accounting/charter",
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
            href: "/track/master-audit-log",
            current: false,
          },
          {
            name: "Ratefilling Audit Log",
            href: "/track/ratefilling-audit-log",
            current: false,
          },
          {
            name: "Accounting Audit log",
            href: "/track/accounting-audit-log",
            current: false,
          },
          { name: "Master AWB", href: "/track/master-awb", current: false },
          {
            name: "AWB Audit Log",
            href: "/track/awb-audit-log",
            current: false,
          },
          {
            name: "Pomail Audit Log",
            href: "/track/pomail-audit-log",
            current: false,
          },
          {
            name: "Spicewall",
            href: "/track/spicewall",
            current: false,
          },
          {
            name: "Master Capacity Log",
            href: "/track/master-capacity-log",
            current: false,
          },
          {
            name: "Messaging",
            href: "#",
            current: false,
            children: [
              {
                name: "MVT Message",
                href: "/track/messaging-mvt",
                current: false,
              },
              {
                name: "Messaging Log",
                href: "/track/messaging-log",
                current: false,
              },
            ],
          },
          {
            name: "POD Upload Log",
            href: "/track/pod-upload-log",
            current: false,
          },
          {
            name: "Email Audit Log",
            href: "/track/email-audit-log",
            current: false,
          },
          {
            name: "User Audit Log",
            href: "/track/user-audit-log",
            current: false,
          },
          {
            name: "Login Log",
            href: "/track/login-log",
            current: false,
          },
          {
            name: "Master Upload Log",
            href: "#",
            children: [
              {
                name: "Pincode",
                href: "/track/master-pin-code",
                current: false,
              },
              {
                name: "Customer/Employee",
                href: "/track/customer-log",
                current: false,
              },
              {
                name: "Rateline",
                href: "/track/rateline-log",
                current: false,
              },
              {
                name: "OCDC",
                href: "/track/ocdc-log",
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
                href: "/track/flight-audit-log",
                current: false,
              },
              {
                name: "Active Flight",
                href: "/track/flight-active-audit-log",
                current: false,
              },
            ],
          },
          {
            name: "Ekart Audit Log",
            href: "/track/ekart-audit-log",
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
                href: "/reports/finance/cancel-invoice",
                current: false,
              },
              {
                name: "Consignee Reconciliation Report",
                href: "/reports/finance/consignee-reconciliation",
                current: false,
              },
              {
                name: "DO Invoice Report",
                href: "/reports/finance/do-invoice",
                current: false,
              },
              {
                name: "PO Mail Summary",
                href: "/reports/finance/po-mail-summary",
                current: false,
              },
              {
                name: "Un-Invoiced Agent AWB's Report",
                href: "/reports/finance/uninvoiced-agent-awb",
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
                href: "/reports/operation/epouch-report",
                current: false,
              },
              {
                name: "Flight Performance Report",
                href: "/reports/operation/flight-performance-report",
                current: false,
              },
              {
                name: "Offload",
                href: "/reports/operation/offload",
                current: false,
              },
              {
                name: "Tonnage",
                href: "/reports/operation/tonnage",
                current: false,
              },
              {
                name: "Unbilled AWB Report",
                href: "/reports/operation/unbilled-awb-report",
                current: false,
              },
              {
                name: "DO Report",
                href: "/reports/operation/do-report",
                current: false,
              },
              {
                name: "MAWB Report",
                href: "/reports/operation/mawb-report",
                current: false,
              },
            ],
          },
          {
            name: "User Performance",
            href: "/reports/user-performance",
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
            href: "/manual/upload-manual",
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
            href: "/rewards/appreciation",
            current: false,
          },
          {
            name: "Appreciation Report",
            href: "/rewards/appreciation-report",
            current: false,
          },
        ],
      },
    ],
  },
];
