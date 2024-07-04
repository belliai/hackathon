"use client"

import PageContainer from "@/components/layout/PageContainer"
import UldStockTable from "@/components/uld/uld-stock-table"
import UldStockTableFilter from "@/components/uld/uld-stock-table-filter"

export default function uldStockManagement() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">ULD Stock</h2>
      </div>
      <UldStockTable />
      <UldStockTableFilter />
    </PageContainer>
  )
}
