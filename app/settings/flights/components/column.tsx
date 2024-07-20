"use client"

import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"

import { Flight } from "@/types/flight-master/flight-master"
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

export const useRecurringFlightsColumns = (
  onRowClick: (data: Flight) => void,
  onDelete: (data: Flight) => void
): ColumnDef<Flight>[] => {
  return [
    {
      accessorKey: "from_date",
      header: () => (
        <TableHeaderWithTooltip header="Date" tooltipId="flight-master-std" />
      ),
      cell: ({ row }) => {
        const date = row.original.from_date || ""
        return moment(date).format("YYYY-MM-DD")
      },
    },
    {
      accessorKey: "day_of_week",
      header: () => (
        <TableHeaderWithTooltip header="Day Of week" tooltipId="day-of-week" />
      ),
      cell: ({ row }) => {
        const date = row.original.from_date || ""
        return moment(date).format("ddd")
      },
    },
    {
      accessorKey: "departure_d",
      header: () => (
        <TableHeaderWithTooltip
          header="Departure Time"
          tooltipId="departure-time"
        />
      ),
      cell: ({ row }) => {
        const departure_h = row.original.departure_h
        const departure_m = row.original.departure_m
        const today = new Date()
        today.setHours(departure_h)
        today.setMinutes(departure_m)
        return moment(today).format("HH:mm")
      },
    },
    {
      accessorKey: "to_date",
      header: () => (
        <TableHeaderWithTooltip
          header="Arrival"
          tooltipId="flight-master-sta"
        />
      ),
      cell: ({ row }) => {
        const date = row.original.to_date || ""
        return moment(date).format("YYYY-MM-DD")
      },
    },
    {
      accessorKey: "arrival_d",
      header: () => (
        <TableHeaderWithTooltip
          header="Arrival Time"
          tooltipId="arrival-time"
        />
      ),
      cell: ({ row }) => {
        const arrival_h = row.original.arrival_h
        const arrival_m = row.original.arrival_m
        const today = new Date()
        today.setHours(arrival_h)
        today.setMinutes(arrival_m)
        return moment(today).format("HH:mm")
      },
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
      accessorKey: "tail.tail_number",
      header: () => (
        <TableHeaderWithTooltip
          header="Tail No."
          tooltipId="flight-master-tail-no"
        />
      ),
      cell: ({ row }) => {
        const tail = row.original.tail
        return tail ? tail.tail_number : ""
      },
    },
    // {
    //   accessorKey: "recurring",
    //   header: () => (
    //     <TableHeaderWithTooltip
    //       header="Recurring"
    //       tooltipId="flight-master-destination"
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     const recurring = row.original.recurring
    //     return recurring ? recurring: ""
    //   },
    // },
    {
      accessorKey: "aircraft.aircraft_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Aircraft Type"
          tooltipId="flight-master-aircraft-type"
        />
      ),
      cell: ({ row }) => {
        if (!row.original.aircraft)
          return <span className="text-destructive">(deleted)</span>
        const deleted = [
          row.original.aircraft?.manufacturer?.is_deleted,
          row.original.aircraft?.aircraft_type?.is_deleted,
          row.original.aircraft?.version?.is_deleted,
        ].some((isDeleted) => !!isDeleted || isDeleted === undefined) ? (
          <span className="text-destructive"> (deleted)</span>
        ) : (
          ""
        )
        const label = (
          <span>
            {[
              row.original.aircraft?.manufacturer?.name,
              row.original.aircraft?.aircraft_type?.name,
              row.original.aircraft?.version?.version,
            ].join(" ")}
          </span>
        )
        return (
          <p>
            {label} {deleted}
          </p>
        )
      },
    },

    {
      accessorKey: "source.name",
      header: () => (
        <TableHeaderWithTooltip
          header="From"
          tooltipId="flight-master-source"
        />
      ),
      cell: ({ row }) => {
        const source = row.original.source
        return source ? source.name : ""
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "destination.name",
      header: () => (
        <TableHeaderWithTooltip
          header="To"
          tooltipId="flight-master-destination"
        />
      ),
      cell: ({ row }) => {
        const destination = row.original.destination
        return destination ? destination.name : ""
      },
    },

    {
      accessorKey: "flight_type.value",
      header: () => (
        <TableHeaderWithTooltip
          header="Flight Type"
          tooltipId="flight-master-flight-type"
        />
      ),
      cell: ({ row }) => {
        const flightType = row.original.flight_type
        return flightType ? flightType.value : ""
      },
    },
    {
      accessorKey: "status.value",
      header: () => (
        <TableHeaderWithTooltip
          header="Status"
          tooltipId="flight-master-status"
        />
      ),
      cell: ({ row }) => {
        const status = row.original.status
        return status ? status.value : ""
      },
    },
    {
      accessorKey: "entry_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Entry Type"
          tooltipId="flight-master-entry-type"
        />
      ),
      cell: ({ row }) => "Manual",
    },

    {
      accessorKey: "sector.value",
      header: () => (
        <TableHeaderWithTooltip
          header="Sector"
          tooltipId="flight-master-sector"
        />
      ),
      cell: ({ row }) => {
        const sector = row.original.sector
        return sector ? sector.value : ""
      },
    },
    {
      accessorKey: "created_at",
      header: () => (
        <TableHeaderWithTooltip
          header="Created At"
          tooltipId="flight-master-created-at"
        />
      ),
      cell: ({ row }) => {
        const date = row.original.created_at || ""
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
    },
    {
      accessorKey: "updated_at",
      header: () => (
        <TableHeaderWithTooltip
          header="Updated At"
          tooltipId="flight-master-updated-at"
        />
      ),
      cell: ({ row }) => {
        const date = row.original.updated_at || ""
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
    },
    {
      accessorKey: "updated_by",
      header: () => (
        <TableHeaderWithTooltip
          header="Updated By"
          tooltipId="flight-master-updated-by"
        />
      ),
      cell: ({ row }) => "Jeff Pan",
    },
  ]
}

export const useListViewColumns = (
  onRowClick: (data: Flight) => void,
  onDelete: (data: Flight) => void
): ColumnDef<Flight>[] => {
  return [
    {
      accessorKey: "from_date",
      header: () => (
        <TableHeaderWithTooltip header="Date" tooltipId="next_at" />
      ),
      cell: ({ row }) => {
        const date = row.original.from_date || ""
        return moment(date).format("YYYY-MM-DD")
      },
    },
    {
      accessorKey: "day_of_week",
      header: () => (
        <TableHeaderWithTooltip header="Day Of week" tooltipId="day-of-week" />
      ),
      cell: ({ row }) => {
        const date = row.original.from_date || ""
        return moment(date).format("ddd")
      },
    },
    {
      accessorKey: "departure_d",
      header: () => (
        <TableHeaderWithTooltip
          header="Departure Time"
          tooltipId="departure-time"
        />
      ),
      cell: ({ row }) => {
        const departure_h = row.original.departure_h
        const departure_m = row.original.departure_m
        const today = new Date()
        today.setHours(departure_h)
        today.setMinutes(departure_m)
        return moment(today).format("HH:mm")
      },
    },
    {
      accessorKey: "to_date",
      header: () => (
        <TableHeaderWithTooltip
          header="Arrival"
          tooltipId="flight-master-sta"
        />
      ),
      cell: ({ row }) => {
        const date = row.original.to_date || ""
        return moment(date).format("YYYY-MM-DD")
      },
    },
    {
      accessorKey: "arrival_d",
      header: () => (
        <TableHeaderWithTooltip
          header="Arrival Time"
          tooltipId="arrival-time"
        />
      ),
      cell: ({ row }) => {
        const arrival_h = row.original.arrival_h
        const arrival_m = row.original.arrival_m
        const today = new Date()
        today.setHours(arrival_h)
        today.setMinutes(arrival_m)
        return moment(today).format("HH:mm")
      },
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
      accessorKey: "tail.tail_number",
      header: () => (
        <TableHeaderWithTooltip
          header="Tail No."
          tooltipId="flight-master-tail-no"
        />
      ),
      cell: ({ row }) => {
        const tail = row.original.tail
        return tail ? tail.tail_number : ""
      },
    },
    // {
    //   accessorKey: "recurring",
    //   header: () => (
    //     <TableHeaderWithTooltip
    //       header="Recurring"
    //       tooltipId="flight-master-destination"
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     const recurring = row.original.recurring
    //     return recurring ? recurring: ""
    //   },
    // },
    {
      accessorKey: "aircraft.aircraft_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Aircraft Type"
          tooltipId="flight-master-aircraft-type"
        />
      ),
      cell: ({ row }) => {
        if (!row.original.aircraft)
          return <span className="text-destructive">(deleted)</span>
        const deleted = [
          row.original.aircraft?.manufacturer?.is_deleted,
          row.original.aircraft?.aircraft_type?.is_deleted,
          row.original.aircraft?.version?.is_deleted,
        ].some((isDeleted) => !!isDeleted || isDeleted === undefined) ? (
          <span className="text-destructive"> (deleted)</span>
        ) : (
          ""
        )
        const label = (
          <span>
            {[
              row.original.aircraft?.manufacturer?.name,
              row.original.aircraft?.aircraft_type?.name,
              row.original.aircraft?.version?.version,
            ].join(" ")}
          </span>
        )
        return (
          <p>
            {label} {deleted}
          </p>
        )
      },
    },

    {
      accessorKey: "source.name",
      header: () => (
        <TableHeaderWithTooltip
          header="From"
          tooltipId="flight-master-source"
        />
      ),
      cell: ({ row }) => {
        const source = row.original.source
        return source ? source.name : ""
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "destination.name",
      header: () => (
        <TableHeaderWithTooltip
          header="To"
          tooltipId="flight-master-destination"
        />
      ),
      cell: ({ row }) => {
        const destination = row.original.destination
        return destination ? destination.name : ""
      },
    },

    {
      accessorKey: "flight_type.value",
      header: () => (
        <TableHeaderWithTooltip
          header="Flight Type"
          tooltipId="flight-master-flight-type"
        />
      ),
      cell: ({ row }) => {
        const flightType = row.original.flight_type
        return flightType ? flightType.value : ""
      },
    },
    {
      accessorKey: "status.value",
      header: () => (
        <TableHeaderWithTooltip
          header="Status"
          tooltipId="flight-master-status"
        />
      ),
      cell: ({ row }) => {
        const status = row.original.status
        return status ? status.value : ""
      },
    },
    {
      accessorKey: "entry_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Entry Type"
          tooltipId="flight-master-entry-type"
        />
      ),
      cell: ({ row }) => "Manual",
    },

    {
      accessorKey: "sector.value",
      header: () => (
        <TableHeaderWithTooltip
          header="Sector"
          tooltipId="flight-master-sector"
        />
      ),
      cell: ({ row }) => {
        const sector = row.original.sector
        return sector ? sector.value : ""
      },
    },
    {
      accessorKey: "created_at",
      header: () => (
        <TableHeaderWithTooltip
          header="Created At"
          tooltipId="flight-master-created-at"
        />
      ),
      cell: ({ row }) => {
        const date = row.original.created_at || ""
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
    },
    {
      accessorKey: "updated_at",
      header: () => (
        <TableHeaderWithTooltip
          header="Updated At"
          tooltipId="flight-master-updated-at"
        />
      ),
      cell: ({ row }) => {
        const date = row.original.updated_at || ""
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
    },
    {
      accessorKey: "updated_by",
      header: () => (
        <TableHeaderWithTooltip
          header="Updated By"
          tooltipId="flight-master-updated-by"
        />
      ),
      cell: ({ row }) => "Jeff Pan",
    },
  ]
}
