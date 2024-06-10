"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData, locations, invoiceTypeList, invoiceStatusList, originList, countryList, billTypeList } from "./dummy-data"
import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useRef, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import { cn } from "@/lib/utils"
import React from "react"
import { FilterCheckbox } from "@/components/track/filter-checkbox"
import FormFields from "@/components/track/form"
import { UseFormReturn } from "react-hook-form"
import { invoiceSchema } from "./schema"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { filterFields } from "./fields"

type ContentProps = {
    title: string
}


type PropsFilter = {

    fromDate: string,
    toDate: string,
    agent: string,
    CASSAgent: string,


    invoiceNo: string,
    awbPrefix: string,
    awbNo: string,
    country: string,

    invoiceType: string,
    origin: string,
    entity: string,

    invoiceStatus: string,
    billType: string,
    adjustment: string,

}

const initFilter: PropsFilter = {
    fromDate: "",
    toDate: "",
    agent: "",
    CASSAgent: "",


    invoiceNo: "",
    awbPrefix: "",
    awbNo: "",
    country: "",

    invoiceType: "",
    origin: "",
    entity: "",

    invoiceStatus: "",
    billType: "",
    adjustment: "",


}

const Contents = (props: ContentProps) => {
    const { title } = props
    const [data, setData] = useState<Array<any>>(dummyData)
    const [allFilter, setAllfilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<PropsFilter>(initFilter)

    const filterFormRef = useRef<UseFormReturn<z.infer<typeof invoiceSchema>> | null>(null);

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

            <Card>

                <CardContent>
                    <FormFields
                        ref={filterFormRef}
                        fields={filterFields}
                        defaultValues={{}}
                        schema={invoiceSchema}
                        actions={
                            <div className="flex space-x-2 items-end mt-4">
                                <Button variant="button-primary" className="h-8 w-8 p-1">
                                    <Search size={18} />
                                </Button>
                                <Button onClick={resetFilter} variant="button-primary" className="h-8 w-8 p-1 ">
                                    <RefreshCw size={18} />
                                </Button>
                            </div>
                        }
                    />
                </CardContent>
            </Card>

            <DataTable
                columns={columns}
                data={data}
            />


        </div>
    )
}

export default Contents