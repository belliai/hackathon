"use client"

import { ReactNode, useEffect, useState } from "react"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Column, ColumnDef, ColumnMeta, Table } from "@tanstack/react-table"
import {
  ArrowDownAZIcon,
  ArrowLeftIcon,
  ArrowUpAZIcon,
  CalendarIcon,
  ChevronDown,
  FilterIcon,
  FilterXIcon,
  PlusIcon,
  SearchCheck,
  Text,
  Trash,
  UserIcon,
} from "lucide-react"
import { DateRange } from "react-day-picker"
import { useDebounceValue } from "usehooks-ts"

import NumberInputStepper from "../form/number-input-stepper"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import DateInput from "../ui/date-input"
import { Input } from "../ui/input"
import MultipleSelector from "../ui/multi-selector"
import { Popover, PopoverContent } from "../ui/popover"
import { SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import {
  datefiltersOptions,
  dateFiltersPresetOptions,
  datePeriodOptions,
  dummyUserOptions,
  profileFilterOptions,
  textFilterOptions,
} from "./data"
import { DataTableColumnOption } from "./data-table-column-option"
import DataTableSelect from "./data-table-select"
import { FilterData, FilterKey, FilterType, FilterValue } from "./types"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  children: ReactNode
  isLocked?: boolean
  lockedPageFilters: any
  filterRules: (filters: FilterData[]) => void
  onOpenChange?: (open: boolean) => void
}

const DEFAULT_FILTER_DATA: FilterData = {
  id: 1,
  column: "",
  value: "",
  type: "text",
}

export function DataTableFilterOptions<TData>({
  table,
  isLocked,
  lockedPageFilters,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const [filterList, setFilterList] = useState<(typeof DEFAULT_FILTER_DATA)[]>([
    DEFAULT_FILTER_DATA,
  ])

  const filterableColumns = table
    .getAllColumns()
    .filter(
      (col) =>
        Boolean(col.accessorFn) && col.getIsVisible() && col.getCanFilter()
    )
    .sort((a, b) => b.getFilterIndex() - a.getFilterIndex())

  const columnOptions = filterableColumns.map((columnItem) => {
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

  const handleAddFilter = () => {
    setFilterList([
      ...filterList,
      { ...DEFAULT_FILTER_DATA, id: filterList.length + 1 },
    ])
  }

  const handleRemoveFilter = (id: number) => {
    setFilterList(filterList.filter((filter) => filter.id !== id))
    table.resetColumnFilters()
  }

  const handleChangeFilter = (
    id: number,
    values: FilterValue | FilterValue[],
    identifiers: string | string[]
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
                updatedFilter[identifier] = (
                  values as unknown as Array<string | number>
                )[idx] as never
              }
            )
            return updatedFilter
          } else {
            // Handle single update
            return {
              ...filter,
              [identifiers as FilterKey]: values as FilterValue,
            }
          }
        }
        return filter
      })
    )
  }

  useEffect(() => {
    filterList.forEach((filter) => {
      if (filter.column) {
        // table.getColumn(filter.column)?.setFilterValue(filter.value)
      }
    })
  }, [filterList, table])

  useEffect(() => {
    const reformatColumnFilter = (lockedPageFilters?.columnFilters ?? []).map(
      (filter: any, index: number) => ({
        id: `${filter.id}-${index}`,
        column: filter.id,
        value: filter.value,
      })
    )
    setFilterList(
      isLocked
        ? [DEFAULT_FILTER_DATA]
        : [...(reformatColumnFilter ?? []), ...filterList]
    )
  }, [isLocked])

  useEffect(() => {
    props.filterRules(filterList)
  }, [filterList])

  return (
    <Popover onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[600px] flex-col gap-2 border-zinc-700 bg-zinc-900 p-4"
      >
        {filterList.map((filter, index) => {
          const isEmptyOrNotEmpty =
            !filter.condition ||
            ["is-empty", "is-not-empty"].includes(filter.condition)
          return (
            <div key={filter.id} className="flex items-center gap-2">
              <div className="min-w-14 grow-0 text-sm">
                {index === 0 ? "WHERE" : "AND"}
              </div>

              <div className="min-w-32">
                <DataTableColumnOption
                  options={columnOptions}
                  onValueChange={(value) => {
                    const column = filterableColumns.find(
                      (col) => col.id === value
                    )
                    const columnType =
                      column?.columnDef.meta?.columnType || "text"
                    if (column)
                      handleChangeFilter(
                        filter.id,
                        [columnType, value],
                        ["type", "column"]
                      )
                  }}
                >
                  <Button
                    className="w-full justify-between gap-2 text-xs"
                    variant={"outline"}
                  >
                    <div className="flex gap-1">
                      {filter.type === "date" && (
                        <>
                          <CalendarIcon className="mr-2 h-4 w-4" />

                          {/* {filter.value && formatFilterValue(filter)} */}
                        </>
                      )}
                      {filter.type === "text" && filter.column && (
                        <>
                          <Text className="mr-2 h-4 w-4" />
                          {filter.value && filter.value}
                        </>
                      )}

                      {filter.type === "profile" && (
                        <>
                          <UserIcon className="mr-2 h-4 w-4" />
                          {filter.value && filter.value}
                        </>
                      )}

                      {filter.column || "Select Column"}
                    </div>
                    <ChevronDown size={12} />
                  </Button>
                </DataTableColumnOption>
              </div>

              {filter.type === "date" && (
                <div className="flex min-w-64 gap-2">
                  <DataTableSelect
                    value={filter.condition as string}
                    onValueChange={(value) =>
                      handleChangeFilter(filter.id, [value], ["condition"])
                    }
                    options={datefiltersOptions}
                  >
                    <SelectTrigger className="flex items-center gap-2 text-xs">
                      <SelectValue
                        className="w-auto border-none text-xs"
                        placeholder="Select"
                      />
                    </SelectTrigger>
                  </DataTableSelect>

                  {![
                    "is-between",
                    "is-relative-to-today",
                    "is-empty",
                    "is-not-empty",
                  ].includes(filter.condition as string) && (
                    <DataTableSelect
                      value={filter.preset as string}
                      onValueChange={(value) =>
                        handleChangeFilter(filter.id, [value], ["preset"])
                      }
                      options={dateFiltersPresetOptions}
                    >
                      <SelectTrigger className="flex items-center gap-2 text-xs">
                        <SelectValue
                          className="w-auto border-none text-xs"
                          placeholder="Select"
                        />
                      </SelectTrigger>
                    </DataTableSelect>
                  )}

                  {["is-between"].includes(filter.condition as string) && (
                    <DateInput
                      className="text-xs"
                      onChange={(value) => {
                        handleChangeFilter(filter.id, value, "value")
                      }}
                      onBlur={() => {}}
                      name=""
                      mode="range"
                      disabledMatcher={(v) => false}
                      value={{
                        from: (filter.value as DateRange)?.from || new Date(),
                        to: (filter.value as DateRange)?.to || new Date(),
                      }}
                    />
                  )}

                  {["is-relative-to-today"].includes(
                    filter.condition as string
                  ) && (
                    <div className="flex items-center space-x-2 px-2">
                      <DataTableSelect
                        value={filter.direction ?? "this"}
                        onValueChange={(value) => {
                          handleChangeFilter(filter.id, value, "direction")
                        }}
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
                        </SelectTrigger>
                      </DataTableSelect>
                      {["past", "next"].includes(
                        filter.direction as string
                      ) && (
                        <div className="relative flex items-center justify-between text-xs">
                          <Input
                            value={filter.count ?? 1}
                            className="h-8 w-12 bg-zinc-900 p-2"
                          />
                          <NumberInputStepper
                            min={1}
                            max={10}
                            value={filter.count ?? 1}
                            onChange={(value) => {
                              handleChangeFilter(filter.id, value, "count")
                            }}
                            className="absolute right-2"
                          />
                        </div>
                      )}

                      <DataTableSelect
                        value={filter.period ?? "day"}
                        onValueChange={(value) => {
                          handleChangeFilter(filter.id, value, "period")
                        }}
                        options={datePeriodOptions(
                          (filter.count ?? 0) > 1 && filter.direction !== "this"
                            ? "s"
                            : ""
                        )}
                      >
                        <SelectTrigger className="flex items-center gap-2 rounded-md border p-2 text-xs">
                          <SelectValue
                            className="w-auto text-xs"
                            placeholder="Select"
                          />
                        </SelectTrigger>
                      </DataTableSelect>
                    </div>
                  )}
                </div>
              )}

              {filter.type === "text" && (
                <div className="flex min-w-40 gap-2">
                  <DataTableSelect
                    value={filter.condition as string}
                    onValueChange={(value) =>
                      handleChangeFilter(filter.id, [value], ["condition"])
                    }
                    options={textFilterOptions}
                  >
                    <SelectTrigger className="flex items-center gap-2 text-xs">
                      <SelectValue
                        className="w-auto border-none text-xs"
                        placeholder="Select"
                      />
                    </SelectTrigger>
                  </DataTableSelect>

                  {!isEmptyOrNotEmpty && (
                    <Input
                      className="border-zinc-700"
                      value={filter.value as string}
                      onChange={(e) => {
                        handleChangeFilter(filter.id, e.target.value, "value")
                      }}
                    />
                  )}
                </div>
              )}

              {filter.type === "profile" && (
                <div className="flex min-w-40 items-center gap-2">
                  <DataTableSelect
                    value={filter.condition as string}
                    onValueChange={(value) =>
                      handleChangeFilter(filter.id, [value], ["condition"])
                    }
                    options={profileFilterOptions}
                  >
                    <SelectTrigger className="flex items-center gap-2 text-xs">
                      <SelectValue
                        className="w-auto border-none text-xs"
                        placeholder="Select"
                      />
                    </SelectTrigger>
                  </DataTableSelect>

                  {["contains", "does-not-contains"].includes(
                    filter.condition as string
                  ) && (
                    <MultipleSelector
                      onChange={(profiles) => {}}
                      className="w-36 border-zinc-500 bg-zinc-900 p-1"
                      badgeClassName="bg-transparent hover:bg-transparent border-zinc-700"
                      options={dummyUserOptions}
                    />
                  )}
                </div>
              )}

              <Button
                className="w-fit bg-zinc-800 text-white hover:bg-zinc-700"
                onClick={() => handleRemoveFilter(filter.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )
        })}

        <Button
          className="w-fit bg-zinc-800 text-white hover:bg-zinc-700"
          onClick={() => handleAddFilter()}
        >
          <PlusIcon className="h-4 w-4" /> Add Filter
        </Button>
      </PopoverContent>
    </Popover>
  )
}

const ColumnFilterView = <TData,>(props: {
  column: Column<TData>
  onClose: () => void
}) => {
  const { column, onClose } = props
  const [filterValue, setFilterValue] = useState<string>(
    column.getFilterValue() as string
  )
  const [debouncedFilter] = useDebounceValue(filterValue, 200)

  useEffect(() => {
    column.setFilterValue(
      Boolean(debouncedFilter) ? debouncedFilter : undefined
    )
  }, [debouncedFilter])

  const meta = column.columnDef.meta
  const options = meta?.filterSelectOptions
  const isDate = meta?.isDateFilter

  return (
    <div className="">
      <div className="flex flex-row items-center gap-2 p-2 text-sm">
        <Button
          onClick={onClose}
          variant={"ghost"}
          size={"icon"}
          className="size-6"
        >
          <ArrowLeftIcon className="size-4 text-muted-foreground" />
        </Button>
        Apply filter for {String(column.columnDef.header)}
      </div>
      <Separator />
      <div className="">
        {isDate ? (
          <DateInput
            onBlur={() => {}}
            name="date"
            value={filterValue}
            onChange={setFilterValue}
          />
        ) : options ? (
          <Command>
            <CommandInput placeholder="Search for a value..." />
            <CommandList className="custom-scrollbar">
              <CommandEmpty>No column found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => setFilterValue(option.value)}
                      className="flex flex-row items-center justify-between"
                    >
                      {option.label}
                      {option.value === filterValue && (
                        <SearchCheck className="size-4 text-muted-foreground" />
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <Input
            value={filterValue}
            className="rounded-none border-none px-4 focus-visible:ring-0"
            placeholder="Apply filter..."
            onChange={(e) => setFilterValue(e.target.value)}
            rightIcon={<FilterIcon className="w-4 text-muted-foreground" />}
          />
        )}
      </div>
    </div>
  )
}
