"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData } from "./dummy-data"
import { useEffect, useRef, useState } from "react"
import {RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import FormFields from "@/components/track/form"
import { UseFormReturn } from "react-hook-form"
import { invoiceSchema } from "@/schemas/invoice"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { filterFields } from "./fields"

type ContentProps = {
    title: string
}

const Contents = (props: ContentProps) => {
    const { title } = props
    const [data, setData] = useState<Array<any>>(dummyData)

    const filterFormRef = useRef<UseFormReturn<z.infer<typeof invoiceSchema>> | null>(null);

    return (
        <div className="flex-col space-y-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <Card>
                <CardContent className="p-4">
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
                                <Button onClick={()=>{}} variant="button-primary" className="h-8 w-8 p-1 ">
                                    <RefreshCw size={18} />
                                </Button>
                                <Button onClick={()=>{}} variant="button-primary" className="h-8 p-1 ">
                                    Collection Letter
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