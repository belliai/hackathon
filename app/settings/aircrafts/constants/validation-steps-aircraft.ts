import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { Path } from "react-hook-form"

import { AircraftFormTabs } from "../types"

export const stepsOrder: AircraftFormTabs[] = [
  "aircraft-type",
  "cargo-capacity",
  "max-per-piece",
  "aircraft-details",
  "door-dimensions",
  "volume",
]

type Fields = Path<AircraftFormValues>[]

export const tabValidations: Record<AircraftFormTabs, Fields> = {
  "aircraft-type": [
    "manufacturer_id",
    "aircraft_type_id",
    "version_id",
    "body_type_id",
  ],
  "cargo-capacity": [
    "cargo_capacity",
    "uld_position",
    "max_bulk_capacity_volume",
    "max_bulk_capacity_weight",
    "max_volume",
  ],
  "max-per-piece": [
    "restricted_weight_piece",
    "max_dimension_length",
    "max_dimension_breadth",
    "max_dimension_height",
  ],
  "aircraft-details": [
    "mtow",
    "max_zero_fuel_weight",
    "passenger_capacity",
    "landing_weight",
    "gl_code_id",
  ],
  "door-dimensions": ["aft_h", "aft_w", "fwd_h", "fwd_w", "bulk_h", "bulk_w"],
  volume: ["fwt", "fwd", "bulk"],
}
