"use client"

import { useCallback, useEffect, useRef } from "react"
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

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  showSelectedCount?: boolean
  isCanExport?: boolean
  isHover?: boolean
}

export function DataTablePagination<TData>({
  table,
  showSelectedCount,
  isCanExport,
  isHover
}: DataTablePaginationProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      return params.toString()
    },
    [searchParams]
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value))
  }

  const deleteSearchParams = (key: string) => {
    router.push(pathname + "?" + removeQueryString(key))
  }

  const currentPage = table.getState().pagination.pageIndex + 1
  const currentPageSize = table.getState().pagination.pageSize

  const pageSizeParams = searchParams.get("pageSize")

  useEffect(() => {
    if (!pageSizeParams) return
    table.setPageSize(Number(pageSizeParams))
  }, [pageSizeParams])

  useEffect(() => {
    if (currentPageSize === 10) {
      deleteSearchParams("pageSize")
      return
    }
    setSearchParams("pageSize", String(currentPageSize))
  }, [currentPageSize])

  return (
    <div
      className="!mt-1 flex flex-col items-center justify-between gap-4 px-2 md:flex-row"
    >
      {showSelectedCount ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : (
        <div />
      )}
      <div className="flex flex-col items-center gap-4 space-x-6 md:flex-row lg:space-x-0.5 text-muted-foreground">
        <div
          className={cn(
            "flex items-center space-x-2 opacity-0 transition-opacity delay-0 duration-200",
            isHover === undefined
              ? "opacity-100"
              : isHover
                ? "opacity-100"
                : "opacity-0"
          )}
        >
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${currentPageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={currentPageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
        {isCanExport && (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"ghost"} className={"h-8 w-8"}>
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
