import { TailNumberFormValues } from "@/schemas/aircraft/tail-numbers"
import { Path } from "react-hook-form"

import { TailNumberFormTabs } from "../types"

export const stepsOrder: TailNumberFormTabs[] = [
  "tail-numbers",
  "aircraft-details",
  "door-dimensions",
  "volume",
]

type Fields = Path<TailNumberFormValues>[]

export const tailNumberFields: Fields = ["tail_number", "aircraft_id"]

export const measurementUnitFields: Fields = [
  "volume_unit_id",
  "weight_unit_id",
  "dimension_unit_id",
]

export const detailsFields: Fields = [
  "mtow",
  "max_zero_fuel_weight",
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
]

export const doorDimensionFields: Fields = [
  "aft_h",
  "aft_w",
  "fwd_h",
  "fwd_w",
  "bulk_h",
  "bulk_w",
]

export const volumeFields: Fields = ["fwt", "fwd", "bulk"]

export const tabValidations: Record<TailNumberFormTabs, Fields> = {
  "tail-numbers": tailNumberFields,
  "door-dimensions": doorDimensionFields,
  volume: volumeFields,
  "aircraft-details": detailsFields,
}
