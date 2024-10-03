"use client"

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { format } from "date-fns"
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
import { useForm } from "react-hook-form"

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
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MultipleSelector, { useDebounce } from "@/components/ui/multi-selector"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { SelectTrigger, SelectValue } from "@/components/ui/select"
import TimeInput from "@/components/ui/time-input"
import { toast } from "@/components/ui/use-toast"
import { OptionWithType } from "@/components/data-table/types"
import AsyncSearchComboBox from "@/components/form/combobox-async"
import InputSwitch from "@/components/form/InputSwitch"
import NumberInputStepper from "@/components/form/number-input-stepper"

import { useDataTableContext } from "../data-table-context"
import { DataTableColumnOption } from "./data-table-column-option"
import DataTableSelect from "./data-table-select"

interface DataTableViewOptionsProps<TData> {
  children: ReactNode
  isLocked?: boolean
  lockedPageFilters: any

  onOpenChange?: (open: boolean) => void
}

type Focusable = HTMLInputElement | HTMLSelectElement

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
  const {
    columns,
    filters,
    onFiltersChange,
    tableKey,
    setLogicalOperator,
    onRefetchData,
  } = useDataTableContext()

  const [localFilters, setLocalFilters] = useState<FilterData[]>([
    DEFAULT_FILTER_DATA,
  ])
  const [open, setOpen] = useState(false)
  const [localLogicalOperator, setLocalLogicalOperator] = useState("AND")

  const inputRefs = useRef<(Focusable | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, localFilters.length)
  }, [localFilters])

  const focusNextInput = (currentIndex: number) => {
    requestAnimationFrame(() => {
      for (let i = currentIndex + 1; i < inputRefs.current.length; i++) {
        const nextInput = inputRefs.current[i]
        if (nextInput && !nextInput.disabled) {
          nextInput.focus()
          return
        }
      }
    })
  }
  const save = useSaveFilters()

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
                      value={localLogicalOperator}
                      onValueChange={(val) => {
                        // handleChangeFilter(filter.id, val, "operator")
                        setLocalLogicalOperator(val)
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
                      {localLogicalOperator}&nbsp;
                    </p>
                  )}
                </div>

                <div className="flex min-w-32 items-center">
                  <DataTableColumnOption
                    options={columnOptions}
                    onValueChange={(value) => {
                      const column = allColumns.find((col) => col.id === value)
                      const columnType = column?.column_type
                      const searchPath = column?.search_path

                      const label = columnOptions.find(
                        (item) => value === item.value
                      )?.label

                      if (column) {
                        let defaultValue: any = null

                        if (columnType === "int") {
                          defaultValue = filter.value || "0"
                        } else if (columnType === "string") {
                          defaultValue = String(filter.value)
                        } else if (
                          columnType === "date" ||
                          columnType === "time"
                        ) {
                          defaultValue = new Date()
                        } else if (columnType === "uuid") {
                        }

                        handleChangeFilter(
                          filter.id,
                          [columnType, value, label, defaultValue, searchPath],
                          [
                            "type",
                            "columnConfigId",
                            "label",
                            "value",
                            "searchPath",
                          ]
                        )
                        focusNextInput(index)
                      }
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
                        focusNextInput(index)
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
                      onValueChange={(cond) => {
                        handleChangeFilter(filter.id, [cond], ["condition"])
                        focusNextInput(index)
                      }}
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
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
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
                      onValueChange={(cond) => {
                        handleChangeFilter(filter.id, [cond], ["condition"])
                        focusNextInput(index)
                      }}
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
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
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
                        value={filter.value}
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
                      <ComboboxSearch
                        searchPath={filter.searchPath}
                        value={filter.value}
                        onChangeValue={(val: string) => {
                          console.log({ val })
                          handleChangeFilter?.(filter.id, [val], ["value"])
                        }}
                        className="dark:border-1 h-9 w-full rounded-sm px-4 text-xs hover:bg-transparent dark:border-foreground/10"
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
                localLogicalOperator,
                tableKey
              )

              try {
                await save.mutateAsync(payload)
                await onRefetchData()
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

export const ComboboxSearch = (props: any) => {
  const { onChangeValue, value, className, searchPath } = props
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [options, setOptions] = useState<any[]>([])

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const { refetch } = useGeneralSearch({
    searchTerm: debouncedSearchTerm, // Use the debounced search term in the query
    basePath: searchPath,
  })

  const { data: list } = useGeneralSearch({searchTerm:value, basePath: searchPath})

  const item = list?.find((item) => item.id === value)

  useEffect(() => {
    if (value && item) {
      setOptions([
        {
          label: item?.name,
          value: item?.id,
        },
      ])
    }
  }, [value])

  const form = useForm({
    defaultValues: {
      uuid: value,
    },
  })

  const handleSearch = useCallback(
    async (keyword: string): Promise<any[]> => {
      try {
        setSearchTerm(keyword) // Update searchTerm on input change
        const { data: searchResults } = await refetch()

        // Ensure searchResults is an array and properly maps to the expected format
        const newOptions = (searchResults || []).map((item: any) => ({
          label: item.name,
          value: item.id,
        }))

        setOptions(newOptions) // Set options in state
        return newOptions
      } catch (err) {
        console.error("Error performing search:", err)
        return []
      }
    },
    [refetch]
  )

  // Trigger search whenever the debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, handleSearch])

  return (
    <Form {...form}>
      <AsyncSearchComboBox
        searchTerm={searchTerm}
        onSearchChange={(search) => setSearchTerm(search)} // No need to debounce here
        name="uuid"
        onChangeValue={onChangeValue}
        options={options}
        className={className}
      />
    </Form>
  )
}

export const MultipleSelectorWrap = (props: any) => {
  const { handleChangeFilter, value, className } = props
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { refetch } = useGeneralSearch({
    searchTerm,
    basePath: "/locations",
  })

  const handleSearch = async (keyword: string): Promise<any[]> => {
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
