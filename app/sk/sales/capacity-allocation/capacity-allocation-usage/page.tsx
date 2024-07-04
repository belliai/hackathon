"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import CapacityAllocationUsage from "@/components/sales/capacity-allocation-usage"

export default function CapacityAllocationusage() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">Capacity Allocation Usage</h2>
      <CapacityAllocationUsage />
    </PageContainer>
  )
}
