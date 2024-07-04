"use client"

import PageContainer from "@/components/layout/PageContainer"
import UldStationStock from "@/components/uld/uld-station-stock"
import ULDStationSummary from "@/components/uld/uld-station-summary"

export default function uldStockManagement() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Station ULD Stock</h2>
      </div>
      <UldStationStock />
      <ULDStationSummary />
    </PageContainer>
  )
}
