"use client"

import { DataTable } from "@components/track/table"

import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { BookMarked, Download, RefreshCw, Search, SlidersHorizontal, Weight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import { cn } from "@/lib/utils"
import React from "react"
import FilterTextarea from "@/components/track/filter-textarea"
import { dummyData } from "./dummy-data"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SimpleTable } from "@/components/track/simple-table"

type ContentProps = {
    title: string
}

type FilterProps = {
    prefix: string
    awbNos: string
    agentCode: string
}

const initFilter: FilterProps = {
    prefix: "807",
    awbNos: "",
    agentCode: ""
}

const Contents = (props: ContentProps) => {
    const { title } = props
    const [allFilter, setAllfilter] = useState<boolean>(false)
    const [data, setData] = useState<any>(dummyData)
    const [selectedData, setSelectedData] = useState<any>({})
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

    const onSelect = (key: string) => {
        const selectedData = data.find((item: any) => item.id === key)
        setSelectedData(selectedData);

        const updatedData = data.map((item:any) => {
            if(item.id=== key)
                return {...item, active: true}
            else{
                return {...item, active: false}
            }
        });
        setData(updatedData);
    }

    useEffect(() => {
    }, [filter,data])

    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="space-y-4">
                <div className="flex flex-col border p-4 border-zinc-800 rounded-md space-x-2 items-start">

                    <div className="grid  sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-7  gap-x-2 gap-y-2">
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("prefix", val)}
                            title="Prefix"
                            value={filter.prefix}
                            className=""
                            rightIcon={<Search size={14} />}
                        />
                        <FilterTextarea
                            onChange={(val: any) => onSelectFilter("awbNos", val)}
                            title="AWB No's"
                            value={filter.awbNos}
                            className=""

                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("agentCode", val)}
                            title="Agent Code"
                            value={filter.agentCode}
                            className=""
                            rightIcon={<Search size={14} />}
                        />


                        <div className="flex space-x-2 items-center">
                            <Button variant="button-primary" className="h-8 w-8 p-1">
                                <Search size={18} />
                            </Button>
                            <Button variant="button-primary" onClick={resetFilter} className="h-8 w-8 p-1">
                                <RefreshCw size={18} />
                            </Button>
                        </div>

                    </div>
                    <p className="text-sm mt-2 opacity-50">Note: To Track multiple AWB Numbers, you can enter up to 10AWB Numbers separated by comma</p>


                </div>
                <div className="flex w-full space-x-4">
                    <div>
                        <ScrollArea className="">
                            <div className="flex flex-col h-full w-[200px] space-y-2">
                                {data.map((item: any, id: string) => {
                                    return (
                                        <Card key={id} className={cn("hover:bg-zinc-800 cursor-pointer",item.active ? "bg-zinc-800" : "")} onClick={() => onSelect(item.id)}>
                                            <CardContent className="p-4">
                                                <h2 className="text-white text-md">{item.id}</h2>
                                                <p className="text-sm">Booked at {item.origin}</p>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                            <ScrollBar orientation="horizontal" />
                            <ScrollBar orientation="vertical" />

                        </ScrollArea>
                    </div>

                    <div className="flex w-full h-fit">
                        {selectedData.id &&
                            <Card className="w-full">
                                <CardContent className="flex pt-4 justify-between">
                                    <div className="w-2/3 space-x-4 space-y-4">
                                        <div className="flex">
                                            <h2>AWB:</h2>
                                            <div>
                                                <p className="text-lg font-bold">{selectedData.id} <span className="text-sm">({selectedData.origin}-{selectedData.destination})</span></p>
                                                <p className="text-sm">20 P/ 20.00 Kgs</p>
                                            </div>
                                        </div>

                                        <SimpleTable
                                            headers={[
                                                { id: "status", title: "Status" },
                                                { id: "station", title: "Station" },
                                                { id: "destination", title: "Dest" },
                                                { id: "pcs", title: "Pcs" },
                                                { id: "weight", title: "Weight" },
                                                { id: "flight", title: "Flight" },
                                                { id: "event", title: "Event" },
                                            ]}

                                            data={
                                                [
                                                    { status: "Booked", station: "DMK", destination: "KUL", pcs: "20", weight: "20 Kgs", flight: "FD311", event: "2024-06-24" }
                                                ]
                                            }

                                        />

                                    </div>
                                    <Separator orientation="vertical" />
                                    <div className="flex flex-col w-1/3">
                                        <p className="leading-7">Last Activity</p>
                                        <Button variant="button-secondary"> <BookMarked />&nbsp;&nbsp;Booked at {selectedData.origin} </Button>
                                        <p className="text-right">20 P/ 20.00 Kgs</p>
                                    </div>
                                </CardContent>
                            </Card>

                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Contents