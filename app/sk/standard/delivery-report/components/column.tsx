"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DeliveryReportColumnType = {
  origin: string
  destination: string
  awb_number: string
  agent_name: string
  agent_code: string
  invoice_number: string
  chargeable_weight: string
  payment_collected_mode: string
  created_on: string
}

export const columns: ColumnDef<DeliveryReportColumnType>[] = [
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
  },
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "Agent Name",
    accessorKey: "agent_name",
  },
  {
    header: "Agent Code",
    accessorKey: "agent_code",
  },
  {
    header: "Invoice Number",
    accessorKey: "invoice_number",
  },
  {
    header: "Chargeable Weight",
    accessorKey: "chargeable_weight",
  },
  {
    header: "Payment Collected Mode",
    accessorKey: "payment_collected_mode",
  },
  {
    header: "Created On",
    accessorKey: "created_on",
  },
]

export const DUMMY_DATA: DeliveryReportColumnType[] = [
  {
    origin: "New York",
    destination: "Los Angeles",
    awb_number: "1234567890",
    agent_name: "Agent Smith",
    agent_code: "AS123",
    invoice_number: "INV001",
    chargeable_weight: "500kg",
    payment_collected_mode: "Credit Card",
    created_on: "2023-06-01",
  },
  {
    origin: "Chicago",
    destination: "Houston",
    awb_number: "2345678901",
    agent_name: "Agent Johnson",
    agent_code: "AJ234",
    invoice_number: "INV002",
    chargeable_weight: "600kg",
    payment_collected_mode: "Cash",
    created_on: "2023-06-02",
  },
  {
    origin: "Miami",
    destination: "Atlanta",
    awb_number: "3456789012",
    agent_name: "Agent Brown",
    agent_code: "AB345",
    invoice_number: "INV003",
    chargeable_weight: "700kg",
    payment_collected_mode: "Bank Transfer",
    created_on: "2023-06-03",
  },
  {
    origin: "Seattle",
    destination: "San Francisco",
    awb_number: "4567890123",
    agent_name: "Agent Davis",
    agent_code: "AD456",
    invoice_number: "INV004",
    chargeable_weight: "800kg",
    payment_collected_mode: "Credit Card",
    created_on: "2023-06-04",
  },
  {
    origin: "Boston",
    destination: "Washington DC",
    awb_number: "5678901234",
    agent_name: "Agent Wilson",
    agent_code: "AW567",
    invoice_number: "INV005",
    chargeable_weight: "900kg",
    payment_collected_mode: "Cash",
    created_on: "2023-06-05",
  },
  {
    origin: "Dallas",
    destination: "Denver",
    awb_number: "6789012345",
    agent_name: "Agent Moore",
    agent_code: "AM678",
    invoice_number: "INV006",
    chargeable_weight: "1000kg",
    payment_collected_mode: "Bank Transfer",
    created_on: "2023-06-06",
  },
  {
    origin: "Las Vegas",
    destination: "Phoenix",
    awb_number: "7890123456",
    agent_name: "Agent Taylor",
    agent_code: "AT789",
    invoice_number: "INV007",
    chargeable_weight: "1100kg",
    payment_collected_mode: "Credit Card",
    created_on: "2023-06-07",
  },
]
