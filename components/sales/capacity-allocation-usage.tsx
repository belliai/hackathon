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

export default function CapacityAllocationUsage() {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

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
            <SelectGroup>
              <SelectItem value="dest1">Dest 1</SelectItem>
              <SelectItem value="dest2">Dest 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Flight</label>
        <Input type="text" value="AK" />
      </div>
      <div>
        <label>From Date</label>
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
              selected={fromDate}
              onSelect={(day) => day && setFromDate(day)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
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
              selected={toDate}
              onSelect={(day) => day && setToDate(day)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
            <TableHead>Flight Date</TableHead>
            <TableHead>Allocated Weight</TableHead>
            <TableHead>Allocated Volume</TableHead>
            <TableHead>Utilized Weight</TableHead>
            <TableHead>Utilized Volume</TableHead>
            <TableHead>Available Weight</TableHead>
            <TableHead>Available Volume</TableHead>
            <TableHead>% Utilization Allocated Capacity</TableHead>
            <TableHead>% Utilization Allocated Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  )
}
