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

export default function FlightLoadPlan() {
  return (
    <div>
      <div className="gap-4">
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Station">Station</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="KUL">KUL</SelectItem>
                <SelectItem value="KUA">KUA</SelectItem>
                <SelectItem value="KUD">KUD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="From Date">From Date</Label>
          <DatePicker />
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="To Date">To Date</Label>
          <DatePicker />
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="FBL Status">FBL Status</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="L/P Status">L/P Status</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="Unplanned">Unplanned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Flight Type">Flight Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Domestic">Domestic</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="A/C Body Type">A/C Body Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Narrow">Narrow</SelectItem>
                <SelectItem value="Wide">Wide</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="Flight#">Flight#</Label>
          <Input type="flight#" placeholder="Flight #" />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <Button>List</Button>
          <Button>Clear</Button>
          <Button>Export</Button>
        </div>
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
