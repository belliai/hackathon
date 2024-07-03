"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

export default function ActiveFlight() {
  return (
    <div>
      <div className="gap-4">
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Origin">Origin</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="ZZU">ZZU</SelectItem>
                <SelectItem value="ZZA">ZZA</SelectItem>
                <SelectItem value="ZZP">ZZP</SelectItem>
                <SelectItem value="ZZ">ZZ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Destination">Destination</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="ZZU">ZZU</SelectItem>
                <SelectItem value="ZZA">ZZA</SelectItem>
                <SelectItem value="ZZP">ZZP</SelectItem>
                <SelectItem value="ZZ">ZZ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Partner Code">Partner Code</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="AK">AK</SelectItem>
                <SelectItem value="AF">AF</SelectItem>
                <SelectItem value="AS">AS</SelectItem>
                <SelectItem value="AY">AY</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Flight#">Flight#</Label>
          <Input type="flight#" placeholder="Flight#" />
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Aircraft Type">Aircraft Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="ALL">ALL</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Flight From">Flight From</Label>
          <DatePicker />
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Flight To">Flight To</Label>
          <DatePicker />
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Sector">Sector</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="ALL">ALL</SelectItem>
                <SelectItem value="Dom">Dom</SelectItem>
                <SelectItem value="Int">Int</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Status">Status</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="History">History</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <Label htmlFor="Operation Status">Operation Status</Label>
          <Label htmlFor="status">All</Label>
          <Checkbox id="All" />
          <Label htmlFor="status">New</Label>
          <Checkbox id="New" />
          <Label htmlFor="status">Manifested</Label>
          <Checkbox id="Manifested" />
          <Label htmlFor="status">Departed</Label>
          <Checkbox id="Departed" />
          <Label htmlFor="status">Reopened</Label>
          <Checkbox id="Reopened" />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <Button>Datewise List</Button>
          <Button>Clear</Button>
          <Button>Export</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight#</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Dept Time</TableHead>
              <TableHead>Arrival Time</TableHead>
              <TableHead>Aircraft Type</TableHead>
              <TableHead>Tail No</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>UOM</TableHead>
              <TableHead>Cargo Volume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Operation Status</TableHead>
              <TableHead>Flight Type</TableHead>
              <TableHead>Updated By</TableHead>
              <TableHead>Updated On</TableHead>
              <TableHead>ATD</TableHead>
              <TableHead>ATA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
