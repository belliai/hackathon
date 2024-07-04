"use client"

import { getData } from "@/lib/data"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import RateLineNew from "@/components/sales/rate-line-new"

export default function RateLinenew() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">Rate Line</h2>
      <RateLineNew />
    </PageContainer>
  )
}
