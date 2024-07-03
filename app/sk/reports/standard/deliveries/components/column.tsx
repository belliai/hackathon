"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DeliveriesReport = {
  awb_prefix: string
  awb_number: string
  execution_date: string
  origin: string
  destination: string
  shipper_name: string
  agent_name: string
  consignee_name: string
  accepted_pcs: number
  accepted_wt: number
  flight_number: string
}

export const columns: ColumnDef<DeliveriesReport>[] = [
  {
    header: "AWB Prefix",
    accessorKey: "awb_prefix",
  },
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "Execution Date",
    accessorKey: "execution_date",
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
    header: "Shipper Name",
    accessorKey: "shipper_name",
  },
  {
    header: "agent_name",
    accessorKey: "Agent Name",
  },
  {
    header: "Consignee Name",
    accessorKey: "consignee_name",
  },
  {
    header: "Accepted Pcs",
    accessorKey: "accepted_pcs",
  },
  {
    header: "Accepted Wt",
    accessorKey: "accepted_wt",
  },
  {
    header: "Flight Number",
    accessorKey: "flight_number",
  },
]

export const DUMMY_DATA: DeliveriesReport[] = [
  {
    awb_prefix: "937",
    awb_number: "11445065",
    execution_date: "2023-03-28",
    origin: "Los Angeles",
    destination: "Sydney",
    shipper_name: "Jane Smith",
    agent_name: "Bob Lee",
    consignee_name: "Jane Smith",
    accepted_pcs: 64,
    accepted_wt: 802.53,
    flight_number: "D154",
  },
  {
    awb_prefix: "725",
    awb_number: "16974027",
    execution_date: "2023-01-13",
    origin: "Chicago",
    destination: "Sydney",
    shipper_name: "Jane Smith",
    agent_name: "John Doe",
    consignee_name: "Jane Smith",
    accepted_pcs: 87,
    accepted_wt: 366.44,
    flight_number: "L657",
  },
  {
    awb_prefix: "332",
    awb_number: "86515867",
    execution_date: "2023-06-19",
    origin: "Chicago",
    destination: "Dubai",
    shipper_name: "Jane Smith",
    agent_name: "John Doe",
    consignee_name: "John Doe",
    accepted_pcs: 46,
    accepted_wt: 820.51,
    flight_number: "G047",
  },
  {
    awb_prefix: "629",
    awb_number: "38592649",
    execution_date: "2023-03-01",
    origin: "Miami",
    destination: "Sydney",
    shipper_name: "Jane Smith",
    agent_name: "John Doe",
    consignee_name: "Alice Johnson",
    accepted_pcs: 85,
    accepted_wt: 858.34,
    flight_number: "I795",
  },
  {
    awb_prefix: "929",
    awb_number: "03817041",
    execution_date: "2023-12-03",
    origin: "New York",
    destination: "Paris",
    shipper_name: "Jane Smith",
    agent_name: "John Doe",
    consignee_name: "Alice Johnson",
    accepted_pcs: 72,
    accepted_wt: 93.32,
    flight_number: "V475",
  },
  {
    awb_prefix: "097",
    awb_number: "72388795",
    execution_date: "2023-01-14",
    origin: "Houston",
    destination: "Tokyo",
    shipper_name: "Bob Lee",
    agent_name: "Bob Lee",
    consignee_name: "Alice Johnson",
    accepted_pcs: 16,
    accepted_wt: 292.74,
    flight_number: "B800",
  },
  {
    awb_prefix: "866",
    awb_number: "38132095",
    execution_date: "2023-04-27",
    origin: "Los Angeles",
    destination: "Dubai",
    shipper_name: "Alice Johnson",
    agent_name: "Jane Smith",
    consignee_name: "Jane Smith",
    accepted_pcs: 46,
    accepted_wt: 855.49,
    flight_number: "W662",
  },
  {
    awb_prefix: "789",
    awb_number: "13201263",
    execution_date: "2023-05-18",
    origin: "Miami",
    destination: "Paris",
    shipper_name: "Alice Johnson",
    agent_name: "Jane Smith",
    consignee_name: "John Doe",
    accepted_pcs: 5,
    accepted_wt: 576.6,
    flight_number: "X898",
  },
  {
    awb_prefix: "572",
    awb_number: "79251326",
    execution_date: "2023-04-07",
    origin: "Houston",
    destination: "Dubai",
    shipper_name: "Alice Johnson",
    agent_name: "Alice Johnson",
    consignee_name: "John Doe",
    accepted_pcs: 24,
    accepted_wt: 965.58,
    flight_number: "X112",
  },
  {
    awb_prefix: "242",
    awb_number: "66630701",
    execution_date: "2023-11-27",
    origin: "Miami",
    destination: "Dubai",
    shipper_name: "John Doe",
    agent_name: "Jane Smith",
    consignee_name: "Alice Johnson",
    accepted_pcs: 75,
    accepted_wt: 705.74,
    flight_number: "O899",
  },
]
