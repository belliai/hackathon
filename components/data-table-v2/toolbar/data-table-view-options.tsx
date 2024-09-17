"use client"

import { ReactNode } from "react"
import { Button } from "@components/ui/button"
import { PointerSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, EyeOffIcon } from "lucide-react"

import { Column } from "@/types/table/columns"
import { useColumns } from "@/lib/hooks/columns"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent } from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useDataTableContext } from "../data-table-context"

interface DataTableViewOptionsProps {
  children: ReactNode
  buttonClassName?: HTMLDivElement["className"]
  showHideAll?: boolean
  showShowAll?: boolean
  onOpenChange: (open: boolean) => void
}

export function DataTableViewOptions({ ...props }: DataTableViewOptionsProps) {
  const { tableKey, columns, onRefetchData } = useDataTableContext()

  const { useUpdateSingleColumn, useGetColumns, useResetColumns } = useColumns()

  const { refetch: refetchColumns, isFetching } = useGetColumns(tableKey)

  const { mutateAsync: updateColumn } = useUpdateSingleColumn()

  const { mutateAsync: resetColumns } = useResetColumns(tableKey)

  const onResetColumns = () => {
    !isFetching &&
      resetColumns({ tableName: tableKey }, { onSuccess: () => onRefetch() })
  }

  const onRefetch = () => {
    onRefetchData()
    refetchColumns()
  }

  const onHideColumn = (col: Column) => {
    updateColumn({ ...col, visible: false }, { onSuccess: () => onRefetch() })
  }

  const onShowColumn = (col: Column) => {
    updateColumn({ ...col, visible: true }, { onSuccess: () => onRefetch() })
  }

  const onHideAllColumn = () => {}

  const onShowAllColumn = () => {}

  const handleMoveHeader = (col: Column, action: "up" | "down") => {
    const newSortOrder =
      action === "up" ? col.sort_order - 1 : col.sort_order + 1
    console.log({ name: col.column_name, newSortOrder })
    updateColumn(
      { ...col, sort_order: newSortOrder },
      { onSuccess: () => onRefetch() }
    )
  }

  return (
    <Popover onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search for a column" />
          <CommandList className="custom-scrollbar">
            <CommandEmpty>No column found.</CommandEmpty>
            <SortableContext
              id={"active"}
              items={columns?.visible_columns ?? []}
              strategy={verticalListSortingStrategy}
            >
              <CommandGroup>
                <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Active Columns
                  </span>
                  {props.showHideAll && (
                    <Button
                      onClick={onHideAllColumn}
                      variant={"link"}
                      className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                    >
                      Hide All
                    </Button>
                  )}
                </div>
                {columns?.visible_columns.map((column, index) => (
                  <CommandItem
                    key={column.id}
                    value={column.column_name}
                    className={"flex flex-row items-center justify-between"}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col">
                        {index !== 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => handleMoveHeader(column, "up")}
                                size="icon"
                                className="h-fit w-fit"
                              >
                                <ArrowUpIcon className="size-3 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              className="border bg-card text-foreground"
                              side="top"
                            >
                              Move Up
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {index < columns.visible_columns.length - 1 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => handleMoveHeader(column, "down")}
                                size="icon"
                                className="h-fit w-fit"
                              >
                                <ArrowDownIcon className="size-3 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              className="border bg-card text-foreground"
                              side="bottom"
                            >
                              Move Down
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>

                      {column.column_name}
                    </div>
                    <button
                      data-no-dnd="true"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onHideColumn(column)
                      }}
                    >
                      <EyeIcon className="z-50 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </SortableContext>
            <SortableContext
              id={"hidden"}
              items={columns?.non_visible_columns ?? []}
              strategy={verticalListSortingStrategy}
            >
              <CommandGroup>
                <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Hidden Columns
                  </span>
                  {props.showShowAll && (
                    <Button
                      onClick={onShowAllColumn}
                      variant={"link"}
                      className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                    >
                      Show All
                    </Button>
                  )}
                </div>
                {columns?.non_visible_columns.map((column) => (
                  <CommandItem
                    key={column.id}
                    value={column.column_name}
                    className="flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="size-4" />
                      {column.column_name}
                    </div>
                    <button
                      data-no-dnd="true"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onShowColumn(column)
                      }}
                    >
                      <EyeOffIcon className="z-50 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                    </button>
                  </CommandItem>
                ))}
                <div className="px-2 py-1">
                  <Button
                    variant={"link"}
                    className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                    onClick={onResetColumns}
                  >
                    Reset Columns to Default
                  </Button>
                </div>
              </CommandGroup>
            </SortableContext>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export class ExtendedPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: { nativeEvent: PointerEvent }) => {
        return shouldHandleEvent(event.target as HTMLElement)
      },
    },
  ]
}

function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}
