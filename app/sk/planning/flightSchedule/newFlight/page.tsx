"use client"

import PageContainer from "@/components/layout/PageContainer"
import NewFlight from "@/components/planning/new-flight"

export default function NewFlights() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Create Flight Schedule</h2>
      </div>
      <NewFlight />
    </PageContainer>
  )
}
