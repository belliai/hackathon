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
import { columns } from "@/components/operation/Transfer/CtmIn/columns"
import FilterSection from "@/components/operation/Transfer/CtmIn/FilterSection"

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

export default async function FlightEpouch() {
  return (
    <div className="flex flex-col gap-5">
      <FilterSection />

      <div className="flex flex-col gap-5 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="flex gap-4">
          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="AWB No" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex w-2/12 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
              >
                <span>Flight Date</span>
                <CalendarDaysIcon className="h-4 w-4 text-zinc-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date()}
                // onSelect={() => {}}
                disabled={false}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Flight No" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key={statusList.id} value={statusList.label}>
                      {statusList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="">
          <DataTable columns={columns} data={[]} />
        </div>

        <div className="flex gap-4">
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
        </div>
      </div>
    </div>
  )
}
