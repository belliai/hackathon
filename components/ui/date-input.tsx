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
  disabledMatcher?: (date: Date) => boolean
  mode?: "single" | "range"
}

const DateInput = forwardRef(
  (
    {
      value,
      onChange,
      className,
      disabledMatcher,
      mode = "single",
    }: DateInputProps,
    ref
  ) => {
    const defaultMatcher = (date: Date) =>
      date > new Date() || date < new Date("1900-01-01")

    const disabled = disabledMatcher || defaultMatcher

    const formattedValue =
      mode === "single" && value
        ? formatDate(String(value))
        : mode === "range" && value?.to
          ? `${formatDate(String(value.from))} - ${formatDate(String(value.to))}`
          : ""

    const placeholder = mode === "single" ? "Pick a date" : "Pick range date"
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
            {formattedValue || <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode={mode}
            selected={value}
            onSelect={onChange}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DateInput.displayName = "DateInput"

export default DateInput
