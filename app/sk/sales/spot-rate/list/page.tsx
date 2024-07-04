"use client"

import { getData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import SpotRateListDetails from "@/components/sales/spot-rate/list/SpotRateListDetails"
import SpotRateFilters from "@/components/sales/spot-rate/SpotRateFilters"

export default function SpotRateList() {
  return (
    <PageContainer className="gap-6 py-8">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Spot Rate Listing</h2>
        <SpotRateFilters />
      </div>

      <SpotRateListDetails />
    </PageContainer>
  )
}
