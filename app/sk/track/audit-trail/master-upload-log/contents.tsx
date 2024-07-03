"use client"

import React, { useEffect, useState } from "react"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import FilterDebouncedInput from "@/components/track/filter-input"
import FormFields from "@/components/track/form"
import { PropsField } from "@/components/track/types"

import { columns } from "./columns"
import { dummyData } from "./dummy-data"

type ContentProps = {
  title: string
}

type PropsFilter = {
  user: string
  fromDate: string
  toDate: string
}

const initFilter: PropsFilter = {
  user: "",
  fromDate: "",
  toDate: "",
}

const filterFields: Array<PropsField> = [
  {
    fieldId: "master",
    label: "Master",
    type: "inputSelect",
    options: [
      { label: "All", value: "all" },
      { label: "agent", value: "Agent" },
      { label: "aircraft", value: "Aircraft" },
      { label: "airport", value: "Airports" },
      { label: "collection", value: "Collection" },
    ],
  },
  {
    fieldId: "fromDate",
    label: "From Date",
    type: "inputDate",
  },
  {
    fieldId: "toDate",
    label: "To Date",
    type: "inputDate",
  },
]

const Contents = (props: ContentProps) => {
  const { title } = props
  const [data, setData] = useState<Array<any>>(dummyData)
  const [allFilter, setAllfilter] = useState<boolean>(false)
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

  useEffect(() => {}, [filter])

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div>
        <Card className="py-2">
          <CardContent className="space-x-2 space-y-2">
            <FormFields fields={filterFields} />
          </CardContent>
          <CardFooter className="space-x-2">
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
            <Button variant="button-primary" className="h-8 w-8 p-1">
              <Download size={18} />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Contents
