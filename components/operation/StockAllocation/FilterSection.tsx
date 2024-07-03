import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import {
  DownloadIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from "@radix-ui/react-icons"

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

const HOLDER_TYPE_LIST = [
  {
    id: 1,
    label: "HO",
  },
  {
    id: 2,
    label: "Agent",
  },
  {
    id: 3,
    label: "Subagent",
  },
]

const CNOTE_TYPE_LIST = [
  {
    id: 1,
    label: "AWB",
  },
  {
    id: 2,
    label: "AXB",
  },
  {
    id: 3,
    label: "MWB",
  },
]

const AWB_TYPE_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Physical",
  },
  {
    id: 3,
    label: "Electronic",
  },
  {
    id: 4,
    label: "Neutral",
  },
]

const STOCK_TYPE_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Domestic",
  },
  {
    id: 3,
    label: "International",
  },
]

const STATUS_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Available",
  },
  {
    id: 3,
    label: "Blacklist",
  },
  {
    id: 4,
    label: "Return",
  },
]

const JOB_STATUS_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Success",
  },
  {
    id: 3,
    label: "Pending",
  },
  {
    id: 4,
    label: "Failed",
  },
]

export default function FilterSection() {
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
      <div className="text-base font-semibold text-white">Filter</div>
      <div className="flex gap-4">
        <div className="w-3/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Select Stock Holder Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select Stock Holder Type</SelectItem>
                {HOLDER_TYPE_LIST.map((holderType) => (
                  <SelectItem key={holderType.id} value={holderType.label}>
                    {holderType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-3/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Select Stock Holder Code" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select Stock Holder Code</SelectItem>
                {HOLDER_TYPE_LIST.map((holderType) => (
                  <SelectItem key={holderType.id} value={holderType.label}>
                    {holderType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-2/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Select Cnote Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select Cnote Type</SelectItem>
                {CNOTE_TYPE_LIST.map((cnoteType) => (
                  <SelectItem key={cnoteType.id} value={cnoteType.label}>
                    {cnoteType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`flex w-1/4 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
            >
              <span>From Date</span>
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`flex w-1/4 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
            >
              <span>To Date</span>
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
      </div>

      <div className="flex gap-4">
        <div className="w-2/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Select AWB Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select AWB Type</SelectItem>
                {AWB_TYPE_LIST.map((awbType) => (
                  <SelectItem key={awbType.id} value={awbType.label}>
                    {awbType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-2/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Select Stock Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select Stock Type</SelectItem>
                {STOCK_TYPE_LIST.map((stockType) => (
                  <SelectItem key={stockType.id} value={stockType.label}>
                    {stockType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-2/12">
          <Input
            className="border-zinc-500"
            placeholder="AWB Number"
            rightIcon={
              <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
            }
          />
        </div>

        <div className="w-2/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Show All" />
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

        <div className="w-2/12">
          <Select>
            <SelectTrigger className="w-full border-zinc-500">
              <SelectValue placeholder="Select Job Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {JOB_STATUS_LIST.map((jobStatus) => (
                  <SelectItem key={jobStatus.id} value={jobStatus.label}>
                    {jobStatus.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
          <span className="mr-1 h-4 w-4">
            <MagnifyingGlassIcon />
          </span>
          Search
        </Button>
      </div>
    </div>
  )
}
