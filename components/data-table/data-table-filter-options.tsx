"use client";

import { Column, ColumnDef, ColumnMeta, Table } from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  ArrowDownAZIcon,
  ArrowLeftIcon,
  ArrowUpAZIcon,
  FilterIcon,
  FilterXIcon,
  SearchCheck,
  SearchIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DateInput from "../ui/date-input";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  children: ReactNode;
}

export function DataTableFilterOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const [colFilterView, setColFilterView] = useState<Column<TData> | null>(
    null
  );

  const filterableColumns = table
    .getAllColumns()
    .filter(
      (col) =>
        Boolean(col.accessorFn) && col.getIsVisible() && col.getCanFilter()
    )
    .sort((a, b) => b.getFilterIndex() - a.getFilterIndex());

  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0">
        {colFilterView ? (
          <ColumnFilterView
            column={colFilterView}
            onClose={() => setColFilterView(null)}
          />
        ) : (
          <Command>
            <CommandInput placeholder="Search for a column" />
            <CommandList className="custom-scrollbar">
              <CommandEmpty>No column found.</CommandEmpty>
              <CommandGroup>
                {filterableColumns.map((column) => {
                  const filter = column.getFilterValue();
                  return (
                    <CommandItem
                      key={column.id}
                      value={String(column.columnDef.header)}
                      onSelect={() => setColFilterView(column)}
                      className="flex flex-row justify-between items-center"
                    >
                      {String(column.columnDef.header)}
                      {Boolean(filter) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            column.setFilterValue(undefined);
                          }}
                          className="group text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <FilterIcon className="size-4 block group-hover:hidden" />
                          <FilterXIcon className="size-4 hidden group-hover:block" />
                        </button>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}

const ColumnFilterView = <TData,>(props: {
  column: Column<TData>;
  onClose: () => void;
}) => {
  const { column, onClose } = props;
  const [filterValue, setFilterValue] = useState<string>(
    column.getFilterValue() as string
  );
  const [debouncedFilter] = useDebounceValue(filterValue, 200);

  useEffect(() => {
    column.setFilterValue(
      Boolean(debouncedFilter) ? debouncedFilter : undefined
    );
  }, [debouncedFilter]);

  const meta = column.columnDef.meta;
  const options = meta?.filterSelectOptions;
  const isDate = meta?.isDateFilter;

  return (
    <div className="">
      <div className="p-2  text-sm flex flex-row items-center gap-2">
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
                      className="flex flex-row justify-between items-center"
                    >
                      {option.label}
                      {option.value === filterValue && (
                        <SearchCheck className="size-4 text-muted-foreground" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <Input
            value={filterValue}
            className="border-none rounded-none px-4 focus-visible:ring-0"
            placeholder="Apply filter..."
            onChange={(e) => setFilterValue(e.target.value)}
            rightIcon={<FilterIcon className="w-4 text-muted-foreground " />}
          />
        )}
      </div>
    </div>
  );
};
