import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const STATUS_LIST = [
  {
    id: 1,
    label: 'Mother Bag Generated',
  },
  {
    id: 2,
    label: 'Pickup Warehouse to Warehouse',
  },
  {
    id: 3,
    label: 'Warehouse to Airport',
  },
  {
    id: 4,
    label: 'Pickup Airport Reached',
  },
  {
    id: 5,
    label: 'Airport to Airport',
  },
  {
    id: 6,
    label: 'Departed',
  },
  {
    id: 7,
    label: 'Destination Airport Reached',
  },
  {
    id: 8,
    label: 'In Transit Mode',
  },
  {
    id: 9,
    label: 'Destination Warehouse to Warehouse',
  },
  {
    id: 10,
    label: 'Destination Warehouse Reached',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Track Mother Bag List</h1>
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

      <div className="flex gap-4">
        <Input className="border-zinc-500" placeholder="MB No From" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="MB No To" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="Origin" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="Destination" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="MWB" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
      </div>

      <div className="flex gap-4">
        <div className="w-1/6">
          <Input className="border-zinc-500" placeholder="Prefix" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        </div>
        
        <div className="w-1/6">
          <Input className="border-zinc-500" placeholder="AXB Number" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        </div>
        
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
          <Input className="border-zinc-500" placeholder="Truck Number" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-1/6`}
            >
              <span>Assign Date</span>
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
        <div className="w-1/6">
          <Select>
            <SelectTrigger className="border-zinc-700 w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select Status</SelectItem>
                {STATUS_LIST.map((statusList) => (
                  <SelectItem key ={statusList.id} value={statusList.label}>{statusList.label}</SelectItem>
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
  );
}
