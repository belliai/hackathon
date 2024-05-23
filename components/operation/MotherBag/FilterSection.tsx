import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";
import CreateDialog from "./CreateDialog";

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Mother Bag List</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <CreateDialog />
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-1/4`}
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
              className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-1/4`}
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
