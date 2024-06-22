"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
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
export default function FlightControlHeader() {
    return (
        <div>
            <div className="gap-4">
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Origin">Origin</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Airport</SelectLabel>
                                    <SelectItem value="Airport">Airport</SelectItem>
                                    <SelectItem value="City">City</SelectItem>
                                    <SelectItem value="Region">Region</SelectItem>
                                    <SelectItem value="Country">Country</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                    </Select>
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
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Destination">Destination</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Airport</SelectLabel>
                                    <SelectItem value="Airport">Airport</SelectItem>
                                    <SelectItem value="City">City</SelectItem>
                                    <SelectItem value="Region">Region</SelectItem>
                                    <SelectItem value="Country">Country</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                    </Select>
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
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="AWB Status">AWB Status</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select</SelectLabel>
                                    <SelectItem value="All Bookings">All Bookings</SelectItem>
                                    <SelectItem value="Confirmed Bookings">Confirmed Bookings</SelectItem>
                                    <SelectItem value="Waitlisted Bookings">Waitlisted Bookings</SelectItem>
                                    <SelectItem value="Allocated Bookings">Allocated Bookings</SelectItem>
                                    <SelectItem value="No Bookings">No Bookings</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Flight From Date"> From Date</Label>
                    <DatePicker/>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Flight To Date"> To Date</Label>
                    <DatePicker/>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Flight"> Flight</Label>
                    <Input type="flight" placeholder="Flight" />
                    <Input type="flight" placeholder="Flight" />
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Flight Type">Flight Type</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select</SelectLabel>\
                                    <SelectItem value="Dom">Dom</SelectItem>
                                    <SelectItem value="Int">Int</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Status">Flight Status</Label>
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
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Aircraft Type">Aircraft Type</Label>
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
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Aircraft Body Type">Aircraft Body Type</Label>
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
                </div>
                <div className="flex items-center space-x-4 mb-4">
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