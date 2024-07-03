import React, { useState } from "react"
import { Button } from "@components/ui/button"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CapacityAllocationNew() {
  const [fromDate, setFromDate] = useState<Date | null>(new Date())
  const [toDate, setToDate] = useState<Date | null>(new Date())

  const handleFromDateSelect = (date: Date | undefined) => {
    if (date) setFromDate(date)
  }

  const handleToDateSelect = (date: Date | undefined) => {
    if (date) setToDate(date)
  }

  return (
    <div>
      <div>
        <label>Flight#</label>
        <Input type="text" value="AK" />
      </div>
      <div>
        <DatePicker />
      </div>
      <div>
        <Button className="ml-2">List</Button>
        <Button className="ml-2">Clear</Button>
      </div>
      <Separator className="my-4" />
      <div>
        <label>Origin</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup></SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Destination</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="destination1">Destination 1</SelectItem>
              <SelectItem value="destination2">Destination 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>From</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? (
                format(fromDate, "dd/MM/yyyy")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fromDate || new Date()}
              onSelect={handleFromDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label>To</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !toDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "dd/MM/yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={toDate || new Date()}
              onSelect={handleToDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Checkbox />
        <label>Allotment Id</label>
        <Input type="text" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>Allotment Id</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Shipment Origin</TableHead>
            <TableHead>Shipment Destination</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Shipming Agent</TableHead>
            <TableHead>Billing agent code</TableHead>
            <TableHead>ULD Type</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>SHC Code</TableHead>
            <TableHead>Comm Code</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Release before Dept</TableHead>
            <TableHead>No Show rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Checkbox id="M" />
                <label
                  htmlFor="M"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  M
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="T" />
                <label
                  htmlFor="T"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  T
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="W" />
                <label
                  htmlFor="W"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  W
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="Th" />
                <label
                  htmlFor="Th"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Th
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="F" />
                <label
                  htmlFor="F"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  F
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="S" />
                <label
                  htmlFor="S"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  S
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="Su" />
                <label
                  htmlFor="Su"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Su
                </label>
              </div>
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <Button className="ml-2">Add</Button>
        <Button className="ml-2">Delete</Button>
        <Button className="ml-2">Save</Button>
      </div>
    </div>
  )
}

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

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
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
