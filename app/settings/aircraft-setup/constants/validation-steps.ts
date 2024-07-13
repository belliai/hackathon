import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { Path } from "react-hook-form"

type Fields = Path<AircraftFormValues>[]

export const detailsFields: Fields = [
  // Measurement Units
  "mtow_unit_id",
  "cargo_capacity_unit_id",
  "max_zero_fuel_weight_unit_id",
  "landing_weight_unit_id",
  "max_bulk_capacity_weight_unit_id",
  "restricted_weight_piece_unit_id",
  "max_volume_unit_id",
  "max_bulk_capacity_volume_unit_id",
  "bulk_cubic_id",
  "max_dimension_unit_id",
  "bulk_unit_id",

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
