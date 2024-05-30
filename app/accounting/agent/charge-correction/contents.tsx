"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData, locations, invoiceTypeList, invoiceStatusList, originList, countryList, billTypeList } from "./dummy-data"
import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import { cn } from "@/lib/utils"
import React from "react"

type ContentProps = {
    title: string,
    actions? : React.ReactNode
}

type FilterProps = {
    fromDate: string
    toDate: string,
    CCANo: string
    CCAType: string
    CCAStatus: string
    agentCode: string,
    prefix: string,
    awbNo: string,
    invoiceNo: string,

}
const initFilter: FilterProps = {
    fromDate: "",
    toDate: "",
    CCANo: "",
    CCAType: "",
    CCAStatus: "",
    agentCode: "",
    prefix: "",
    awbNo: "",
    invoiceNo: "",
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
            [key]: val
        }))
    }

    useEffect(() => {
    }, [filter])

    return (
        <div className="flex-col space-y-4">
            <div className="flex w-full justify-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                {actions}
            </div>


            <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-start">
                <div className="h-8 opacity-40 hover:opacity-60 mt-1">
                    <SlidersHorizontal onClick={() => setAllfilter(!allFilter)} className={cn("cursor-pointer", allFilter && "text-indigo-400 text-opacity-80")} />
                </div>
                <div className="grid lg:grid-cols-4  xl:grid-cols-5  2xl:grid-cols-7 md:grid-cols-5 sm:grid-cols-3    gap-x-2 gap-y-2">

                    <FilterDatePicker
                        onChange={(val: any) => onSelectFilter("fromDate", val)}
                        value={filter.fromDate}
                        name="CCA From Date"
                    />
                    <FilterDatePicker
                        onChange={(val: any) => onSelectFilter("toDate", val)}
                        value={filter.toDate}
                        name="CCA To Date"
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("CCANo", val)}
                        title="CCA Number"
                        value={filter.CCANo}
                    />
                    <FilterSelect
                        options={[
                            { key: "debit", value: "Debit" },
                            { key: "credit", value: "Credit" }
                        ]}
                        onChange={(val: any) => onSelectFilter("CCAType", val)}
                        name="CCA type"
                        value={filter.CCAType}
                    />
                    <FilterSelect
                        options={[
                            { key: "pending", value: "Pending" },
                            { key: "accepted", value: "Accepted" },
                            { key: "rejected", value: "Rejected" }
                        ]}
                        onChange={(val: any) => onSelectFilter("CCAStatus", val)}
                        name="Status"
                        value={filter.CCAStatus}
                    />

                    {allFilter && <React.Fragment>
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("agentCode", val)}
                            title="Agent Code"
                            value={filter.agentCode}
                            className=""
                            rightIcon={<Search size={14} />}
                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("prefix", val)}
                            title="Prefix"
                            value={filter.prefix}
                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("awbNo", val)}
                            title="AWB Number"
                            value={filter.awbNo}
                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("invoiceNo", val)}
                            title="Invoice Number"
                            value={filter.invoiceNo}
                        />


                    </React.Fragment>
                    }

                    <div className="flex space-x-2 items-end">
                        <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <Search size={18} />
                        </Button>
                        <Button onClick={resetFilter} variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <RefreshCw size={18} />
                        </Button>
                        <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <Download size={18} />
                        </Button>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data}
            />

            <div className="flex space-x-2">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Print CCA Summary
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Print CCA Per AWB
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Accept
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Reject
                </Button>

            </div>
        </div>
    )
}

export default Contents