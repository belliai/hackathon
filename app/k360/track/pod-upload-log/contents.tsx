"use client"

import { useEffect, useState } from "react"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"

import { columns } from "./columns"
import { dummyData } from "./dummy-data"

type ContentProps = {
  title: string
}

const initFilter = {
  awbNo: "775",
  customerCode: "",
  uploadBy: "",
  fromDate: "",
  toDate: "",
}

const Contents = (props: ContentProps) => {
  const { title } = props
  const [data, setData] = useState<Array<any>>(dummyData)
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

      <div className="flex items-end space-x-2 rounded-md border border-zinc-800 p-4">
        <div className="h-8 opacity-40 hover:opacity-60">
          <SlidersHorizontal className="cursor-pointer" />
        </div>
        <FilterDebouncedInput
          onChange={(val: any) => onSelectFilter("awbNo", val)}
          title="AXB Number"
          value={filter.awbNo}
          className="w-52"
        />
        <FilterDebouncedInput
          onChange={(val: any) => onSelectFilter("customerCode", val)}
          title="Customer Code"
          value={filter.customerCode}
          className="w-52"
        />
        <FilterDebouncedInput
          onChange={(val: any) => onSelectFilter("uploadBy", val)}
          title="Upload By"
          value={filter.uploadBy}
          className="w-52"
        />
        <FilterDatePicker
          onChange={(val: any) => onSelectFilter("fromDate", val)}
          value={filter.fromDate}
          name="Choose From Date"
        />
        <FilterDatePicker
          onChange={(val: any) => onSelectFilter("toDate", val)}
          value={filter.toDate}
          name="Choose To Date"
        />

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
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Contents
