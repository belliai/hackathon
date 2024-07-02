"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData } from "./dummy-data"
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
    userCode: "",
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
            <div>
                <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-center">
                    <div className="h-8 opacity-40 hover:opacity-60">
                        <SlidersHorizontal onClick={() => setAllfilter(!allFilter)} className={cn("cursor-pointer", allFilter && "text-indigo-400 text-opacity-80")} />
                    </div>
                    <div className="grid  sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-7  gap-x-2 gap-y-2">
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("userEmail", val)}
                            title="Email"
                            value={filter.userCode}
                            className=""
                            rightIcon={<Search size={14} />}
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

            </div>
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default Contents