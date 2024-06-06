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

export default function AssignActionFormSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Assign AWB</div>
        <div className="flex justify-between">
          <div className="flex gap-4 w-full">
            <div className="w-2/12">
              <Input className="border-zinc-700" placeholder="AWB" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
            </div>
            <div className="w-2/12">
              <Input className="border-zinc-700" placeholder="Flight" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
            </div>
            
            <div className="w-2/12">
              <Input className="border-zinc-700" placeholder="Flight ID" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
            </div>

            <div className="w-2/12">
              <Input className="border-zinc-700" placeholder="Pcs" />
            </div>

            <div className="w-2/12">
              <Input className="border-zinc-700" placeholder="Weight" />
            </div>

            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              Assign
            </Button>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
