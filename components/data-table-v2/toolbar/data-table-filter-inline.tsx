import { useEffect, useState } from "react"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { format } from "date-fns"
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Text,
  UserIcon,
  XCircle,
} from "lucide-react"
import { DateRange } from "react-day-picker"
import { isValidDate } from "rrule/dist/esm/dateutil"

import {
  Direction,
  FilterData,
  OptionWithUrl,
  Period,
} from "@/types/table/filters"
import { cn } from "@/lib/utils"
import {
  datefiltersOptions,
  dateFiltersPresetOptions,
  datePeriodOptions,
  dummyUserOptions,
  mapRelativeValueToDate,
  mapValueToDate,
  profileFilterOptions,
  textFilterOptions,
} from "@/lib/utils/table-filter-utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MultipleSelector from "@/components/ui/multi-selector"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import NumberInputStepper from "@/components/form/number-input-stepper"

import { useDataTableContext } from "../data-table-context"
import DataTableSelect from "./data-table-select"

interface DataTableFilterOptionsProps {
  onOpenChange: (open: boolean) => void
}

export function DataTableFilterInline(props: DataTableFilterOptionsProps) {
  const { filters, onFiltersChange } = useDataTableContext()

  useEffect(() => {
    if (filters.length < 1) props.onOpenChange(false)
  }, [filters])

  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => {
          return (
            <div key={index}>
              {filter.type === "date" && (
                <DataTableFilterDate
                  filter={filter}
                  onValueChange={console.log}
                />
              )}

              {filter.type === "profile" && (
                <DataTableFilterProfile
                  filter={filter}
                  onValueChange={console.log}
                  options={dummyUserOptions}
                />
              )}

              {(filter.type === "text" || !filter.type) && (
                <DataTableFilterText
                  filter={filter}
                  onValueChange={console.log}
                />
              )}
            </div>
          )
        })}
      </div>
      {filters.length > 0 && (
        <Button
          variant={"ghost"}
          onClick={() => {
            onFiltersChange([])
          }}
          className="gap-1 rounded-full text-xs text-zinc-500"
        >
          Reset
        </Button>
      )}
    </div>
  )
}

type SingleDate = Date | undefined
type MultipleDates = Date[] | undefined
type RangeDate = DateRange | undefined

interface DataTableFilterProps {
  onValueChange: (val: SingleDate | MultipleDates | RangeDate) => void
  options?: { label: string; value: string }[]
  filter: FilterData
}

export function DataTableFilterDate({ ...props }: DataTableFilterProps) {
  const [open, setOpen] = useState(false)
  const [condition, setCondition] = useState("is")
  const [direction, setDirection] = useState<Direction>("this")
  const [period, setPeriod] = useState<Period>("day")
  const [count, setCount] = useState(1)
  const [calendarMode, setCalendarMode] = useState<any>("single")
  const [value, setValue] = useState("")
  const [month, setMonth] = useState<Date>(new Date())
  const [date, setDate] = useState<DateRange | Date | undefined>(
    calendarMode === "range"
      ? {
          from: (props.filter?.value as DateRange).from || undefined,
          to: (props.filter?.value as DateRange).to || undefined,
        }
      : (props.filter.value as Date) ?? undefined
  )

  useEffect(() => {
    if (condition === "is-between") {
      setCalendarMode("range")
    } else setCalendarMode("single")
    if (condition === "is-relative-to-today") {
      const relativeDate = mapRelativeValueToDate(direction, period, 1)
      setDate(relativeDate)
    }
  }, [condition])

  useEffect(() => {
    if (condition === "is-relative-to-today") {
      const relativeDate = mapRelativeValueToDate(direction, period, count)
      setDate(relativeDate)
    }
  }, [direction, period, count])

  useEffect(() => {
    if (isValidDate(date)) setMonth(date)
    if (date && "from" in date && isValidDate(date.from)) setMonth(date?.from)
  }, [date])

  useEffect(() => {
    props.filter.value && setDate(props.filter.value as Date | DateRange)
    props.filter.condition && setCondition(props.filter.condition)
    props.filter.calendarMode && setCalendarMode(props.filter.calendarMode)
  }, [props.filter])

  const isEmptyOrNotEmpty = ["is-empty", "is-not-empty"].includes(condition)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-8 rounded-full px-3 text-xs",
            (date || isEmptyOrNotEmpty) &&
              "border-[#fb5727] border-opacity-15 bg-[#fb5727] bg-opacity-5 text-button-primary hover:bg-[#fb5727] hover:bg-opacity-20 hover:text-button-primary"
          )}
        >
          <CalendarIcon size={14} />
          &nbsp;Date
          {isEmptyOrNotEmpty && (
            <span>
              {" "}
              :&nbsp;{" "}
              {
                datefiltersOptions.find((item) => item.value === condition)
                  ?.label
              }{" "}
            </span>
          )}
          {isValidDate(date) && !isEmptyOrNotEmpty && (
            <span> :&nbsp;{format(date as Date, "LLL dd, yyyy")}</span>
          )}
          {date &&
            "from" in date &&
            isValidDate(date?.from) &&
            !isEmptyOrNotEmpty && (
              <span>
                {" "}
                : {format(date.from, "LLL dd, yyyy")} -{" "}
                {"to" in date &&
                  isValidDate(date?.to) &&
                  format(date.to, "LLL dd, yyyy")}{" "}
              </span>
            )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[260px] gap-0 bg-zinc-900 p-0">
        <div className="flex w-full flex-col space-y-2 py-2">
          <div className="flex justify-start space-x-2 px-4">
            <Label className="text-xs text-zinc-400">
              {props.filter.column}:{" "}
            </Label>
            <DataTableSelect
              value={condition}
              onValueChange={setCondition}
              options={datefiltersOptions}
            >
              <SelectTrigger className="flex items-center gap-2 text-xs text-zinc-400">
                <SelectValue
                  className="w-auto border-none text-xs"
                  placeholder="Select"
                />
                <ChevronDown size={12} />
              </SelectTrigger>
            </DataTableSelect>
          </div>

          {![
            "is-between",
            "is-relative-to-today",
            "is-empty",
            "is-not-empty",
          ].includes(condition as string) && (
            <div className="flex items-center space-x-2 px-2">
              <DataTableSelect
                value={String(value)}
                onValueChange={(val) => {
                  setValue(val)
                  const date = mapValueToDate(val)
                  setDate(date)
                  if (date) setMonth(date)
                }}
                options={dateFiltersPresetOptions}
              >
                <div className="relative flex w-full items-center px-2 text-xs">
                  {/* Input for display */}
                  <Input
                    value={
                      String(value) ||
                      (isValidDate(date)
                        ? format(date as Date, "LLL dd, y")
                        : "")
                    }
                    className="h-8 w-full bg-zinc-900 pr-10 text-xs"
                  />
                  {value && (
                    <XCircle
                      size={18}
                      onClick={(e) => {
                        setValue("")
                      }}
                      className="absolute right-10 top-1/2 -translate-y-1/2 transform cursor-pointer"
                    />
                  )}
                  <SelectTrigger>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
                    />
                  </SelectTrigger>
                </div>
              </DataTableSelect>
            </div>
          )}

          {["is-between"].includes(condition) && (
            <div className="flex items-center space-x-2 px-2">
              <Input
                value={
                  calendarMode === "single" && date
                    ? format(date as Date, "LLL dd, y")
                    : date && "from" in date && date.from
                      ? format(date.from, "LLL dd, y")
                      : ""
                }
                onChange={(e) => {
                  const val = e.target.value
                  //reset to undefined
                  if (!val) {
                    setDate((prev) => ({ ...prev, from: undefined }))
                    return
                  }
                  const date = new Date(val as any)
                  const isValid = date instanceof Date
                  if (isValid) setDate((prev) => ({ ...prev, from: date }))
                }}
                placeholder="Start"
                className="h-8 flex-1 bg-zinc-900 text-xs"
              />
              <Input
                value={
                  calendarMode === "range" && date && "to" in date && date.to
                    ? format(date.to, "LLL dd, y")
                    : ""
                }
                placeholder="End"
                className="h-8 flex-1 bg-zinc-900 text-xs"
              />
            </div>
          )}

          {["is-relative-to-today"].includes(condition) && (
            <div className="flex items-center space-x-2 px-2">
              <DataTableSelect
                value={direction}
                onValueChange={setDirection}
                options={[
                  { label: "Past", value: "past" },
                  { label: "Next", value: "next" },
                  { label: "This", value: "this" },
                ]}
              >
                <SelectTrigger className="flex items-center gap-2 rounded-md border p-2 text-xs">
                  <SelectValue
                    className="w-auto text-xs"
                    placeholder="Select"
                  />
                  <ChevronDown size={12} />
                </SelectTrigger>
              </DataTableSelect>
              {["past", "next"].includes(direction) && (
                <div className="relative flex items-center justify-between text-xs">
                  <Input value={count} className="h-8 w-12 bg-zinc-900 p-2" />
                  <NumberInputStepper
                    min={1}
                    max={10}
                    value={count}
                    onChange={setCount}
                    className="absolute right-2"
                  />
                </div>
              )}

              <DataTableSelect
                value={period}
                onValueChange={setPeriod}
                options={datePeriodOptions(
                  count > 1 && direction !== "this" ? "s" : ""
                )}
              >
                <SelectTrigger className="flex items-center gap-2 rounded-md border p-2 text-xs">
                  <SelectValue
                    className="w-auto text-xs"
                    placeholder="Select"
                  />
                  <ChevronDown size={12} />
                </SelectTrigger>
              </DataTableSelect>
            </div>
          )}
          {!isEmptyOrNotEmpty && (
            <div className="mx-auto">
              <Calendar
                initialFocus
                selected={date}
                defaultMonth={isValidDate(date) ? date : date?.from}
                month={month}
                onMonthChange={(month) => setMonth(month)}
                onSelect={(val: any) => {
                  setValue("")
                  setDate(val as any)
                }}
                mode={calendarMode}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function DataTableFilterText({ ...props }: DataTableFilterProps) {
  const [open, setOpen] = useState(false)
  const [condition, setCondition] = useState("is")
  const [text, setText] = useState(props.filter.value)

  const isEmptyOrNotEmpty = ["is-empty", "is-not-empty"].includes(condition)

  useEffect(() => {
    if (props.filter.value) setText(String(props.filter.value))
  }, [props.filter.value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-8 gap-0 rounded-full px-3 text-xs",
            (text || isEmptyOrNotEmpty) &&
              "border-[#fb5727] border-opacity-15 bg-[#fb5727] bg-opacity-5 text-button-primary hover:bg-[#fb5727] hover:bg-opacity-20 hover:text-button-primary"
          )}
        >
          <Text size={14} />
          &nbsp;
          {props.filter.label || props.filter.column}
          {isEmptyOrNotEmpty && (
            <p>
              :&nbsp;{" "}
              {
                datefiltersOptions.find((item) => item.value === condition)
                  ?.label
              }{" "}
            </p>
          )}
          {text && <p>:&nbsp;{String(text)}</p>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[260px] gap-0 bg-zinc-900 p-0 px-4 py-2">
        <div className="space-y-1 p-0">
          <div className="flex justify-start space-x-2">
            <Label className="text-xs text-zinc-400">
              {props.filter.label || props.filter.column}:{" "}
            </Label>
            <DataTableSelect
              value={condition}
              onValueChange={setCondition}
              options={textFilterOptions}
            >
              <SelectTrigger className="flex items-center gap-2 text-xs text-zinc-400">
                <SelectValue
                  className="w-auto border-none text-xs"
                  placeholder="Select"
                />
                <ChevronDown size={12} />
              </SelectTrigger>
            </DataTableSelect>
          </div>
          {!isEmptyOrNotEmpty && (
            <Input
              className="h-8 bg-zinc-900"
              value={String(text)}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function DataTableFilterProfile({ ...props }: DataTableFilterProps) {
  const [open, setOpen] = useState(false)
  const [condition, setCondition] = useState("contains")
  const [profiles, setProfiles] = useState<OptionWithUrl[]>([])

  const isEmptyOrNotEmpty = ["is-empty", "is-not-empty"].includes(condition)

  useEffect(() => {
    props.filter.condition && setCondition(props.filter.condition)
    props.filter.value && setProfiles(props.filter.value as OptionWithUrl[])
  }, [props.filter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-8 rounded-full px-3 text-xs",
            (profiles.length > 0 || isEmptyOrNotEmpty) &&
              "border-[#fb5727] border-opacity-15 bg-[#fb5727] bg-opacity-5 text-button-primary hover:bg-[#fb5727] hover:bg-opacity-20 hover:text-button-primary"
          )}
        >
          <UserIcon size={14} />
          &nbsp;
          {props.filter.column}
          {isEmptyOrNotEmpty && (
            <p>
              {" "}
              :&nbsp;{" "}
              {
                datefiltersOptions.find((item) => item.value === condition)
                  ?.label
              }{" "}
            </p>
          )}
          {profiles.length > 0 && !isEmptyOrNotEmpty && (
            <p>
              :&nbsp;
              {profiles.map((profile, id) => profile.label).join(", ")}
            </p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "max-w-[260px] gap-0 bg-zinc-900 p-0 px-2",
          ["contains", "does-not-contains"].includes(condition)
            ? "h-[380px]"
            : "h-auto w-auto"
        )}
      >
        <div className="space-y-1 p-1">
          <div className="flex justify-start space-x-2">
            <Label className="text-xs text-zinc-400">
              {props.filter.column}:{" "}
            </Label>
            <DataTableSelect
              value={condition}
              onValueChange={setCondition}
              options={profileFilterOptions}
            >
              <SelectTrigger className="flex items-center gap-2 text-xs text-zinc-400">
                <SelectValue
                  className="w-auto border-none text-xs"
                  placeholder="Select"
                />
                <ChevronDown size={12} />
              </SelectTrigger>
            </DataTableSelect>
          </div>
          {["contains", "does-not-contains"].includes(condition) && (
            <MultipleSelector
              onChange={(profiles) => {
                setProfiles(profiles)
              }}
              className="border-zinc-500 p-1"
              badgeClassName="bg-transparent hover:bg-transparent border-zinc-700"
              options={props.options}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}