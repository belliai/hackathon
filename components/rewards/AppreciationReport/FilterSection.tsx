import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DownloadIcon, MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATION_LIST = [
  { id: 1, label: "AH1" },
  { id: 2, label: "AIP" },
  { id: 3, label: "AJL" },
  { id: 4, label: "ALA" },
  { id: 5, label: "AMD" },
  { id: 6, label: "AMS" },
  { id: 7, label: "AN1" },
  { id: 8, label: "ASU" },
  { id: 9, label: "ATL" },
  { id: 10, label: "ATQ" },
  { id: 11, label: "AUA" },
  { id: 12, label: "AYJ" },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Appreciation Report</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-1/6`}
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
                className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-1/6`}
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
              <SelectTrigger className="border-zinc-500 w-full">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATION_LIST.map((stationList) => (
                    <SelectItem key ={stationList.id} value={stationList.label}>{stationList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
        </div>
      </div>
      
    </div>
  );
}
