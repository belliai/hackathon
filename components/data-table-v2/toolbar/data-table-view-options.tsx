"use client"

import { ReactNode, useEffect, useState } from "react"
import { Button } from "@components/ui/button"
import { PointerSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { PopoverTrigger } from "@radix-ui/react-popover"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeOffIcon,
  PanelLeftClose,
  PanelLeftOpen,
  PinIcon,
  PinOffIcon,
} from "lucide-react"

import { Column, ColumnResponse } from "@/types/table/columns"
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
  const { tableKey, columns, setColumns, onRefetchData } = useDataTableContext()

  const { useUpdateSingleColumn, useGetColumns, useResetColumns } = useColumns()

  const { refetch: refetchColumns, isFetching } = useGetColumns(tableKey)

  const { mutateAsync: updateColumn } = useUpdateSingleColumn()
  const { mutateAsync: resetColumns } = useResetColumns(tableKey)

  const [localColumns, setLocalColumns] = useState<ColumnResponse>(
    columns || {
      sticky_columns: [],
      visible_columns: [],
      non_visible_columns: [],
    }
  )

  useEffect(() => {
    setLocalColumns(columns)
  }, [columns])

  const onResetColumns = () => {
    if (!isFetching) {
      resetColumns(
        { tableName: tableKey },
        {
          onSuccess: async () => {
            const [{ data: updatedColumns }] = await Promise.all([
              refetchColumns(),
              onRefetchData(),
            ])
            updatedColumns && setColumns(updatedColumns)
          },
        }
      )
    }
  }

  const onHideColumn = async (col: Column) => {
    const updatedColumns = {
      ...columns,
      visible_columns: columns.visible_columns.filter((c) => c.id !== col.id),
      non_visible_columns: [col, ...columns.non_visible_columns],
    }

    setLocalColumns(updatedColumns)

    try {
      await updateColumn(
        { ...col, visible: false },
        {
          onSuccess: async () => {
            await onRefetchData()
            setColumns(updatedColumns)
          },
        }
      )
    } catch (error) {
      columns && setColumns(columns)
    }
  }

  const onShowColumn = async (col: Column) => {
    const updatedColumns = {
      ...columns,
      non_visible_columns: columns.non_visible_columns.filter(
        (c) => c.id !== col.id
      ),
      visible_columns: [...columns.visible_columns, col].sort(
        (a, b) => a.sort_order - b.sort_order
      ),
    }

    setLocalColumns(updatedColumns)

    try {
      await updateColumn(
        { ...col, visible: true },
        {
          onSuccess: async () => {
            await onRefetchData()
            setColumns(updatedColumns)
          },
        }
      )
    } catch (error) {
      columns && setColumns(columns)
    }
  }

  const handleMoveHeader = async (col: Column, action: "up" | "down") => {
    const newSortOrder =
      action === "up" ? col.sort_order - 1 : col.sort_order + 1

    const updatedVisibleColumns = columns.visible_columns.filter(
      (c) => c.id !== col.id
    )

    const newIndex = newSortOrder - 1 // Adjust for zero-based index
    updatedVisibleColumns.splice(newIndex, 0, {
      ...col,
      sort_order: newSortOrder,
    })

    const reorderedColumns = updatedVisibleColumns.map((c, index) => ({
      ...c,
      sort_order: index + 1, // Ensure sort_order starts from 1 and is sequential
    }))

    const updatedColumns = {
      ...columns,
      visible_columns: reorderedColumns,
    }

    setLocalColumns(updatedColumns)

    try {
      await updateColumn(
        { ...col, sort_order: newSortOrder },
        {
          onSuccess: async () => {
            await onRefetchData()
            setColumns(updatedColumns)
          },
        }
      )
    } catch (error) {
      columns && setColumns(columns)
    }
  }

  const onFreezeColumn = async (col: Column, action: string) => {
    let updatedColumns

    if (action === "freeze") {
      updatedColumns = {
        ...columns,
        visible_columns: columns?.visible_columns?.filter(
          (c) => c.id !== col.id
        ),
        sticky_columns: [...(columns.sticky_columns || []), col],
      }
    } else if (action === "unfreeze") {
      updatedColumns = {
        ...columns,
        sticky_columns: columns?.sticky_columns?.filter((c) => c.id !== col.id),
        visible_columns: [col, ...columns.visible_columns],
      }
    }

    setLocalColumns(
      updatedColumns || {
        sticky_columns: [],
        visible_columns: [],
        non_visible_columns: [],
      }
    )

    // try {
    //   await updateColumn(
    //     { ...col, visible: false },
    //     {
    //       onSuccess: async () => {
    //         await onRefetchData()
    setColumns(
      updatedColumns || {
        sticky_columns: [],
        visible_columns: [],
        non_visible_columns: [],
      }
    )
    //       },
    //     }
    //   )
    // } catch (error) {
    //   columns && setColumns(columns)
    // }
  }

  return (
    <Popover onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search for a column" />
          <CommandList className="custom-scrollbar">
            <CommandEmpty>No column found.</CommandEmpty>
            {Array.isArray(localColumns?.sticky_columns) &&
              localColumns.sticky_columns.length > 0 && (
                <SortableContext
                  id={"sticky"}
                  items={localColumns?.sticky_columns || []}
                  strategy={verticalListSortingStrategy}
                >
                  <CommandGroup>
                    <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Sticky Columns
                      </span>
                    </div>
                    {localColumns?.sticky_columns?.map((column, index) => (
                      <CommandItem
                        key={column.id}
                        value={column.column_name}
                        className={"flex flex-row items-center justify-between"}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {column.column_name}
                        </div>
                        <div className="flex gap-1">
                          {tableKey === "dashboard_flights" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  data-no-dnd="true"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onFreezeColumn(column, "unfreeze")
                                  }}
                                >
                                  <PinOffIcon className="z-50 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent
                                className="border bg-card text-foreground"
                                side="bottom"
                                align="end"
                              >
                                Unfreeze Column
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </SortableContext>
              )
            }

            <SortableContext
              id={"active"}
              items={localColumns.visible_columns}
              strategy={verticalListSortingStrategy}
            >
              <CommandGroup>
                <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Active Columns
                  </span>
                  {/* {props.showHideAll && (
                    <Button
                      onClick={onHideAllColumn}
                      variant={"link"}
                      className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                    >
                      Hide All
                    </Button>
                  )} */}
                </div>
                {localColumns.visible_columns.map((column, index) => (
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
                    <div className="flex gap-1">
                      {Array.isArray(localColumns?.sticky_columns) &&
                        localColumns?.sticky_columns?.length < 3 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                data-no-dnd="true"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  onFreezeColumn(column, "freeze")
                                }}
                              >
                                <PinIcon className="z-50 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              className="border bg-card text-foreground"
                              side="bottom"
                              align="end"
                            >
                              Freeze Column
                            </TooltipContent>
                          </Tooltip>
                        )}

                      <Tooltip>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent
                          className="border bg-card text-foreground"
                          side="bottom"
                          align="end"
                        >
                          Hide Column
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </SortableContext>
            <SortableContext
              id={"hidden"}
              items={localColumns.non_visible_columns}
              strategy={verticalListSortingStrategy}
            >
              <CommandGroup>
                <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Hidden Columns
                  </span>
                  {/* {props.showShowAll && (
                    <Button
                      onClick={onShowAllColumn}
                      variant={"link"}
                      className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                    >
                      Show All
                    </Button>
                  )} */}
                </div>
                {localColumns.non_visible_columns.map((column) => (
                  <CommandItem
                    key={column.id}
                    value={column.column_name}
                    className="flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="size-3" />
                      {column.column_name}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent
                        className="border bg-card text-foreground"
                        side="bottom"
                        align="end"
                      >
                        Show Column
                      </TooltipContent>
                    </Tooltip>
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
