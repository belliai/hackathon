"use client"

import PageContainer from "@/components/layout/PageContainer"
import SpotRateLabelAndInput from "@/components/sales/spot-rate/SpotRateLabelAndInput"
import SpotRateNewHeader from "@/components/sales/spot-rate/new/SpotRateNewHeader"
import SpotRateAndRequesterDetails from "@/components/sales/spot-rate/new/SpotRateNewRequesterDetails"
import SpotRateShipmentDetails from "@/components/sales/spot-rate/new/SpotRateNewShipmentDetails"

export default function SpotRateNew() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="text-xl font-semibold">Spot Rate</h2>

      <SpotRateNewHeader />

      {/* Shipment Details */}
      <SpotRateShipmentDetails />

      {/* Spot Rate Details and Requester Details */}
      <SpotRateAndRequesterDetails />



    </PageContainer>
  )
}
