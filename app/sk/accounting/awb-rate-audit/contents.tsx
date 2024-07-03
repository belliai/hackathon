"use client"

import React, { useEffect, useState } from "react"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FilterCheckbox } from "@/components/track/filter-checkbox"
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

type PropsFilter = {
  typeDate: string
  fromDate: string
  toDate: string
  prefix: string
  awbNo: string
  agent: string
  shipmentType: string
  ocdc: string

  flightNo: string
  origin: string
  paymentMode: string
  country: string
  entity: string

  status: string
  destination: string
  spotRate: string
  CASSAgent: string
  includeInterline: string

  invoiceStatus: string
  adjustments: string
  includePartial: boolean
  interlineStatus: string
  productType: string
}

const initFilter: PropsFilter = {
  typeDate: "",
  fromDate: "",
  toDate: "",
  prefix: "",
  awbNo: "",
  agent: "",
  shipmentType: "",
  ocdc: "",

  flightNo: "",
  origin: "",
  paymentMode: "",
  country: "",
  entity: "",

  status: "",
  destination: "",
  spotRate: "",
  CASSAgent: "",
  includeInterline: "",

  invoiceStatus: "",
  adjustments: "",
  includePartial: false,
  productType: "",
  interlineStatus: "",
}

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

      <div className="flex flex-col items-start space-y-3 rounded-md border border-zinc-800 p-4">
        <div className="flex space-x-2 overflow-x-scroll">
          <div className="space-y-1">
            <div className="flex w-full space-x-2">
              <FilterSelect
                options={[
                  { key: "billingDate", value: "Billing Date" },
                  { key: "createdDate", value: "Created Date" },
                ]}
                onChange={(val: any) => onSelectFilter("CASSAgent", val)}
                name="Type Date"
                value={filter.CASSAgent}
                className="w-16"
              />

              <FilterDatePicker
                onChange={(val: any) => onSelectFilter("fromDate", val)}
                value={filter.fromDate}
                name="Invoice From Date"
                className="w-32"
              />
              <FilterDatePicker
                onChange={(val: any) => onSelectFilter("toDate", val)}
                value={filter.toDate}
                name="Invoice To Date"
                className="w-32"
              />
            </div>
            <div className="flex space-x-2">
              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("prefix", val)}
                title="AWB #"
                value={filter.awbNo}
                className="w-20"
              />
              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("awbNo", val)}
                value={filter.awbNo}
                className="flex w-full justify-end"
              />
            </div>
            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("agent", val)}
              title="Agent"
              value={filter.awbNo}
            />

            <FilterSelect
              options={[{ key: "all", value: "All" }]}
              onChange={(val: any) => onSelectFilter("shipmentType", val)}
              name="Shipment Type"
              value={filter.shipmentType}
            />

            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("ocdc", val)}
              title="OCDC"
              value={filter.ocdc}
            />
          </div>

          <div className="space-y-1">
            <div className="flex space-x-2">
              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("prefix", val)}
                title="Flight #"
                value={filter.awbNo}
                className="w-20"
              />
              <FilterDebouncedInput
                onChange={(val: any) => onSelectFilter("flightNo", val)}
                value={filter.flightNo}
                className="flex w-full justify-end"
              />
            </div>

            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("origin", val)}
              title="Origin"
              value={filter.origin}
            />

            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "agent", value: "Agent" },
              ]}
              onChange={(val: any) => onSelectFilter("paymentMode", val)}
              name="Payment Mode"
              value={filter.paymentMode}
            />

            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "SG", value: "Singapore" },
                { key: "US", value: "United State" },
                { key: "SP", value: "Spain" },
              ]}
              onChange={(val: any) => onSelectFilter("country", val)}
              name="Country"
              value={filter.country}
            />

            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("entity", val)}
              title="Entity"
              value={filter.entity}
            />
          </div>

          <div className="space-y-1">
            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("status", val)}
              name="Status"
              value={filter.status}
            />
            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("destination", val)}
              title="Destination"
              value={filter.destination}
            />

            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("spotRate", val)}
              name="Spot Rate"
              value={filter.spotRate}
            />

            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("CASSAgent", val)}
              name="CASS Agent"
              value={filter.CASSAgent}
            />

            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("includeInterline", val)}
              name="Include Interline"
              value={filter.includeInterline}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("invoiceStatus", val)}
              name="Invoice Status"
              value={filter.invoiceStatus}
            />

            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("adjustments", val)}
              name="Adjustments"
              value={filter.adjustments}
            />

            <FilterCheckbox name="Inlude Partial" className="h-14 items-end" />
            <FilterSelect
              options={[
                { key: "all", value: "All" },
                { key: "final", value: "Final" },
              ]}
              onChange={(val: any) => onSelectFilter("interlineStatus", val)}
              name="Interline status"
              value={filter.interlineStatus}
            />

            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("productType", val)}
              title="Product Type"
              value={filter.productType}
            />
          </div>
        </div>

        <div className="flex items-end space-x-2">
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
        </div>
      </div>

      <DataTable columns={columns} data={data} />

      <div className="flex space-x-2">
        <Button variant="button-primary">Confirm</Button>
        <Button variant="button-primary">Finalize</Button>
        <Button variant="button-primary">Reopen</Button>
        <Button variant="button-primary">Generate Proforma</Button>
        <Button variant="button-primary">Generate Invoice</Button>
        <Button variant="button-primary">Confirm Interline</Button>
      </div>
    </div>
  )
}

export default Contents
