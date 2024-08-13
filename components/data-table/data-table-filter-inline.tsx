import { ReactNode, useEffect, useState } from "react"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Table } from "@tanstack/react-table"
import { addDays, format, subDays } from "date-fns"
import {
  Calendar as CalendarIcon,
  ChevronDown,
  PlusIcon,
  Text,
  UserIcon,
  XCircle,
} from "lucide-react"
import { DateRange } from "react-day-picker"
import { isValidDate } from "rrule/dist/esm/dateutil"

import { cn } from "@/lib/utils"

import NumberInputStepper from "../form/number-input-stepper"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import MultipleSelector from "../ui/multi-selector"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import DataTableSelect from "./data-table-select"

interface FilterData {
  id: number
  column: string
  value: string | number | Date | Date[] | DateRange | undefined
  type: string
  condition?: string
  isLocked?: boolean
}
const DEFAULT_FILTER_DATA: FilterData = {
  id: 1,
  column: "",
  value: "",
  type: "text",
}

type FilterKey = "column" | "value" | "type" | "condition"

interface DataTableFilterOptionsProps<TData> {
  table: Table<TData>
  isLocked: boolean
  lockedPageFilters: any
  onOpenChange: (open: boolean) => void
}

const dummyUserOptions = [
  { label: "User1", value: "user1", url: "#" },
  { label: "User2", value: "user2", url: "#" },
  { label: "User3", value: "user3", url: "#" },
  { label: "User4", value: "user4", url: "#" },
  { label: "User5", value: "user5", url: "#" },
  { label: "User6", value: "user6", url: "#" },
  { label: "User7", value: "user7", url: "#" },
  { label: "User8", value: "user8", url: "#" },
]

const datefiltersOptions: { value: string; label: string }[] = [
  { value: "is", label: "Is" },
  { value: "is-before", label: "Is before" },
  { value: "is-after", label: "Is after" },
  { value: "is-on-or-before", label: "Is on or before" },
  { value: "is-on-or-after", label: "Is on or after" },
  { value: "is-between", label: "Is between" },
  { value: "is-relative-to-today", label: "Is relative to today" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
]

const textFilterOptions: { value: string; label: string }[] = [
  { value: "is", label: "Is" },
  { value: "is-not", label: "Is not" },
  { value: "contains", label: "Contains" },
  { value: "does-not-contains", label: "Does not contains" },
  { value: "starts-with", label: "Starts With" },
  { value: "ends-with", label: "Ends With" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
]

const dateFiltersPresetOptions: { value: string; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "yesterday", label: "Yesterday" },
  { value: "one-week-ago", label: "One week ago" },
  { value: "one-week-from-now", label: "One week from now" },
  { value: "one-month-ago", label: "One month ago" },
  { value: "one-month-from-now", label: "One month from now" },
  { value: "custom-date", label: "Custom date" },
]

const datePeriodOptions = (
  additional?: string
): { value: string; label: string }[] => {
  const s = additional || ""
  return [
    { value: "day", label: "Day" + s },
    { value: "week", label: "Week" + s },
    { value: "month", label: "Month" + s },
    { value: "year", label: "Year" + s },
  ]
}

const profileFilterOptions: { value: string; label: string }[] = [
  { value: "contains", label: "Contains" },
  { value: "does-not-contains", label: "Does not contains" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
]

function mapValueToDate(value: string, customDate?: Date): Date | undefined {
  const today = new Date()

  switch (value) {
    case "today":
      return today
    case "tomorrow":
      return addDays(today, 1)
    case "yesterday":
      return subDays(today, 1)
    case "one-week-ago":
      return subDays(today, 7)
    case "one-week-from-now":
      return addDays(today, 7)
    case "one-month-ago":
      return subDays(today, 30) // Adjust for accurate month handling
    case "one-month-from-now":
      return addDays(today, 30) // Adjust for accurate month handling
    case "custom-date":
      return customDate
    default:
      return undefined
  }
}

export function DataTableFilterInline<TData>({
  table,
  isLocked,
  lockedPageFilters,
  ...props
}: DataTableFilterOptionsProps<TData>) {
  const [filterList, setFilterList] = useState<(typeof DEFAULT_FILTER_DATA)[]>(
    []
  )

  const filterableColumns = table
    .getAllColumns()
    .filter(
      (col) =>
        Boolean(col.accessorFn) && col.getIsVisible() && col.getCanFilter()
    )
    .sort((a, b) => b.getFilterIndex() - a.getFilterIndex())

  const isFiltered = (column: string) =>
    filterList.map((item) => item.column).includes(column)

  const columnOptions = filterableColumns
    .filter((col) => !isFiltered(col.id))
    .map((columnItem) => {
      let label = ""
      const value = columnItem.id
      const header = columnItem?.columnDef?.header
      const columnType = columnItem?.columnDef.meta?.columnType || "text"

      if (typeof header === "string") {
        label = header
      } else if (typeof header === "function") {
        label = (header as () => string)() // Assuming the function returns a string, you'll need to call it to get the label
      }

      return { label, value, type: columnType }
    })

  const handleAddFilter = ({
    column,
    type,
  }: {
    column: string
    type: string
  }) => {
    setFilterList([
      ...filterList,
      { column, type, value: "", id: filterList.length + 1 },
    ])
  }

  const handleRemoveFilter = (id: number) => {
    setFilterList(filterList.filter((filter) => filter.id !== id))
    table.resetColumnFilters()
  }

  const handleChangeFilter = (
    id: number,
    values: string | string[] | Date | Date[] | DateRange | undefined,
    identifiers: string | string[],
    index: number
  ) => {
    const isArray = Array.isArray(values) && Array.isArray(identifiers)

    if (isArray && identifiers.includes("column")) table.resetColumnFilters()
    else if (!isArray && identifiers === "column") table.resetColumnFilters()

    setFilterList(
      filterList.map((filter) => {
        if (filter.id === id) {
          if (isArray) {
            // Handle multiple updates
            let updatedFilter = { ...filter }
            ;(identifiers as FilterKey[]).forEach(
              (identifier: FilterKey, idx: number) => {
                updatedFilter[identifier] = (values as Array<string | number>)[
                  idx
                ] as never
              }
            )
            return updatedFilter
          } else {
            // Handle single update
            return { ...filter, [identifiers as FilterKey]: values as never }
          }
        }
        return filter
      })
    )
  }

  return (
    <div className="my-1 flex items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {filterList.map((filter, index) => {
          return (
            <div key={index}>
              {filter.type === "date" && (
                <DataTableFilterDate
                  column={filter.column}
                  value={mapValueToDate(filter.value as any)}
                  onValueChange={console.log}
                />
              )}

              {filter.type === "profile" && (
                <DataTableFilterProfile
                  column={filter.column}
                  value={filter.value as string}
                  onValueChange={console.log}
                  options={dummyUserOptions}
                />
              )}

              {(filter.type === "text" || !filter.type) && (
                <DataTableFilterText
                  column={filter.column}
                  value={mapValueToDate(filter.value as any)}
                  onValueChange={console.log}
                />
              )}
            </div>
          )
        })}
        <DataTableFilterOptions
          options={columnOptions}
          onValueChange={(value) => {
            const column = filterableColumns.find((col) => col.id === value)
            const columnType = column?.columnDef.meta?.columnType || "text"
            if (column)
              handleAddFilter({ column: column?.id, type: columnType })
          }}
        >
          <Button className="gap-1 text-xs text-zinc-500" variant={"ghost"}>
            <PlusIcon size={12} />
            Add Filter
          </Button>
        </DataTableFilterOptions>
      </div>
      {filterList.length > 0 && (
        <Button
          variant={"ghost"}
          onClick={() => setFilterList([])}
          className="gap-1 text-xs text-zinc-500"
        >
          Reset
        </Button>
      )}
    </div>
  )
}

interface DataTableFilterOption<TData> {
  children: ReactNode
  options: { label: string; value: string; type?: string }[]
  onValueChange: (val: string) => void
}

export function DataTableFilterOptions<TData>({
  ...props
}: DataTableFilterOption<TData>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>No Column found.</CommandEmpty>
            <CommandGroup>
              {props.options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    props.onValueChange(currentValue)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                  {option.type === "date" && (
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  )}
                  {option.type === "text" && <Text className="mr-2 h-4 w-4" />}

                  {option.type === "profile" && (
                    <UserIcon className="mr-2 h-4 w-4" />
                  )}

                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type SingleDate = Date | undefined
type MultipleDates = Date[] | undefined
type RangeDate = DateRange | undefined

interface DataTableFilterProps {
  column: string
  value?: SingleDate | MultipleDates | RangeDate | string
  onValueChange: (val: SingleDate | MultipleDates | RangeDate) => void
  options?: { label: string; value: string }[]
}

export function DataTableFilterDate({ ...props }: DataTableFilterProps) {
  const [open, setOpen] = useState(false)
  const [condition, setCondition] = useState("is")
  const [current, setCurrent] = useState("this")
  const [period, setPeriod] = useState("day")
  const [count, setCount] = useState(1)
  const [calendarMode, setCalendarMode] = useState<any>("single")
  const [value, setValue] = useState("")
  const [month, setMonth] = useState<Date>(new Date())
  const [date, setDate] = useState<DateRange | Date | undefined>(
    calendarMode === "range"
      ? {
          from: new Date(2022, 0, 20),
          to: addDays(new Date(2022, 0, 20), 20),
        }
      : new Date(2022, 0, 20)
  )

  useEffect(() => {
    if (condition === "is-between") setCalendarMode("range")
    else setCalendarMode("single")
    //reset date
    setDate(undefined)
  }, [condition])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <CalendarIcon size={14} /> Date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[260px] gap-0 bg-zinc-900 p-0">
        <div className="flex w-full flex-col space-y-2 py-2">
          <div className="flex justify-start space-x-2 px-4">
            <Label className="text-xs text-zinc-400">{props.column}: </Label>
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
                value={value}
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
                      value ||
                      (isValidDate(date)
                        ? format(date as Date, "LLL dd, y")
                        : "")
                    }
                    className="h-8 w-full bg-zinc-900 pr-10"
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
                className="h-8 flex-1 bg-zinc-900"
              />
              <Input
                value={
                  calendarMode === "range" && date && "to" in date && date.to
                    ? format(date.to, "LLL dd, y")
                    : ""
                }
                placeholder="End"
                className="h-8 flex-1 bg-zinc-900"
              />
            </div>
          )}

          {["is-relative-to-today"].includes(condition) && (
            <div className="flex items-center space-x-2 px-2">
              <DataTableSelect
                value={current}
                onValueChange={setCurrent}
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
              {["past", "next"].includes(current) && (
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
                  count > 1 && current !== "this" ? "s" : ""
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
          {!["is-empty", "is-not-empty"].includes(condition) && (
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
  const [value, setValue] = useState("is")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <Text size={14} />
          {props.column}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[260px] gap-0 bg-zinc-900 p-0 px-4 py-2">
        <div className="space-y-1 p-0">
          <div className="flex justify-start space-x-2">
            <Label className="text-xs text-zinc-400">{props.column}: </Label>
            <DataTableSelect
              value={value}
              onValueChange={setValue}
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
          {!["is-empty", "is-not-empty"].includes(value) && <Input className="h-8 bg-zinc-900" /> }
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function DataTableFilterProfile({ ...props }: DataTableFilterProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("contains")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <UserIcon size={14} />
          {props.column}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(" max-w-[260px] gap-0 bg-zinc-900 p-0 px-2",
        ["contains","does-not-contains"].includes(value) ? "h-[380px]" : "w-auto h-auto"
      )}>
        <div className="space-y-1 p-1">
          <div className="flex justify-start space-x-2">
            <Label className="text-xs text-zinc-400">{props.column}: </Label>
            <DataTableSelect
              value={value}
              onValueChange={setValue}
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
          {["contains", "does-not-contains"].includes(value) && (
            <MultipleSelector options={props.options} />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
