"use client";

import {
  CalendarIcon,
  GlobeAmericasIcon,
  PresentationChartLineIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { CubeIcon, LinkBreak2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import NewOrder from "@/components/new-order";
import {
  Boxes,
  Currency,
  PlusSquare,
  ReceiptText,
  TargetIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import UserDropdown from "./UserDropdown";
import SidebarItem from "./SidebarItem";
import NewOrderModal from "../dashboard/new-order-modal";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: CubeIcon,
    current: false,
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
        submenus: [
          { name: "D2D", href: "/orders/view/d2d", current: false },
          { name: "A2A", href: "/orders/view/a2a", current: false },
        ],
      },
      {
        name: "Order Docs",
        href: "#",
        icon: ServerStackIcon,
        current: false,
        submenus: [
          {
            name: "Upload Cargo Acceptance Slip",
            href: "/orders/cargo-acceptance-slip",
            current: false,
          },
        ],
      },
      { name: "Download POD", href: "#", current: false },
      { name: "AWB Epouch", href: "#", current: false },
      { name: "Maintain AWB", href: "#", current: false },
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
      { name: "New Flight", href: "/scheduling/new-flight", current: false },
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
      { name: "Mother Bag", href: "/operation/mother-bag", current: false },
      { name: "Truck Export", href: "/operation/truck-export", current: false },
      {
        name: "Track Mother Bag List",
        href: "/operation/track-mother-bag-list",
        current: false,
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
        submenus: [
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
        submenus: [
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
        submenus: [
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
        submenus: [
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
      { name: "AWB Audit Log", href: "/track/awb-audit-log", current: false },
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
        submenus: [
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
        submenus: [
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
        submenus: [
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
        submenus: [
          {
            name: "Finance",
            href: "#",
            current: false,
            submenus: [
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
            submenus: [
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
            submenus: [
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
                name: "ULC",
                href: "/organize/masters/uld/ulc",
              },
            ],
          },
        ],
      },
      {
        name: "User",
        href: "#",
        current: false,
        submenus: [
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
        submenus: [
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
        submenus: [
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
  { name: "Manual", href: "#", icon: LinkBreak2Icon, current: false },
];

export default function SideBar() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-4 ring-1 ring-white/10 no-scrollbar">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <UserDropdown />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <ul role="list" className="-mx-2">
            <li>
              <NewOrderModal>
                <Button
                  variant="ghost"
                  onClick={() => setDialogOpen(true)}
                  className="px-2 w-full py-5 justify-start mb-5 text-lg text-zinc-400"
                >
                  <PlusSquare className="mr-2.5 h-6 w-6" />
                  New Order
                </Button>
              </NewOrderModal>
            </li>
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <SidebarItem key={item.name} item={item} />
              ))}
            </ul>
          </ul>
        </ul>
      </nav>
    </div>
  );
}
