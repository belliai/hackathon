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

import DataFieldsPageTemplate from "../../components/datafields-page-template"
import CrudAircraft from "./aircraft"
import AircraftDetailsFields from "./aircraft-details"
import CargoCapacityFields from "./cargo-capacity"
import DoorDimensionsFields from "./door-dimensions"
import MaxPerPieceFields from "./max-per-piece"
import MeasurementUnits from "./measurement-units"
import VolumeFields from "./volume"

export default function AircraftDatafields({ containerClassName = '' }: { containerClassName?: string }) {
  const isSetting = !!containerClassName
  return (
    <DataFieldsPageTemplate
      containerClassName={containerClassName}
      isSetting={isSetting}
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
