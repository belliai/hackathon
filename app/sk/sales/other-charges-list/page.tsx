"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import OtherChargesList from "@/components/sales/other-charges-list"

export default function OtherChargeslist() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">List Other Charges</h2>
      <OtherChargesList />
    </PageContainer>
  )
}
