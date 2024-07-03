"use client"

import { useForm } from "react-hook-form"

import { DataTable } from "@/components/data-table/data-table"
import DataTableFilterForm from "@/components/data-table/data-table-filter-form"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

import { columns, DUMMY_DATA } from "./components/column"
import { formFilters } from "./components/filter"

export default function Page() {
  const form = useForm()
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Offload Report" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <DataTable columns={columns} data={DUMMY_DATA} />
    </PageContainer>
  )
}
