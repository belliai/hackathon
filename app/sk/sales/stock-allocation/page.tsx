"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import StockAllocationHeader from "@/components/sales/stock-allocation-header"
import StockAllocationHistory from "@/components/sales/stock-allocation-history"
import StockAllocationTable from "@/components/sales/stock-allocation-table"

export default function AWBStockAllocation() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">AWB Stock Allocation</h2>
      <StockAllocationHeader />
      <StockAllocationTable />
      <StockAllocationHistory />
    </PageContainer>
  )
}
