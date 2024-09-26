"use client"

import { useEffect, useState } from "react"
import { Button, ButtonProps } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Separator } from "@radix-ui/react-select"
import {
  EyeIcon,
  ListFilterIcon,
  LoaderIcon,
  LucideIcon,
  SearchIcon,
} from "lucide-react"
import { useDebounceValue } from "usehooks-ts"

import { cn } from "@/lib/utils"
// import { Separator } from "../ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useDataTableContext } from "../data-table-context"
import { DataTableFilterInline } from "./data-table-filter-inline"
// import { DataTableFilterInline } from "./data-table-filter-inline"
import { DataTableFilterOptions } from "./data-table-filter-options"
import { DataTableViewOptions } from "./data-table-view-options"

// import { FilterData } from "./types"

export interface DataTableToolbarProps {
  buttonVariant?: ButtonProps["variant"]
  className?: HTMLDivElement["className"]
  isHover?: boolean
  isLoading?: boolean
  extraButtons?: {
    label: string
    icon?: LucideIcon
    onClick?: VoidFunction
    variant?: ButtonProps["variant"]
    className?: ButtonProps["className"]
  }[]
  menuId?: string
  extraLeftComponents?: React.ReactNode
  extraRightComponents?: React.ReactNode
}

export function DataTableToolbar({ ...props }: DataTableToolbarProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState<string>()
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(search, 500)
  const [isLockedView, setIsLockedView] = useState(false)
  const [isGlobalFiltered, setIsGlobalFiltered] = useState(false)
  const [isCustomVisibility, setIsCustomVisibility] = useState(false)

  const getPageFilters = () => {
    if (typeof localStorage === "undefined") return []
    const storedData = localStorage.getItem(`page_view:${props.menuId ?? ""}`)
    if (!storedData) return { isLocked: false }
    try {
      return JSON.parse(storedData)
    } catch (error) {
      console.error("Failed to get custom page view from local storage", error)
      return { isLocked: false }
    }
  }

  const { filters, onSearchChange } = useDataTableContext()

  const lockedPageFilters = getPageFilters()

  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev)
  }

  useEffect(() => {
    debouncedSearch && onSearchChange(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    setIsGlobalFiltered(!!debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    setIsLockedView(lockedPageFilters.isLocked)
  }, [lockedPageFilters.isLocked])

  return (
    <div className="">
      <div
        className={cn("flex h-9 items-center justify-between", props.className)}
      >
        <div className="flex flex-row items-center gap-3">
          {props.extraLeftComponents}
        </div>
        <div className="flex gap-2">
          <div
            className={cn(
              "inline-flex gap-2 text-muted-foreground opacity-0 transition-opacity delay-0 duration-200",
              props.isHover === undefined
                ? "opacity-100"
                : props.isHover || filterOpen || viewOpen
                  ? "opacity-100"
                  : "opacity-0"
            )}
          >
            {props.isLoading && (
              <div className="flex h-8 items-center justify-center">
                <LoaderIcon className="size-4 animate-spin text-muted-foreground opacity-100" />
              </div>
            )}
            {props.extraButtons?.map((button, index) => (
              <Button
                key={index}
                size={"sm"}
                className="h-8 min-w-8"
                onClick={button.onClick}
                variant={button.variant ?? props.buttonVariant ?? "outline"}
              >
                {button.icon && <button.icon className="mr-2 h-4 w-4" />}
                {button.label}
              </Button>
            ))}
            <Tooltip delayDuration={100}>
              <DataTableFilterOptions
                onOpenChange={setFilterOpen}
                isLocked={isLockedView}
                lockedPageFilters={lockedPageFilters}
              >
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setFilterOpen(!filterOpen)}
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8"}
                  >
                    <ListFilterIcon
                      className={cn(
                        "h-4 w-4",
                        filters.length > 0 && "text-button-primary"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
              </DataTableFilterOptions>
              <TooltipContent
                side="top"
                className="border bg-background text-foreground"
              >
                <p>Filter</p>
              </TooltipContent>
            </Tooltip>
            <div className="inline-flex items-center">
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleSearchOpen}
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8"}
                  >
                    <SearchIcon
                      className={`h-4 w-4 ${isGlobalFiltered ? "text-button-primary" : ""}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="border bg-background text-foreground"
                >
                  <p>Search</p>
                </TooltipContent>
                <div
                  className={cn(
                    "w-0 opacity-0 transition-all",
                    searchOpen && "ml-1 w-[150px] opacity-100"
                  )}
                >
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={cn(
                      "h-8 min-w-0 p-0 text-xs",
                      searchOpen && "p-2"
                    )}
                    placeholder="Type to search..."
                  />
                </div>
              </Tooltip>
            </div>
            <Tooltip delayDuration={100}>
              <DataTableViewOptions onOpenChange={setViewOpen}>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8"}
                  >
                    <EyeIcon
                      className={`h-4 w-4 ${isCustomVisibility ? "text-button-primary" : ""}`}
                    />
                  </Button>
                </TooltipTrigger>
              </DataTableViewOptions>
              <TooltipContent
                side="top"
                className="border bg-background text-foreground"
              >
                <p>Columns</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {props.extraRightComponents}
        </div>
      </div>
      <div className="w-full px-2">
        {filters.length > 0 && (
          <div>
            <Separator className="my-2" />
            <DataTableFilterInline onOpenChange={setFilterOpen} />
          </div>
        )}
      </div>
    </div>
  )
}
