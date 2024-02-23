import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  Square2StackIcon,
  ServerStackIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import {
  AvatarIcon,
  CubeIcon,
  LinkBreak2Icon,
  TargetIcon,
  FileIcon,
} from "@radix-ui/react-icons";

const navigation = [
  { name: "Dashboard", href: "#", icon: Square2StackIcon, current: true },
  {
    name: "Orders",
    href: "#",
    icon: CubeIcon,
    current: false,
    children: [
      { name: "New Orders", href: "#", current: false },
      {
        name: "View Orders",
        icon: CubeIcon,
        href: "#",
        current: false,
        children: [
          { name: "D2D", href: "#", current: false },
          { name: "A2A", href: "#", current: false },
        ],
      },
      {
        name: "Order Docs",
        href: "#",
        icon: ServerStackIcon,
        current: false,
        children: [
          { name: "Upload Cargo Acceptance Slip", href: "#", current: false },
        ],
      },
      { name: "Download POD", href: "#", current: false },
      { name: "AWB Epouch", href: "#", current: false },
      { name: "Maintain AWB", href: "#", current: false },
    ],
  },
  { name: "Scheduling", href: "#", icon: CalendarIcon, current: false },
  { name: "Operation", href: "#", icon: SquaresPlusIcon, current: false },
  {
    name: "Accounting",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Track/Audit", href: "#", icon: TargetIcon, current: false },
  { name: "Organize", href: "#", icon: ChartPieIcon, current: false },
  { name: "Reports", href: "#", icon: FileIcon, current: false },
  { name: "Manual", href: "#", icon: LinkBreak2Icon, current: false },
  {
    name: "Rewards and Recognition",
    href: "#",
    icon: ChartPieIcon,
    current: false,
  },
];

export default function SideBar() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-4 ring-1 ring-white/10">
      <div className="flex h-16 shrink-0 justify-between items-center">
        <span className="text-2xl font-bold font-mono text-white">
          Kargo360
        </span>
        <Link href="#" className="flex items-center gap-x-2">
          <AvatarIcon className="h-8 w-8" />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      item.current
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
