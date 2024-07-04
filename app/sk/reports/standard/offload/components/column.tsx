"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OffloadColumnType = {
  offload_flight_date: string
  offloaded_flight: string
  awb_prefix: string
  awb_number: string
  origin: string
  destination: string
  booked_pcs: string
  booked_wt: string
  manifested_pcs: string
  manifested_wt: string
  offloaded_pcs: string
  offloaded_wt: string
  reason: string
  next_flight: string
}

export const columns: ColumnDef<OffloadColumnType>[] = [
  {
    header: "Offload Flight Date",
    accessorKey: "offload_flight_date",
  },
  {
    header: "Offloaded Flight",
    accessorKey: "offloaded_flight",
  },
  {
    header: "AWB Prefix",
    accessorKey: "awb_prefix",
  },
  {
    header: "AWB Number",
    accessorKey: "awb_number",
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
    header: "Booked Pcs",
    accessorKey: "booked_pcs",
  },
  {
    header: "Booked Wt",
    accessorKey: "booked_wt",
  },
  {
    header: "Manifested Pcs",
    accessorKey: "manifested_pcs",
  },
  {
    header: "Manifested Wt",
    accessorKey: "manifested_wt",
  },
  {
    header: "Offloaded Pcs",
    accessorKey: "offloaded_pcs",
  },
  {
    header: "Offloaded Wt",
    accessorKey: "offloaded_wt",
  },
  {
    header: "Reason",
    accessorKey: "reason",
  },
  {
    header: "Next Flight",
    accessorKey: "next_flight",
  },
]

export const DUMMY_DATA: OffloadColumnType[] = [
  {
    offload_flight_date: "2023-08-01",
    offloaded_flight: "HV190",
    awb_prefix: "247",
    awb_number: "31634771",
    origin: "New York",
    destination: "Tokyo",
    booked_pcs: "2",
    booked_wt: "430.55",
    manifested_pcs: "68",
    manifested_wt: "179.95",
    offloaded_pcs: "37",
    offloaded_wt: "984.96",
    reason: "Weather",
    next_flight: "2023-08-05",
  },
  {
    offload_flight_date: "2023-06-07",
    offloaded_flight: "FO683",
    awb_prefix: "008",
    awb_number: "91940888",
    origin: "New York",
    destination: "Sydney",
    booked_pcs: "27",
    booked_wt: "215.41",
    manifested_pcs: "30",
    manifested_wt: "980.3",
    offloaded_pcs: "42",
    offloaded_wt: "939.01",
    reason: "Technical Issue",
    next_flight: "2023-06-10",
  },
  {
    offload_flight_date: "2023-12-25",
    offloaded_flight: "RF036",
    awb_prefix: "934",
    awb_number: "78924549",
    origin: "New York",
    destination: "Tokyo",
    booked_pcs: "33",
    booked_wt: "956.18",
    manifested_pcs: "82",
    manifested_wt: "127.04",
    offloaded_pcs: "83",
    offloaded_wt: "751.0",
    reason: "Maintenance",
    next_flight: "2023-12-28",
  },
  {
    offload_flight_date: "2023-07-03",
    offloaded_flight: "MG129",
    awb_prefix: "340",
    awb_number: "14716968",
    origin: "Houston",
    destination: "Paris",
    booked_pcs: "73",
    booked_wt: "857.04",
    manifested_pcs: "90",
    manifested_wt: "931.82",
    offloaded_pcs: "65",
    offloaded_wt: "149.05",
    reason: "Technical Issue",
    next_flight: "2023-07-06",
  },
  {
    offload_flight_date: "2023-11-16",
    offloaded_flight: "BG548",
    awb_prefix: "009",
    awb_number: "38707571",
    origin: "Houston",
    destination: "Paris",
    booked_pcs: "53",
    booked_wt: "5.81",
    manifested_pcs: "52",
    manifested_wt: "152.87",
    offloaded_pcs: "54",
    offloaded_wt: "411.73",
    reason: "Maintenance",
    next_flight: "2023-11-18",
  },
]
