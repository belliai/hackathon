"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UninvoicedAgentAwbType = {
  org: string
  dest: string
  agent_code: string
  agent_name: string
  airport_type: string
  awb_number: string
  paymode: string
  execution_date: string
  product_type: string
  comm_code: string
  comm_desc: string
  shc_code: string
  first_flight_date: string
  first_flight: string
  flight_details: string
  aircraft_type: string
  freighter_tail_no: string
  pieces: string
  gross_wt: string
  charged_wt: string
  frt_iata: string
  frt_mkt: string
  oc_due_car: string
  oc_due_agent: string
  iata_cgst: string
  iata_sgst: string
  iata_utgst: string
  iata_igst: string
  gst_tax: string
  mkt_cgst: string
  mkt_sgst: string
  mkt_utgst: string
  mkt_igst: string
  mkt_gst: string
  total: string
  mkt_total: string
  status: string
}

export const columns: ColumnDef<UninvoicedAgentAwbType>[] = [
  { header: "Org", accessorKey: "org" },
  { header: "Dest", accessorKey: "dest" },
  { header: "Agent Code", accessorKey: "agent_code" },
  { header: "Agent Name", accessorKey: "agent_name" },
  { header: "Airport Type", accessorKey: "airport_type" },
  { header: "Awb#", accessorKey: "awb_number" },
  { header: "Paymode", accessorKey: "paymode" },
  { header: "Execution Date", accessorKey: "execution_date" },
  { header: "Product Type", accessorKey: "product_type" },
  { header: "Comm Code", accessorKey: "comm_code" },
  { header: "Comm Desc", accessorKey: "comm_desc" },
  { header: "Shc Code", accessorKey: "shc_code" },
  { header: "First Flight Date", accessorKey: "first_flight_date" },
  { header: "First Flight", accessorKey: "first_flight" },
  { header: "Flight Details", accessorKey: "flight_details" },
  { header: "Aircraft Type", accessorKey: "aircraft_type" },
  { header: "Freighter Tail No", accessorKey: "freighter_tail_no" },
  { header: "Pieces", accessorKey: "pieces" },
  { header: "Gross Wt", accessorKey: "gross_wt" },
  { header: "Charged Wt", accessorKey: "charged_wt" },
  { header: "Frt Iata", accessorKey: "frt_iata" },
  { header: "Frt Mkt", accessorKey: "frt_mkt" },
  { header: "Oc Due Car", accessorKey: "oc_due_car" },
  { header: "Oc Due Agent", accessorKey: "oc_due_agent" },
  { header: "Iata Cgst", accessorKey: "iata_cgst" },
  { header: "Iata Sgst", accessorKey: "iata_sgst" },
  { header: "Iata Utgst", accessorKey: "iata_utgst" },
  { header: "Iata Igst", accessorKey: "iata_igst" },
  { header: "Gst Tax", accessorKey: "gst_tax" },
  { header: "Mkt Cgst", accessorKey: "mkt_cgst" },
  { header: "Mkt Sgst", accessorKey: "mkt_sgst" },
  { header: "Mkt Utgst", accessorKey: "mkt_utgst" },
  { header: "Mkt Igst", accessorKey: "mkt_igst" },
  { header: "Mkt Gst", accessorKey: "mkt_gst" },
  { header: "Total", accessorKey: "total" },
  { header: "Mkt Total", accessorKey: "mkt_total" },
  { header: "Status", accessorKey: "status" },
]
