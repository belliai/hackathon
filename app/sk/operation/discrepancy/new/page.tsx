import { CalendarDaysIcon } from "@heroicons/react/24/solid"

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
import { Separator } from "@/components/ui/separator"

const STATUS_LIST = [
  {
    id: 1,
    label: "New",
  },
  {
    id: 2,
    label: "In-Progress",
  },
  {
    id: 3,
    label: "Resolved",
  },
]

const DISCREPANCY_LIST = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "DMGD",
  },
  {
    id: 3,
    label: "FDAW",
  },
  {
    id: 4,
    label: "FDCA",
  },
  {
    id: 5,
    label: "MSAW",
  },
  {
    id: 6,
    label: "MSCA",
  },
  {
    id: 7,
    label: "OFLD",
  },
  {
    id: 8,
    label: "OVCD",
  },
  {
    id: 9,
    label: "RSGN",
  },
  {
    id: 10,
    label: "SSPD",
  },
  {
    id: 11,
    label: "SURP",
  },
]

const WWT_STATUS_LIST = [
  {
    id: 1,
    label: "World Wide Tracking Launched",
  },
  {
    id: 2,
    label: "World Wide Tracking in Queue",
  },
  {
    id: 3,
    label: "World Wide Tracking not Required",
  },
]

export default async function New() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">AWB Discrepancy</h1>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
          <div className="text-base font-semibold text-white">New</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-white">
              <div className="text-sm">AWB Number</div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/12">
                <Input className="border-zinc-700" />
              </div>
              <div className="w-2/12">
                <Input className="border-zinc-700" />
              </div>
              <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
                List
              </Button>
              <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
                Add
              </Button>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Flight Number</div>
              </div>
              <Input className="border-zinc-700" placeholder="Flight No" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Flight Date</div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
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
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">AWB Origin</div>
              </div>
              <Input className="border-zinc-700" placeholder="AWB Origin" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">AWB Destination</div>
              </div>
              <Input
                className="border-zinc-700"
                placeholder="AWB Destination"
              />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Agent Code</div>
              </div>
              <Input className="border-zinc-700" placeholder="Agent Code" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Route</div>
              </div>
              <Input className="border-zinc-700" placeholder="Route" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Commodity</div>
              </div>
              <Input className="border-zinc-700" placeholder="Commodity" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Product</div>
              </div>
              <Input className="border-zinc-700" placeholder="Product" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Transit Duration</div>
              </div>
              <Input
                className="border-zinc-700"
                placeholder="Transit Duration"
              />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Agent Name</div>
              </div>
              <Input className="border-zinc-700" placeholder="Agent Name" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">AWB Pieces</div>
              </div>
              <Input className="border-zinc-700" placeholder="AWB Pieces" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Gross Weight</div>
              </div>
              <Input className="border-zinc-700" placeholder="Gross Weight" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">SHC Code</div>
              </div>
              <Input className="border-zinc-700" placeholder="SHC Code" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Status</div>
              </div>
              <Select>
                <SelectTrigger className="w-full border-zinc-700">
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

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Caused By</div>
              </div>
              <Input className="border-zinc-700" placeholder="Caused By" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Route</div>
              </div>
              <Input className="border-zinc-700" placeholder="Route" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Commodity</div>
              </div>
              <Input className="border-zinc-700" placeholder="Commodity" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Product</div>
              </div>
              <Input className="border-zinc-700" placeholder="Product" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Transit Duration</div>
              </div>
              <Input
                className="border-zinc-700"
                placeholder="Transit Duration"
              />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Agent Name</div>
              </div>
              <Input className="border-zinc-700" placeholder="Agent Name" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">PCS IRR</div>
              </div>
              <Input className="border-zinc-700" placeholder="PCS IRR" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Weight IRR</div>
              </div>
              <Input className="border-zinc-700" placeholder="Weight IRR" />
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Discrepancy Code</div>
              </div>
              <Select>
                <SelectTrigger className="w-full border-zinc-700">
                  <SelectValue placeholder="Discrepancy Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DISCREPANCY_LIST.map((discrepancyList) => (
                      <SelectItem
                        key={discrepancyList.id}
                        value={discrepancyList.label}
                      >
                        {discrepancyList.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-2/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Result</div>
              </div>
              <Input className="border-zinc-700" placeholder="Result" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Application Submitted Date</div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
                  >
                    <span>Application Submitted Date</span>
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

            <div className="flex w-2/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Description</div>
              </div>
              <Input className="border-zinc-700" placeholder="Description" />
            </div>
          </div>

          <Separator className="mb-2 mt-5" />

          <div className="text-base font-semibold text-white">
            World Wide Tracking
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-2/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">WWT Launch Date</div>
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
                    >
                      <span>WWT Launch Date</span>
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

                <Select>
                  <SelectTrigger className="w-full border-zinc-700">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {WWT_STATUS_LIST.map((wwtList) => (
                        <SelectItem key={wwtList.id} value={wwtList.label}>
                          {wwtList.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">WWT Status</div>
              </div>
              <Input className="border-zinc-700" placeholder="WWT Status" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-2/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">WWT Week 1 Date</div>
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
                    >
                      <span>WWT Week 1 Date</span>
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

                <Select>
                  <SelectTrigger className="w-full border-zinc-700">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {WWT_STATUS_LIST.map((wwtList) => (
                        <SelectItem key={wwtList.id} value={wwtList.label}>
                          {wwtList.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">WWT Result</div>
              </div>
              <Input className="border-zinc-700" placeholder="WWT Result" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-2/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">WWT Week 2 Date</div>
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
                    >
                      <span>WWT Week 2 Date</span>
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

                <Select>
                  <SelectTrigger className="w-full border-zinc-700">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {WWT_STATUS_LIST.map((wwtList) => (
                        <SelectItem key={wwtList.id} value={wwtList.label}>
                          {wwtList.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-2/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">WWT Week 3 Date</div>
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
                    >
                      <span>WWT Week 3 Date</span>
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

                <Select>
                  <SelectTrigger className="w-full border-zinc-700">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {WWT_STATUS_LIST.map((wwtList) => (
                        <SelectItem key={wwtList.id} value={wwtList.label}>
                          {wwtList.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex w-1/5 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Remarks</div>
              </div>
              <Input className="border-zinc-700" placeholder="Remarks" />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button className="w-fit bg-button-secondary text-white hover:bg-button-secondary/80">
              ePouch
            </Button>
            <Button className="w-fit bg-button-primary text-white hover:bg-button-primary/80">
              Save
            </Button>
            <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
