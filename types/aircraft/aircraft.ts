import { AircraftFormValues } from "@/schemas/aircraft/aircraft"

export interface Aircraft {
  id: string
  manufacturer: OptionEntity
  aircraft_type: OptionEntity
  version: Version
  weight_unit: Unit
  volume_unit: Unit
  dimension_unit: Unit
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
  count: number
  aircraft_tail_numbers: AircraftTailNumber[]
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
}

export interface Version extends Omit<OptionEntity, "name"> {
  version: string
}

interface Unit extends OptionEntity {
  symbol: string
}

export interface AircraftTailNumber {
  ID?: string
  id: string
  tail_number: string
  status: OptionEntity
  is_deleted: boolean
}

interface AircraftTailNumberRequest {
  id?: string
  status_id?: string
  tail_number: string
}

export type CreateAircraftRequest = AircraftFormValues

export interface AircraftTypeList {
  id: string
  aircraft_type: string
  aircraft_tail_numbers: AircraftTailNumberRequest[]
}
