"use client"

import { DataTable } from "@/components/data-table/data-table"
import PageContainer from "@/components/layout/PageContainer"

import { columns, DUMMY_DATA } from "./components/column"

export default function Page() {
  return (
    <PageContainer className="gap-6">
      <DataTable columns={columns} data={DUMMY_DATA} />
    </PageContainer>
  )
}
