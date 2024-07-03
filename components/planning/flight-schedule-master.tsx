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

export default function FlightMaster() {
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
          <Button>List</Button>
          <Button>Clear</Button>
          <Button>Export</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"> </TableHead>
              <TableHead>Flight#</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>From Date</TableHead>
              <TableHead>To Date</TableHead>
              <TableHead>Dept Time</TableHead>
              <TableHead>Arrival Time</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Aircraft Type</TableHead>
              <TableHead>Tail No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Flight Type</TableHead>
              <TableHead>Dom/Int</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>UOM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <Checkbox id="terms" />
              </TableCell>
              <TableCell>AK2139</TableCell>
              <TableCell>WUH</TableCell>
              <TableCell>BKI</TableCell>
              <TableCell>
                <DatePicker />
              </TableCell>
              <TableCell>
                <DatePicker />
              </TableCell>
              <TableCell>
                <Label htmlFor="day">Day</Label>
                <Input type="day" placeholder="Day" />
                <Label htmlFor="hour">Hr</Label>
                <Input type="hour" placeholder="Hr" />
                <Label htmlFor="min">Min</Label>
                <Input type="min" placeholder="Min" />
              </TableCell>
              <TableCell>
                <Label htmlFor="day">Day</Label>
                <Input type="day" placeholder="Day" />
                <Label htmlFor="hour">Hr</Label>
                <Input type="hour" placeholder="Hr" />
                <Label htmlFor="min">Min</Label>
                <Input type="min" placeholder="Min" />
              </TableCell>
              <TableCell>
                <Label htmlFor="M">M</Label>
                <Checkbox id="M" />
                <Label htmlFor="T">T</Label>
                <Checkbox id="T" />
                <Label htmlFor="W">W</Label>
                <Checkbox id="W" />
                <Label htmlFor="Th">Th</Label>
                <Checkbox id="Th" />
                <Label htmlFor="F">F</Label>
                <Checkbox id="F" />
                <Label htmlFor="S">S</Label>
                <Checkbox id="S" />
                <Label htmlFor="Su">Su</Label>
                <Checkbox id="Su" />
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tail No</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Flight Type</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Dom/Int</SelectLabel>
                      <SelectItem value="Domestic">Domestic</SelectItem>
                      <SelectItem value="International">
                        International
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input type="capacity" placeholder="Capacity" />
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>UOM</SelectLabel>
                      <SelectItem value="K">K</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
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
