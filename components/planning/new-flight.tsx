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
export default function NewFlight() {
    return (
        <div>
            <div className="flex items-center space-x-4 mb-4">
                    <Button>Save</Button>
                    <Button>Add New</Button>
        </div>
        <div className="flex flex-col gap-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Flight#</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>From Date</TableHead>
                        <TableHead>To Date</TableHead>
                        <TableHead>Dept Time</TableHead>
                        <TableHead>Arrival Time</TableHead>
                        <TableHead>Frequency</TableHead>
                        </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                
                        <TableCell>AK2139</TableCell>
                        <TableCell>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Source</SelectLabel>
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
                                <SelectLabel>Destination</SelectLabel>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </TableCell>
                        <TableCell>
                            <DatePicker/>
                        </TableCell>
                        <TableCell>
                            <DatePicker/>
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
                            <div className="flex flex-col space-x-4 space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="M">M</Label>
                                    <Checkbox id="M" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="T">T</Label>
                                    <Checkbox id="T" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="W">W</Label>
                                    <Checkbox id="W" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="Th">Th</Label>
                                    <Checkbox id="Th" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="F">F</Label>
                                    <Checkbox id="F" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="S">S</Label>
                                    <Checkbox id="S" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="Su">Su</Label>
                                    <Checkbox id="Su" />
                                </div>
                            </div>
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