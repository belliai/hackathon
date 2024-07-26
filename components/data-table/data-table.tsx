"use client"

import * as React from "react"
import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useHover } from "usehooks-ts"

import { cn } from "@/lib/utils"

import { ButtonProps } from "../ui/button"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar, DataTableToolbarProps } from "./data-table-toolbar"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hideToolbar?: boolean
  hidePagination?: boolean
  className?: string
  extraToolbarButtons?: DataTableToolbarProps<TData>["extraButtons"]
  toolbarButtonVariant?: ButtonProps["variant"]
  onRowClick?: (data: TData) => void
  initialPinning?: ColumnPinningState
  initialVisibility?: VisibilityState
  manualPagination?: boolean
  tableState?: (prop: any) => void
  pageCount?: number
  menuId?: string
  isCanExport?: boolean
  extraLeftComponents?: React.ReactNode
  extraRightComponents?: React.ReactNode
  showToolbarOnlyOnHover?: boolean
  pageSize?: number
  onExport?: (prop: any) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hideToolbar,
  hidePagination,
  className,
  extraToolbarButtons,
  toolbarButtonVariant,
  initialPinning,
  initialVisibility,
  onRowClick,
  manualPagination,
  tableState,
  pageCount,
  menuId,
  isCanExport,
  extraLeftComponents,
  extraRightComponents,
  showToolbarOnlyOnHover,
  pageSize = 10,
  onExport
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialVisibility ?? {})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnPinning, setColumnPinnig] = React.useState<ColumnPinningState>(
    initialPinning ?? { left: [], right: [] }
  )

  const hoverRef = React.useRef(null)
  const isHover = useHover(hoverRef)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? undefined,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnPinning,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    manualPagination: manualPagination ?? false,
  })

  useEffect(() => {
    tableState && tableState({ pagination })
  }, [pagination])

  return (
    <div className="flex flex-col gap-4" ref={hoverRef}>
      {!hideToolbar && (
        <DataTableToolbar
          isHover={showToolbarOnlyOnHover ? isHover : undefined}
          table={table}
          initialVisibility={initialVisibility}
          extraButtons={extraToolbarButtons}
          buttonVariant={toolbarButtonVariant}
          menuId={menuId}
          extraLeftComponents={extraLeftComponents}
          extraRightComponents={extraRightComponents}
        />
      )}
      <div className="relative">
        <div
          className={cn(
            "border-none [&>div]:overflow-hidden [&>div]:pb-4 [&>div]:hover:overflow-x-scroll [&>div]:hover:pb-2 [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground",
            className
          )}
        >
          <Table className="border-b">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn("whitespace-nowrap")}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          maxWidth: header.column.columnDef.size,
                          width: header.column.columnDef.size,
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex cursor-pointer items-center justify-between gap-1">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <TriangleUpIcon />,
                              desc: <TriangleDownIcon />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={
                      onRowClick ? () => onRowClick(row.original) : undefined
                    }
                    className={cn(onRowClick && "cursor-pointer")}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={cn("whitespace-nowrap")}
                        key={cell.id}
                        style={{
                          maxWidth: cell.column.columnDef.size,
                          width: cell.column.columnDef.size,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="absolute bottom-0 left-0 h-4 w-full"></div>
      </div>

      {!hidePagination && (
        <DataTablePagination table={table} isCanExport={isCanExport} isHover={isHover}  onExport={onExport}/>
      )}
    </div>
  )
}
