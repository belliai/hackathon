import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
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
import { PrinterIcon } from "@heroicons/react/24/outline";

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

const TYPE_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Inbound',
  },
  {
    id: 3,
    label: 'Outbond',
  },
];

const TRANSFER_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'New',
  },
  {
    id: 3,
    label: 'Executed',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">List Transfer Manifest</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <PrinterIcon />
            </span>
            Print
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4 w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-2/12`}
              >
                <span>Date From</span>
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
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-2/12`}
              >
                <span>Date To</span>
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
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Flight From" />
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-2/12`}
              >
                <span>Flight From Date</span>
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
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Flight From" />
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-2/12`}
              >
                <span>Flight From Date</span>
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

        <div className="flex gap-4 w-full">
          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="Transfer#" />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TYPE_LIST.map((typeList) => (
                    <SelectItem key ={typeList.id} value={typeList.label}>{typeList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="AWB#" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="ULD#" />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Transfer Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TRANSFER_LIST.map((transferList) => (
                    <SelectItem key ={transferList.id} value={transferList.label}>{transferList.label}</SelectItem>
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
