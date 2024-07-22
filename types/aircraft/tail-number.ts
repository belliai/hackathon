export type TailNumber = {
  id: string
  aircraft_id: string
  tail_number: string
  status: OptionEntity
  manufacturer: OptionEntity
  aircraft_type: OptionEntity
  version: Omit<OptionEntity, "name"> & { version: string }
  weight_unit: OptionEntity & { symbol: string }
  volume_unit: OptionEntity & { symbol: string }
  dimension_unit: OptionEntity & { symbol: string }
  mtow: string
  max_zero_fuel_weight: string
  body_type: OptionEntity
  passenger_capacity: string
  uld_position: string
  landing_weight: string
  cargo_capacity: string
  max_bulk_capacity_weight: string
  max_bulk_capacity_volume: string
  max_volume: string
  restricted_weight_piece: string
  max_dimension_length: string
  max_dimension_breadth: string
  max_dimension_height: string
  gl_code: OptionEntity
  aft_h: string
  aft_w: string
  fwd_h: string
  fwd_w: string
  bulk_h: string
  bulk_w: string
  fwt: string
  fwd: string
  bulk: string
  created_at: string
  updated_at: string
  is_deleted: boolean
}
