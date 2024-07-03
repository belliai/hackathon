import {
  BanknotesIcon,
  BoltIcon,
  CalendarIcon,
  ChartBarIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  HandThumbUpIcon,
  PresentationChartLineIcon,
  ReceiptPercentIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline"
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import { CubeIcon, UploadIcon } from "@radix-ui/react-icons"
import { Boxes, ReceiptText, TargetIcon } from "lucide-react"

import { TSidebarItem } from "@/components/nav/SidebarItem"

export const skNavigation: TSidebarItem[] = [
  {
    name: "SK",
    href: "/sk",
    icon: CubeIcon,
    current: false,
    children: [
      {
        name: "Home",
        href: "/sk/dashboard",
        icon: CubeIcon,
        current: false,
      },
      {
        name: "Sales",
        href: "#",
        icon: BanknotesIcon,
        current: false,
        children: [
          {
            name: "Stock Allocation",
            href: "/sk/sales/stock-allocation",
            icon: ChartBarIcon,
            current: false,
          },
          {
            name: "Capacity Allocation",
            href: "#",
            icon: CircleStackIcon,
            current: false,
            children: [
              {
                name: "List",
                href: "/sk/sales/capacity-allocation/capacity-allocation-list",
                current: false,
              },
              {
                name: "New",
                href: "/sk/sales/capacity-allocation/capacity-allocation-new",
                current: false,
              },
              {
                name: "Capacity Usage",
                href: "/sk/sales/capacity-allocation/capacity-allocation-usage",
                current: false,
              },
            ],
          },
          {
            name: "Rate Line",
            href: "#",
            icon: CurrencyDollarIcon,
            current: false,
            children: [
              {
                name: "List",
                href: "/sk/sales/rate-line-list",
                current: false,
              },
              { name: "New", href: "/sk/sales/rate-line-new", current: false },
            ],
          },
          {
            name: "Other Charges",
            href: "#",
            icon: ReceiptPercentIcon,
            current: false,
            children: [
              { name: "List", href: "#", current: false },
              { name: "New", href: "#", current: false },
            ],
          },
          {
            name: "Spot rate",
            href: "#",
            icon: BoltIcon,
            current: false,
            children: [
              {
                name: "List",
                href: "/sk/sales/spot-rate/list",
                current: false,
              },
              { name: "New", href: "#", current: false },
              {
                name: "Approval",
                href: "/sk/sales/spot-rate/approval",
                current: false,
              },
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
            href: "/sk/planning/flightControl",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "Manage Capacity",
            href: "/sk/planning/manageCapacity",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "Flight Schedule",
            href: "#",
            icon: CubeIcon,
            current: false,
            children: [
              {
                name: "Fight Master",
                href: "/sk/planning/flightSchedule/flightMaster",
                current: false,
              },
              {
                name: "Active Flights",
                href: "/sk/planning/flightSchedule/activeFlights",
                current: false,
              },
              {
                name: "New Flight",
                href: "/sk/planning/flightSchedule/newFlight",
                current: false,
              },
              {
                name: "Route Control",
                href: "#",
                current: false,
                children: [
                  {
                    name: "List",
                    href: "/sk/planning/flightSchedule/routeControl/List",
                    current: false,
                  },
                  {
                    name: "New",
                    href: "/sk/planning/flightSchedule/routeControl/New",
                    current: false,
                  },
                ],
              },
            ],
          },
          {
            name: "Flight Load Plan",
            href: "/sk/planning/flightLoadPlan",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "List Flight Plan",
            href: "/sk/planning/listFlightPlan",
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
              { name: "List", href: "/sk/booking/cargo/list", current: false },
              // { name: "New", href: "#", current: false },
              {
                name: "Templates",
                href: "/sk/booking/cargo/templates",
                current: false,
              },
              {
                name: "Dangerous Goods",
                href: "#",
                current: false,
                children: [
                  {
                    name: "DGR Approval",
                    href: "/sk/booking/cargo/dangerous-goods/dgr-approval",
                    current: false,
                  },
                  {
                    name: "MSDS",
                    href: "/sk/booking/cargo/dangerous-goods/msds",
                    current: false,
                    // children: [
                    //   { name: "List", href: "#", current: false },
                    //   { name: "New", href: "#", current: false },
                    // ],
                  },
                ],
              },
            ],
          },
          {
            name: "ePouch",
            href: "/sk/booking/epouch",
            icon: CubeIcon,
            current: false,
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
                href: "/sk/operation/accept/cargo-acceptance",
                current: false,
              },
              {
                name: "Cargo Screening",
                href: "/sk/operation/accept/cargo-screening",
                current: false,
              },
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
                href: "/sk/operation/plan-flight/flight-planning",
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
              {
                name: "Export Manifest",
                href: "/sk/operation/export/export-manifest",
                current: false,
              },
              {
                name: "ePouch Flight",
                href: "/sk/operation/export/epouch-flight",
                current: false,
              },
              {
                name: "Export Summary",
                href: "/sk/operation/export/export-summary",
                current: false,
              },
              {
                name: "Export Inventory",
                href: "/sk/operation/export/export-inventory",
                current: false,
              },
              {
                name: "NOTOC Details",
                href: "/sk/operation/export/notoc-detail",
                current: false,
              },
            ],
          },
          {
            name: "Import",
            href: "#",
            icon: CubeIcon,
            current: false,
            children: [
              {
                name: "Arrive",
                href: "/sk/operation/import/arrive",
                current: false,
              },
              {
                name: "Break ULD",
                href: "/sk/operation/import/break-uld",
                current: false,
              },
              {
                name: "Import Summary",
                href: "/sk/operation/import/import-summary",
                current: false,
              },
              {
                name: "Import Inventory",
                href: "/sk/operation/import/import-inventory",
                current: false,
              },
            ],
          },
          {
            name: "Delivery",
            href: "#",
            icon: CubeIcon,
            current: false,
            children: [
              {
                name: "Deliver Cargo",
                href: "/sk/operation/delivery/delivery-cargo",
                current: false,
              },
            ],
          },
          {
            name: "Transfer",
            href: "#",
            icon: CubeIcon,
            current: false,
            children: [
              {
                name: "List",
                href: "/sk/operation/transfer/list",
                current: false,
              },
              {
                name: "CTM Out",
                href: "/sk/operation/transfer/ctm-out",
                current: false,
              },
              {
                name: "CTM In",
                href: "/sk/operation/transfer/ctm-in",
                current: false,
              },
            ],
          },
          {
            name: "Discrepancy",
            href: "#",
            icon: CubeIcon,
            current: false,
            children: [
              {
                name: "List",
                href: "/sk/operation/discrepancy/list",
                current: false,
              },
              {
                name: "New",
                href: "/sk/operation/discrepancy/new",
                current: false,
              },
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
            href: "/sk/uld/listULD",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "New ULD",
            href: "/sk/uld/newULD",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "List UCR",
            href: "/sk/uld/listUCR",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "New UCR",
            href: "/sk/uld/newUCR",
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
              {
                name: "ULD Stock Management",
                href: "/sk/uld/uldStockManagement",
                current: false,
              },
              {
                name: "Station ULD Stock",
                href: "/sk/uld/uldStationStock",
                current: false,
              },
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
              {
                name: "Track AWB",
                href: "/sk/track/track-awb",
                current: false,
              },
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
                href: "/sk/track/messaging/monitor-messaging",
                current: false,
              },
              {
                name: "ASM/SSM Monitoring",
                href: "/sk/track/messaging/asm-monitoring",
                current: false,
              },
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
                href: "/sk/track/audit-trail/awb-audit-log",
                current: false,
              },
              {
                name: "Billing Audit Trail",
                href: "/sk/track/audit-trail/billing-audit-trail",
                current: false,
              },
              {
                name: "ULD Audit Trail",
                href: "/sk/track/audit-trail/uld-tracking",
                current: false,
              },
              {
                name: "Page Lock History",
                href: "/sk/track/audit-trail/page-lock-history",
                current: false,
              },
              {
                name: "Report Log",
                href: "/sk/track/audit-trail/report-log",
                current: false,
              },
              {
                name: "User Login Log",
                href: "/sk/track/audit-trail/user-login-log",
                current: false,
              },
              {
                name: "Master Audit Log",
                href: "/sk/track/audit-trail/master-audit-log",
                current: false,
              },
              {
                name: "Master Upload Log",
                href: "/sk/track/audit-trail/master-upload-log",
                current: false,
              },
              {
                name: "Flight Audit Log",
                href: "/sk/track/audit-trail/flight-audit-log",
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
            href: "/sk/accounting/awb-rate-audit",
            icon: CubeIcon,
            current: false,
          },
          {
            name: "Agent",
            href: "#",
            icon: CubeIcon,
            current: false,
            children: [
              {
                name: "Invoice",
                href: "/sk/accounting/agent/invoice-listing",
                current: false,
              },
              {
                name: "Collection",
                href: "#",
                current: false,
                children: [
                  {
                    name: "Collection",
                    href: "/sk/accounting/agent/collection/invoice-collection",
                    current: false,
                  },
                  { name: "List Card Transactions", href: "#", current: false },
                  {
                    name: "Upload AWB collection File",
                    href: "#",
                    current: false,
                  },
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
                  {
                    name: "List",
                    href: "/sk/accounting/agent/credit-note/list",
                    current: false,
                  },
                  {
                    name: "New",
                    href: "/sk/accounting/agent/credit-note/new",
                    current: false,
                  },
                ],
              },
              {
                name: "Debit Note",
                href: "#",
                current: false,
                children: [
                  {
                    name: "List",
                    href: "/sk/accounting/agent/debit-note/list",
                    current: false,
                  },
                ],
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
            children: [
              { name: "World ACD Interface", href: "#", current: false },
            ],
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
              {
                name: "Daily Sales",
                href: "/sk/reports/standard/daily-sales",
                current: false,
              },
              {
                name: "Agent Perfomance",
                href: "/sk/reports/standard/agent-performance",
                current: false,
              },
              {
                name: "Daily Collections",
                href: "/sk/reports/standard/daily-collections",
                current: false,
              },
              {
                name: "AWB Detail Report",
                href: "/sk/reports/standard/awb-detail-report",
                current: false,
              },
              {
                name: "Deliveries",
                href: "/sk/reports/standard/deliveries",
                current: false,
              },
              {
                name: "AWB Movement",
                href: "/sk/reports/standard/awb-movement",
                current: false,
              },
              {
                name: "StationWise Tonnage",
                href: "/sk/reports/standard/stationwise-tonnage",
                current: false,
              },
              {
                name: "Daily Shift",
                href: "/sk/reports/standard/daily-shift",
                current: false,
              },
              {
                name: "Flight Perfomance",
                href: "/sk/reports/standard/flight-performance",
                current: false,
              },
              {
                name: "Offload",
                href: "/sk/reports/standard/offload",
                current: false,
              },
              {
                name: "Cargo Revenue Tracking",
                href: "/sk/reports/standard/cargo-revenue-tracking",
                current: false,
              },
              {
                name: "A/R Deposit",
                href: "/sk/reports/standard/ar-deposit",
                current: false,
              },
              {
                name: "Statement of Account",
                href: "/sk/reports/standard/statement-of-account",
                current: false,
              },
              {
                name: "A/R Aging",
                href: "/sk/reports/standard/ar-aging",
                current: false,
              },
              {
                name: "Proration Report",
                href: "/sk/reports/standard/proration-report",
                current: false,
              },
              {
                name: "Screening",
                href: "/sk/reports/standard/screening",
                current: false,
              },
              {
                name: "GHA Tonnage",
                href: "/sk/reports/standard/gha-tonnage",
                current: false,
              },
              {
                name: "AWB Statement",
                href: "/sk/reports/standard/awb-statement",
                current: false,
              },
              {
                name: "OCDC Report",
                href: "/sk/reports/standard/ocdc-report",
                current: false,
              },
              {
                name: "Square Root Proration",
                href: "/sk/reports/standard/square-root-proration",
                current: false,
              },
              {
                name: "WH App Traffic Report",
                href: "/sk/reports/standard/wh-app-traffic-report",
                current: false,
              },
              {
                name: "Tonnage Report",
                href: "/sk/reports/standard/tonnage-report",
                current: false,
              },
              {
                name: "FFM Report",
                href: "/sk/reports/standard/ffm-report",
                current: false,
              },
              {
                name: "Delivery Report",
                href: "/sk/reports/standard/delivery-report",
                current: false,
              },
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
            href: "/sk/maintenance",
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
    ],
  },
]
