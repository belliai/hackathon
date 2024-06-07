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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Incoming from "./incoming"
import Output from "./output"

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
    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <Tabs defaultValue="incoming">
                <TabsList>
                    <TabsTrigger value="incoming">Incoming</TabsTrigger>
                    <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                <TabsContent value="incoming">
                    <Incoming />
                </TabsContent>
                <TabsContent value="output">
                    <Output />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default Contents