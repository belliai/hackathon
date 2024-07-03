import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STATUS_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Not Arrived",
  },
  {
    id: 3,
    label: "Partial",
  },
  {
    id: 4,
    label: "Completed",
  },
]

const CARGO_TYPE_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "DESTFRT",
  },
  {
    id: 3,
    label: "TRANSIT",
  },
  {
    id: 4,
    label: "TRANSFER",
  },
]

export default function ActionSection() {
  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-base font-semibold text-white">Action</div>
        <div className="flex w-2/3 gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Print AWB
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Close Flight
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Reopen Flight
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Discrepancy
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Notify
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Send FSU/ARR
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Send XFSU/ARR
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Mark Customs Release
          </Button>
        </div>
        <div className="flex w-2/3 gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Print Manifest
          </Button>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            ePouch
          </Button>
        </div>
      </div>
    </div>
  )
}
