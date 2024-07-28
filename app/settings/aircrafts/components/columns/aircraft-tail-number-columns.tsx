import { ColumnDef } from "@tanstack/react-table"

import { TailNumber } from "@/types/aircraft/tail-number"
import { Badge } from "@/components/ui/badge"
import { TableHeaderWithTooltip } from "@/components/ui/table"

export const aircraftTailNumbersColumns: ColumnDef<TailNumber>[] = [
  {
    accessorKey: "status",
    accessorFn: (row) => row.status.name,
    header: () => (
      <TableHeaderWithTooltip header="Status" tooltipId="aircraft-status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status.name === "Active" ? "success" : "destructive"
        }
      >
        {row.original.status.name}
      </Badge>
    ),
  },
  {
    accessorKey: "tail_number",
    header: () => (
      <TableHeaderWithTooltip
        header="Tail Number"
        tooltipId="aircraft-manufacturer"
      />
    ),
  },
  {
    accessorKey: "manufacturer.name",
    cell: ({ row }) => {
      const deleted =
        row.original.manufacturer.is_deleted ||
        !row.original.manufacturer.name ? (
          <span className="text-destructive"> (deleted)</span>
        ) : null
      return (
        <span>
          {row.original.manufacturer.name} {deleted}
        </span>
      )
    },
    header: () => (
      <TableHeaderWithTooltip
        header="Manufacturer"
        tooltipId="aircraft-manufacturer"
      />
    ),
  },
  {
    accessorKey: "aircraft_type.name",
    cell: ({ row }) => {
      const deleted =
        row.original.aircraft_type.is_deleted ||
        !row.original.aircraft_type.name ? (
          <span className="text-destructive"> (deleted)</span>
        ) : null
      return (
        <span>
          {row.original.aircraft_type.name} {deleted}
        </span>
      )
    },
    header: () => (
      <TableHeaderWithTooltip
        header="Aircraft Type"
        tooltipId="aircraft-aircraft-type"
      />
    ),
  },
  {
    accessorKey: "version.version",
    cell: ({ row }) => {
      const deleted =
        row.original.version.is_deleted || !row.original.version.version ? (
          <span className="text-destructive"> (deleted)</span>
        ) : null
      return (
        <span>
          {row.original.version.version} {deleted}
        </span>
      )
    },
    header: () => (
      <TableHeaderWithTooltip header="Version" tooltipId="aircraft-version" />
    ),
  },
  {
    accessorKey: "passenger_capacity",
    header: () => (
      <TableHeaderWithTooltip
        header="Passenger Capacity"
        tooltipId="aircraft-passenger-capacity"
      />
    ),
  },
  {
    accessorKey: "landing_weight",
    cell: ({ row }) =>
      row.original.landing_weight && (
        <span>
          {row.original.landing_weight} {row.original.weight_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Landing Wt"
        tooltipId="aircraft-landing-weight"
      />
    ),
  },
  {
    accessorKey: "cargo_capacity",
    cell: ({ row }) =>
      row.original.cargo_capacity && (
        <span>
          {row.original.cargo_capacity} {row.original.weight_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Cargo Cap"
        tooltipId="aircraft-cargo-capacity"
      />
    ),
  },
  {
    accessorKey: "mtow",
    cell: ({ row }) =>
      row.original.mtow && (
        <span>
          {row.original.mtow} {row.original.weight_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip header="MTOW" tooltipId="aircraft-mtow" />
    ),
  },
  {
    accessorKey: "max_zero_fuel_weight",
    cell: ({ row }) =>
      row.original.max_zero_fuel_weight && (
        <span>
          {row.original.max_zero_fuel_weight} {row.original.weight_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Max Zero Fuel Wt"
        tooltipId="aircraft-max-zero-fuel-wt"
      />
    ),
  },
]
