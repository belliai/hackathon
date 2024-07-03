"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import RateLineList from "@/components/sales/rate-line-list"

export default function RateLinelist() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">List Rate Line</h2>
      <RateLineList />
    </PageContainer>
  )
}
