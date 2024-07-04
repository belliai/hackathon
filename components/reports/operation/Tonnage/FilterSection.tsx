import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import {
  DownloadIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STATUS_LIST = [
  { id: 1, label: "IN TRANSIT" },
  { id: 2, label: "Shipment Eligible For LM Delivery" },
  { id: 3, label: "AWB Update" },
  { id: 4, label: "Reopened" },
  { id: 5, label: "Offload" },
  { id: 6, label: "Manifest" },
  { id: 7, label: "Add To Manifest" },
  { id: 8, label: "Shipment Handed To LM Partner" },
  { id: 9, label: "Shipment Assigned To LM Partner" },
  { id: 10, label: "LM Manifest Failed" },
  { id: 11, label: "Request Initiated For LM Delivery Vendor" },
  { id: 12, label: "Dummy Task Created By Spicetag" },
  { id: 13, label: "AWB Booked And Confirmed" },
  { id: 14, label: "MWB Created" },
  { id: 15, label: "Executed" },
  { id: 16, label: "AXB Booked And Confirmed" },
  { id: 17, label: "Accepted" },
  { id: 18, label: "Order Assigned To Pickup Associate" },
  { id: 19, label: "Order Confirmed" },
  { id: 20, label: "Rejected By Associate" },
  { id: 21, label: "In Transit Mode - Client To Warehouse" },
  { id: 22, label: "Pickup Warehouse Reached" },
  { id: 23, label: "Mother Bag Generated" },
  { id: 24, label: "MAWB Generated" },
  { id: 25, label: "Pickup Warehouse To Warehouse - In Transit" },
  { id: 26, label: "Warehouse To Airport" },
  { id: 27, label: "Pickup Airport Reached" },
  { id: 28, label: "Delete Piece" },
  { id: 29, label: "Airport To Airport - In Transit" },
  { id: 30, label: "Motherbag Misroute" },
  { id: 31, label: "Departed" },
  { id: 32, label: "Offload" },
  { id: 33, label: "Destination Airport Reached" },
  { id: 34, label: "In Transit Mode - Dispatch For Warehouse" },
  { id: 35, label: "Destination Warehouse To Warehouse - In Transit" },
  { id: 36, label: "Destination Warehouse Reached" },
  { id: 37, label: "Delivery Rejected By Lastmile Vendor" },
  { id: 38, label: "Order Assigned To Delivery Associate" },
  { id: 39, label: "Delivered Without POD" },
  { id: 40, label: "Out For Delivery" },
  { id: 41, label: "Delivered" },
]

const BASED_ON_LIST = [
  { id: 1, label: "Booking Date" },
  { id: 2, label: "Execution Date" },
  { id: 3, label: "First Flight Date" },
  { id: 4, label: "Delivery Date" },
]

const AIRPORT_TYPE_LIST = [
  { id: 1, label: "D2D" },
  { id: 2, label: "A2A" },
]

export default function FilterSection() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Tonnage Report</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-base font-semibold text-white">Filter</div>
        <div className="flex gap-4">
          <div className="w-1/12">
            <Input className="border-zinc-500" placeholder="Prefix" />
          </div>

          <div className="w-1/12">
            <Input className="border-zinc-500" placeholder="AWB No" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Origin" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Destination" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex w-2/12 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
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
                className={`flex w-2/12 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
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

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key={statusList.id} value={statusList.label}>
                      {statusList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Based On" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {BASED_ON_LIST.map((basedOn) => (
                    <SelectItem key={basedOn.id} value={basedOn.label}>
                      {basedOn.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Agent Code" />
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="Trans Station" />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Airport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_TYPE_LIST.map((airportList) => (
                    <SelectItem key={airportList.id} value={airportList.label}>
                      {airportList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
