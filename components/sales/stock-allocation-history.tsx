import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function StockAllocationHistory() {
return (
  <div>
  <div className="py-8 px-4 space-y-6">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center space-x-4">
            <div className="flex items-center space-x-2">
                <label htmlFor="Cnote Type" className="whitespace-nowrap">Cnote type</label>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Options</SelectLabel>
                        <SelectItem value="AWB">AWB</SelectItem>
                        <SelectItem value="CBV">CBV</SelectItem>
                        <SelectItem value="CN-38">CN-38</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
            <label htmlFor="AWB Type" className="whitespace-nowrap">AWB Type</label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="Stock Type" className="whitespace-nowrap">Stock Type</label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="Count" className="whitespace-nowrap">Count</label>
            <Input type="text" id="Count" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="Stock Holder  Type" className="whitespace-nowrap">Stock Holder Type *</label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem value="HO">HO</SelectItem>
                    <SelectItem value="Agent">Agent</SelectItem>
                    <SelectItem value="Stock Agent">Stock Agent</SelectItem>
                    <SelectItem value="Sub Agent">Sub Agent</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="Stock Holder Code" className="whitespace-nowrap">Stock Holder Code</label>
            <Input type="text" id="Stock Holder Code" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="AWB From" className="whitespace-nowrap">AWB From</label>
            <Input type="text" id="AWB From" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="AWB To" className="whitespace-nowrap">AWB To</label>
            <Input type="text" id="AWB To" className="w-24" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="ml-2">Allocate</Button>
          <Button className="ml-2">Blacklist</Button>
          <Button className="ml-2">Return</Button>
          <Button className="ml-2">Revoke</Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
    <div className="py-8 px-4 space-y-6">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center space-x-4">   
          <div className="flex items-center space-x-2">
            <label htmlFor="Stock Holder Type" className="whitespace-nowrap">Stock Holder Type *</label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem value="HO">HO</SelectItem>
                    <SelectItem value="Agent">Agent</SelectItem>
                    <SelectItem value="Stock Agent">Stock Agent</SelectItem>
                    <SelectItem value="Sub Agent">Sub Agent</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="Stock Holder Code" className="whitespace-nowrap">Stock Holder Code</label>
            <Input type="text" id="Stock Holder Code" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="From" className="whitespace-nowrap">From</label>
            <DatePicker/>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="To" className="whitespace-nowrap">To</label>
            <DatePicker/>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="AWB Prefix" className="whitespace-nowrap">AWB Prefix</label>
            <Input type="text" id="AWB Prefix" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="AWB No" className="whitespace-nowrap">AWB No</label>
            <Input type="text" id="AWB No" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="AWB From" className="whitespace-nowrap">AWB From</label>
            <Input type="text" id="AWB From" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="AWB To" className="whitespace-nowrap">AWB To</label>
            <Input type="text" id="AWB To" className="w-24" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="ml-2">List</Button>
          <Button className="ml-2">Clear</Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
    </div>  
  );
}

function Selector() {
    return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Options</SelectLabel>
          <SelectItem value="Option 1">Option 1</SelectItem>
          <SelectItem value="Option 2">Option 2</SelectItem>
          <SelectItem value="Option 3">Option 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    )
}

function DatePicker() {
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
