"use client"

import { Plane, RulerIcon } from "lucide-react"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import CrudAircraft from "./components/aircraft"
import MeasurementUnits from "./components/measurement-units"

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
        {
          component: <MeasurementUnits />,
          icon: RulerIcon,
          name: "Measurement Units",
          tooltipId: "measurement-units",
        },
      ]}
    />
  )
}
