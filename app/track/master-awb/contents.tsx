"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData } from "./dummy-data"
import { useEffect, useState } from "react"
import { Download, Printer, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@components/track/filter-input"

type ContentProps = {
    title: string
}

const initFilter = {
    masterBagNo: "775",


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
        if (filter.master) {
            const filtered = dummyData.filter(item => item.motherbagNo.includes(filter.motherbagNo))
            setData(filtered)
        } else {
            setData(dummyData)
        }

    }, [filter])

    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-end">
                <div className="h-8 opacity-40 hover:opacity-60"><SlidersHorizontal className="cursor-pointer" /></div>

                <FilterDebouncedInput
                    onChange={(val: any) => onSelectFilter("motherBagNo", val)}
                    title="Master Bag Number"
                    value={filter.masterBagNo}
                    className="w-56"
                />
                <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                    <Search size={18} />
                </Button>
                <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                    <Download size={18} />
                </Button>
                <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                    <Printer size={18} />
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