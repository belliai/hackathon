"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@components/track/table"

import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"

type ContentProps = {
    title: string
}

type PropsFilter = {
    uldNumber: string,

}

const initFilter : PropsFilter = {
    uldNumber: "",

}


const Contents = (props: ContentProps) => {
    const { title } = props
    const [filter, setFilter] = useState<PropsFilter>(initFilter)
    const resetFilter = () => {
        setFilter(initFilter)
    }


    const onSelectFilter = (key: string, val: any) => {
        setFilter((prev: any) => ({
            ...prev,
            [key]: val
        }))
    }


    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>

            <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-end">
                <FilterDebouncedInput
                    onChange={(val: any) => onSelectFilter("masterValue", val)}
                    title="ULD Number"
                    value={filter.uldNumber}
                    className="w-56"
                />
                <Button variant="button-primary"  className="h-8 w-8 p-1">
                    <Search size={18} />
                </Button>
                <Button onClick={resetFilter} variant="button-primary" className="h-8 w-8 p-1">
                    <RefreshCw size={18} />
                </Button>

            </div>
            <p>ULD Track Details</p>

        </div>
    )
}

export default Contents