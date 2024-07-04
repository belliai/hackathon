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

const COUNTRY_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "AE - Uniter Awab Emirates",
  },
  {
    id: 3,
    label: "AF - Afghanistan",
  },
  {
    id: 4,
    label: "AG - Antigua and Baruda",
  },
  {
    id: 5,
    label: "AI - Anguilla",
  },
]

const STATUS_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Complete",
  },
  {
    id: 3,
    label: "Incomplete",
  },
]

const REGION_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "East",
  },
  {
    id: 3,
    label: "LUZ",
  },
  {
    id: 4,
    label: "Middle East",
  },
  {
    id: 5,
    label: "North",
  },
  {
    id: 6,
    label: "North Asia",
  },
]

const FLIGHT_TYPE = [
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

const CARRIER_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "AK",
  },
  {
    id: 3,
    label: "I5",
  },
  {
    id: 4,
    label: "8K",
  },
  {
    id: 5,
    label: "DJ",
  },
  {
    id: 6,
    label: "6P",
  },
  {
    id: 7,
    label: "Z2",
  },
  {
    id: 8,
    label: "XT",
  },
  {
    id: 9,
    label: "D7",
  },
  {
    id: 10,
    label: "FD",
  },
  {
    id: 11,
    label: "XJ",
  },
  {
    id: 12,
    label: "QZ",
  },
]

const DSR_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Accepted",
  },
  {
    id: 3,
    label: "Invoiced",
  },
  {
    id: 4,
    label: "Departed",
  },
  {
    id: 5,
    label: "Execute",
  },
]

const AWB_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "091",
  },
  {
    id: 3,
    label: "119",
  },
  {
    id: 4,
    label: "222",
  },
  {
    id: 5,
    label: "339",
  },
  {
    id: 6,
    label: "380",
  },
  {
    id: 7,
    label: "457",
  },
  {
    id: 8,
    label: "807",
  },
  {
    id: 9,
    label: "809",
  },
  {
    id: 10,
    label: "843",
  },
  {
    id: 11,
    label: "900",
  },
  {
    id: 12,
    label: "940",
  },
  {
    id: 13,
    label: "975",
  },
  {
    id: 14,
    label: "ALT",
  },
  {
    id: 15,
    label: "MAL",
  },
  {
    id: 16,
    label: "OAL",
  },
]

export default function FilterSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">AWB Movement</h1>
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
          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">AWB</div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <Input className="border-zinc-700" placeholder="Prefix" />
              </div>
              <div className="w-2/3">
                <Input className="border-zinc-700" placeholder="Number" />
              </div>
            </div>
          </div>

          <div className="flex w-1/5 flex-col gap-2">
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

          <div className="flex w-1/5 flex-col gap-2">
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

          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Country</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {COUNTRY_LIST.map((countryList) => (
                    <SelectItem key={countryList.id} value={countryList.label}>
                      {countryList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Region</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {REGION_LIST.map((regionList) => (
                    <SelectItem key={regionList.id} value={regionList.label}>
                      {regionList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Flight</div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <Input className="border-zinc-700" placeholder="Prefix" />
              </div>
              <div className="w-2/3">
                <Input className="border-zinc-700" placeholder="Flight ID" />
              </div>
            </div>
          </div>

          <div className="flex w-1/5 flex-col gap-2">
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

          <div className="flex w-1/5 flex-col gap-2">
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

          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Agent Code</div>
            </div>
            <Input className="border-zinc-700" placeholder="Agent Code" />
          </div>

          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Status</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Status" />
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

        <div className="flex w-full gap-4">
          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Origin</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Origin" />
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

          <div className="flex w-1/5 flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">Destination</div>
            </div>
            <Select>
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Destination" />
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
