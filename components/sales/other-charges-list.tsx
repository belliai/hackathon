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

export default function OtherChargesList() {
  const rates = [
    {
      rateNo: "SK-82",
      origin: "KUL",
      destination: "BKI",
      startDate: "02/02/2023",
      endDate: "30/06/2024",
    },
    {
      rateNo: "SK-83",
      origin: "BKI",
      destination: "SYD",
      startDate: "01/04/2017",
      endDate: "01/01/2022",
    },
  ]

  return (
    <div>
      <div className="filters">
        <label>Origin level</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Origin Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="airport">Airport</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="filters">
        <label>Origin</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Origin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="filters">
        <label>Destination level</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Destination Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="airport">Airport</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="filters">
        <label>Destination</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="filters">
        <label>Status</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup></SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Charge Name</label>
        <Input type="text" value="" />
      </div>
      <div>
        <label>Parameter</label>
        <Input type="text" value="" />
      </div>
      <div>
        <label>From Date</label>
        <DatePicker />
      </div>
      <div>
        <label>To Date</label>
        <DatePicker />
      </div>
      <div className="filters">
        <label>Charge Type</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Rate Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup></SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Agent Code</label>
        <Input type="text" value="" />
      </div>
      <div>
        <label>Shipper Code</label>
        <Input type="text" value="" />
      </div>
      <div>
        <label>IATA Comm Code</label>
        <Input type="text" value="" />
      </div>
      <div>
        <label>Product Type</label>
        <Input type="text" value="" />
      </div>
      <div className="filters">
        <label>ChargedAt</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup></SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>OC ID</label>
        <Input type="text" value="" />
      </div>
      <div>
        <label>Expires From Date</label>
        <DatePicker />
      </div>
      <div>
        <label>Expires To Date</label>
        <DatePicker />
      </div>
      <div>
        <Button>List</Button>
        <Button>Clear</Button>
        <Button>Export</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rate #</TableHead>
            <TableHead>Origin Level</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination Level</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Rate Card</TableHead>
            <TableHead>Parameter</TableHead>
            <TableHead>Slabs</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Rate Base</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.rateNo}>
              <TableCell>{rate.rateNo}</TableCell>
              <TableCell>Airport</TableCell>
              <TableCell>{rate.origin}</TableCell>
              <TableCell>Airport</TableCell>
              <TableCell>{rate.destination}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{rate.startDate}</TableCell>
              <TableCell>{rate.endDate}</TableCell>
              <TableCell></TableCell>
              <TableCell>Active</TableCell>
              <TableCell>
                <Button>Edit</Button>
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
