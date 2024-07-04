"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"

export default function OrganizeExchangeRatePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "rateType",
      header: "Rate Type",
    },
    {
      accessorKey: "exchangeRate",
      header: "Exchange Rate",
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ]

  const data = [
    {
      currency: "USD",
      rateType: "Fixed",
      exchangeRate: 1.0,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "EUR",
      rateType: "Floating",
      exchangeRate: 0.85,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "GBP",
      rateType: "Fixed",
      exchangeRate: 0.75,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "JPY",
      rateType: "Floating",
      exchangeRate: 110.0,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "AUD",
      rateType: "Fixed",
      exchangeRate: 1.35,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "CAD",
      rateType: "Floating",
      exchangeRate: 1.25,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "CHF",
      rateType: "Fixed",
      exchangeRate: 0.9,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "CNY",
      rateType: "Floating",
      exchangeRate: 6.5,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "INR",
      rateType: "Fixed",
      exchangeRate: 74.0,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "MXN",
      rateType: "Floating",
      exchangeRate: 20.0,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "currency",
      type: "text",
      placeholder: "Currency",
      endIcon: <Search />,
    },
    {
      name: "rateType",
      type: "select",
      placeholder: "Rate Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From Date",
    },
    {
      name: "toDate",
      type: "date",
      placeholder: "To Date",
    },
  ]

  const formFields: TFormTextField[] = [
    {
      name: "baseCurrency",
      type: "select",
      placeholder: "Base Currency",
    },
    {
      name: "currency",
      type: "text",
      placeholder: "Currency",
    },
    {
      name: "exchangeRate",
      type: "text",
      placeholder: "Exchange Rate",
    },
    {
      name: "rateType",
      type: "select",
      placeholder: "Rate Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From Date",
    },
    {
      name: "toDate",
      type: "date",
      placeholder: "To Date",
    },
  ]

  const filterForm = useForm()
  const form = useForm()

  return (
    <MastersPageTemplate
      heading="Exchange Rate Master"
      buttonText="Create Exchange Rate"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={form}
      formFields={formFields}
    />
  )
}
