"use client"

import { useEffect, useState } from "react"
import {  SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import { cn } from "@/lib/utils"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/vertical-tabs"

type ContentProps = {
    title: string
}

const initFilter = {
    arrival: {
        flightNumber: "",
        DOM: "",
        aircraftReg: "",
        arrivalAirport: "",
        touchedDownTime: "",
        onBlocksTime: "",
        supplementInfo: ""
    },
    arrivalFilterShow: false,
    departure: {
        flightNumber: "",
        DOM: "",
        aircraftReg: "",
        departureFrom: "",
        estArrivalTime: "",
        airboneTime: "",
        offBlocksTime: ""
    },
    departureFilterShow: false
}

const Contents = (props: ContentProps) => {
    const { title } = props
    const [allFilter, setAllfilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<any>(initFilter)

    const resetFilter = () => {
        setFilter(initFilter)
    }

    const onSelectFilter = (section: string, key: string, val: any) => {
        setFilter((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: val
            }
        }));
    };

    useEffect(() => {



    }, [filter])

    const onRetrieve = (key: string) => {
        if (key === "departure")
            onSelectFilter('departureFilterShow', '', true);
        else
            onSelectFilter('arrivalFilterShow', '', true);
    }

    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div>
                <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-start">
                    <div className="h-8 opacity-40 hover:opacity-60 mt-3">
                        <SlidersHorizontal onClick={() => setAllfilter(!allFilter)} className={cn("cursor-pointer", allFilter && "text-indigo-400 text-opacity-80")} />
                    </div>
                    <Tabs defaultValue="departure" >
                        <TabsList className="grid grid-cols-2 w-fit">
                            <TabsTrigger value="departure">Departure</TabsTrigger>
                            <TabsTrigger value="arrival">Arrival</TabsTrigger>
                        </TabsList>
                        <TabsContent value="departure" className="space-y-2">
                            <div className="flex space-x-2 items-end">
                                <FilterDebouncedInput
                                    onChange={(val: any) => onSelectFilter("departure", "flightNumber", val)}
                                    title="Flight Number"
                                    value={filter.departure.flightNumber}
                                    className=""

                                />
                                <Button
                                    onClick={() => onRetrieve("departure")}
                                    className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white">Retrieve</Button>
                            </div>
                            <div className="grid grid-cols-4 w-fit gap-2 items-end">
                                {filter.departureFilterShow &&
                                    <React.Fragment>
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("departure", "DOM", val)}
                                            title="Day Of Month"
                                            value={filter.departure.DOM}
                                            className=""
                                        />

                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("departure", "aircraftReg", val)}
                                            title="Aircraft Registration"
                                            value={filter.departure.aircraftReg}
                                            className=""
                                        />
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("departure", "departureFrom", val)}
                                            title="Departure From"
                                            value={filter.departure.departureFrom}
                                            className=""
                                        />
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("departure", "estArrivalTime", val)}
                                            title="Estimate Arrival Time"
                                            value={filter.departure.estArrivalTime}
                                            className=""
                                        />
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("departure", "airboneTime", val)}
                                            title="Airbone Time"
                                            value={filter.departure.airboneTime}
                                            className=""
                                        />

                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("departure", "offBlocksTime", val)}
                                            title="Off-Blocks Time"
                                            value={filter.departure.offBlocksTime}
                                            className=""
                                        />

                                        <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white">Submit</Button>
                                    </React.Fragment>
                                }
                            </div>

                        </TabsContent>
                        <TabsContent value="arrival" className="space-y-2">
                            <div className="flex space-x-2 items-end">
                                <FilterDebouncedInput
                                    onChange={(val: any) => onSelectFilter("departure", "flightNumber", val)}
                                    title="Flight Number"
                                    value={filter.departure.flightNumber}
                                    className=""

                                />
                                <Button
                                    onClick={() => onRetrieve("arrival")}
                                    className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white">Retrieve</Button>
                            </div>
                            <div className="grid grid-cols-4 w-fit gap-2 items-end">
                                {filter.arrivalFilterShow &&
                                    <React.Fragment>
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("arrival", "DOM", val)}
                                            title="Day Of Month"
                                            value={filter.arrival.DOM}
                                            className=""
                                        />

                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("arrival", "aircraftReg", val)}
                                            title="Aircraft Registration"
                                            value={filter.arrival.aircraftReg}
                                            className=""
                                        />
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("arrival", "arrivalAirport", val)}
                                            title="Departure From"
                                            value={filter.arrival.arrivalAirport}
                                            className=""
                                        />
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("arrival", "touchedDownTime", val)}
                                            title="Touched Down Time"
                                            value={filter.arrival.estArrivalTime}
                                            className=""
                                        />
                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("arrival", "onBlocksTime", val)}
                                            title="On Blocks Time"
                                            value={filter.arrival.onBlocksTime}
                                            className=""
                                        />

                                        <FilterDebouncedInput
                                            onChange={(val: any) => onSelectFilter("arrival", "supplementInfo", val)}
                                            title="Supplementary Information"
                                            value={filter.arrival.supplementInfo}
                                            className=""
                                        />

                                        <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white">Submit</Button>
                                    </React.Fragment>
                                }
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

export default Contents