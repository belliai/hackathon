"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserPerformanceType = {
  awb_no?: string
  origin?: string
  destination?: string
  agent_code?: string
  awb_date?: string
  piece?: number
  gross_weight?: number
  charged_weight?: number
  product_type?: string
  shipper?: string
  flt_date?: string
  flt_number?: string
  awb_status?: string
  accept_date_time?: string
  accepted_by?: string
  depart_date_time?: string
  depart_by?: string
  offload_date_time?: string
  offloaded_by?: string
  arrive_date_time?: string
  arrive_by?: string
  deliver_date_time?: string
  deliver_by?: string
  flight_std?: string
  flight_sta?: string
  atd?: string
  ata?: string
}

export const columns: ColumnDef<UserPerformanceType>[] = [
  {
    header: "AWB No",
    accessorKey: "awb_no",
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
    header: "Agent Code",
    accessorKey: "agent_code",
  },
  {
    header: "AWB Date",
    accessorKey: "awb_date",
  },
  {
    header: "Piece",
    accessorKey: "piece",
  },
  {
    header: "Gross Weight",
    accessorKey: "gross_weight",
  },
  {
    header: "Charged Weight",
    accessorKey: "charged_weight",
  },
  {
    header: "Product Type",
    accessorKey: "product_type",
  },
  {
    header: "Shipper",
    accessorKey: "shipper",
  },
  {
    header: "Flight Date",
    accessorKey: "flt_date",
  },
  {
    header: "Flight Number",
    accessorKey: "flt_number",
  },
  {
    header: "AWB Status",
    accessorKey: "awb_status",
  },
  {
    header: "Accept Date Time",
    accessorKey: "accept_date_time",
  },
  {
    header: "Accepted By",
    accessorKey: "accepted_by",
  },
  {
    header: "Depart Date Time",
    accessorKey: "depart_date_time",
  },
  {
    header: "Depart By",
    accessorKey: "depart_by",
  },
  {
    header: "Offload Date Time",
    accessorKey: "offload_date_time",
  },
  {
    header: "Offloaded By",
    accessorKey: "offloaded_by",
  },
  {
    header: "Arrive Date Time",
    accessorKey: "arrive_date_time",
  },
  {
    header: "Arrive By",
    accessorKey: "arrive_by",
  },
  {
    header: "Deliver Date Time",
    accessorKey: "deliver_date_time",
  },
  {
    header: "Deliver By",
    accessorKey: "deliver_by",
  },
  {
    header: "Flight STD",
    accessorKey: "flight_std",
  },
  {
    header: "Flight STA",
    accessorKey: "flight_sta",
  },
  {
    header: "ATD",
    accessorKey: "atd",
  },
  {
    header: "ATA",
    accessorKey: "ata",
  },
]
