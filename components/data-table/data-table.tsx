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

import { cn } from "@/lib/utils"

import { ButtonProps } from "../ui/button"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar, DataTableToolbarProps } from "./data-table-toolbar"
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"

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

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
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
    <div className="space-y-4">
      {!hideToolbar && (
        <DataTableToolbar
          table={table}
          initialVisibility={initialVisibility}
          extraButtons={extraToolbarButtons}
          buttonVariant={toolbarButtonVariant}
          menuId={menuId}
        />
      )}
      <div className={cn("rounded-md border", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn("min-w-10 whitespace-nowrap")}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : (
                          <div className="flex items-center gap-1 cursor-pointer justify-between">
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
      {!hidePagination && <DataTablePagination table={table} />}
    </div>
  )
}
