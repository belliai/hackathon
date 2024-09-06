"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  DownloadIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import SettingMenuToggle from "../setting-menu-toggle/setting-menu-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  showSelectedCount?: boolean
  isCanExport?: boolean
  isHover?: boolean
  onExport?: (prop: any) => void
  settingOptions?: any
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
  table,
  showSelectedCount,
  isCanExport,
  isHover,
  onExport,
  settingOptions,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams()

  const [openRowPerPage, setOpenRowPerPage] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)

  const currentPage = table.getState().pagination.pageIndex + 1
  const currentPageSize = table.getState().pagination.pageSize

  const pageSizeParams = searchParams.get("pageSize")

  useEffect(() => {
    if (!pageSizeParams) return
    table.setPageSize(Number(pageSizeParams))
  }, [pageSizeParams])

  return (
    <div className="!mt-1 flex flex-col items-center justify-between gap-4 px-2 md:flex-row">
      {settingOptions && (
        <SettingMenuToggle
          settingOptions={settingOptions}
          className={`${isHover === undefined || openSetting || openRowPerPage ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          onOpen={setOpenSetting}
          isOpen={openSetting}
        />
      )}

      {showSelectedCount ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : (
        <div />
      )}
      <div
        className={cn(
          "flex items-center gap-4 text-muted-foreground transition-opacity delay-0 duration-200",
          isHover === undefined || openRowPerPage || openSetting
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div className="flex flex-col items-center gap-4 space-x-6 md:flex-row lg:space-x-0.5">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            open={openRowPerPage}
            onOpenChange={setOpenRowPerPage}
            value={`${currentPageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={currentPageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={cn("flex items-center space-x-2")}>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isCanExport && (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                onClick={onExport}
                size={"icon"}
                variant={"ghost"}
                className={"h-8 w-8"}
              >
                <DownloadIcon className={`h-4 w-4`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="border bg-background text-foreground"
              align="end"
              alignOffset={15}
            >
              <p>Download Data</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
