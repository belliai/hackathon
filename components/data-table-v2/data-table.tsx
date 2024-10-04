"use client"

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { ChevronDownIcon, ChevronUpIcon, PinIcon } from "lucide-react"
import { useHover } from "usehooks-ts"

import { TableItem } from "@/types/api/dashboard-items"
import { Column, Table as TableKeys } from "@/types/table/columns"
import { useColumns } from "@/lib/hooks/columns"
import { useGetFilters } from "@/lib/hooks/filters"
import { TableStateHandlers } from "@/lib/hooks/tables/table-state"
import { cn } from "@/lib/utils"
import { mapSavedToFilters } from "@/lib/utils/table-filter-utils"

import { FilterData } from "../data-table/types"
import { ButtonProps } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  DataTableContextProvider,
  useDataTableContext,
} from "./data-table-context"
import { DataTablePagination } from "./data-table-pagination"
import {
  DataTableToolbar,
  DataTableToolbarProps,
} from "./toolbar/data-table-toolbar"
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableTableHeadProps {
  column: Column;
  sort: SortParams | undefined;
  onSortToggle: (columnName: string) => void;
}

export type DataTableProps<T> = {
  tableKey: TableKeys
  data?: APIPaginatedResponse<TableItem<T>>
  isLoading?: boolean
  onRefetchData: () => Promise<any>
  onRowClick?: (row: T) => void
  onCellClick?: (row: T, column: Column) => void
  customCellRenderers?: {
    key: string
    renderer: (data: T, value: string, isLocked?: boolean) => ReactNode
  }[]
  onExport?: () => void
  hideToolbar?: boolean
  extraLeftComponents?: React.ReactNode
  extraRightComponents?: React.ReactNode
  extraToolbarButtons?: DataTableToolbarProps["extraButtons"]
  toolbarButtonVariant?: ButtonProps["variant"]
} & TableStateHandlers

function useHorizontalScroll() {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLDivElement
    setIsScrolled(target.scrollLeft > 0)
  }, [])

  useEffect(() => {
    const scrollContainer = document.getElementById(
      "data-table-scroll-container"
    )
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      })

      handleScroll({ target: scrollContainer } as unknown as Event)

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  return isScrolled
}

export function DataTable<T>(props: DataTableProps<T>) {
  const { data, tableKey } = props
  const { useGetColumns } = useColumns()

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const isScrolled = useHorizontalScroll()

  const { data: columnsData } = useGetColumns(tableKey)
  const { data: savedFilters } = useGetFilters(tableKey)

  const mappedFilters = useMemo(
    () => (columnsData && mapSavedToFilters(savedFilters, columnsData)) || [],
    [savedFilters, columnsData]
  )

  const [columnOrder, setColumnOrder] = useState<string[]>([])

  useEffect(() => {
    if (columnsData) {
      setColumnOrder(
        (columnsData.visible_columns || []).map(col => col.real_column_name)
      )
    }
  }, [columnsData])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over?.id as string)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const rowData = data?.data
  return (
    <DataTableContextProvider
      columns={columnsData}
      tableKey={tableKey}
      onRefetchData={props.onRefetchData}
      sort={props.sort}
      logical_operator="AND"
      filters={mappedFilters}
      onFiltersChange={props.onFiltersChange}
      onSearchChange={props.onSearchChange}
      onPageChange={props.onPageChange}
      onPageSizeChange={props.onPageSizeChange}
      onSortToggle={props.onSortToggle}
      isLocked={isLocked}
      setIsLocked={setIsLocked}
    >
      <div className="group flex flex-col gap-4" ref={hoverRef}>
        {!props.hideToolbar && (
          <DataTableToolbar
            isHover={isHover}
            isLoading={props.isLoading}
            extraLeftComponents={props.extraLeftComponents}
            extraRightComponents={props.extraRightComponents}
            extraButtons={props.extraToolbarButtons}
            buttonVariant={props.toolbarButtonVariant}
          />
        )}
        <div className="relative overflow-x-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
              <Table>
                <DataTableHeader isScrolled={isScrolled} columnOrder={columnOrder} />
                <DataTableBody
                  data={rowData}
                  customCellRenderers={props.customCellRenderers}
                  onCellClick={isLocked ? undefined : props.onCellClick}
                  onRowClick={isLocked ? undefined : props.onRowClick}
                  isScrolled={isScrolled}
                  columnOrder={columnOrder}
                />
              </Table>
            </SortableContext>
          </DndContext>
        </div>
        <DataTablePagination
          isHover={isHover}
          currentPage={data?.current_page ?? 1}
          pageSize={data?.page_size ?? 1}
          totalPage={data?.total_pages ?? 1}
          onPageChange={props.onPageChange}
          onPageSizeChange={props.onPageSizeChange}
          onExport={props.onExport}
        />
      </div>
    </DataTableContextProvider>
  )
}

function SortableTableHead({ column, sort, onSortToggle }: SortableTableHeadProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.real_column_name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <TableHead
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(
        "cursor-move",
        "z-10 bg-background"
      )}
      onClick={() => {
        onSortToggle(column.real_column_name)
      }}
    >
      <div className="inline-flex w-full items-center justify-between gap-2">
        <span className="flex gap-1 items-center">
          {column.column_name}
        </span>
        
        {sort?.sort_by === column.real_column_name && (
          <>
            {sort.sort_dir === "asc" ? (
              <ChevronUpIcon className="size-3 text-muted-foreground" />
            ) : (
              <ChevronDownIcon className="size-3 text-muted-foreground" />
            )}
          </>
        )}
      </div>
    </TableHead>
  )
}

function DataTableHeader({ isScrolled, columnOrder }: { columnOrder: string[], isScrolled: boolean }) {
  const { columns, sort, onSortToggle } = useDataTableContext()
  const visibleColumns = columns.visible_columns
  const stickyColumns = columns?.sticky_columns || []

  const orderedVisibleColumns = columnOrder.map(colName => 
    visibleColumns.find(col => col.real_column_name === colName)
  ).filter(Boolean) as Column[]

  return (
    <TableHeader className="bg-zinc-100 dark:bg-transparent">
      <TableRow>
        {stickyColumns.map((column, index) => (
          <TableHead
            key={column.id}
            className={cn(
              "cursor-pointer",
              "sticky z-20 bg-background",
              (isScrolled && index === stickyColumns.length - 1) && "after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-gray-300 after:content-[''] dark:after:bg-gray-700"
            )}
            style={{
              left: `${index * 120}px`,
            }}
            onClick={() => {
              onSortToggle(column.real_column_name)
            }}
          >
            <div className="inline-flex w-full items-center justify-between gap-2">
              <span className="flex gap-1 items-center">
                {column.column_name}
                <PinIcon className="size-3" />
              </span>
              
              {sort?.sort_by === column.real_column_name && (
                <>
                  {sort.sort_dir === "asc" ? (
                    <ChevronUpIcon className="size-3 text-muted-foreground" />
                  ) : (
                    <ChevronDownIcon className="size-3 text-muted-foreground" />
                  )}
                </>
              )}
            </div>
          </TableHead>
        ))}
        <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
          {orderedVisibleColumns.map((column: Column) => (
            <SortableTableHead
              key={column.id}
              column={column}
              sort={sort}
              onSortToggle={onSortToggle}
            />
          ))}
        </SortableContext>
      </TableRow>
    </TableHeader>
  )
}

function DataTableBody<T>(props: {
  data?: TableItem<T>[]
  onRowClick?: (row: T) => void
  onCellClick?: (row: T, column: Column) => void
  customCellRenderers?: {
    key: string
    renderer: (data: T, value: string, isLocked?: boolean) => ReactNode
  }[],
  isScrolled: boolean,
  columnOrder: string[]
}) {
  const { data, customCellRenderers, onCellClick, onRowClick, isScrolled, columnOrder } = props

  const { columns, isLocked } = useDataTableContext()

  const visibleColumns = columns?.visible_columns ?? []
  const stickyColumns = columns?.sticky_columns ?? []

  // const customRendererMap = useMemo(() => {
  //   return customCellRenderers?.reduce(
  //     (acc, { key, renderer }) => {
  //       acc[key] = renderer
  //       return acc
  //     },
  //     {} as Record<string, (data: T, value: string, isLocked?: boolean) => ReactNode>
  //   )
  // }, [customCellRenderers])

  const customRendererMap = useMemo(() => {
    return customCellRenderers?.reduce(
      (acc, { key, renderer }) => {
        acc[key] = (data: T, value: string, isLocked?: boolean) => {
          if (isLocked) {
            return (
              <div className="pointer-events-none">
                {/* Render without the onClick event */}
                {renderer(data, value, isLocked)}
              </div>
            )
          }
          return renderer(data, value)
        }
        return acc
      },
      {} as Record<
        string,
        (data: T, value: string, isLocked?: boolean) => ReactNode
      >
    )
  }, [customCellRenderers, isLocked])

  const columnsMap = useMemo(() => {
    const combinedColumns = [...visibleColumns]
    return combinedColumns?.reduce(
      (acc, col) => {
        acc[col.real_column_name] = col
        return acc
      },
      {} as Record<string, Column>
    )
  }, [visibleColumns])

  const orderedVisibleColumns = columnOrder.map(colName => columnsMap[colName]).filter(Boolean)

  return (
    <TableBody>
      {data?.map((row, index) => {
        return (
          <TableRow
            key={index}
            onClick={() => onRowClick && onRowClick(row.object)}
            className={cn(onRowClick && "cursor-pointer")}
          >
            {stickyColumns.map((col, idx) => (
              <TableCell
                key={col.real_column_name}
                onClick={
                  onCellClick
                    ? () =>
                        onCellClick(
                          row.object,
                          columnsMap[col.real_column_name]
                        )
                    : undefined
                }
                className={cn(
                  "whitespace-nowrap text-black dark:text-muted-foreground",
                  "sticky z-10 bg-background",
                  (isScrolled && idx === stickyColumns.length - 1) && "after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-gray-300 after:content-[''] dark:after:bg-gray-700"
                )}
                style={{
                  minWidth: 120,
                  left: `${idx * 120}px`,
                  zIndex: 20,
                }}
              >
                {customRendererMap?.[col.real_column_name]
                  ? customRendererMap[col.real_column_name](row.object, row.columns.find(c => c.key === col.real_column_name)?.value ?? "")
                  : row.columns.find(c => c.key === col.real_column_name)?.value}
              </TableCell>
            ))}
            {orderedVisibleColumns.map((col) => {
              const cellData = row.columns.find(
                (c) => c.key === col.real_column_name
              )
              const customRenderer = customRendererMap?.[col.real_column_name]
              return (
                <TableCell
                  key={col.real_column_name}
                  onClick={
                    onCellClick
                      ? () =>
                          onCellClick(
                            row.object,
                            columnsMap[col.real_column_name]
                          )
                      : undefined
                  }
                  className="whitespace-nowrap text-black dark:text-muted-foreground"
                  style={{
                    minWidth: 120,
                  }}
                >
                  {customRenderer
                    ? customRenderer(
                        row.object,
                        cellData?.value ?? "",
                        isLocked
                      )
                    : cellData?.value}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
