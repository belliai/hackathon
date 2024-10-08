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
import {
  billTypeList,
  countryList,
  dummyData,
  invoiceStatusList,
  invoiceTypeList,
  locations,
  originList,
} from "./dummy-data"

type ContentProps = {
  title: string
}

const initFilter = {
  fromDate: "",
  toDate: "",
  invoiceNo: "",

  invoiceType: "",
  invoiceStatus: "",
  origin: "",
  agentCode: "",
  agentname: "",
  prefix: "",
  awbNo: "",
  billType: "",
  CASSAgent: "",
  country: "",
  airportType: "",
  invoiceCloseDate: "",
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
        <div className="grid gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          <FilterDatePicker
            onChange={(val: any) => onSelectFilter("fromDate", val)}
            value={filter.fromDate}
            name="Invoice From Date"
          />
          <FilterDatePicker
            onChange={(val: any) => onSelectFilter("toDate", val)}
            value={filter.toDate}
            name="Invoice To Date"
          />
          <FilterDebouncedInput
            onChange={(val: any) => onSelectFilter("invoiceNo", val)}
            title="Invoice No."
            value={filter.invoiceNo}
            className="w-40"
          />
          <FilterSelect
            options={invoiceTypeList}
            onChange={(val: any) => onSelectFilter("invoiceType", val)}
            name="Invoice type"
            value={filter.invoiceType}
            className="w-40"
          />

          {allFilter && (
            <React.Fragment>
              <FilterSelect
                options={invoiceStatusList}
                onChange={(val: any) => onSelectFilter("invoiceStatus", val)}
                name="Invoice Status"
                value={filter.invoiceStatus}
                className="w-40"
              />
              <FilterSelect
                options={originList}
                onChange={(val: any) => onSelectFilter("origin", val)}
                name="Origin"
                value={filter.origin}
                className="w-40"
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
                className="w-40"
              />

              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("prefix", val)}
                title="Prefix"
                value={filter.prefix}
                className="w-40"
              />

              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("awbNo", val)}
                title="AWB"
                value={filter.awbNo}
                className="w-40"
              />
              <FilterSelect
                options={billTypeList}
                onChange={(val: any) => onSelectFilter("billType", val)}
                name="Bill Type"
                value={filter.billType}
                className="w-40"
              />

              <FilterSelect
                options={[
                  { key: "all", value: "All" },
                  { key: "yes", value: "Yes" },
                  { key: "no", value: "No" },
                ]}
                onChange={(val: any) => onSelectFilter("CASSAgent", val)}
                name="CASS Agent"
                value={filter.CASSAgent}
                className="w-40"
              />

              <FilterSelect
                options={countryList}
                onChange={(val: any) => onSelectFilter("country", val)}
                name="Country"
                value={filter.country}
                className="w-40"
              />
              <FilterSelect
                options={[
                  { key: "airport", value: "Airport" },
                  { key: "warehouse", value: "Warehouse" },
                ]}
                onChange={(val: any) => onSelectFilter("airportType", val)}
                name="Airport Type"
                value={filter.airportType}
                className="w-40"
              />
            </React.Fragment>
          )}

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
      <div className="flex w-full justify-between">
        <p className="text-xs">Total Invoice Count: 0</p>
        <FilterDatePicker
          onChange={(val: any) => onSelectFilter("invoiceCloseDate", val)}
          value={filter.invoiceCloseDate}
          name="Invoice Close Date"
        />
      </div>

      <DataTable columns={columns} data={data} />

      <div className="flex space-x-2">
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Print Listing
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Print Invoice (Excel)
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Print Invoice (PDF)
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Cancel Invoice
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Exported To ERP
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Close Invoice
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Generate IRN
        </Button>
      </div>
    </div>
  )
}

export default Contents
