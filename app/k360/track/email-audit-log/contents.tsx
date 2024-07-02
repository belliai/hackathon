"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData, locations, masterList } from "./dummy-data"
import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import { cn } from "@/lib/utils"
import React from "react"

type ContentProps = {
    title: string
}

const initFilter = {

    awbNo: "775",
    messageCategory: "",
    messageType: "",
    type: "",
    origin: "",
    destination: "",
    communicationType: "",
    status: "",
    fromDate: "",
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
            [key]: val
        }))
    }

    useEffect(() => {



    }, [filter])

    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>

            <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-center">
                <div className="h-8 opacity-40 hover:opacity-60">
                    <SlidersHorizontal onClick={()=>setAllfilter(!allFilter)} className={cn("cursor-pointer", allFilter && "text-indigo-400 text-opacity-80")} />
                </div>
                <div className="grid  sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-7  gap-x-2 gap-y-2">
                    <FilterSelect
                        options={masterList}
                        onChange={(val: any) => onSelectFilter("messageCategory", val)}
                        name="Message Category"
                        value={filter.master}
                        className="w-40"
                    />
                    <FilterSelect
                        options={[
                            { key: "outgoing", value: "Outgoing" },
                            { key: "incoming", value: "Incoming" }
                        ]}
                        onChange={(val: any) => onSelectFilter("messageCategory", val)}
                        name="Type"
                        value={filter.master}
                        className="w-40"
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
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("awbNo", val)}
                        title="AWB Number"
                        value={filter.awbNo}
                        className="w-40"
                    />

                    {allFilter && <React.Fragment>
                        <FilterSelect
                            options={[
                                { key: "alert", value: "Alert" },
                                { key: "xml", value: "XML" }
                            ]}
                            onChange={(val: any) => onSelectFilter("messageCategory", val)}
                            name="Message Type"
                            value={filter.master}
                            className="w-40"
                        />

                        <FilterSelect
                            options={locations}
                            onChange={(val: any) => onSelectFilter("origin", val)}
                            name="Origin"
                            value={filter.master}
                            className="w-40"
                        />
                        <FilterSelect
                            options={locations}
                            onChange={(val: any) => onSelectFilter("destination", val)}
                            name="Destination"
                            value={filter.master}
                            className="w-40"
                        />
                        <FilterSelect
                            options={[
                                { key: "email", value: "Email" },
                                { key: "ftp", value: "FTP" },

                            ]}
                            onChange={(val: any) => onSelectFilter("messageCategory", val)}
                            name="Communication Type"
                            value={filter.master}
                            className="w-40"
                        />
                        <FilterSelect
                            options={[
                                { key: "processed", value: "Processed" },
                                { key: "failed", value: "Failed" },
                                { key: "pending", value: "Pending" },
                            ]}
                            onChange={(val: any) => onSelectFilter("messageCategory", val)}
                            name="Processed/Failed"
                            value={filter.master}
                            className="w-40"
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
        </div>
    )
}

export default Contents