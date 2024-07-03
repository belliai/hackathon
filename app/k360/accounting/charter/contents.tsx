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
  actions?: React.ReactNode
}

type FilterProps = {
  fromDate: string
  toDate: string
  agentCode: string
  agentName: string
  dateType: string
  invoiceNo: string
  supplierOrigin: string
  flightNo: string
  status: string
  currency: string
}
const initFilter: FilterProps = {
  fromDate: "",
  toDate: "",
  agentCode: "",
  agentName: "",
  dateType: "",
  invoiceNo: "",
  supplierOrigin: "",
  flightNo: "",
  status: "",
  currency: "",
}

const Contents = (props: ContentProps) => {
  const { title, actions } = props
  const [data, setData] = useState<Array<any>>(dummyData)
  const [allFilter, setAllfilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<FilterProps>(initFilter)

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
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {actions}
      </div>

      <div className="flex items-start space-x-2 rounded-md border border-zinc-800 p-4">
        <div className="mt-1 h-8 opacity-40 hover:opacity-60">
          <SlidersHorizontal
            onClick={() => setAllfilter(!allFilter)}
            className={cn(
              "cursor-pointer",
              allFilter && "text-indigo-400 text-opacity-80"
            )}
          />
        </div>
        <div className="grid gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          <FilterDatePicker
            onChange={(val: any) => onSelectFilter("fromDate", val)}
            value={filter.fromDate}
            name="From Date"
          />
          <FilterDatePicker
            onChange={(val: any) => onSelectFilter("toDate", val)}
            value={filter.toDate}
            name="To Date"
          />
          <FilterDebouncedInput
            onChange={(val: any) => onSelectFilter("agentCode", val)}
            title="Agent Code"
            value={filter.agentCode}
            className=""
            rightIcon={<Search size={14} />}
          />
          <FilterDebouncedInput
            onChange={(val: any) => onSelectFilter("agentName", val)}
            title="Agent Name"
            value={filter.agentName}
            className=""
          />

          {allFilter && (
            <React.Fragment>
              <FilterSelect
                options={[
                  { key: "flightDate", value: "Flight Date" },
                  { key: "invoiceDate", value: "Invoice Date" },
                ]}
                onChange={(val: any) => onSelectFilter("collection", val)}
                name="Date Type"
                value={filter.dateType}
                className="w-40"
              />
              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("supplierOrigin", val)}
                title="Supplier Origin"
                value={filter.supplierOrigin}
                className=""
                rightIcon={<Search size={14} />}
              />
            </React.Fragment>
          )}

          <div className="flex items-end space-x-2">
            <Button variant="button-primary" className="h-8 w-8 p-1">
              <Search size={18} />
            </Button>
            <Button variant="button-primary" className="h-8 w-8 p-1">
              <RefreshCw size={18} />
            </Button>
            <Button variant="button-primary" className="h-8 w-8 p-1">
              <Download size={18} />
            </Button>
            <Button variant="button-primary" className="h-8 w-8 p-1">
              <Download size={18} />
            </Button>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
      <div className="flex space-x-2">
        <Button variant={"button-primary"}>Final</Button>
        <Button variant={"button-primary"}>Generate Proforma Invoice</Button>
        <Button variant={"button-primary"}>General Commercial Invoice</Button>
        <Button variant={"button-primary"}>Generate Invoice</Button>
        <Button variant={"button-primary"}>Print Invoice</Button>
      </div>
    </div>
  )
}

export default Contents
