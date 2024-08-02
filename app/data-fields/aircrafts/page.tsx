"use client"

import {
  Box,
  BoxesIcon,
  DoorClosed,
  FileSliders,
  Package,
  Plane,
  RulerIcon,
} from "lucide-react"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import CrudAircraft from "./components/aircraft"
import AircraftDetailsFields from "./components/aircraft-details"
import CargoCapacityFields from "./components/cargo-capacity"
import DoorDimensionsFields from "./components/door-dimensions"
import MaxPerPieceFields from "./components/max-per-piece"
import MeasurementUnits from "./components/measurement-units"
import VolumeFields from "./components/volume"

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
        {
          component: <CargoCapacityFields />,
          icon: BoxesIcon,
          name: "Cargo Capacity",
          tooltipId: "cargo-capacity",
        },
        {
          component: <MaxPerPieceFields />,
          icon: Package,
          name: "Max Per Piece",
          tooltipId: "max-per-piece",
        },
        {
          component: <AircraftDetailsFields />,
          icon: FileSliders,
          name: "Aircraft Details",
          tooltipId: "aircraft-details",
        },
        {
          component: <DoorDimensionsFields />,
          icon: DoorClosed,
          name: "Door Dimensions",
          tooltipId: "door-dimensions",
        },
        {
          component: <VolumeFields />,
          icon: Box,
          name: "Volume",
          tooltipId: "volume",
        },
      ]}
    />
  )
}
