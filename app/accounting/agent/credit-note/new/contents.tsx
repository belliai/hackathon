"use client"

import { useRef } from "react"
import { RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import FormFields from "@/components/track/form"
import { UseFormReturn } from "react-hook-form"
import { invoiceSchema } from "@/schemas/invoice"
import { z } from "zod"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { airwaybillFields, filterFields, originalFields } from "./fields"

type ContentProps = {
    title: string
}

const Contents = (props: ContentProps) => {
    const { title } = props

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
                                <Button onClick={() => { }} variant="button-primary" className="h-8 w-8 p-1 ">
                                    <RefreshCw size={18} />
                                </Button>
                            </div>
                        }
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <p className="text-sm font-bold">Air Waybill weight and / or charges have been corrected / added as follows </p>
                </CardHeader>
                <CardContent className="p-4">
                    <FormFields
                        ref={filterFormRef}
                        fields={airwaybillFields}
                        defaultValues={{}}
                        schema={invoiceSchema}

                    />
                </CardContent>
            </Card>
            <Card>
                <CardContent >
                    <div className="flex py-4 space-x-2 w-full">
                        <div className="w-1/2 space-y-4">
                            <h1>Charges Revised/Correct</h1>
                            <FormFields
                                ref={filterFormRef}
                                fields={originalFields}
                                defaultValues={{}}
                                schema={invoiceSchema}
                                cols={1}
                            />
                        </div>
                        <div className="w-1/2 space-y-4">
                            <h1>Charges Orginal/Incorrect</h1>
                            <FormFields
                                ref={filterFormRef}
                                fields={originalFields}
                                defaultValues={{}}
                                schema={invoiceSchema}
                                cols={1}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2 items-end mt-4">
                        <Button variant="button-primary" className="h-8">
                            Save
                        </Button>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Contents