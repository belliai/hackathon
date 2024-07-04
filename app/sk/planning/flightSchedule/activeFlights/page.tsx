"use client"

import PageContainer from "@/components/layout/PageContainer"
import ActiveFlight from "@/components/planning/active-flight"

export default function ActiveFlights() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Active Flights</h2>
      </div>
      <ActiveFlight />
    </PageContainer>
  )
}
