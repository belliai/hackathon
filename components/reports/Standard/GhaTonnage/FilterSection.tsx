import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import {
  DownloadIcon,
  ListBulletIcon,
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

const AIRPORT_LIST = [
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

const AIRLINE_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "2Y",
  },
  {
    id: 3,
    label: "3G",
  },
  {
    id: 4,
    label: "6P",
  },
  {
    id: 5,
    label: "7L",
  },
  {
    id: 6,
    label: "8D",
  },
  {
    id: 7,
    label: "8K",
  },
  {
    id: 8,
    label: "AF",
  },
  {
    id: 9,
    label: "AK",
  },
  {
    id: 10,
    label: "AY",
  },
  {
    id: 11,
    label: "BR",
  },
  {
    id: 12,
    label: "CA",
  },
]

export default function FilterSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">GHA Tonnage Report</h1>
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
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-base font-semibold text-white">Filter</div>
        <div className="flex w-full gap-4">
          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">From Date</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
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
          </div>

          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">To Date</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
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

          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">GHA Code</div>
            </div>
            <div className="flex gap-2">
              <Input
                className="border-zinc-700"
                rightIcon={<ListBulletIcon className="h-4 w-4 text-zinc-400" />}
              />
            </div>
          </div>

          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Transit</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Transit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key={airportList.id} value={airportList.label}>
                      {airportList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">From Station</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="From Station" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key={airportList.id} value={airportList.label}>
                      {airportList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">To Station</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="To Station" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key={airportList.id} value={airportList.label}>
                      {airportList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">From Airline</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="From Airline" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRLINE_LIST.map((airlineList) => (
                    <SelectItem key={airlineList.id} value={airlineList.label}>
                      {airlineList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-1/4 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">To Airline</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="To Airline" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRLINE_LIST.map((airlineList) => (
                    <SelectItem key={airlineList.id} value={airlineList.label}>
                      {airlineList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
