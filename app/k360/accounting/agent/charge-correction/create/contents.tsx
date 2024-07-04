"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { invoiceSchema } from "@/schemas/invoice"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import FormFields from "@components/track/form"
import { ArrowLeft, Menu, RefreshCw, Search } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert } from "@/components/track/alert"
import FilterDebouncedInput from "@/components/track/filter-input"

import {
  airwaybillFields,
  chargesFields,
  generalFields,
  remarksFields,
} from "./fields"

type ContentProps = {
  title: string
  actions?: React.ReactNode
}

type FilterProps = {
  date: string
  payMode: string
  prefix: string
  awbNo: string
}
const initFilter: FilterProps = {
  date: "",
  payMode: "",
  prefix: "",
  awbNo: "",
}

const schema = invoiceSchema.pick({ invoiceNo: true })
const awbSchema = invoiceSchema.pick({ invoiceNo: true })
const originalSchema = invoiceSchema.pick({ invoiceNo: true })
const revisedSchema = invoiceSchema.pick({ invoiceNo: true })
const remarkSchema = invoiceSchema.pick({ invoiceNo: true })

const Contents = (props: ContentProps) => {
  const { title, actions } = props
  const [allFilter, setAllfilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<FilterProps>(initFilter)

  const formRef = useRef<UseFormReturn<z.infer<typeof schema>> | null>(null)
  const awbFormRef = useRef<UseFormReturn<z.infer<typeof awbSchema>> | null>(
    null
  )
  const oriFormRef = useRef<UseFormReturn<
    z.infer<typeof originalSchema>
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
            onChange={(val: any) => onSelectFilter("prefix", val)}
            title="Prefix"
            value={filter.prefix}
          />
          <FilterDebouncedInput
            onChange={(val: any) => onSelectFilter("awbNo", val)}
            title="AWB No."
            value={filter.awbNo}
          />
          <FilterSelect
            options={[
              { key: "agent", value: "Agent" },
              { key: "walkin", value: "Walkin" },
              { key: "destination", value: "Destination" },
            ]}
            onChange={(val: any) => onSelectFilter("payMode", val)}
            name="Paymode"
            value={filter.payMode}
          />

          <FilterDatePicker
            onChange={(val: any) => onSelectFilter("date", val)}
            value={filter.date}
            name="Date"
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
        <CardContent>
          <FormFields
            ref={formRef}
            fields={generalFields}
            defaultValues={{ invoiceNo: "" }}
            schema={schema}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-zinc-500 p-2">
          <p className="text-sm">
            Air Waybill weight and / or charges have been corrected / added as
            follows :
          </p>
        </CardHeader>
        <CardContent>
          <FormFields
            ref={awbFormRef}
            fields={airwaybillFields}
            defaultValues={{ invoiceNo: "" }}
            schema={schema}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-zinc-500 p-2">
          <p className="text-sm">Original / Incorrect Charges</p>
        </CardHeader>
        <CardContent>
          <FormFields
            ref={oriFormRef}
            fields={chargesFields}
            defaultValues={{ invoiceNo: "" }}
            schema={schema}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-zinc-500 p-2">
          <p className="text-sm">Revised / Correct Charges</p>
        </CardHeader>
        <CardContent>
          <FormFields
            ref={revFormRef}
            fields={chargesFields}
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
                actions={
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
                }
              />
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
              Submit
            </Button>
            <Button variant="button-primary">Calculate</Button>
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
