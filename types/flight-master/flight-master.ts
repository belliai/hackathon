import { Aircraft, AircraftTailNumber } from "../aircraft/aircraft"
import { TailNumber } from "../aircraft/tail-number"

interface IDNameType {
  ID: string
  name: string
}

interface IDValueType {
  ID: string
  value: string
}

interface UOMType extends IDNameType {
  symbol: string
}

export interface Timezone {
  id: string
  abbreviation: string
  name: string
  offset: string
}

export interface Location {
  id: string
  ID: string
  name: string
  airport_code: string
  city: string
  country: string
  timezone: Timezone
}

export interface Flight {
  id: string
  flight_number: string
  origin: Location
  destination: Location
  departure_date: string
  departure_hour: number
  departure_minute: number
  departure_period: string
  arrival_date: string
  arrival_time: string
  arrival_hour: number
  arrival_minute: number
  flight_duration_hour: number
  flight_duration_minute: number
  tail: TailNumber
  recurring_flight_id?: string
  week_sat?: any
  week_fri?: any
  week_wed?: any
  week_tue?: any
  week_mon?: any
  week_sun?: any
  recurring_type?: string
  end_condition?: string
  recurring_every?: number
  end_after_occurrences?: number
  end_date?: string
  specification: Specification
  status: FlightStatus
}

export type UpdateFlightPayload = Partial<CreateFlightMasterPayload>

export interface FlightStatus {
  id: string
  status: string
}

export interface CreateFlightMasterPayload {
  ID?: string
  flight_number: string
  origin_id: string
  destination_id: string
  departure_period: string
  departure_date: Date | string
  departure_hour: number
  departure_minute: number
  flight_duration_hour: number
  flight_duration_minute: number
  tail_id?: string
  recurring?: string
  status_id?: string
}

export interface RecurringPayload {
  end_date?: string | Date
  recurring_type?: "daily" | "weekly" | "custom"
  recurring_every?: number
  end_condition?: string
  end_after_occurrences?: number
  week_sun?: boolean
  week_mon?: boolean
  week_tue?: boolean
  week_wed?: boolean
  week_thu?: boolean
  week_fri?: boolean
  week_sat?: boolean
  days?: string[]
}

export type FlightMasterWithRecurring = CreateFlightMasterPayload &
  RecurringPayload

export interface CreateRecurringFlightMasterPayload {
  aircraft_id: string
  destination_id: string
  flight_no: string
  source_id: string
  status_id: string
  from_date: string
  to_date: string
  arrival_h: number
  arrival_m: number
  departure_h: number
  departure_m: number
}

export interface Specification {
  gl_code: string
  mtow: number
  max_zero_fuel_weight: number
  passenger_capacity: number
  uld_position: number
  landing_weight: number
  cargo_capacity: number
  max_bulk_capacity_weight: number
  max_bulk_capacity_volume: number
  max_volume: number
  restricted_weight_piece: number
  max_dimension_length: number
  max_dimension_breadth: number
  max_dimension_height: number
  aft_h: number
  aft_w: number
  fwd_h: number
  fwd_w: number
  bulk_h: number
  bulk_w: number
  fwt: number
  fwd: number
  bulk: number
}
