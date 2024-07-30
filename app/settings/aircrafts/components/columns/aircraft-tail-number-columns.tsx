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
          row.original.status.name === "Active" ? "secondary" : "destructive"
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
    accessorKey: "cargo_capacity",
    cell: ({ row }) =>
      row.original.cargo_capacity && (
        <span>
          {row.original.cargo_capacity} {row.original.weight_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Cargo Capacity"
        tooltipId="aircraft-cargo-capacity"
      />
    ),
  },
  {
    accessorKey: "max_dimension_length",
    cell: ({ row }) =>
      row.original.max_dimension_length && (
        <span>
          {row.original.max_dimension_length}{" "}
          {row.original.dimension_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Max (L)"
        tooltipId="aircraft-max-dimension-length"
      />
    ),
  },
  {
    accessorKey: "max_dimension_breadth",
    cell: ({ row }) =>
      row.original.max_dimension_breadth && (
        <span>
          {row.original.max_dimension_breadth}{" "}
          {row.original.dimension_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Max (W)"
        tooltipId="aircraft-max-dimension-breadth"
      />
    ),
  },
  {
    accessorKey: "max_dimension_height",
    cell: ({ row }) =>
      row.original.max_dimension_height && (
        <span>
          {row.original.max_dimension_height}{" "}
          {row.original.dimension_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Max (H)"
        tooltipId="aircraft-max-dimension-height"
      />
    ),
  },

  {
    accessorKey: "restricted_weight_piece",
    cell: ({ row }) =>
      row.original.restricted_weight_piece && (
        <span>
          {row.original.restricted_weight_piece}{" "}
          {row.original.weight_unit.symbol}
        </span>
      ),
    header: () => (
      <TableHeaderWithTooltip
        header="Max (Weight)"
        tooltipId="aircraft-max-piece-weight"
      />
    ),
  },
]
