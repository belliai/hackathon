"use client"

import { useState } from "react"

import { useFlight } from "@/lib/hooks/flight-master/flight-master"
import NewFlightModal from "@/app/settings/flights/components/new-flight-form"

import FlightDetailTabs from "../components/flight-detail-tabs"
import FlightPropertiesSidebar from "../components/flight-properties-sidebar"

export default function FlightDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: flight, refetch } = useFlight(params.id)
  return (
    <div className="!-m-4 grid h-[calc(100vh-48px)] grid-cols-4">
      <div className="col-span-3 border-r p-4 pr-6">
        <FlightDetailTabs flight={flight} onOpenChange={() => {}} />
      </div>
      <div className="bg-muted/30 px-6 py-4">
        <FlightPropertiesSidebar flight={flight} onRefetchData={refetch} />
      </div>
    </div>
  )
}
