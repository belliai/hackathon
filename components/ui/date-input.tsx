import React, { forwardRef } from "react"
import { CalendarIcon } from "lucide-react"
import { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/date-utils"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { FormControl } from "./form"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type DateInputProps = ControllerRenderProps & {
  className?: HTMLDivElement["className"]
}

const DateInput = forwardRef(
  ({ value, onChange, className }: DateInputProps, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
            ref={ref as React.RefObject<HTMLButtonElement>}
          >
            {value ? formatDate(String(value)) : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DateInput.displayName = "DateInput"

export default DateInput
