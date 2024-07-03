"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import CapacityAllocationNew from "@/components/sales/capacity-allocation-new"

export default function CapacityAllocationnew() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">New Capacity Allocation</h2>
      <CapacityAllocationNew />
    </PageContainer>
  )
}
