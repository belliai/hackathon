"use client"

import PageContainer from "@/components/layout/PageContainer"
import FlightLoad from "@/components/planning/flight-load-plan"

export default function FlightLoadPlan() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Flight Load Plan List</h2>
      </div>
      <FlightLoad />
    </PageContainer>
  )
}
