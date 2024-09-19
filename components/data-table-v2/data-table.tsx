"use client"

import { ReactNode, useMemo, useRef } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useHover } from "usehooks-ts"

import { TableItem } from "@/types/api/dashboard-items"
import { Column, Table as TableKeys } from "@/types/table/columns"
import { useColumns } from "@/lib/hooks/columns"
import { TableStateHandlers } from "@/lib/hooks/tables/table-state"
import { cn } from "@/lib/utils"

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

// Update the Column type to include the sticky property
type ColumnWithSticky = Column & { sticky?: boolean };

export type DataTableProps<T> = {
  tableKey: TableKeys
  data?: APIPaginatedResponse<TableItem<T>>
  isLoading?: boolean
  onRefetchData: () => Promise<any>
  onRowClick?: (row: T) => void
  onCellClick?: (row: T, column: ColumnWithSticky) => void
  customCellRenderers?: {
    key: string
    renderer: (data: T, value: string) => ReactNode
  }[]
  onExport?: () => void
  hideToolbar?: boolean
  extraLeftComponents?: React.ReactNode
  extraRightComponents?: React.ReactNode
  extraToolbarButtons?: DataTableToolbarProps["extraButtons"]
  toolbarButtonVariant?: ButtonProps["variant"]
} & TableStateHandlers

export function DataTable<T>(props: DataTableProps<T>) {
  const { data, tableKey } = props
  const { useGetColumns } = useColumns()

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const { data: columnsData } = useGetColumns(tableKey)

  // Add sticky property to columns and rearrange them
  const columns = useMemo(() => {
    if (!columnsData) return null;

    const columnsWithSticky = columnsData.visible_columns.map((col, index) => ({
      ...col,
      sticky: tableKey === 'dashboard_flights' && (index === 3 || index === 7)
    }));
    console.log(columnsWithSticky.filter(col => col.sticky))
    // Separate sticky and non-sticky columns
    const stickyColumns = columnsWithSticky.filter(col => col.sticky);
    const nonStickyColumns = columnsWithSticky.filter(col => !col.sticky);

    // Combine sticky columns (now on the left) with non-sticky columns
    const rearrangedColumns = [...stickyColumns, ...nonStickyColumns];

    return {
      ...columnsData,
      visible_columns: rearrangedColumns
    };
  }, [columnsData, tableKey]);

  const rowData = data?.data

  return (
    <DataTableContextProvider
      columns={columns ?? undefined}
      tableKey={tableKey}
      onRefetchData={props.onRefetchData}
      sort={props.sort}
      filters={props.filters}
      onFiltersChange={props.onFiltersChange}
      onSearchChange={props.onSearchChange}
      onPageChange={props.onPageChange}
      onPageSizeChange={props.onPageSizeChange}
      onSortToggle={props.onSortToggle}
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
          <Table>
            <DataTableHeader />
            <DataTableBody
              data={rowData}
              customCellRenderers={props.customCellRenderers}
              onCellClick={props.onCellClick}
              onRowClick={props.onRowClick}
            />
          </Table>
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

function DataTableHeader() {
  const { columns, sort, onSortToggle } = useDataTableContext()
  const visibleColumns = columns.visible_columns as ColumnWithSticky[]

  return (
    <TableHeader className="bg-zinc-100 dark:bg-transparent">
      <TableRow>
        {visibleColumns.map((col, idx) => (
          <TableHead
            key={col.id}
            className={cn(
              "cursor-pointer",
              col.sticky && "sticky z-10 bg-background"
            )}
            style={{ 
              left: col.sticky ? `${idx * 120}px` : undefined,
              zIndex: col.sticky ? 20 : undefined 
            }}
            onClick={() => {
              onSortToggle(col.real_column_name)
            }}
          >
            <div className="inline-flex w-full items-center justify-between gap-2">
              {col.column_name}
              {sort?.sort_by === col.real_column_name && (
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
      </TableRow>
    </TableHeader>
  )
}

function DataTableBody<T>(props: {
  data?: TableItem<T>[]
  onRowClick?: (row: T) => void
  onCellClick?: (row: T, column: ColumnWithSticky) => void
  customCellRenderers?: {
    key: string
    renderer: (data: T, value: string) => ReactNode
  }[]
}) {
  const { data, customCellRenderers, onCellClick, onRowClick } = props

  const { columns } = useDataTableContext()

  const visibleColumns = columns?.visible_columns as ColumnWithSticky[] ?? []

  const customRendererMap = useMemo(() => {
    return customCellRenderers?.reduce(
      (acc, { key, renderer }) => {
        acc[key] = renderer
        return acc
      },
      {} as Record<string, (data: T, value: string) => ReactNode>
    )
  }, [customCellRenderers])

  const columnsMap = useMemo(() => {
    return visibleColumns?.reduce(
      (acc, col) => {
        acc[col.real_column_name] = col
        return acc
      },
      {} as Record<string, ColumnWithSticky>
    )
  }, [visibleColumns])

  return (
    <TableBody>
      {data?.map((row, index) => {
        return (
          <TableRow
            key={index}
            onClick={() => onRowClick && onRowClick(row.object)}
            className={cn(onRowClick && "cursor-pointer")}
          >
            {visibleColumns.map((col, idx) => {
              const cellData = row.columns.find(c => c.key === col.real_column_name)
              const customRenderer = customRendererMap?.[col.real_column_name]
              return (
                <TableCell
                  onClick={
                    onCellClick
                      ? () => onCellClick(row.object, col)
                      : undefined
                  }
                  className={cn(
                    "whitespace-nowrap text-black dark:text-muted-foreground",
                    col.sticky && "sticky z-10 bg-background"
                  )}
                  style={{ 
                    minWidth: 120,
                    left: col.sticky ? `${idx * 120}px` : undefined,
                    zIndex: col.sticky ? 20 : undefined
                  }}
                  key={col.id}
                >
                  {customRenderer
                    ? customRenderer(row.object, cellData?.value ?? '')
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