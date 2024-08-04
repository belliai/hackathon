import React, { forwardRef } from "react"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Matcher } from "react-day-picker"
import { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/date-utils"
import { formatTime } from "@/lib/utils/time-picker-utils"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { FormControl } from "./form"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { TimePicker12 } from "./time-picker-12h"

type TimeInputProps = ControllerRenderProps & {
  className?: HTMLDivElement["className"]
  disabled?: boolean
}

const TimeInput = forwardRef(
  ({ value, onChange, className, ...props }: TimeInputProps, ref) => {
    const formattedValue = value && formatTime(value)

    const placeholder = "Pick a Time"
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={props.disabled}
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
            ref={ref as React.RefObject<HTMLButtonElement>}
          >
            {formattedValue || <span>{placeholder}</span>}
            <ClockIcon className="ml-auto h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <TimePicker12 date={value} setDate={onChange} />
        </PopoverContent>
      </Popover>
    )
  }
)

TimeInput.displayName = "TimeInput"

export default TimeInput
