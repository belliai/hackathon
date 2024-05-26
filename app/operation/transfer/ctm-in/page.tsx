import FilterSection from "@/components/operation/Transfer/CtmIn/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/Transfer/CtmIn/columns";
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

export default async function FlightEpouch() {
  return (
    <div className="flex flex-col gap-5">
      <FilterSection />

      <div className="flex flex-col gap-5 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="flex gap-4">
          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="AWB No" />
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
            <Select>
              <SelectTrigger className="border-zinc-500 w-full">
                <SelectValue placeholder="Flight No" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key ={statusList.id} value={statusList.label}>{statusList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="">
          <DataTable columns={columns} data={[]} />
        </div>

        <div className="flex gap-4">
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
        </div>
      </div>
      
    </div>
  );
}
