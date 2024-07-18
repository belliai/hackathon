"use client"

import { Plane } from "lucide-react"

import CrudAircraft from "../aircraft"
import DataFieldsPageTemplate from "../components/datafields-page-template"

export default function AircraftDatafields() {
  return (
    <DataFieldsPageTemplate
      tabs={[
        {
          component: <CrudAircraft />,
          icon: Plane,
          name: "Aircrafts",
          tooltipId: "aircraft",
        },
      ]}
    />
  )
}
