import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DownloadIcon, MagnifyingGlassIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-5 gap-4">
      <div className="flex gap-4 justify-end">
        <Button className="bg-zinc-800">
          <span className="mr-1 h-4 w-4">
            <ReloadIcon />
          </span>
          Refresh
        </Button>
        <Button className="bg-button-primary">
          <span className="mr-1 h-4 w-4">
            <PlusIcon />
          </span>
          Create Mother Bag
        </Button>
      </div>

      <div className="flex gap-4">
        <Input className="border-zinc-500" placeholder="MB No From" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="MB No To" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="Origin" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="Destination" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
        <Input className="border-zinc-500" placeholder="MWB" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
      </div>

      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`flex justify-between border-zinc-700 bg-zinc-800 pl-3 pr-3 w-1/4`}
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
              className={`flex justify-between border-zinc-700 bg-zinc-800 pl-3 pr-3 w-1/4`}
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

        <Button className="bg-zinc-800">
          <span className="mr-1 h-4 w-4">
            <MagnifyingGlassIcon />
          </span>
          Search
        </Button>
      </div>
    </div>
  );
}
