"use client"

import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"

import createActionColumn from "@/app/k360/organize/masters/components/columnItem"
import { TableHeaderWithTooltip } from "@/components/ui/table"

export type FlightMasterDataType = {
  entry_type: string
  flight_no: string
  source: string
  destination: string
  std_api: string
  sta: string
  aircraft_type: string
  tail_no: string
  flight_type: string
  status: string
  sector: string
  created_at: string
  updated_at: string
  updated_by: string
}

export const columns = (
  onRowClick: (data: Flight) => void,
  onDelete: (data: Flight) => void
): ColumnDef<Flight>[] => [
  {
    accessorKey: "entry_type",
    header: () => (
        <TableHeaderWithTooltip header="Entry Type" tooltipId="flight-master-entry-type" />
      ),
    cell: ({ row }) => "Manual",
  },
  {
    accessorKey: "flight_no",
    header: () => (
        <TableHeaderWithTooltip
          header="Flight No."
          tooltipId="flight-master-flight-no"
        />
    ),
  },
  {
    accessorKey: "source.name",
    header: () => (
        <TableHeaderWithTooltip header="Source" tooltipId="flight-master-source" />
      ),
    cell: ({ row }) => {
      const source = row.original.source
      return source ? source.name : ""
    },
    filterFn: 'includesString'
  },
  {
    accessorKey: "destination.name",
    header: () => (
        <TableHeaderWithTooltip header="Destination" tooltipId="flight-master-destination" />
      ),
    cell: ({ row }) => {
      const destination = row.original.destination
      return destination ? destination.name : ""
    },
  },
  {
    accessorKey: "from_date",
    header: () => (
        <TableHeaderWithTooltip header="STD(API)" tooltipId="flight-master-std" />
      ),
    cell: ({ row }) => {
      const date = row.original.from_date || ""
      return moment(date).format("YYYY-MM-DD")
    },
  },
  {
    accessorKey: "to_date",
    header: () => (
        <TableHeaderWithTooltip header="STA" tooltipId="flight-master-sta" />
      ),
    cell: ({ row }) => {
      const date = row.original.to_date || ""
      return moment(date).format("YYYY-MM-DD")
    },
  },
  {
    accessorKey: "aircraft.aircraft_type",
    header: () => (
        <TableHeaderWithTooltip header="Aircraft Type" tooltipId="flight-master-aircraft-type" />
      ),
    cell: ({ row }) => {
      const aircraft = row.original.aircraft
      return aircraft ? aircraft.aircraft_type : ""
    },
  },
  {
    accessorKey: "tail.tail_number",
    header: () => (
        <TableHeaderWithTooltip header="Tail No." tooltipId="flight-master-tail-no" />
      ),
    cell: ({ row }) => {
      const tail = row.original.tail
      return tail ? tail.tail_number : ""
    },
  },
  {
    accessorKey: "flight_type.value",
    header: () => (
        <TableHeaderWithTooltip header="Flight Type" tooltipId="flight-master-flight-type" />
      ),
    cell: ({ row }) => {
      const flightType = row.original.flight_type
      return flightType ? flightType.value : ""
    },
  },
  {
    accessorKey: "status.value",
    header: () => (
        <TableHeaderWithTooltip header="Status" tooltipId="flight-master-status" />
      ),
    cell: ({ row }) => {
      const status = row.original.status
      return status ? status.value : ""
    },
  },
  {
    accessorKey: "sector.value",
    header: () => (
        <TableHeaderWithTooltip header="Sector" tooltipId="flight-master-sector" />
      ),
    cell: ({ row }) => {
      const sector = row.original.sector
      return sector ? sector.value : ""
    },
  },
  {
    accessorKey: "created_at",
    header: () => (
        <TableHeaderWithTooltip header="Created At" tooltipId="flight-master-created-at" />
      ),
    cell: ({ row }) => {
      const date = row.original.created_at || ""
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
  },
  {
    accessorKey: "updated_at",
    header: () => (
        <TableHeaderWithTooltip header="Updated At" tooltipId="flight-master-updated-at" />
      ),
    cell: ({ row }) => {
      const date = row.original.updated_at || ""
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
  },
  {
    accessorKey: "updated_by",
    header: () => (
        <TableHeaderWithTooltip header="Updated By" tooltipId="flight-master-updated-by" />
      ),
    cell: ({ row }) => "Jeff Pan",
  },
]
