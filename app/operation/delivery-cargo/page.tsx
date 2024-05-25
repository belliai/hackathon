import FilterSection from "@/components/operation/DeliveryCargo/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/DeliveryCargo/columns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon, ListBulletIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";

export default async function DeliveryCargo() {
  return (
    <div>
      <FilterSection />
      <div className=" py-10">
        <DataTable columns={columns} data={[]} />
      </div>
      <Card
        className="overflow-hidden rounded-lg border-[1px] bg-transparent border-zinc-700 text-zinc-400"
      >
        <CardContent className="p-3 flex flex-col gap-4 py-4">
          <div className="text-base font-bold text-white">AWB Detail Bulk</div>

          <div className="flex gap-4">
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Receiving Company</div>
              <Input className="border-zinc-500" placeholder="Receiving Company" />
            </div>
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Consignee Name</div>
              <Input className="border-zinc-500" placeholder="Consignee Name" rightIcon={<ListBulletIcon className="h-4 w-4 text-zinc-400" />} />
            </div>
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Picked-up By</div>
              <Input className="border-zinc-500" placeholder="Picked-up By" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Issued By</div>
              <Input className="border-zinc-500" placeholder="Issued By" />
            </div>

            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Delivery Date</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`flex justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3 w-full`}
                  >
                    <span>Delivery Date</span>
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

            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">DO Number</div>
              <Input className="border-zinc-500" placeholder="DO Number" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Customer GSTINNo</div>
              <Input className="border-zinc-500" placeholder="Customer GSTINNo" />
            </div>
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Receipt Number</div>
              <Input className="border-zinc-500" placeholder="Receipt Number" />
            </div>
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">IGM Number</div>
              <Input className="border-zinc-500" placeholder="IGM Number" />
            </div>
          </div>

          <div className="w-2/4 flex flex-col gap-2 text-white">
            <div className="text-sm">Remarks</div>
            <Input className="border-zinc-500" placeholder="Remarks" />
          </div>

          <div className="flex gap-3">
            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              Deliver
            </Button>
            <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
              Print DO
            </Button>
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
              Cancel DO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
