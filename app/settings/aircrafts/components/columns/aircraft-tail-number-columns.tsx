import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { TableHeaderWithTooltip } from "@/components/ui/table"

import { TailNumberData } from "../../types"

export const aircraftTailNumbersColumns: ColumnDef<TailNumberData>[] = [
  {
    accessorKey: "status",
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
  // {
  //   accessorKey: "manufacturer",
  //   header: () => (
  //     <TableHeaderWithTooltip
  //       header="Aircraft Type"
  //       tooltipId="aircraft-aircraft-type"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const deleted = [
  //       row.original.manufacturer?.is_deleted,
  //       row.original.aircraft_type?.is_deleted,
  //       row.original.version?.is_deleted,
  //     ].some((isDeleted) => !!isDeleted) ? (
  //       <span className="text-destructive"> (deleted)</span>
  //     ) : (
  //       ""
  //     )
  //     return (
  //       <p>
  //         <span>
  //           {[
  //             row.original.manufacturer.name,
  //             row.original.aircraft_type.name,
  //             row.original.version.version,
  //           ].join(" ")}
  //         </span>
  //         {deleted}
  //       </p>
  //     )
  //   },
  // },
  {
    accessorKey: "mtow",
    header: () => (
      <TableHeaderWithTooltip header="MTOW" tooltipId="aircraft-mtow" />
    ),
  },
  {
    accessorKey: "landing_weight",
    header: () => (
      <TableHeaderWithTooltip
        header="Landing Wt"
        tooltipId="aircraft-landing-weight"
      />
    ),
  },
  {
    accessorKey: "cargo_capacity",
    header: () => (
      <TableHeaderWithTooltip
        header="Cargo Cap"
        tooltipId="aircraft-cargo-capacity"
      />
    ),
  },
]
