import { AircraftGeneralFields } from "@/schemas/aircraft/general-fields"
import { Path } from "react-hook-form"

export type AircraftFormSections =
  | "cargo-capacity"
  | "max-per-piece"
  | "aircraft-details"
  | "door-dimensions"
  | "volume"

export const aircraftFormSectionsOrder: AircraftFormSections[] = [
  "cargo-capacity",
  "max-per-piece",
  "aircraft-details",
  "door-dimensions",
  "volume",
]

export type AircraftFormSectionedFields = Record<
  AircraftFormSections,
  { name: Path<AircraftGeneralFields>; label: string }[]
>

export const aircraftFormFieldSections: AircraftFormSectionedFields = {
  "cargo-capacity": [
    { name: "cargo_capacity", label: "Cargo Capacity" },
    { name: "uld_position", label: "ULD Position" },
    { name: "max_bulk_capacity_volume", label: "Max Bulk Capacity Volume" },
    { name: "max_bulk_capacity_weight", label: "Max Bulk Capacity Weight" },
    { name: "max_volume", label: "Max Volume" },
  ],
  "max-per-piece": [
    { name: "restricted_weight_piece", label: "Restricted Weight per Piece" },
    { name: "max_dimension_length", label: "Max Dimension Length" },
    { name: "max_dimension_breadth", label: "Max Dimension Breadth" },
    { name: "max_dimension_height", label: "Max Dimension Height" },
  ],
  "aircraft-details": [
    { name: "mtow", label: "MTOW" },
    { name: "max_zero_fuel_weight", label: "Max Zero Fuel Weight" },
    { name: "passenger_capacity", label: "Passenger Capacity" },
    { name: "landing_weight", label: "Landing Weight" },
    { name: "gl_code_id", label: "GL Code ID" },
  ],
  "door-dimensions": [
    { name: "aft_h", label: "AFT Door Height" },
    { name: "aft_w", label: "AFT Door Width" },
    { name: "fwd_h", label: "FWD Door Height" },
    { name: "fwd_w", label: "FWD Door Width" },
    { name: "bulk_h", label: "Bulk Door Height" },
    { name: "bulk_w", label: "Bulk Door Width" },
  ],
  volume: [
    { name: "fwt", label: "FWT Volume" },
    { name: "fwd", label: "FWD Volume" },
    { name: "bulk", label: "Bulk Volume" },
  ],
}

export type AircraftFormFieldVisibilities = Record<
  AircraftFormSections,
  Partial<Record<Path<AircraftGeneralFields>, boolean>>
>

export const getAircraftFormFieldVisibilities =
  (): AircraftFormFieldVisibilities => ({
    "cargo-capacity": {
      cargo_capacity: true,
      uld_position: true,
      max_bulk_capacity_volume: true,
      max_bulk_capacity_weight: true,
      max_volume: true,
    },
    "max-per-piece": {
      restricted_weight_piece: true,
      max_dimension_length: true,
      max_dimension_breadth: true,
      max_dimension_height: true,
    },
    "aircraft-details": {
      mtow: true,
      max_zero_fuel_weight: true,
      passenger_capacity: true,
      landing_weight: true,
      gl_code_id: true,
    },
    "door-dimensions": {
      aft_h: true,
      aft_w: true,
      fwd_h: true,
      fwd_w: true,
      bulk_h: true,
      bulk_w: true,
    },
    volume: {
      fwt: true,
      fwd: true,
      bulk: true,
    },
  })
