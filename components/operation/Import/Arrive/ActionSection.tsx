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

export default function ActionSection() {
  return (
    <div className="flex mt-5 flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Action</div>
        <div className="flex gap-4 w-2/3">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Print AWB
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Close Flight
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Reopen Flight
          </Button>
          
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Discrepancy
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Notify
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Send FSU/ARR
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Send XFSU/ARR
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Mark Customs Release
          </Button>
        </div>
        <div className="flex gap-4 w-2/3">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Print Manifest
          </Button>

          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            ePouch
          </Button>
        </div>
      </div>
    </div>
  );
}
