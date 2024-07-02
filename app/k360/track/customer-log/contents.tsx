"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData, typelist } from "./dummy-data"
import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

type ContentProps = {
    title: string
}

const initFilter = {
    type: "",
    fromDate: "",
    toDate: ""
}

const Contents = (props: ContentProps) => {
    const { title } = props
    const [data, setData] = useState<Array<any>>(dummyData)
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

            <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-end">
                <div className="h-8 opacity-40 hover:opacity-60"><SlidersHorizontal className="cursor-pointer" /></div>
             
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
                   <FilterSelect
                    options={typelist}
                    onChange={(val: any) => onSelectFilter("type", val)}
                    name="Type"
                    value={filter.master}
                />
                <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                    <Search size={18} />
                </Button>
                <Button onClick={resetFilter} variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                    <RefreshCw size={18} />
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default Contents