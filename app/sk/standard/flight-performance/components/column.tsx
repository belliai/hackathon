"use client"

import { ColumnDef } from "@tanstack/react-table"

export type FlightPerformanceColumnType = {
  flight_date: string
  flight_number: string
  origin: string
  destination: string
  aircraft_type: string
  aircraft_capacity: string
  booked_ch_wt: string
  manifested_ch_wt: string
  planned_ch_wt: string
  gross_tonnage: string
  total_vol_cbm: string
  gross_chargeable_tonnage: string
  pax_load: string
}

export const columns: ColumnDef<FlightPerformanceColumnType>[] = [
  {
    header: "Flight Date",
    accessorKey: "flight_date",
  },
  {
    header: "Flight#",
    accessorKey: "flight_number",
  },
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
  },
  {
    header: "AircraftType",
    accessorKey: "aircraft_type",
  },
  {
    header: "Aircraft Capacity",
    accessorKey: "aircraft_capacity",
  },
  {
    header: "Booked CH Wt",
    accessorKey: "booked_ch_wt",
  },
  {
    header: "Manifested CH Wt",
    accessorKey: "manifested_ch_wt",
  },
  {
    header: "Planned CH Wt",
    accessorKey: "planned_ch_wt",
  },
  {
    header: "Gross Tonnage",
    accessorKey: "gross_tonnage",
  },
  {
    header: "Total Vol CBM",
    accessorKey: "total_vol_cbm",
  },
  {
    header: "Gross Chargeable Tonnage",
    accessorKey: "gross_chargeable_tonnage",
  },
  {
    header: "PaxLoad",
    accessorKey: "pax_load",
  },
]

export const DUMMY_DATA: FlightPerformanceColumnType[] = [
  {
    flight_date: "2024-07-01",
    flight_number: "AA100",
    origin: "JFK",
    destination: "LAX",
    aircraft_type: "Boeing 737",
    aircraft_capacity: "200",
    booked_ch_wt: "180",
    manifested_ch_wt: "175",
    planned_ch_wt: "190",
    gross_tonnage: "15",
    total_vol_cbm: "35",
    gross_chargeable_tonnage: "17",
    pax_load: "180",
  },
  {
    flight_date: "2024-07-02",
    flight_number: "BA200",
    origin: "LHR",
    destination: "JFK",
    aircraft_type: "Airbus A380",
    aircraft_capacity: "500",
    booked_ch_wt: "450",
    manifested_ch_wt: "440",
    planned_ch_wt: "460",
    gross_tonnage: "50",
    total_vol_cbm: "75",
    gross_chargeable_tonnage: "52",
    pax_load: "480",
  },
  {
    flight_date: "2024-07-03",
    flight_number: "DL300",
    origin: "ATL",
    destination: "CDG",
    aircraft_type: "Boeing 777",
    aircraft_capacity: "300",
    booked_ch_wt: "290",
    manifested_ch_wt: "285",
    planned_ch_wt: "295",
    gross_tonnage: "30",
    total_vol_cbm: "55",
    gross_chargeable_tonnage: "32",
    pax_load: "290",
  },
  {
    flight_date: "2024-07-04",
    flight_number: "AF400",
    origin: "CDG",
    destination: "HND",
    aircraft_type: "Airbus A350",
    aircraft_capacity: "350",
    booked_ch_wt: "320",
    manifested_ch_wt: "310",
    planned_ch_wt: "330",
    gross_tonnage: "40",
    total_vol_cbm: "60",
    gross_chargeable_tonnage: "42",
    pax_load: "320",
  },
  {
    flight_date: "2024-07-05",
    flight_number: "SQ500",
    origin: "SIN",
    destination: "LAX",
    aircraft_type: "Boeing 787",
    aircraft_capacity: "350",
    booked_ch_wt: "340",
    manifested_ch_wt: "330",
    planned_ch_wt: "350",
    gross_tonnage: "45",
    total_vol_cbm: "65",
    gross_chargeable_tonnage: "47",
    pax_load: "340",
  },
  {
    flight_date: "2024-07-06",
    flight_number: "LH600",
    origin: "FRA",
    destination: "JFK",
    aircraft_type: "Airbus A340",
    aircraft_capacity: "300",
    booked_ch_wt: "280",
    manifested_ch_wt: "275",
    planned_ch_wt: "290",
    gross_tonnage: "35",
    total_vol_cbm: "50",
    gross_chargeable_tonnage: "37",
    pax_load: "280",
  },
  {
    flight_date: "2024-07-07",
    flight_number: "EK700",
    origin: "DXB",
    destination: "LHR",
    aircraft_type: "Boeing 777",
    aircraft_capacity: "400",
    booked_ch_wt: "380",
    manifested_ch_wt: "370",
    planned_ch_wt: "390",
    gross_tonnage: "48",
    total_vol_cbm: "70",
    gross_chargeable_tonnage: "50",
    pax_load: "390",
  },
]
