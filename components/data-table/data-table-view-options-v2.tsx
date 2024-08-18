"use client"

import { ReactNode, useEffect, useState } from "react"
import { Button } from "@components/ui/button"
import {
  PointerSensor,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Column, Table, VisibilityState } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Popover, PopoverContent } from "../ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export type ColumnsByVisibility<TData> = {
  active: Column<TData, unknown>[]
  hidden: Column<TData, unknown>[]
}

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  children: ReactNode
  buttonClassName?: HTMLDivElement["className"]
  showHideAll?: boolean
  showShowAll?: boolean
  initialVisibility?: VisibilityState
  onOpenChange: (open: boolean) => void
  onOrderChange?: (newOrder: string[]) => void // Function to save the column order
  onResetColumns?: () => void
  onVisibilityChange?: (columnsVisibility: ColumnsByVisibility<TData>) => void
}

export function DataTableViewOptionsV2<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const [sections, setSections] = useState<{
    [key: string]: Column<TData, unknown>[]
  }>({
    active: [],
    hidden: [],
  })

  useEffect(() => {
    const columns = table.getAllColumns()
    if (columns.length > 0) {
      const activeColumns = columns.filter((col) => col.getIsVisible())
      const hiddenColumns = columns.filter((col) => !col.getIsVisible())

      setSections({
        active: activeColumns,
        hidden: hiddenColumns,
      })
    }
  }, [])

  const onHideColumn = (col: Column<TData, unknown>) => {
    setSections((sections) => {
      const activeIndex = sections.active.findIndex(
        (column) => column.id === col.id
      )

      if (activeIndex === -1) {
        return sections
      }

      const newActive = sections.active.filter((column) => column.id !== col.id)
      const newHidden = [...sections.hidden, col]

      col.toggleVisibility(false)

      props.onVisibilityChange?.({
        active: newActive,
        hidden: newHidden,
      })

      return {
        ...sections,
        active: newActive,
        hidden: newHidden,
      }
    })
  }

  const onShowColumn = (col: Column<TData, unknown>) => {
    setSections((sections) => {
      const hiddenIndex = sections.hidden.findIndex(
        (column) => column.id === col.id
      )

      if (hiddenIndex === -1) {
        return sections
      }

      const newHidden = sections.hidden.filter((column) => column.id !== col.id)
      const newActive = [...sections.active, col]

      // Update the column visibility in the table
      col.toggleVisibility(true)

      props.onVisibilityChange?.({
        active: newActive,
        hidden: newHidden,
      })

      return {
        ...sections,
        active: newActive,
        hidden: newHidden,
      }
    })
  }

  const onHideAllColumn = () => {
    setSections((sections) => {
      return {
        active: [],
        hidden: [...sections["active"], ...sections["hidden"]],
      }
    })
    table.toggleAllColumnsVisible(false)
  }

  const onShowAllColumn = () => {
    setSections((sections) => {
      return {
        active: [...sections["active"], ...sections["hidden"]],
        hidden: [],
      }
    })
    table.toggleAllColumnsVisible(true)
  }

  const handleMoveHeader = (id: string, action: "up" | "down") => {
    const activeColumns = sections.active;
    const columnIndex = activeColumns.findIndex(column => column.id === id);
    if (columnIndex !== -1) {
      const newIndex = action === 'up' ? columnIndex - 1 : columnIndex + 1;
      const newOrder = arrayMove(activeColumns, columnIndex, newIndex);
      const newOrderIds = newOrder.map((col) => col.id)

      setSections((sections) => ({
        ...sections,
        active: newOrder,
      }));

      props.onOrderChange?.(newOrderIds)

      table.setColumnOrder(newOrderIds)
      
      props.onVisibilityChange?.({
        hidden: sections.hidden,
        active: newOrder,
      })
    }
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
              items={sections.active}
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
                {sections.active.map((column, index) => (
                  <CommandItem
                    key={column.id}
                    value={
                      typeof column?.columnDef?.header === "function"
                        ? (column?.columnDef?.header as () => string)()
                        : String(column.columnDef.header)
                    }
                    className={cn(
                      "flex flex-row items-center justify-between",
                      !column.getCanHide() && "hidden"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col">
                        {index !== 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => handleMoveHeader(column.id, 'up')}
                                size="icon"
                                className="w-fit h-fit"
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
                        {index < sections.active.length - 1 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => handleMoveHeader(column.id, 'down')}
                                size="icon"
                                className="w-fit h-fit"
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
                      
                      {typeof column?.columnDef?.header === "function"
                        ? (column?.columnDef?.header as () => string)()
                        : String(column.columnDef.header)}
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
              items={sections.hidden}
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
                {sections.hidden.map((column) => (
                  <CommandItem
                    key={column.id}
                    value={
                      typeof column?.columnDef?.header === "function"
                        ? (column?.columnDef?.header as () => string)()
                        : String(column.columnDef.header)
                    }
                    className="flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="size-4" />
                      {typeof column?.columnDef?.header === "function"
                        ? (column?.columnDef?.header as () => string)()
                        : String(column.columnDef.header)}
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
                    onClick={props.onResetColumns}
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
