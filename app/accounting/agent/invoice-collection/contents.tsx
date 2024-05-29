"use client"

import { DataTable } from "@components/track/table"
import { columns } from "./columns"
import { dummyData, locations, invoiceTypeList, invoiceStatusList, originList, countryList, billTypeList } from "./dummy-data"
import FilterDatePicker from "@components/track/filter-date-picker"
import { useEffect, useState } from "react"
import FilterSelect from "@components/track/filter-select"
import { Currency, Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterDebouncedInput from "@/components/track/filter-input"
import { cn } from "@/lib/utils"
import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type ContentProps = {
    title: string
}

const initFilter = {
    fromDate: "",
    toDate: "",
    invoiceNo: "",
    invoiceType: "",
    origin: "",
    agentCode: "",
    agentname: "",
    prefix: "",
    collection: "",
    userId: "",
    awbNo: "",
    billType: "",
    CASSAgent: "",
    country: "",
    airportType: "",
    paymentFromDate: "",
    paymentToDate: "",


    collectedAmount: "",
    tax: "",
    invoiceCurrency: "",
    paymentType: "",
    depositDate: "",
    paymentCurrency: "",
    currencyRate: "",
    currencyAmount: "",
    TINNo: "",
    N194C: "",
    PPRemarks: "",
    bankName: "",
    cheque: "",
    chequeDate: "",
    creditCardType: "",
    first2Digit: "",
    last4Digit: "",
    billTo: "",
    billToName: "",
    paymentEmailId: "",
    paymentMobileNo: "",
}

const Contents = (props: ContentProps) => {
    const { title } = props
    const [data, setData] = useState<Array<any>>(dummyData)
    const [allFilter, setAllfilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<any>(initFilter)

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
            <div className="flex border p-4 border-zinc-800 rounded-md space-x-2 items-center">
                <div className="h-8 opacity-40 hover:opacity-60">
                    <SlidersHorizontal onClick={() => setAllfilter(!allFilter)} className={cn("cursor-pointer", allFilter && "text-indigo-400 text-opacity-80")} />
                </div>
                <div className="grid lg:grid-cols-4  xl:grid-cols-5  2xl:grid-cols-7 md:grid-cols-5 sm:grid-cols-3    gap-x-2 gap-y-2">
                    <FilterDatePicker
                        onChange={(val: any) => onSelectFilter("fromDate", val)}
                        value={filter.fromDate}
                        name="Invoice From Date"
                    />
                    <FilterDatePicker
                        onChange={(val: any) => onSelectFilter("toDate", val)}
                        value={filter.toDate}
                        name="Invoice To Date"
                    />
                    <FilterSelect
                        options={invoiceTypeList}
                        onChange={(val: any) => onSelectFilter("invoiceType", val)}
                        name="Invoice type"
                        value={filter.invoiceType}
                        className="w-40"
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("invoiceNo", val)}
                        title="Invoice No."
                        value={filter.invoiceNo}
                        className="w-40"
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("agentCode", val)}
                        title="Agent Code"
                        value={filter.agentCode}
                        className=""
                        rightIcon={<Search size={14} />}
                    />


                    {allFilter && <React.Fragment>
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("agentName", val)}
                            title="Agent Name"
                            value={filter.agentName}
                            className="w-40"
                        />
                        <FilterSelect
                            options={originList}
                            onChange={(val: any) => onSelectFilter("origin", val)}
                            name="Origin"
                            value={filter.origin}
                            className="w-40"
                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("prefix", val)}
                            title="AWB Prefix"
                            value={filter.prefix}
                            className="w-40"

                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("awbNo", val)}
                            title="AWB No"
                            value={filter.awbNo}
                            className="w-40"

                        />
                        <FilterSelect
                            options={[
                                { key: "partialCollection", value: "Partial Collection" },
                                { key: "completeCollection", value: "Complete Collection" },

                            ]}
                            onChange={(val: any) => onSelectFilter("collection", val)}
                            name="Collection"
                            value={filter.collection}
                            className="w-40"
                        />
                        <FilterDebouncedInput
                            onChange={(val: any) => onSelectFilter("userId", val)}
                            title="User ID"
                            value={filter.userId}
                            className=""
                            rightIcon={<Search size={14} />}
                        />
                        <FilterSelect
                            options={billTypeList}
                            onChange={(val: any) => onSelectFilter("billType", val)}
                            name="Bill Type"
                            value={filter.billType}
                            className="w-40"
                        />

                        <FilterSelect
                            options={countryList}
                            onChange={(val: any) => onSelectFilter("country", val)}
                            name="Country"
                            value={filter.country}
                            className="w-40"
                        />
                        <FilterSelect
                            options={[
                                { key: "airport", value: "Airport" },
                                { key: "warehouse", value: "Warehouse" },

                            ]}
                            onChange={(val: any) => onSelectFilter("airportType", val)}
                            name="Airport Type"
                            value={filter.airportType}
                            className="w-40"
                        />
                        <FilterDatePicker
                            onChange={(val: any) => onSelectFilter("paymentFromDate", val)}
                            value={filter.paymentFromDate}
                            name="payment From Date"
                        />
                        <FilterDatePicker
                            onChange={(val: any) => onSelectFilter("paymentToDate", val)}
                            value={filter.paymentToDate}
                            name="Payment To Date"
                        />
                    </React.Fragment>
                    }
                    <div className="flex space-x-2 items-end">
                        <Button variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <Search size={18} />
                        </Button>
                        <Button onClick={resetFilter} variant="outline" className="h-8 w-8 p-1  bg-indigo-600 hover:bg-indigo-700">
                            <RefreshCw size={18} />
                        </Button>
                    </div>
                </div>

            </div>

            <DataTable
                columns={columns}
                data={data}
            />

            <Card>
                <CardHeader>
                    <h1>Collection</h1>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-2 ">
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("collectedAmount", val)}
                        title="Collected Amount"
                        value={filter.collectedAmount}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("tax", val)}
                        title="Tax"
                        value={filter.tax}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("invoiceCurrency", val)}
                        title="Invoice Currency"
                        value={filter.invoiceCurrency}
                        className=""
                    />
                    <FilterSelect
                        options={[
                            { key: "cash", value: "Cash" },
                            { key: "rtgs", value: "RTGS" },
                            { key: "online", value: "Online" },
                            { key: "prepaid", value: "Prepaid" }
                        ]}
                        onChange={(val: any) => onSelectFilter("paymentType", val)}
                        name="Payment Type"
                        value={filter.paymentType}
                        className="w-40"
                    />
                    <FilterDatePicker
                        onChange={(val: any) => onSelectFilter("depositDate", val)}
                        value={filter.depositDate}
                        name="Deposit Date"
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("paymentCurrency", val)}
                        title="Payment Currency"
                        value={filter.paymentCurrency}
                        className=""
                    />

                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("currencyRate", val)}
                        title="Currency Rate"
                        value={filter.currencyRate}
                        className=""
                    />

                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("currencyAmount", val)}
                        title="Currency Amount"
                        value={filter.currencyAmount}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("TINNo", val)}
                        title="TIN No."
                        value={filter.TINNo}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("N194C", val)}
                        title="194C"
                        value={filter.N194C}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("PPRemarks", val)}
                        title="PP Remarks"
                        value={filter.PPRemarks}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("bankName", val)}
                        title="Bank Name"
                        value={filter.bankName}
                        className=""
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("cheque", val)}
                        title="Cheque/DD/RTGS/REF No."
                        value={filter.cheque}
                        className=""
                    />

                    <FilterDatePicker
                        onChange={(val: any) => onSelectFilter("chequeDate", val)}
                        value={filter.depositDate}
                        name="Cheque Date"
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("creditCardType", val)}
                        title="Credit Card Type"
                        value={filter.creditCardType}
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("first2Digit", val)}
                        title="First 2 Digit"
                        value={filter.first2Digit}
                    />
                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("last4Digit", val)}
                        title="Last 4 Digit"
                        value={filter.last4Digit}
                    />

                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("billTo", val)}
                        title="Bill To"
                        value={filter.billTo}
                    />

                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("billToName", val)}
                        title="Bill To Name"
                        value={filter.billToName}
                    />

                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("paymentEmailId", val)}
                        title="Payment Email ID"
                        value={filter.paymentEmailId}
                    />

                    <FilterDebouncedInput
                        onChange={(val: any) => onSelectFilter("paymentMobileNo", val)}
                        title="Payment Mobile No"
                        value={filter.paymentMobileNo}
                    />

                    <div className="flex items-end">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Pay
                    </Button>
                    </div>
                

                </CardContent>

            </Card>

        </div>
    )
}

export default Contents