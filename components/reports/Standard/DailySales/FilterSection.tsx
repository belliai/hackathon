import { Button } from "@/components/ui/button";
import { DownloadIcon, MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

const AIRPORT_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'CGK',
  },
  {
    id: 3,
    label: 'SIN',
  },
];

const FLIGHT_TYPE = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Domestic',
  },
  {
    id: 3,
    label: 'International',
  },
];

const CARRIER_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'AK',
  },
  {
    id: 3,
    label: 'I5',
  },
  {
    id: 4,
    label: '8K',
  },
  {
    id: 5,
    label: 'DJ',
  },
  {
    id: 6,
    label: '6P',
  },
  {
    id: 7,
    label: 'Z2',
  },
  {
    id: 8,
    label: 'XT',
  },
  {
    id: 9,
    label: 'D7',
  },
  {
    id: 10,
    label: 'FD',
  },
  {
    id: 11,
    label: 'XJ',
  },
  {
    id: 12,
    label: 'QZ',
  },
];

const DSR_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Accepted',
  },
  {
    id: 3,
    label: 'Invoiced',
  },
  {
    id: 4,
    label: 'Departed',
  },
  {
    id: 5,
    label: 'Execute',
  },
];

const AWB_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: '091',
  },
  {
    id: 3,
    label: '119',
  },
  {
    id: 4,
    label: '222',
  },
  {
    id: 5,
    label: '339',
  },
  {
    id: 6,
    label: '380',
  },
  {
    id: 7,
    label: '457',
  },
  {
    id: 8,
    label: '807',
  },
  {
    id: 9,
    label: '809',
  },
  {
    id: 10,
    label: '843',
  },
  {
    id: 11,
    label: '900',
  },
  {
    id: 12,
    label: '940',
  },
  {
    id: 13,
    label: '975',
  },
  {
    id: 14,
    label: 'ALT',
  },
  {
    id: 15,
    label: 'MAL',
  },
  {
    id: 16,
    label: 'OAL',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Daily Sales Report</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">From Date</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-full`}
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

          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Time (HH:MM)</div>
            </div>
            <div className="flex gap-2">
              <Input className="border-zinc-700" placeholder="HH" />
              <Input className="border-zinc-700" placeholder="MM" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">To Date</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-full`}
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

          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Time (HH:MM)</div>
            </div>
            <div className="flex gap-2">
              <Input className="border-zinc-700" placeholder="HH" />
              <Input className="border-zinc-700" placeholder="MM" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Flight</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Flight" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FLIGHT_TYPE.map((flightType) => (
                    <SelectItem key ={flightType.id} value={flightType.label}>{flightType.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Origin</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key ={airportList.id} value={airportList.label}>{airportList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Carrier</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Carrier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CARRIER_LIST.map((carrierList) => (
                    <SelectItem key ={carrierList.id} value={carrierList.label}>{carrierList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Shipper</div>
            </div>
            <Input className="border-zinc-700" placeholder="Shipper" />
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Commodity</div>
            </div>
            <Input className="border-zinc-700" placeholder="Commodity" />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Destination</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key ={airportList.id} value={airportList.label}>{airportList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">DSR Type</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="DSR Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {DSR_LIST.map((dsrList) => (
                    <SelectItem key ={dsrList.id} value={dsrList.label}>{dsrList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">SHC</div>
            </div>
            <Input className="border-zinc-700" placeholder="SHC" />
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Agent</div>
            </div>
            <Input className="border-zinc-700" placeholder="Agent" />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">AWB Prefix</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="AWB Prefix" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AWB_LIST.map((awbList) => (
                    <SelectItem key ={awbList.id} value={awbList.label}>{awbList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="bg-zinc-800 hover:bg-zinc-700 text-white w-fit">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
      </div>
    </div>
  );
}
