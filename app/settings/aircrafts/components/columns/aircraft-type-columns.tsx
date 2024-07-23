import { ColumnDef } from "@tanstack/react-table"

import { Aircraft } from "@/types/aircraft/aircraft"
import { Badge } from "@/components/ui/badge"
import { TableHeaderWithTooltip } from "@/components/ui/table"

export const aircraftTypeColumns: ColumnDef<Aircraft>[] = [
  {
    accessorKey: "manufacturer",
    cell: ({ row }) => {
      const deleted = row.original.manufacturer.is_deleted ? (
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
    accessorKey: "aircraft_type",
    cell: ({ row }) => {
      const deleted = row.original.aircraft_type.is_deleted ? (
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
    accessorKey: "version",
    cell: ({ row }) => {
      const deleted = row.original.version.is_deleted ? (
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
    accessorKey: "count",
    accessorFn: (row) =>
      row.aircraft_tail_numbers?.filter(
        (item) =>
          item.status?.name?.toLowerCase() === "active" && !item.is_deleted
      ).length ?? 0,
    header: () => (
      <TableHeaderWithTooltip
        header="Active Count"
        tooltipId="aircraft-active-count"
      />
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
    cell: ({ row }) => (
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
    cell: ({ row }) => (
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
    cell: ({ row }) => (
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
    cell: ({ row }) => (
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
  {
    accessorKey: "body_type.name",
    header: () => (
      <TableHeaderWithTooltip
        header="Body Type"
        tooltipId="aircraft-body-type"
      />
    ),
  },
]
