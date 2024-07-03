import { PrinterIcon } from "@heroicons/react/24/outline"
import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import {
  DownloadIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
  UploadIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AIRPORT_TYPE_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "CGK",
  },
  {
    id: 3,
    label: "SIN",
  },
]

export default function FilterSection() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Agent Performance Report</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Download
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <UploadIcon />
            </span>
            Export
          </Button>
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <PrinterIcon />
            </span>
            Print
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-base font-semibold text-white">Filter</div>
        <div className="flex gap-4">
          <div className="w-2/6">
            <Input
              className="border-zinc-700"
              placeholder="Agent Code"
              rightIcon={
                <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
              }
            />
          </div>

          <div className="w-2/6">
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Delivery Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_TYPE_LIST.map((airportType) => (
                    <SelectItem key={airportType.id} value={airportType.label}>
                      {airportType.label}
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
                className={`flex w-1/6 justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
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
                className={`flex w-1/6 justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
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
          <div className="w-2/6">
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Controlling Location Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_TYPE_LIST.map((airportType) => (
                    <SelectItem key={airportType.id} value={airportType.label}>
                      {airportType.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <RadioGroup defaultValue="summary" className="flex flex-row">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="summary" id="r1" />
              <Label htmlFor="r1">Summary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="detail" id="r2" />
              <Label htmlFor="r2">Detail</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
          <span className="mr-1 h-4 w-4">
            <MagnifyingGlassIcon />
          </span>
          Search
        </Button>
      </div>
    </div>
  )
}
