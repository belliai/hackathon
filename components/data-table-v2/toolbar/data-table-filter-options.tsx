"use client"

import { ReactNode, useEffect, useState } from "react"
import { PopoverTrigger } from "@radix-ui/react-popover"
import {
  CalendarClock,
  CalendarIcon,
  ChevronDown,
  Clock3,
  FileDigit,
  FileSymlink,
  PlusIcon,
  Save,
  Text,
  Trash,
  UserIcon,
} from "lucide-react"
import { DateRange } from "react-day-picker"

import {
  FilterData,
  FilterKey,
  FilterType,
  FilterValue,
  OperatorTypes,
} from "@/types/table/filters"
import { useSaveFilters } from "@/lib/hooks/filters"
import { useGeneralSearch } from "@/lib/hooks/general"
import { cn } from "@/lib/utils"
import {
  arrayToOptions,
  datefiltersOptions,
  dateFiltersPresetOptions,
  datePeriodOptions,
  dummyUserOptions,
  mapFiltersToSave,
  mapValueToDate,
  profileFilterOptions,
  textFilterOptions,
} from "@/lib/utils/table-filter-utils"
import { Button } from "@/components/ui/button"
import DateInput from "@/components/ui/date-input"
import { Input } from "@/components/ui/input"
import MultipleSelector from "@/components/ui/multi-selector"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { SelectTrigger, SelectValue } from "@/components/ui/select"
import TimeInput from "@/components/ui/time-input"
import { OptionWithType } from "@/components/data-table/types"
import NumberInputStepper from "@/components/form/number-input-stepper"

import { useDataTableContext } from "../data-table-context"
import { DataTableColumnOption } from "./data-table-column-option"
import DataTableSelect from "./data-table-select"
import { toast } from "@/components/ui/use-toast"

interface DataTableViewOptionsProps<TData> {
  children: ReactNode
  isLocked?: boolean
  lockedPageFilters: any

  onOpenChange?: (open: boolean) => void
}

const DEFAULT_FILTER_DATA: FilterData = {
  id: 1,
  column: "",
  value: "",
  type: "string",
}

const conditionOptions = [
  { label: "OR", value: "OR" },
  { label: "AND", value: "AND" },
]

export function DataTableFilterOptions<TData>({
  isLocked,
  lockedPageFilters,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const { columns, filters, onFiltersChange, tableKey, setLogicalOperator } = useDataTableContext()

  const [localFilters, setLocalFilters] = useState<FilterData[]>([
    DEFAULT_FILTER_DATA,
  ])
  const [open, setOpen] = useState(false)
  const [logicaloperator, setLogicaloperator] = useState("AND")

  const save = useSaveFilters()

  console.log({ columns, filters })

  const allColumns = columns
    ? Object.values(columns)
        .filter((key) => Array.isArray(key))
        .flatMap((item) => item)
    : []

  const columnOptions = allColumns?.map((columnItem) => {
    const label = columnItem.column_name
    const value = columnItem.id
    // making them all text for now until backend API returns a "type" property which we can map out what to render
    const type = columnItem.column_type
    return { label, value, type }
  })

  const operators = columns.operator_types as OperatorTypes

  const handleAddFilter = () => {
    const maxId =
      localFilters.length > 0
        ? Math.max(...localFilters.map((obj) => obj.id))
        : 0
    setLocalFilters([
      ...localFilters,
      { ...DEFAULT_FILTER_DATA, id: maxId + 1 },
    ])
  }

  const handleRemoveFilter = (id: number) => {
    setLocalFilters(localFilters.filter((filter) => filter.id !== id))
  }

  const handleChangeFilter = (
    id: number,
    values: FilterValue | FilterValue[],
    identifiers: string | string[]
  ) => {
    const isArray = Array.isArray(values) && Array.isArray(identifiers)

    setLocalFilters(
      localFilters.map((filter) => {
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
    const reformatColumnFilter = (lockedPageFilters?.columnFilters ?? []).map(
      (filter: any, index: number) => ({
        id: `${filter.id}-${index}`,
        column: filter.id,
        value: filter.value,
      })
    )
    setLocalFilters(
      isLocked
        ? [DEFAULT_FILTER_DATA]
        : [...(reformatColumnFilter ?? []), ...localFilters]
    )
  }, [isLocked])

  useEffect(() => {
    filters && setLocalFilters(filters || [DEFAULT_FILTER_DATA])
  }, [filters])

  // useEffect(() => {
  //   savedFilters && setLocalFilters(savedFilters || [DEFAULT_FILTER_DATA])
  // }, [savedFilters])

  console.log(localFilters)

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        props.onOpenChange?.(val)
        setOpen(val)
      }}
    >
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="adrk:dark:border-zinc-700 flex w-[600px] flex-col gap-2 p-4 dark:bg-zinc-900"
      >
        {localFilters.map((filter, index) => {
          const isEmptyOrNotEmpty =
            !filter.condition ||
            ["Is Empty", "Is Not Empty"].includes(filter.condition)
          return (
            <div key={filter.id} className="flex items-center gap-2">
              <div className="flex flex-grow gap-1">
                <div className="mx-0 my-auto h-full min-w-14 grow-0 text-sm">
                  {index === 0 && "WHERE"}

                  {index === 1 && (
                    <DataTableSelect
                      value={logicaloperator}
                      onValueChange={(val) => {
                        // handleChangeFilter(filter.id, val, "operator")
                        setLogicaloperator(val)
                        setLogicalOperator(val)
                      }}
                      options={conditionOptions}
                    >
                      <SelectTrigger className="flex items-center gap-2 text-xs">
                        <SelectValue
                          className="w-auto border-none text-xs"
                          placeholder="Select"
                        />
                        {/* <p>{filter.operator ?? "AND"}</p> */}
                      </SelectTrigger>
                    </DataTableSelect>
                  )}

                  {index > 1 && (
                    <p className="text-right text-xs">
                      {logicaloperator}&nbsp;
                    </p>
                  )}
                </div>

                <div className="flex min-w-32 items-center">
                  <DataTableColumnOption
                    options={columnOptions}
                    onValueChange={(value) => {
                      const column = allColumns.find((col) => col.id === value)
                      const columnType = column?.column_type

                      const label = columnOptions.find(
                        (item) => value === item.value
                      )?.label

                      if (column)
                        handleChangeFilter(
                          filter.id,
                          [columnType, value, label, ""],
                          ["type", "columnConfigId", "label", "value"]
                        )
                    }}
                  >
                    <Button
                      className="w-full justify-between gap-2 text-xs"
                      variant={"outline"}
                    >
                      <div className="flex gap-1">
                        {filter.type === "date" && (
                          <CalendarIcon className="mr-2 h-4 w-4" />
                        )}
                        {filter.type === "datetime" && (
                          <CalendarClock className="mr-2 h-4 w-4" />
                        )}

                        {filter.type === "string" && filter.column && (
                          <Text className="mr-2 h-4 w-4" />
                        )}

                        {filter.type === "uuid" && (
                          <FileSymlink className="mr-2 h-4 w-4" />
                        )}

                        {filter.type === "int" && (
                          <FileDigit className="mr-2 h-4 w-4" />
                        )}

                        {filter.type === "time" && (
                          <Clock3 className="mr-2 h-4 w-4" />
                        )}

                        {filter.label || "Select Column"}
                      </div>
                      <ChevronDown size={12} />
                    </Button>
                  </DataTableColumnOption>
                </div>

                {filter.type === "date" && (
                  <div className="flex min-w-64 gap-1">
                    <DataTableSelect
                      value={filter.condition as string}
                      onValueChange={(cond) => {
                        let value
                        if (cond === "is-between") {
                          value = { from: new Date(), to: new Date() }
                          handleChangeFilter(
                            filter.id,
                            [cond, value, "range"],
                            ["condition", "value", "calendarMode"]
                          )
                        } else {
                          handleChangeFilter(filter.id, [cond], ["condition"])
                        }
                      }}
                      options={arrayToOptions(operators.date)}
                    >
                      <SelectTrigger className="flex items-center text-xs">
                        <SelectValue
                          className="w-auto border-none text-xs"
                          placeholder="Select"
                        />
                      </SelectTrigger>
                    </DataTableSelect>

                    {![
                      "is-between",
                      "is-relative-to-today",
                      "Is Empty",
                      "Is Not Empty",
                    ].includes(filter.condition as string) && (
                      <DataTableSelect
                        value={filter.preset as string}
                        onValueChange={(preset) =>
                          handleChangeFilter(
                            filter.id,
                            [preset, mapValueToDate(preset)],
                            ["preset", "value"]
                          )
                        }
                        options={dateFiltersPresetOptions}
                      >
                        <SelectTrigger className="flex items-center text-xs">
                          <SelectValue
                            className="w-auto border-none text-xs"
                            placeholder="Select"
                          />
                        </SelectTrigger>
                      </DataTableSelect>
                    )}

                    {["custom-date"].includes(filter.preset as string) && (
                      <DateInput
                        className="text-xs"
                        onChange={(value) => {
                          handleChangeFilter(
                            filter.id,
                            [value, "single"],
                            ["value", "calendarMode"]
                          )
                        }}
                        onBlur={() => {}}
                        name=""
                        mode="single"
                        disabledMatcher={(v) => false}
                        value={filter.value || new Date()}
                      />
                    )}

                    {["is-between"].includes(filter.condition as string) && (
                      <DateInput
                        className="text-xs"
                        onChange={(value) => {
                          handleChangeFilter(
                            filter.id,
                            [value, "range"],
                            ["value", "calendarMode"]
                          )
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
                      <div className="flex items-center space-x-1">
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
                              className="h-8 w-12 p-2 dark:bg-zinc-900"
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
                            (filter.count ?? 0) > 1 &&
                              filter.direction !== "this"
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

                {filter.type === "string" && (
                  <div className="flex min-w-40 gap-2">
                    <DataTableSelect
                      value={filter.condition as string}
                      onValueChange={(cond) =>
                        handleChangeFilter(filter.id, [cond], ["condition"])
                      }
                      options={arrayToOptions(operators?.string || [])}
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
                      
                        className="flex w-full text-xs dark:border-zinc-700"
                        value={filter.value as string}
                        onChange={(e) => {
                          handleChangeFilter(filter.id, e.target.value, "value")
                        }}
                      />
                    )}
                  </div>
                )}

                {filter.type === "int" && (
                  <div className="flex min-w-40 gap-2">
                    <DataTableSelect
                      value={filter.condition as string}
                      onValueChange={(cond) =>
                        handleChangeFilter(filter.id, [cond], ["condition"])
                      }
                      options={arrayToOptions(operators?.int || [])}
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
                        
                        className="text-xs dark:border-zinc-700"
                        type="number"
                        value={Number(filter.value)}
                        onChange={(e) => {
                          handleChangeFilter(filter.id, e.target.value, "value")
                        }}
                      />
                    )}
                  </div>
                )}

                {filter.type === "time" && (
                  <div className="flex min-w-40 gap-2">
                    <DataTableSelect
                      value={filter.condition as string}
                      onValueChange={(cond) =>
                        handleChangeFilter(filter.id, [cond], ["condition"])
                      }
                      options={arrayToOptions(operators?.time || [])}
                    >
                      <SelectTrigger className="flex items-center gap-2 text-xs">
                        <SelectValue
                          className="w-auto border-none text-xs"
                          placeholder="Select"
                        />
                      </SelectTrigger>
                    </DataTableSelect>

                    {!isEmptyOrNotEmpty && (
                      <TimeInput
                        
                        className="w-48 text-xs"
                        onChange={(value) => {
                          handleChangeFilter(filter.id, [value], ["value"])
                        }}
                        onBlur={() => {}}
                        name=""
                        value={filter.value || new Date()}
                      />
                    )}
                  </div>
                )}

                {filter.type === "uuid" && (
                  <div className="min-w-50 flex items-center gap-2">
                    <DataTableSelect
                      value={filter.condition as string}
                      onValueChange={(cond) =>
                        handleChangeFilter(filter.id, [cond], ["condition"])
                      }
                      options={arrayToOptions(operators?.uuid || [])}
                    >
                      <SelectTrigger className="flex items-center gap-2 text-xs">
                        <SelectValue
                          className="w-auto border-none text-xs"
                          placeholder="Select"
                        />
                      </SelectTrigger>
                    </DataTableSelect>

                    {!isEmptyOrNotEmpty && (
                      <MultipleSelectorWrap
                        className="w-full p-1 dark:border-zinc-500 dark:bg-zinc-900"
                        handleChangeFilter={(selected: any) => {
                          handleChangeFilter?.(filter.id, [selected], ["value"])
                        }}
                        value={filter.value}
                      />
                    )}
                  </div>
                )}
              </div>
              <Button
                className="w-fit text-white dark:bg-zinc-800 hover:dark:bg-zinc-700"
                onClick={() => handleRemoveFilter(filter.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
        <div className="flex justify-between">
          <Button
            className="w-fit gap-2 text-white dark:bg-zinc-800 hover:dark:bg-zinc-700"
            onClick={() => handleAddFilter()}
          >
            <PlusIcon className="h-4 w-4" /> Add Filter
          </Button>

          <Button
            // disabled={localFilters.length == 0}
            className="w-fit gap-2 text-white dark:bg-zinc-800 hover:dark:bg-zinc-700"
            onClick={async () => {
              // save localFilters to parent component
              onFiltersChange && onFiltersChange(localFilters)
              const payload = mapFiltersToSave(
                localFilters,
                logicaloperator,
                tableKey
              )

              try {
                await save.mutateAsync(payload)
                toast({
                  title: "Success",
                  description: "Filters saved successfully",
                })
              } catch (error) {
                console.log(error)
                toast({
                  title: "Error",
                  description: "Failed to save filters",
                })
              }

              setOpen(false)
            }}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const MultipleSelectorWrap = (props: any) => {
  const { handleChangeFilter, value, className } = props
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { refetch } = useGeneralSearch({
    searchTerm,
    basePath: "/locations",
  })

  const handleSearch = (keyword: string): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        setSearchTerm(keyword)
        const { data: searchResults } = await refetch()
        const options = (searchResults || []).map((item: any) => ({
          label: item.airport_code,
          value: item.id,
        }))
        resolve(options || [])
      } catch (err) {
        console.error("Error performing search:", err)
        reject(err)
      }
    })
  }

  return (
    <MultipleSelector
      onChange={handleChangeFilter}
      delay={100}
      onSearch={handleSearch}
      className={cn(className)}
      badgeClassName="bg-transparent hover:bg-transparent dark:border-zinc-700"
      value={value}
    />
  )
}
