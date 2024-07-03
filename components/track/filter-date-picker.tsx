"use client"

import React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterDateProps {
  onChange: (value: Date | undefined) => void
  value: any
  name: string
  className?: string
}

const FilterDatePicker = ({
  value,
  name,
  onChange,
  className,
}: FilterDateProps) => {
  return (
    <div className={cn("flex flex-col justify-end space-y-1", className)}>
      <Label className="text-xs opacity-50">{name}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-8 border-zinc-800 bg-zinc-900 pl-3 text-left font-normal hover:bg-zinc-900 hover:text-white focus:ring-1 focus:ring-indigo-600 active:ring-indigo-600"
            )}
          >
            {value ? format(value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 leading-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto border-2 border-zinc-800 p-0"
          align="start"
        >
          <Calendar
            className="bg-zinc-900 text-white"
            mode="single"
            selected={value}
            onSelect={(date) => onChange(date)}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default FilterDatePicker
