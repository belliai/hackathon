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
import { Checkbox } from "@/components/ui/checkbox";

const TOKEN_LIST = [
  {
    id: 1,
    label: 'TOKEN-001',
  },
  {
    id: 2,
    label: 'TOKEN-002',
  },
  {
    id: 3,
    label: 'TOKEN-003',
  },
];

const ACCEPTANCE_LIST = [
  {
    id: 1,
    label: 'Accepted',
  },
  {
    id: 2,
    label: 'Rejected',
  },
  {
    id: 3,
    label: 'Pending',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Cargo Acceptance</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4">
          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="Flight ID" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-2/12`}
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
            <Input className="border-zinc-700" placeholder="AWB" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TOKEN_LIST.map((tokenList) => (
                    <SelectItem key ={tokenList.id} value={tokenList.label}>{tokenList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="Dock#" />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Acceptance Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ACCEPTANCE_LIST.map((acceptanceList) => (
                    <SelectItem key ={acceptanceList.id} value={acceptanceList.label}>{acceptanceList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="Agent" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="Shipper" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="IAC" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-700" placeholder="CCSF#" />
          </div>

          <div className="w-2/12 flex items-center space-x-2">
            <Checkbox id="known-shipper" />
            <label
              htmlFor="known-shipper"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Known Shipper
            </label>
          </div>
        </div>

        <div className="flex gap-4">
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