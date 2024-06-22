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
export default function RouteControlListHeader() {
    return (
        <div>
            <div className="gap-4">
                <div className="flex items-center space-x-2 mb-4">
                        <Label htmlFor="Ref No"> Ref No.</Label>
                        <Input type="ref no." placeholder="ref no." />
                </div>
                <div className="flex items-center space-x-2 mb-4">
                        <Label htmlFor="Name"> Name</Label>
                        <Input type="Name" placeholder="Name" />
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="From Date"> From Date</Label>
                    <DatePicker/>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="To Date"> To Date</Label>
                    <DatePicker/>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Active"> Active </Label>
                    <Checkbox id="active" />
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Origin Level">Origin Level</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Level</SelectLabel>
                                    <SelectItem value="Airport">Airport</SelectItem>
                                    <SelectItem value="City">City</SelectItem>
                                    <SelectItem value="Region">Region</SelectItem>
                                    <SelectItem value="Country">Country</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Origin">Origin</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Airport</SelectLabel>
                                    <SelectItem value="AAA">AAA</SelectItem>
                                    <SelectItem value="AAB">AAB</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="Destination Level">Destination Level</Label>
                    <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Level</SelectLabel>
                                    <SelectItem value="Airport">Airport</SelectItem>
                                    <SelectItem value="City">City</SelectItem>
                                    <SelectItem value="Region">Region</SelectItem>
                                    <SelectItem value="Country">Country</SelectItem>
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
                                    <SelectLabel>Destination</SelectLabel>
                                    <SelectItem value="AAA">AAA</SelectItem>
                                    <SelectItem value="AAB">AAB</SelectItem>
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