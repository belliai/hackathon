import { PrinterIcon } from "@heroicons/react/24/outline"
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

const PARTNER_CODE_LIST = [
  {
    id: 1,
    label: "SG",
  },
  {
    id: 2,
    label: "ID",
  },
]

const REPORT_TYPE_LIST = [
  {
    id: 1,
    label: "Summary Report",
  },
  {
    id: 2,
    label: "Detail Report",
  },
]

export default function FilterSection() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Flight Performance Report</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-button-secondary text-white hover:bg-button-secondary/80">
            <span className="mr-1 h-4 w-4">
              <PrinterIcon />
            </span>
            Print
          </Button>
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-base font-semibold text-white">Filter</div>
        <div className="flex gap-4">
          <div className="w-1/6">
            <Input
              className="border-zinc-500"
              placeholder="Agent Code"
              rightIcon={
                <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
              }
            />
          </div>

          <div className="w-1/6">
            <Input
              className="border-zinc-500"
              placeholder="From Station"
              rightIcon={
                <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
              }
            />
          </div>

          <div className="w-1/6">
            <Input
              className="border-zinc-500"
              placeholder="To Station"
              rightIcon={
                <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
              }
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex w-1/6 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
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
                className={`flex w-1/6 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
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

          <div className="w-1/6">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {REPORT_TYPE_LIST.map((reportType) => (
                    <SelectItem key={reportType.id} value={reportType.label}>
                      {reportType.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/6">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Partner Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PARTNER_CODE_LIST.map((partnerCode) => (
                    <SelectItem key={partnerCode.id} value={partnerCode.label}>
                      {partnerCode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/6">
            <Input className="border-zinc-500" placeholder="Flight No" />
          </div>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
