"use client"

import { Textarea } from "@/components/ui/textarea"
import PageContainer from "@/components/layout/PageContainer"
import SpotRateNewHeader from "@/components/sales/spot-rate/new/SpotRateNewHeader"
import SpotRateNewRequesterDetails from "@/components/sales/spot-rate/new/SpotRateNewRequesterDetails"
import SpotRateNewShipmentDetails from "@/components/sales/spot-rate/new/SpotRateNewShipmentDetails"
import { Button } from "@/components/ui/button"

export default function SpotRateNew() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="text-xl font-semibold">Spot Rate</h2>

      <SpotRateNewHeader />

      {/* Shipment Details */}
      <SpotRateNewShipmentDetails />

      {/* Spot Rate Details and Requester Details */}
      <SpotRateNewRequesterDetails />

      <p>Remarks</p>
      <Textarea className="w-1/4"/>

      <Button className="w-fit">Save</Button>

    </PageContainer>
  )
}
