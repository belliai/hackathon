"use client"

import { useEffect, useState } from "react"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { columns } from "./columns"
import { dummyData, masterList } from "./dummy-data"

type ContentProps = {
  title: string
}

const Contents = (props: ContentProps) => {
  const { title } = props
  const [data, setData] = useState<Array<any>>(dummyData)
  const [filter, setFilter] = useState<any>({
    master: "",
    fromDate: "",
    toDate: "",
  })

  const resetFilter = () => {
    setFilter({
      master: "",
      fromDate: "",
      toDate: "",
    })
  }

  const onSelectFilter = (key: string, val: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: val,
    }))
  }

  useEffect(() => {
    console.log(filter)
    if (filter.master) {
      const filtered = dummyData.filter(
        (item) => item.masterKey === filter.master
      )
      setData(filtered)
    } else {
      setData(dummyData)
    }
  }, [filter])

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-end space-x-2 rounded-md border border-zinc-800 p-4">
        <div className="h-8 opacity-40 hover:opacity-60">
          <SlidersHorizontal className="cursor-pointer" />
        </div>
        <FilterSelect
          options={masterList}
          onChange={(val: any) => onSelectFilter("master", val)}
          name="Master"
          value={filter.master}
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
        <Button
          variant="outline"
          className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
        >
          <Download size={18} />
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Contents
