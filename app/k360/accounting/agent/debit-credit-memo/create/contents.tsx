"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { invoiceSchema } from "@/schemas/invoice"
import FilterSelect from "@components/track/filter-select"
import FormFields from "@components/track/form"
import { ArrowLeft, Menu, RefreshCw, Search } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert } from "@/components/track/alert"
import FilterDebouncedInput from "@/components/track/filter-input"

import { currentFields, remarksFields } from "./fields"

type ContentProps = {
  title: string
  actions?: React.ReactNode
}

type FilterProps = {
  invoiceNo: string
  agentCode: string
  DCMType: string
  includeGST: string
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

  const formRef = useRef<UseFormReturn<z.infer<typeof schema>> | null>(null)
  const currentFormRef = useRef<UseFormReturn<
    z.infer<typeof currentSchema>
  > | null>(null)
  const revFormRef = useRef<UseFormReturn<
    z.infer<typeof revisedSchema>
  > | null>(null)
  const remarkFormRef = useRef<UseFormReturn<
    z.infer<typeof remarkSchema>
  > | null>(null)

  const resetFilter = () => {
    setFilter(initFilter)
  }

  const onSelectFilter = (key: string, val: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: val,
    }))
  }

  useEffect(() => {}, [filter])

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
              { key: "revised_note", value: "Revised Note" },
            ]}
            onChange={(val: any) => onSelectFilter("DCMType", val)}
            name="DCM Type"
            value={filter.DCMType}
          />
          <FilterSelect
            options={[
              { key: "credit", value: "Credit" },
              { key: "debit", value: "Debit" },
              { key: "revised_note", value: "Revised Note" },
            ]}
            onChange={(val: any) => onSelectFilter("includeGST", val)}
            name="Include GST"
            value={filter.includeGST}
          />

          <div className="flex items-end space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
            >
              <Search size={18} />
            </Button>
            <Button
              onClick={resetFilter}
              variant="outline"
              className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
            >
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
          <p className="text-sm">Remarks</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-end space-x-2 p-4">
            <div className="flex items-end space-x-2">
              <FormFields
                ref={remarkFormRef}
                fields={remarksFields}
                defaultValues={{ invoiceNo: "" }}
                schema={schema}
              />
              <Alert
                title={"History"}
                trigger={
                  <Button variant="link">
                    <Menu size={14} />
                  </Button>
                }
              >
                <div className="w-full rounded-lg shadow-lg">
                  <pre className="overflow-auto rounded-lg bg-zinc-800 p-2 text-sm leading-relaxed text-white">
                    <code></code>
                  </pre>
                </div>
              </Alert>
            </div>

            <Button
              variant="button-primary"
              onClick={async () => {
                const valid = await formRef.current?.trigger()
                console.log(valid)
                if (valid) {
                  const values = formRef.current?.getValues()
                  console.log(values)
                }
              }}
            >
              Generate DCM
            </Button>
          </div>
        </CardContent>
      </Card>
      <Link href="/accounting/agent/charge-correction">
        <Button variant="outline">
          <ArrowLeft size={14} />
          &nbsp;Back
        </Button>
      </Link>
    </div>
  )
}

export default Contents
