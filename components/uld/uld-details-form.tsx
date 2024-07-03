"use client"

import React, { useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
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

export function DatePicker({ date, setDate }: { date: any; setDate: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
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

export function SelectField({
  options,
  placeholder,
}: {
  options: any[]
  placeholder: string
}) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function UldDetailsForm() {
  const [date, setDate] = useState()

  const uldStatusOptions = [
    { value: "serviceable", label: "SERVICEABLE" },
    { value: "unserviceable", label: "UNSERVICEABLE" },
  ]

  const uldUseStatusOptions = [
    { value: "e", label: "E" },
    { value: "d", label: "D" },
  ]

  return (
    <form className="grid grid-cols-2 gap-4 p-4">
      <label>ULD #</label>
      <input type="text" className="input" />

      <label>ULD Manufacturer</label>
      <input type="text" className="input" />

      <label>ULD Purchase Cost</label>
      <input type="text" className="input" />

      <label>ULD Location</label>
      <SelectField
        options={[{ value: "kul", label: "KUL" }]}
        placeholder="Station"
      />

      <label>Updated On</label>
      <DatePicker date={date} setDate={setDate} />

      <label>ULD Location Source</label>
      <SelectField
        options={[{ value: "manual", label: "Manual" }]}
        placeholder="Manual"
      />

      <label>Dimension (WxLxH)</label>
      <div className="flex">
        <input type="text" className="input mr-2" />
        <SelectField
          options={[{ value: "cm", label: "Cubic cm" }]}
          placeholder="Unit"
        />
      </div>

      <label>Tare Weight</label>
      <div className="flex">
        <input type="text" className="input mr-2" />
        <SelectField
          options={[{ value: "kg", label: "Kg" }]}
          placeholder="Unit"
        />
      </div>

      <label>Dolly Weight</label>
      <input type="text" className="input" />

      <label>Max Gross Weight</label>
      <input type="text" className="input" />

      <label>ULD Status</label>
      <SelectField options={uldStatusOptions} placeholder="Select Status" />

      <label>ULD Use Status</label>
      <SelectField
        options={uldUseStatusOptions}
        placeholder="Select Use Status"
      />

      <label>Is Received</label>
      <Checkbox />

      <label>ULD Economical Repair Point</label>
      <input type="text" className="input" />

      <label>Certification</label>
      <input type="text" className="input" />

      <label>Class Rating</label>
      <input type="text" className="input" />

      <label>Remarks</label>
      <input type="text" className="input" />

      <label>Is Active</label>
      <Checkbox />

      <div className="col-span-2 mt-4 flex justify-end gap-4">
        <Button variant="button-primary">Save</Button>
        <Button variant="secondary">Clear</Button>
      </div>
    </form>
  )
}
