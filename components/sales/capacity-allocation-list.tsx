import React, { useState } from "react"
import { Button } from "@components/ui/button"
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

export default function CapacityAllocationList() {
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
        <label>Flight Org</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="org1">Org 1</SelectItem>
              <SelectItem value="org2">Org 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Flight Dest</label>
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
        <label>Flight</label>
        <Input type="text" value="AK" />
      </div>
      <Calendar
        mode="single"
        selected={fromDate || new Date()}
        onSelect={handleFromDateSelect}
        initialFocus
      />
      <div>
        <label>To Date</label>
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
        <label>Shipment Org</label>
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
        <label>Shipment Dest</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup></SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={() => console.log("Listed")}>List</Button>
      <Button onClick={() => console.log("Cleared")}>Clear</Button>
      <Button onClick={() => console.log("Exported")}>Export</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Allotment ID</TableHead>
            <TableHead>Flight Org</TableHead>
            <TableHead>Flight Dest</TableHead>
            <TableHead>Flight No</TableHead>
            <TableHead>Valid From</TableHead>
            <TableHead>Valid To</TableHead>
            <TableHead>Days of Week</TableHead>
            <TableHead>Allocated Capacity</TableHead>
            <TableHead>Allocated Volume</TableHead>
            <TableHead>Parameters</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  )
}
