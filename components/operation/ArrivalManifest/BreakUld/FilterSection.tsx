import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
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

const STATUS_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Not Arrived',
  },
  {
    id: 3,
    label: 'Partial',
  },
  {
    id: 4,
    label: 'Completed',
  },
];

const CARGO_TYPE_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'DESTFRT',
  },
  {
    id: 3,
    label: 'TRANSIT',
  },
  {
    id: 4,
    label: 'TRANSFER',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Break ULD</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4 w-2/3">
          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Flight" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
          </div>
          
          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Flight ID" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-2/12`}
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
            <Input className="border-zinc-500" placeholder="ULD#" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Arrival Airport" />
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
