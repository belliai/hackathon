"use client"

import { info } from "console"
import { Ref, useEffect, useState } from "react"
import { Button, ButtonProps } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table, VisibilityColumn, VisibilityState } from "@tanstack/react-table"
import {
  ArrowUpDownIcon,
  EyeIcon,
  ListFilterIcon,
  LockIcon,
  LucideIcon,
  SearchIcon,
  UnlockIcon,
  ViewIcon,
} from "lucide-react"
import { useDebounceValue } from "usehooks-ts"

import { cn } from "@/lib/utils"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { DataTableFilterOptions } from "./data-table-filter-options"
import { DataTableViewOptions } from "./data-table-view-options"

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  buttonVariant?: ButtonProps["variant"]
  initialVisibility?: VisibilityState
  className?: HTMLDivElement["className"]
  isHover?: boolean
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

export function DataTableToolbar<TData>({
  table,
  ...props
}: DataTableToolbarProps<TData>) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState<string>()
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(search, 500)
  const [isFilterActive, setIsFilterActive] = useState(false)
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

  const lockedPageFilters = getPageFilters()

  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev)
  }

  const toggleLockedView = (currentState: boolean) => {
    setIsLockedView(!currentState)
    if (!currentState && typeof localStorage !== "undefined") {
      localStorage.setItem(
        `page_view:${props.menuId ?? ""}`,
        JSON.stringify({ ...table.getState(), isLocked: true })
      )
    }
  }

  useEffect(() => {
    table.setGlobalFilter(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    setIsFilterActive(table.getState().columnFilters.length > 0)
  }, [table.getState().columnFilters])

  useEffect(() => {
    setIsGlobalFiltered(table.getState().globalFilter)
  }, [table.getState().globalFilter])

  useEffect(() => {
    setIsCustomVisibility(
      JSON.stringify(table.getState().columnVisibility) !==
        JSON.stringify(props.initialVisibility ?? {})
    )
  }, [table.getState().columnVisibility])

  useEffect(() => {
    setIsLockedView(lockedPageFilters.isLocked)
  }, [lockedPageFilters.isLocked])

  return (
    <div className={cn("flex items-center justify-between", props.className)}>
      <div className="flex flex-row items-center gap-3">
        {props.extraButtons?.map((button, index) => (
          <Button
            key={index}
            size={"sm"}
            onClick={button.onClick}
            variant={button.variant ?? props.buttonVariant ?? "outline"}
          >
            {button.icon && <button.icon className="mr-2 h-4 w-4" />}
            {button.label}
          </Button>
        ))}
        {props.extraLeftComponents}
      </div>
      <div
        className={cn(
          "inline-flex gap-2 text-muted-foreground opacity-0 transition-opacity delay-0 duration-200",
          props.isHover === undefined
            ? "opacity-100"
            : props.isHover
              ? "opacity-100"
              : "opacity-0"
        )}
      >
        <Tooltip delayDuration={100}>
          <DataTableFilterOptions
            table={table}
            isLocked={isLockedView}
            lockedPageFilters={lockedPageFilters}
          >
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className={"h-8 w-8"}>
                <ListFilterIcon
                  className={`h-4 w-4 ${isFilterActive ? "text-button-primary" : ""}`}
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
                className={"h-8 min-w-0 text-xs"}
                placeholder="Type to search..."
              />
            </div>
          </Tooltip>
        </div>
        <Tooltip delayDuration={100}>
          <DataTableViewOptions
            table={table}
            initialVisibility={props.initialVisibility ?? {}}
          >
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className={"h-8 w-8"}>
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
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className={"h-8 w-8"}
              onClick={() => toggleLockedView(isLockedView)}
            >
              {isLockedView && (
                <LockIcon
                  className={`h-4 w-4 ${isLockedView ? "text-button-primary" : ""}`}
                />
              )}
              {!isLockedView && <UnlockIcon className={`h-4 w-4`} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="border bg-background text-foreground"
          >
            <p>{isLockedView ? "Unlock Filter" : "Lock Filter"}</p>
          </TooltipContent>
        </Tooltip>
        {props.extraRightComponents}
      </div>
    </div>
  )
}
