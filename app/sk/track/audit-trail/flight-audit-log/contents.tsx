"use client"

import React, { useEffect, useState } from "react"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"

import { columns } from "./columns"
import { dummyData } from "./dummy-data"

type ContentProps = {
  title: string
}

const initFilter = {
  prefix: "",
  flightNo: "",
  flightDate: "",
  toDate: "",
}

const Contents = (props: ContentProps) => {
  const { title } = props
  const [data, setData] = useState<Array<any>>(dummyData)
  const [allFilter, setAllfilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<any>(initFilter)

  const resetFilter = () => {
    setFilter(initFilter)
  }

  const onSelectFilter = (key: string, val: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: val,
    }))
  }

  useEffect(() => {}, [filter])

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div>
        <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-4">
          <div className="h-8 opacity-40 hover:opacity-60">
            <SlidersHorizontal
              onClick={() => setAllfilter(!allFilter)}
              className={cn(
                "cursor-pointer",
                allFilter && "text-indigo-400 text-opacity-80"
              )}
            />
          </div>
          <div className="grid gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("prefix", val)}
              title="Flight No."
              value={filter.prefix}
              className=""
            />
            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("flightNo", val)}
              value={filter.flightNo}
              className="flex justify-end"
            />

            <FilterDatePicker
              onChange={(val: any) => onSelectFilter("flightDate", val)}
              value={filter.flightDate}
              name="Flight Date"
            />

            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
              >
                <Search size={18} />
              </Button>
              <Button
                onClick={resetFilter}
                variant="outline"
                className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
              >
                <RefreshCw size={18} />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
              >
                <Download size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Contents