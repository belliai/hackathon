"use client"

import PageContainer from "@/components/layout/PageContainer"
import FlightMaster from "@/components/planning/flight-schedule-master"

export default function flightMaster() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Flight Schedule List</h2>
      </div>
      <FlightMaster />
    </PageContainer>
  )
}
