import FilterSection from "@/components/operation/Transfer/CtmOut/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/Transfer/CtmOut/columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";

const STATUS_LIST = [
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

export default async function CtmOut() {
  return (
    <div className="flex flex-col gap-5">
      <FilterSection />

      <div className="flex flex-col gap-5 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="">
          <DataTable columns={columns} data={[]} />
        </div>

        <div className="flex gap-2">
          <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
            Submit
          </Button>
          <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            Execute
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Print
          </Button>
          <Button className="bg-destructive hover:bg-destructive/80 text-white">
            Cancel
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Endorse
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Print UCR
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            FSU/TFD
          </Button>
        </div>
      </div>
      
    </div>
  );
}
