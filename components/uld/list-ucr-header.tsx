import React, { useState } from "react"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ListUcrInputHeader() {
  return (
    <div>
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Search/Edit UCR</h2>
      </div>
      <Separator className="my-4" />
      <InputDemo />
    </div>
  )
}
function InputDemo() {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [list, setList] = useState<string[]>([])

  return (
    <div className="space-y-6 px-4 py-8">
      <div className="flex w-full justify-between">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="ucrNumber" className="flex items-center space-x-1">
              UCR#
            </label>
            <Input type="text" id="ucrNumber" className="w-24" />
            <label htmlFor="uldNumber" className="flex items-center space-x-1">
              ULD#
            </label>
            <Input type="text" id="uldNumber" className="w-24" />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="fromDate" className="flex items-center space-x-1">
              From Date
            </label>
            <DatePicker />
            <label htmlFor="toDate" className="flex items-center space-x-1">
              To Date
            </label>
            <DatePicker />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="warehouseTransferring"
              className="flex items-center space-x-1"
            >
              Warehouse Transferring
            </label>
            <Selector />
            <label
              htmlFor="carrierTransferring"
              className="flex items-center space-x-1"
            >
              Carrier Transferring
            </label>
            <Selector />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="warehouseFinal"
              className="flex items-center space-x-1"
            >
              Warehouse Final
            </label>
            <Selector />
            <label
              htmlFor="carrierFinal"
              className="flex items-center space-x-1"
            >
              Carrier Final
            </label>
            <Selector />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="ml-2">List</Button>
          <Button className="ml-2">Clear</Button>
          <Button className="ml-2">Export</Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}

function Selector() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Options</SelectLabel>
          <SelectItem value="Option 1">Option 1</SelectItem>
          <SelectItem value="Option 2">Option 2</SelectItem>
          <SelectItem value="Option 3">Option 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function DatePicker() {
  const [date, setDate] = useState(new Date())
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => setDate(day as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
