import { Aircraft, AircraftTailNumber } from "../aircraft/aircraft"

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

interface Timezone {
  id: string,
  abbreviation: string
  name: string
  offset: string
}

interface Location {
  id: string,
  name: string,
  timezone: Timezone
}

export interface Flight {
  id: string
  flight_number: string,
  origin: Location,
  destination: Location,
  departure_date: string,
  departure_hour: number,
  departure_minute:number
  departure_period: string,
  arrival_date: string,
  arrival_time: string,
  arrival_hour: number,
  arrival_minute:number
  flight_duration_hour: number,
  flight_duration_minute: number,
  tail: Aircraft,
}

export interface CreateFlightMasterPayload {
  ID?: string
  flight_number: string,
  origin_id: string,
  destination_id: string,
  departure_period: string,
  departure_date: Date | string,
  departure_hour: number,
  departure_minute:number
  flight_duration_hour: number,
  flight_duration_minute: number,
  tail_id?: string,
}

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
