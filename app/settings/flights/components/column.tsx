"use client"

import { useCallback, useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"
import { useForm } from "react-hook-form"

import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { Form } from "@/components/ui/form"
import { TableHeaderWithTooltip } from "@/components/ui/table"
import { Combobox } from "@/components/form/combobox"
import { SelectOptions } from "@/components/form/InputSwitch"

import TailNumberForm from "./forms/tail-number-dropdown"

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
      accessorKey: "day",
      header: () => (
        <TableHeaderWithTooltip header="Day" tooltipId="day-of-week" />
      ),
      cell: ({ row }) => {
        const date = row.original.from_date || ""
        return moment(date).format("ddd")
      },
    },
    {
      accessorKey: "flight_no",
      header: () => (
        <TableHeaderWithTooltip
          header="Flight"
          tooltipId="flight-master-flight-no"
        />
      ),
    },
    {
      accessorKey: "departure_d",
      header: () => (
        <TableHeaderWithTooltip header="Departure" tooltipId="departure-time" />
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
      accessorKey: "source.name",
      header: () => (
        <TableHeaderWithTooltip
          header="Origin "
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
      accessorKey: "arrival_d",
      header: () => (
        <TableHeaderWithTooltip header="Arrival" tooltipId="arrival-time" />
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
      accessorKey: "destination.name",
      header: () => (
        <TableHeaderWithTooltip
          header="Destination"
          tooltipId="flight-master-destination"
        />
      ),
      cell: ({ row }) => {
        const destination = row.original.destination
        return destination ? destination.name : ""
      },
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

type ListViewProps = {
  onRowClick: (data: Flight) => void
  onDelete: (data: Flight) => void
  aircraftOptions: SelectOptions
  onChangeTailNumber: (data: CreateFlightMasterPayload) => void
}

export const useListViewColumns = (
  props: ListViewProps
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
      accessorKey: "day",
      header: () => (
        <TableHeaderWithTooltip header="Day" tooltipId="day-of-week" />
      ),
      cell: ({ row }) => {
        const date = row.original.from_date || ""
        return moment(date).format("ddd")
      },
    },
    {
      accessorKey: "flight_no",
      header: () => (
        <TableHeaderWithTooltip
          header="Flight"
          tooltipId="flight-master-flight-no"
        />
      ),
    },
    {
      accessorKey: "departure_d",
      header: () => (
        <TableHeaderWithTooltip header="Departure" tooltipId="departure-time" />
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
      accessorKey: "source.name",
      header: () => (
        <TableHeaderWithTooltip
          header="Origin"
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
      accessorKey: "arrival_d",
      header: () => (
        <TableHeaderWithTooltip header="Arrival" tooltipId="arrival-time" />
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
      accessorKey: "destination.name",
      header: () => (
        <TableHeaderWithTooltip
          header="Destination"
          tooltipId="flight-master-destination"
        />
      ),
      cell: ({ row }) => {
        const destination = row.original.destination
        return destination ? destination.name : ""
      },
    },
    {
      accessorKey: "tail.tail_number",
      size: 400,
      header: () => (
        <TableHeaderWithTooltip
          header="Tail Number          "
          tooltipId="flight-master-tail-no"
        />
      ),
      cell: ({ row }) => {
        return (
          <TailNumberForm
            row={row}
            aircraftOptions={props.aircraftOptions}
            onChangeTailNumber={props.onChangeTailNumber}
          />
        )
      },
    },
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
      accessorKey: "aircraft.passenger_capacity",
      header: () => (
        <TableHeaderWithTooltip
          header="Passenger Capacity"
          tooltipId="flight-master-flight-type"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.aircraft
        return aircraft ? aircraft.passenger_capacity : ""
      },
    },
    {
      accessorKey: "aircraft.landing_weight",
      header: () => (
        <TableHeaderWithTooltip
          header="Landing Wt"
          tooltipId="flights-landing-weight"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.aircraft
        return aircraft ? aircraft.landing_weight : ""
      },
    },
    {
      accessorKey: "aircraft.cargo_capacity",
      header: () => (
        <TableHeaderWithTooltip
          header="Cargo Cap"
          tooltipId="flights-cargo-capacity"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.aircraft
        return aircraft ? aircraft.cargo_capacity : ""
      },
    },
    {
      accessorKey: "aircraft.mtow",
      header: () => (
        <TableHeaderWithTooltip
          header="MTOW"
          tooltipId="flights-mtow"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.aircraft
        return aircraft ? aircraft.mtow : ""
      },
    },
    {
      accessorKey: "aircraft.max_zero_fuel_weight",
      header: () => (
        <TableHeaderWithTooltip
          header="Max Zero Fuel Wt"
          tooltipId="flight-master-flight-type"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.aircraft
        return aircraft ? aircraft.mtow : ""
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
