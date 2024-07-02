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
import { PropsField } from "@/components/track/types"
import { Card, CardContent } from "@/components/ui/card"
import FormFields from "@/components/track/form"

type ContentProps = {
    title: string
}

type PropsFilter = {
    user: string,
    fromDate: string,
    toDate: string
}

const initFilter: PropsFilter = {
    user: "",
    fromDate: "",
    toDate: "",
}

const filterFields: Array<PropsField> = [
    {
        fieldId: "fromDate",
        label: "From Date",
        type: "inputDate"
    },
    {
        fieldId: "toDate",
        label: "To Date",
        type: "inputDate"
    },
    {
        fieldId: "station",
        label: "Station",
        type: "inputText"
    },
    {
        fieldId: "flightPrefix",
        label: "Flight",
        type: "inputText"
    },
    {
        fieldId: "flightNo",
        type: "inputText"
    },
    {
        fieldId: "status",
        type: "inputSelect",
        options: [
            { label: "All", value: "all" },
            { label: "Locked", value: "locked" },
            { label: "Unlocked", value: "unlocked" },
        ]
    },
    {
        fieldId: "page",
        type: "inputSelect",
        options: [
            { label: "All", value: "all" },
            { label: "Arrival", value: "arrival" },
            { label: "Export", value: "export" },
            { label: "Flight Planning", value: "flight-planning" },
            { label: "Break ULD", value: "break-uld" },
        ]
    }
]

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
            [key]: val
        }))
    }

    useEffect(() => {



    }, [filter])

    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div>
                <Card className="py-4">
                    <CardContent className="space-y-2 space-x-2">
                        <FormFields
                            fields={filterFields}
                        />
                        <Button variant="button-primary" className="h-8 w-8 p-1">
                            <Search size={18} />
                        </Button>
                        <Button onClick={resetFilter} variant="button-primary" className="h-8 w-8 p-1">
                            <RefreshCw size={18} />
                        </Button>
                    </CardContent>

                </Card>

            </div>
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default Contents