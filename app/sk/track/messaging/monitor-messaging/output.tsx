import { useEffect, useState } from "react"
import { Download, RefreshCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FilterCheckbox } from "@/components/track/filter-checkbox"
import FilterDatePicker from "@/components/track/filter-date-picker"
import FilterDebouncedInput from "@/components/track/filter-input"
import FilterSelect from "@/components/track/filter-select"
import { DataTable } from "@/components/track/table"

import { columns } from "./columns"
import { dummyData } from "./dummy-data"

type PropsFilter = {
  awbNo: string
  communicationType: string
  messageType: string
  messageCategory: string
  origin: string
  destination: string
  fromDate: string
  toDate: string
  processed: boolean
  failed: boolean
}

const initFilter: PropsFilter = {
  awbNo: "",
  communicationType: "",
  messageType: "",
  messageCategory: "",
  origin: "",
  destination: "",
  fromDate: "",
  toDate: "",
  processed: false,
  failed: false,
}

const Output = () => {
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
    <div className="space-y-4">
      <div>
        <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-4">
          <div className="grid gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
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
            <FilterSelect
              options={[
                { key: "JKT", value: "JKT" },
                { key: "SBY", value: "SBY" },
                { key: "BGR", value: "BGR" },
              ]}
              onChange={(val: any) => onSelectFilter("origin", val)}
              name="Flight Origin"
              value={filter.origin}
            />

            <FilterSelect
              options={[
                { key: "JKT", value: "JKT" },
                { key: "SBY", value: "SBY" },
                { key: "BGR", value: "BGR" },
              ]}
              onChange={(val: any) => onSelectFilter("destination", val)}
              name="Flight Destination"
              value={filter.origin}
            />

            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("awbNo", val)}
              title="FltNo/AWBNo/Free text"
              value={filter.awbNo}
              rightIcon={<Search size={14} />}
            />

            <FilterSelect
              options={[
                { key: "FTP", value: "FTP" },
                { key: "API", value: "API" },
                { key: "SFTP", value: "SFTP" },
              ]}
              onChange={(val: any) => onSelectFilter("communicationType", val)}
              name="Communication Type"
              value={filter.communicationType}
            />

            <FilterSelect
              options={[
                { key: "FTP", value: "FTP" },
                { key: "API", value: "API" },
                { key: "SFTP", value: "SFTP" },
              ]}
              onChange={(val: any) => onSelectFilter("messageType", val)}
              name="Message Type"
              value={filter.messageType}
            />

            <FilterSelect
              options={[
                { key: "FTP", value: "FTP" },
                { key: "API", value: "API" },
                { key: "SFTP", value: "SFTP" },
              ]}
              onChange={(val: any) => onSelectFilter("messageCategory", val)}
              name="Message Category"
              value={filter.messageType}
            />

            <FilterCheckbox
              onChange={(val: any) => onSelectFilter("processed", val)}
              name="Processed"
              value={filter.processed}
            />

            <FilterCheckbox
              onChange={(val: any) => onSelectFilter("failed", val)}
              name="Failed"
              value={filter.failed}
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
              <Button
                variant="outline"
                className="h-8 bg-indigo-600 p-1 hover:bg-indigo-700"
              >
                Compose
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Output
