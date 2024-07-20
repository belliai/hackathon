import { Version } from "@/types/aircraft/aircraft"

export type TailNumberData = {
  aircraft_id: string
  manufacturer: OptionEntity
  aircraft_type: OptionEntity
  version: Version
  mtow: string
  landing_weight: string
  cargo_capacity: string
  id: string
  tail_number: string
  status: OptionEntity
  is_deleted: boolean
}

export type AircraftFormTabs =
  | "aircraft-type"
  | "measurement-units"
  | "aircraft-details"
  | "door-dimensions"
  | "volume"
  | "aircraft-tail-numbers"

export type TailNumberFormTabs =
  | "tail-numbers"
  | "measurement-units"
  | "aircraft-details"
  | "door-dimensions"
  | "volume"
