"use client"

import { ReactNode, useEffect, useState } from "react"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Column, ColumnDef, ColumnMeta, Table } from "@tanstack/react-table"
import {
  ArrowDownAZIcon,
  ArrowLeftIcon,
  ArrowUpAZIcon,
  FilterIcon,
  FilterXIcon,
  PlusIcon,
  SearchCheck,
  SearchIcon,
  Trash,
} from "lucide-react"
import { useDebounceValue } from "usehooks-ts"

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
import { Popover, PopoverContent } from "../ui/popover"
import { Separator } from "../ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  children: ReactNode
}

const DEFAULT_FILTER_DATA = {
  id: 1,
  column: "",
  value: "",
};

export function DataTableFilterOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const [filterList, setFilterList] = useState<typeof DEFAULT_FILTER_DATA[]>([DEFAULT_FILTER_DATA]);

  const filterableColumns = table
    .getAllColumns()
    .filter(
      (col) =>
        Boolean(col.accessorFn) && col.getIsVisible() && col.getCanFilter()
    )
    .sort((a, b) => b.getFilterIndex() - a.getFilterIndex())
  
  const handleAddFilter = () => {
    setFilterList([...filterList, { ...DEFAULT_FILTER_DATA, id: filterList.length + 1 }]);
  }

  const handleRemoveFilter = (id: number) => {
    setFilterList(filterList.filter((filter) => filter.id !== id));
    table.resetColumnFilters();
  }

  const handleChangeFilter = (id: number, value: string, identifier: string, index: number) => {
    if (identifier === "column") {
      table.resetColumnFilters();
    }

    setFilterList(filterList.map((filter) => filter.id === id ? { ...filter, [identifier]: value } : filter));
  }

  useEffect(() => {
    filterList.forEach((filter) => {
      if (filter.column) {
        table.getColumn(filter.column)?.setFilterValue(filter.value);
      }
    });
  }, [filterList, table])
  
  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[500px] flex flex-col gap-4 p-4 border-zinc-700">
        {filterList.map((filter, index) => (
          <div key={filter.id} className="flex gap-2 items-center">
            <div className="text-sm w-2/12 grow-0">
              {index === 0 ? "WHERE" : "AND"}
            </div>

            <div className="w-5/12">
              <Select onValueChange={(value) => handleChangeFilter(filter.id, value, "column", index)} value={filter.column}>
                <SelectTrigger className="w-full border-zinc-7000 text-left h-9">
                  <SelectValue placeholder="Column" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filterableColumns.map((columnItem) => (
                      <SelectItem key={columnItem.id} value={columnItem.id}>
                        {columnItem?.columnDef?.header as string}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-4/12">
              <Input
                className="border-zinc-700"
                value={filter.value}
                onChange={(e) => {
                  handleChangeFilter(filter.id, e.target.value, "value", index);
                }}
              />
            </div>
            
            {index !== 0 && (
              <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700" onClick={() => handleRemoveFilter(filter.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700" onClick={handleAddFilter}>
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
