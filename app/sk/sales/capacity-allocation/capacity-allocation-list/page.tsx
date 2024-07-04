"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import CapacityAllocationList from "@/components/sales/capacity-allocation-list"

export default function CapacityAllocationlist() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">List Capacity Allocation</h2>
      <CapacityAllocationList />
    </PageContainer>
  )
}
