"use client"

import { Order } from "@/schemas/order/order"
import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderWithTooltip } from "../ui/table"

export type { Order }

export const columns: ColumnDef<Order>[] = [
  {
    header: () => (
      <TableHeaderWithTooltip
        header="AWB"
        tooltipId="airwaybill-awb"
      />
    ),
    accessorKey: "awb",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Booking Type"
        tooltipId="airwaybill-booking-type"
      />
    ),
    accessorKey: "booking_type.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="MAWB"
        tooltipId="airwaybill-mawb"
      />
    ),
    accessorKey: "mawb",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="HAWB"
        tooltipId="airwaybill-hawb"
      />
    ),
    accessorKey: "hawb",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Destination"
        tooltipId="airwaybill-destination"
      />
    ),
    accessorKey: "destination.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Origin"
        tooltipId="airwaybill-origin"
      />
    ),
    accessorKey: "origin.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Customer"
        tooltipId="airwaybill-customer"
      />
    ),
    accessorKey: "bill_to.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Partner Code"
        tooltipId="airwaybill-partner-code"
      />
    ),
    accessorKey: "partner_code.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Partner Prefix"
        tooltipId="airwaybill-partner-prefix"
      />
    ),
    accessorKey: "partner_prefix.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Payment Mode"
        tooltipId="airwaybill-payment-mode"
      />
    ),
    accessorKey: "payment_mode.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Charged Weight"
        tooltipId="airwaybill-charged-weight"
      />
    ),
    accessorKey: "ch_weight_kg",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Commodity Code"
        tooltipId="airwaybill-commodity-code"
      />
    ),
    accessorKey: "commodity_code.name",
  },

  {
    header: () => (
      <TableHeaderWithTooltip
        header="Currency "
        tooltipId="airwaybill-currency"
      />
    ),
    accessorKey: "currency.name",
  },

  {
    header: () => (
      <TableHeaderWithTooltip
        header="Freight Forwarder "
        tooltipId="airwaybill-freight-forwarder"
      />
    ),
    accessorKey: "freight_forwarder.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Gross Weight "
        tooltipId="airwaybill-gross-weight"
      />
    ),
    accessorKey: "gs_weight_kg",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Mode"
        tooltipId="airwaybill-mode"
      />
    ),
    accessorKey: "mode",
  },

  {
    header: () => (
      <TableHeaderWithTooltip
        header="Rate"
        tooltipId="airwaybill-rate"
      />
    ),
    accessorKey: "rate",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="S Freight"
        tooltipId="airwaybill-s-freight"
      />
    ),
    accessorKey: "s_freight",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="S Rate"
        tooltipId="airwaybill-s-rate"
      />
    ),
    accessorKey: "s_rate",
  },
  {
    header:() => (
      <TableHeaderWithTooltip
        header="Shipper"
        tooltipId="airwaybill-shipper"
      />
    ),
    accessorKey: "shipper.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Spot ID"
        tooltipId="airwaybill-spot-id"
      />
    ),
    accessorKey: "spot_id",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Status"
        tooltipId="airwaybill-status"
      />
    ),
    accessorKey: "status.name",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Total"
        tooltipId="airwaybill-total"
      />
    ),
    accessorKey: "total",
  },
  {
    header: () => (
      <TableHeaderWithTooltip
        header="Volume"
        tooltipId="airwaybill-volume"
      />
    ),
    accessorKey: "volume_kg",
  },
]
