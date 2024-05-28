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

const PREFIX_LIST = [
  {
    id: 1,
    label: '775',
  },
  {
    id: 2,
    label: '776',
  },
  {
    id: 3,
    label: '777',
  },
];

const AIRPORT_TYPE_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Airport',
  },
  {
    id: 3,
    label: 'Warehouse',
  },
];

const DOCUMENT_TYPE_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Door Delivered',
  },
  {
    id: 3,
    label: 'Door Picked',
  },
  {
    id: 4,
    label: 'Invoice',
  },
  {
    id: 5,
    label: 'Packing List',
  },
  {
    id: 6,
    label: 'Others',
  },
  {
    id: 7,
    label: 'DG_Non DG Declaration',
  },
  {
    id: 8,
    label: 'MAWB',
  },
  {
    id: 9,
    label: 'Manifest',
  },
  {
    id: 10,
    label: 'Proof of Delivery',
  },
  {
    id: 11,
    label: 'Scanned DO',
  },
  {
    id: 12,
    label: 'Customer Invoice Copy Pickup',
  },
  {
    id: 13,
    label: 'Customer Invoice Copy Delivery',
  },
  {
    id: 14,
    label: 'Permit Form',
  },
  {
    id: 15,
    label: 'AXB Copy For Pickup',
  },
  {
    id: 16,
    label: 'AXB Copy For Delivery',
  },
  {
    id: 17,
    label: 'MSDS',
  },
  {
    id: 18,
    label: 'Finance',
  },
  {
    id: 20,
    label: 'HAWB',
  },
  {
    id: 21,
    label: 'AWB',
  },
  {
    id: 22,
    label: 'Scan POD Upload',
  },
  {
    id: 23,
    label: 'Additional',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">DO Report</h1>
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
                className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-2/12`}
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
                className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-2/12`}
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

          <div className="w-1/12">
            <Input className="border-zinc-500" placeholder="Prefix" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Awb" />
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
