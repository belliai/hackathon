"use client"

import { useEffect, useRef, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { ArrowLeft,  Menu, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import FormFields from "@components/track/form"
import { invoiceSchema } from "@/schemas/invoice"
import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import {  currentFields, remarksFields } from "./fields"
import Link from "next/link"
import { Alert } from "@/components/track/alert"

type ContentProps = {
    title: string,
    actions?: React.ReactNode
}

type FilterProps = {
    invoiceNo: string
    agentCode: string,
    DCMType: string,
    includeGST: string,


}
const initFilter: FilterProps = {
    invoiceNo: "",
    agentCode: "",
    DCMType: "",
    includeGST: "",
}

const schema = invoiceSchema.pick({ invoiceNo: true })
const currentSchema = invoiceSchema.pick({ invoiceNo: true })
const revisedSchema = invoiceSchema.pick({ invoiceNo: true })
const remarkSchema = invoiceSchema.pick({ invoiceNo: true })


const Contents = (props: ContentProps) => {
    const { title, actions } = props
    const [allFilter, setAllfilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<FilterProps>(initFilter)

    const formRef = useRef<UseFormReturn<z.infer<typeof schema>> | null>(null);
    const currentFormRef = useRef<UseFormReturn<z.infer<typeof currentSchema>> | null>(null);
    const revFormRef = useRef<UseFormReturn<z.infer<typeof revisedSchema>> | null>(null);
    const remarkFormRef = useRef<UseFormReturn<z.infer<typeof remarkSchema>> | null>(null);


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
            <div className="flex w-full justify-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                {actions}
            </div>

            <Card>
                <CardContent className="grid grid-cols-5 gap-2">
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("invoiceNo", val)}
                        title="Invoice No"
                        value={filter.invoiceNo}
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("agentCode", val)}
                        title="Agent Code"
                        value={filter.agentCode}
                    />
                    <FilterSelect
                        options={[
                            { key: "credit", value: "Credit" },
                            { key: "debit", value: "Debit" },
                            { key: "revised_note", value: "Revised Note" }
                        ]}
                        onChange={(val: any) => onSelectFilter("DCMType", val)}
                        name="DCM Type"
                        value={filter.DCMType}
                    />
                    <FilterSelect
                        options={[
                            { key: "credit", value: "Credit" },
                            { key: "debit", value: "Debit" },
                            { key: "revised_note", value: "Revised Note" }
                        ]}
                        onChange={(val: any) => onSelectFilter("includeGST", val)}
                        name="Include GST"
                        value={filter.includeGST}
                    />


               
                    <div className="flex space-x-2 items-end">
                        <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <Search size={18} />
                        </Button>
                        <Button onClick={resetFilter} variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <RefreshCw size={18} />
                        </Button>
                    </div>
                </CardContent>
            </Card>



            <Card>
                <CardHeader className="bg-zinc-500 p-2">
                    <p className="text-sm">Current</p>
                </CardHeader>
                <CardContent>
                    <FormFields
                        ref={currentFormRef}
                        fields={currentFields}
                        defaultValues={{ invoiceNo: "" }}
                        schema={schema}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="bg-zinc-500 p-2">
                    <p className="text-sm">Revised</p>
                </CardHeader>
                <CardContent>
                    <FormFields
                        ref={revFormRef}
                        fields={currentFields}
                        defaultValues={{ invoiceNo: "" }}
                        schema={schema}
                    />
                </CardContent>
            </Card>


            <Card>
                <CardHeader className="bg-zinc-500 p-2">
                    <p className="text-sm">Remarks
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2 p-4 items-end">
                        <div className="flex space-x-2 items-end">
                            <FormFields
                                ref={remarkFormRef}
                                fields={remarksFields}
                                defaultValues={{ invoiceNo: "" }}
                                schema={schema}
                            />
                            <Alert title={"History"}
                                trigger={<Button variant="link">
                                    <Menu size={14} />
                                </Button>}
                            >
                                <div className="rounded-lg shadow-lg w-full">
                                    <pre className="text-sm leading-relaxed text-white bg-zinc-800 p-2 rounded-lg overflow-auto">
                                        <code >
                                          
                                        </code>
                                    </pre>
                                </div>
                            </Alert>
                        </div>

                        <Button variant="button-primary" onClick={async () => {
                            const valid = await formRef.current?.trigger()
                            console.log(valid)
                            if (valid) {
                                const values = formRef.current?.getValues()
                                console.log(values)
                            }

                        }}>
                            Generate DCM
                        </Button>

                    </div>

                </CardContent>
            </Card>
            <Link href="/accounting/agent/charge-correction">
                <Button variant="outline">
                    <ArrowLeft size={14} />&nbsp;Back
                </Button>
            </Link>

        </div>
    )
}

export default Contents