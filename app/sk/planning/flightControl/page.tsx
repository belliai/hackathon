"use client"

import PageContainer from "@/components/layout/PageContainer"
import FlightControlHeader from "@/components/planning/flight-control"

export default function FlightControl() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Flight Control</h2>
      </div>
      <FlightControlHeader />
    </PageContainer>
  )
}
