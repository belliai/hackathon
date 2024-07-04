"use client"

import { useEffect, useState } from "react"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FilterDebouncedInput from "@/components/track/filter-input"

type ContentProps = {
  title: string
}

type PropsFilter = {
  uldNumber: string
}

const initFilter: PropsFilter = {
  uldNumber: "",
}

const Contents = (props: ContentProps) => {
  const { title } = props
  const [filter, setFilter] = useState<PropsFilter>(initFilter)
  const resetFilter = () => {
    setFilter(initFilter)
  }

  const onSelectFilter = (key: string, val: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: val,
    }))
  }

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-end space-x-2 rounded-md border border-zinc-800 p-4">
        <FilterDebouncedInput
          onChange={(val: any) => onSelectFilter("masterValue", val)}
          title="ULD Number"
          value={filter.uldNumber}
          className="w-56"
        />
        <Button variant="button-primary" className="h-8 w-8 p-1">
          <Search size={18} />
        </Button>
        <Button
          onClick={resetFilter}
          variant="button-primary"
          className="h-8 w-8 p-1"
        >
          <RefreshCw size={18} />
        </Button>
      </div>
      <p>ULD Track Details</p>
    </div>
  )
}

export default Contents
