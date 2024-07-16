import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { Path } from "react-hook-form"

type Fields = Path<AircraftFormValues>[]

export const detailsFields: Fields = [
  // Measurement Units
  "volume_unit_id",
  "weight_unit_id",
  "dimension_unit_id",

  // Details
  "mtow",
  "max_zero_fuel_weight",
  "body_type_id",
  "passenger_capacity",
  "uld_position",
  "landing_weight",
  "cargo_capacity",
  "max_bulk_capacity_weight",
  "max_bulk_capacity_volume",
  "max_volume",
  "restricted_weight_piece",
  "max_dimension_length",
  "max_dimension_breadth",
  "max_dimension_height",
  "gl_code_id",

  // Door Dimensions
  "aft_h",
  "aft_w",
  "fwd_h",
  "fwd_w",
  "bulk_h",
  "bulk_w",

  // Volume
  "fwt",
  "fwd",
  "bulk",
]
