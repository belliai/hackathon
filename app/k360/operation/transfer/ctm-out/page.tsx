import { CalendarDaysIcon } from "@heroicons/react/24/solid"

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
import { DataTable } from "@/components/dashboard/dashtable"
import { columns } from "@/components/operation/Transfer/CtmOut/columns"
import FilterSection from "@/components/operation/Transfer/CtmOut/FilterSection"

const STATUS_LIST = [
  {
    id: 1,
    label: "775",
  },
  {
    id: 2,
    label: "776",
  },
  {
    id: 3,
    label: "777",
  },
]

export default async function CtmOut() {
  return (
    <div className="flex flex-col gap-5">
      <FilterSection />

      <div className="flex flex-col gap-5 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="">
          <DataTable columns={columns} data={[]} />
        </div>

        <div className="flex gap-2">
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            Submit
          </Button>
          <Button className="bg-button-secondary text-white hover:bg-button-secondary/80">
            Execute
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Print
          </Button>
          <Button className="bg-destructive text-white hover:bg-destructive/80">
            Cancel
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Endorse
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            Print UCR
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            FSU/TFD
          </Button>
        </div>
      </div>
    </div>
  )
}
