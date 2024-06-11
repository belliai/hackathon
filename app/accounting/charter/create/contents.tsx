"use client"

import {  useRef, useState } from "react"
import { ArrowLeft, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import FormFields from "@components/track/form"
import { invoiceSchema } from "@/schemas/invoice"
import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { charterFields, freightDetailFields, routesFields } from "./fields"
import Link from "next/link"

type ContentProps = {
    title: string,
    actions?: React.ReactNode
}

const schema = invoiceSchema

const Contents = (props: ContentProps) => {
    const { title, actions } = props
    const [routes, setRoutes] = useState<Array<any>>([routesFields])

    const formRef = useRef<UseFormReturn<z.infer<typeof schema>> | null>(null);
    const freightFormRef = useRef<UseFormReturn<z.infer<typeof schema>> | null>(null);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex w-full justify-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                {actions}
            </div>
            <Card>
                <CardHeader className="bg-zinc-500 p-2">
                    <p className="text-sm">Charter Details</p>
                </CardHeader>
                <CardContent>
                    <FormFields
                        ref={formRef}
                        fields={charterFields}
                        defaultValues={{ invoiceNo: "" }}
                        schema={schema}
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="bg-zinc-500 p-2">
                    <p className="text-sm">Route Details</p>
                </CardHeader>
                <CardContent>
                    {routes.map((route, id) => {
                        return (
                            <div     key={id} className="flex space-x-2 justify-between items-end xs:flex-col">
                                <FormFields
                                    cols={5}
                                    ref={formRef}
                                    fields={route}
                                    defaultValues={{ invoiceNo: "" }}
                                    schema={schema}
                                />
                                <div className="flex space-x-2">
                                    <Button variant="destructive" onClick={() => {
                                        setRoutes((prevItems) => {
                                            // Create a new array without the item at the specified index
                                            const newItems = [...prevItems];
                                            newItems.splice(id, 1);
                                            return newItems;
                                        });
                                    }} className="p-1 w-8 ">
                                        <Trash size={18} />
                                    </Button>
                                    <Button variant="destructive" onClick={() => {
                                        setRoutes([...routes, routesFields])
                                    }}>
                                        Add Route
                                    </Button>

                                </div>
                            </div>
                        )
                    })}

                </CardContent>
            </Card>


            <Card>
                <CardHeader className="bg-zinc-500 p-2">
                    <p className="text-sm">Freight Details</p>
                </CardHeader>
                <CardContent>
                    <FormFields
                        ref={freightFormRef}
                        fields={freightDetailFields}
                        defaultValues={{ invoiceNo: "" }}
                        schema={schema}
                    />
                </CardContent>
            </Card>
            <div className="w-full flex justify-end">
                <Button variant="button-primary" onClick={() => {

                }}>
                    Submit
                </Button>
            </div>


            <Link href="/accounting/charter">
                <Button variant="outline">
                    <ArrowLeft size={14} />&nbsp;Back
                </Button>
            </Link>

        </div>
    )
}

export default Contents