"use client"

import { Order } from "@/schemas/order/order"
import { ColumnDef } from "@tanstack/react-table"

export type { Order }

export const columns: ColumnDef<Order>[] = [
  {
    header: "AWB",
    accessorKey: "awb",
  },

  {
    header: "Booking Type",
    accessorKey: "booking_type.name",
  },
  {
    header: "Destination",
    accessorKey: "destination.name",
  },
  {
    header: "Origin",
    accessorKey: "origin.name",
  },
  {
    header: "Customer",
    accessorKey: "bill_to.name",
  },
  {
    header: "Partner Code",
    accessorKey: "partner_code.name",
  },
  {
    header: "Partner Prefix",
    accessorKey: "partner_prefix.name",
  },
  {
    header: "Payment Mode",
    accessorKey: "payment_mode.name",
  },
  {
    header: "Charged Weight (kg)",
    accessorKey: "ch_weight_kg",
  },
  {
    header: "Commodity Code",
    accessorKey: "commodity_code.name",
  },

  {
    header: "Currency",
    accessorKey: "currency.name",
  },

  {
    header: "Freight Forwarder",
    accessorKey: "freight_forwarder.name",
  },
  {
    header: "Gross Weight (kg)",
    accessorKey: "gs_weight_kg",
  },
  {
    header: "Mode",
    accessorKey: "mode",
  },

  {
    header: "Rate",
    accessorKey: "rate",
  },
  {
    header: "S Freight",
    accessorKey: "s_freight",
  },
  {
    header: "S Rate",
    accessorKey: "s_rate",
  },
  {
    header: "Shipper",
    accessorKey: "shipper.name",
  },
  {
    header: "Spot ID",
    accessorKey: "spot_id",
  },
  {
    header: "Status",
    accessorKey: "status.name",
  },
  {
    header: "Total",
    accessorKey: "total",
  },
  {
    header: "Volume (kg)",
    accessorKey: "volume_kg",
  },
]
