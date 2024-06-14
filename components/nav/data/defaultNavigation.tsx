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
          { name: "List", href: "/booking/cargo/list", current: false },
          // { name: "New", href: "#", current: false },
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
          {
            name: "Cargo Screening",
            href: "/operation/accept/cargo-screening",
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
          {
            name: "Export Manifest",
            href: "/operation/export/export-manifest",
            current: false,
          },
          {
            name: "ePouch Flight",
            href: "/operation/export/epouch-flight",
            current: false,
          },
          {
            name: "Export Summary",
            href: "/operation/export/export-summary",
            current: false,
          },
          {
            name: "Export Inventory",
            href: "/operation/export/export-inventory",
            current: false,
          },
          {
            name: "NOTOC Details",
            href: "/operation/export/notoc-detail",
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
          { name: "Arrive", href: "/operation/import/arrive", current: false },
          {
            name: "Break ULD",
            href: "/operation/import/break-uld",
            current: false,
          },
          {
            name: "Import Summary",
            href: "/operation/import/import-summary",
            current: false,
          },
          {
            name: "Import Inventory",
            href: "/operation/import/import-inventory",
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
            href: "/operation/delivery/delivery-cargo",
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
          { name: "List", href: "/operation/transfer/list", current: false },
          {
            name: "CTM Out",
            href: "/operation/transfer/ctm-out",
            current: false,
          },
          {
            name: "CTM In",
            href: "/operation/transfer/ctm-in",
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
          { name: "List", href: "/operation/discrepancy/list", current: false },
          { name: "New", href: "/operation/discrepancy/new", current: false },
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
          {
            name: "ASM/SSM Monitoring",
            href: "/track/messaging/asm-monitoring",
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
            href: "/track/audit-trail/awb-audit-log",
            current: false,
          },
          {
            name: "Billing Audit Trail",
            href: "/track/audit-trail/billing-audit-trail",
            current: false,
          },
          {
            name: "ULD Audit Trail",
            href: "/track/audit-trail/uld-tracking",
            current: false,
          },
          {
            name: "Page Lock History",
            href: "/track/audit-trail/page-lock-history",
            current: false,
          },
          {
            name: "Report Log",
            href: "/track/audit-trail/report-log",
            current: false,
          },
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
          {
            name: "Master Upload Log",
            href: "/track/audit-trail/master-upload-log",
            current: false,
          },
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
          {
            name: "Invoice",
            href: "/accounting/agent/invoice-listing",
            current: false,
          },
          {
            name: "Collection",
            href: "#",
            current: false,
            children: [
              {
                name: "Collection",
                href: "/accounting/agent/collection/invoice-collection",
                current: false,
              },
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
              {
                name: "List",
                href: "/accounting/agent/credit-note/list",
                current: false,
              },
              {
                name: "New",
                href: "/accounting/agent/credit-note/new",
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
                href: "/accounting/agent/debit-note/list",
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
          {
            name: "Daily Sales",
            href: "/reports/standard/daily-sales",
            current: false,
          },
          {
            name: "Agent Perfomance",
            href: "/reports/standard/agent-performance",
            current: false,
          },
          {
            name: "Daily Collections",
            href: "/reports/standard/daily-collections",
            current: false,
          },
          { name: "AWB Detail Report", href: "#", current: false },
          { name: "Deliveries", href: "#", current: false },
          {
            name: "AWB Movement",
            href: "/reports/standard/awb-movement",
            current: false,
          },
          {
            name: "StationWise Tonnage",
            href: "/reports/standard/stationwise-tonnage",
            current: false,
          },
          {
            name: "Daily Shift",
            href: "/reports/standard/daily-shift",
            current: false,
          },
          { name: "Flight Perfomance", href: "#", current: false },
          { name: "Offload", href: "#", current: false },
          { name: "Cargo Revenue Tracking", href: "#", current: false },
          { name: "A/R Deposit", href: "#", current: false },
          { name: "Statement of Account", href: "#", current: false },
          { name: "A/R Aging", href: "#", current: false },
          { name: "Proration Report", href: "/reports/standard/proration-report", current: false },
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
];
