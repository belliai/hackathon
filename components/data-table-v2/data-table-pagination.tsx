"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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

import { cn } from "@/lib/utils"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface DataTablePaginationProps {
  showSelectedCount?: boolean
  enableExport?: boolean
  isHover?: boolean
  onExport?: (prop: any) => void
  settingOptions?: any
  totalPage: number
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  onPageSizeChange: (pageSize: number) => void
}

export function DataTablePagination(props: DataTablePaginationProps) {
  const {
    currentPage,
    pageSize,
    totalPage,
    isHover,
    enableExport,
    onPageSizeChange,
    onPageChange,
    onExport,
  } = props
  const searchParams = useSearchParams()

  const [openRowPerPage, setOpenRowPerPage] = useState(false)

  const pageSizeParams = searchParams.get("pageSize")

  useEffect(() => {
    if (!pageSizeParams) return
    onPageSizeChange(Number(pageSizeParams))
  }, [pageSizeParams])

  // Pagination logic functions
  const goToFirstPage = () => {
    onPageChange(1)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1)
    }
  }

  const goToLastPage = () => {
    onPageChange(totalPage)
  }

  // Button disabled states
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPage

  return (
    <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
      <div
        className={cn(
          "flex items-center gap-4 text-muted-foreground transition-opacity delay-0 duration-200",
          isHover === undefined || openRowPerPage
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div className="flex flex-col items-center gap-4 space-x-6 md:flex-row lg:space-x-0.5">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            open={openRowPerPage}
            onOpenChange={setOpenRowPerPage}
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
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
        <div className={cn("flex items-center space-x-2")}>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPage}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={goToFirstPage}
              disabled={isFirstPage}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={goToPreviousPage}
              disabled={isFirstPage}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={goToNextPage}
              disabled={isLastPage}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={goToLastPage}
              disabled={isLastPage}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {enableExport && (
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
