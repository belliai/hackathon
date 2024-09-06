import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import moment from "moment"

import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { TableHeaderWithTooltip } from "@/components/ui/table"
import { SelectOptions } from "@/components/form/InputSwitch"

import { TableCellDropdown } from "./forms/table-cell-dropdown"
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

type ListViewProps = {
  onRowClick?: (data: Flight) => void
  onDelete?: (data: Flight) => void
  aircraftOptions?: SelectOptions
  onChangeTailNumber?: (data: CreateFlightMasterPayload | null) => void
  statusOptions?: SelectOptions
  onChangeStatus?: ({
    statusId,
    id,
  }: {
    statusId: string
    id: string
  }) => Promise<void>
}

function convertToTime({
  hour,
  minute,
  period,
}: {
  hour: number
  minute: number
  period: string
}) {
  const time = moment(
    `${hour}:${String(minute).length < 2 ? `0${minute}` : minute} ${period}`,
    "hh:mm A"
  )

  return time
}

export const listViewColumns = (props: ListViewProps): ColumnDef<Flight>[] => {
  return [
    {
      id: "Day", // id is used to match the column_name from the columns configuration endpoint in the API
      accessorKey: "day",
      header: () => (
        <TableHeaderWithTooltip header="Day" tooltipId="day-of-week" />
      ),
      cell: ({ row }) => {
        const date = row.original.departure_date || ""
        return moment(date).format("ddd")
      },
    },
    {
      id: "Flight",
      accessorKey: "flight_number",
      header: () => (
        <TableHeaderWithTooltip
          header="Flight"
          tooltipId="flight-master-flight-no"
        />
      ),
      meta: {
        columnType: "profile",
      },
    },
    {
      id: "Departure",
      accessorKey: "departure_hour",
      sortingFn: (rowA, rowB, columnId) => {
        const timeA = convertToTime({
          hour: rowA.original.departure_hour,
          minute: rowA.original.departure_minute,
          period: rowA.original.departure_period,
        })
        const timeB = convertToTime({
          hour: rowB.original.departure_hour,
          minute: rowB.original.departure_minute,
          period: rowB.original.departure_period,
        })

        return timeA.toDate().getTime() - timeB.toDate().getTime()
      },
      header: () => (
        <TableHeaderWithTooltip header="Departure" tooltipId="departure-time" />
      ),
      size: 200,
      cell: ({ row }) => {
        const departurTime = convertToTime({
          hour: row.original.departure_hour,
          minute: row.original.departure_minute,
          period: row.original.departure_period,
        })

        return departurTime.format("DD/MM/YYYY HH:mm")
      },
    },
    {
      id: "Landing Wt", // We set the id to Landing Wt because currently the "Status" column doesn't exist in the API (should be replaced later)
      accessorKey: "status",
      header: () => (
        <TableHeaderWithTooltip header="Status" tooltipId="flight-status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <TableCellDropdown
            defaultValue={status.id}
            name="status"
            options={props.statusOptions || []}
            onChangeSelect={async (data: any) => {
              await props.onChangeStatus?.({
                statusId: data.status,
                id: row.original.id,
              })
            }}
          />
        )
      },
    },
    {
      id: "Origin",
      accessorKey: "origin.name",
      header: () => (
        <TableHeaderWithTooltip
          header="Origin"
          tooltipId="flight-master-source"
        />
      ),
      cell: ({ row }) => {
        const source = row.original.origin
        return source ? source.name : ""
      },
      filterFn: "includesString",
    },
    {
      id: "Arrival",
      accessorKey: "arrival_time",
      sortingFn: (rowA, rowB, columnId) => {
        const timeA = moment(
          `${rowA.original.arrival_date} ${rowA.original.arrival_time}`,
          "YYYY-MM-DD hh:mma"
        )
          .toDate()
          .getTime()
        const timeB = moment(
          `${rowB.original.arrival_date} ${rowB.original.arrival_time}`,
          "YYYY-MM-DD hh:mma"
        )
          .toDate()
          .getTime()

        return timeA - timeB
      },
      header: () => (
        <TableHeaderWithTooltip header="Arrival" tooltipId="arrival-time" />
      ),
      cell: ({ row }) => {
        const time = moment(
          `${row.original.arrival_date} ${row.original.arrival_time}`,
          "YYYY-MM-DD hh:mma"
        ).format("DD/MM/YYYY HH:mm")
        return time ? time : ""
      },
    },
    {
      id: "Destination",
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
      id: "Flight Type",
      accessorKey: "duration",
      accessorFn: (row) =>
        `${row.flight_duration_hour}h ${row.flight_duration_minute}m`,
      header: () => (
        <TableHeaderWithTooltip
          header="Duration"
          tooltipId="flight-master-duration"
        />
      ),
    },
    {
      id: "Tail Number",
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
            aircraftOptions={props.aircraftOptions || []}
            onChangeTailNumber={props.onChangeTailNumber}
          />
        )
      },
    },
    {
      id: "Aircraft Type",
      accessorKey: "aircraft.aircraft_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Aircraft Type"
          tooltipId="flight-master-aircraft-type"
        />
      ),
      cell: ({ row }) => {
        if (!row.original.tail)
          return <span className="text-destructive">(deleted)</span>
        const deleted = [
          row.original.tail?.manufacturer?.is_deleted,
          row.original.tail?.aircraft_type?.is_deleted,
          row.original.tail?.version?.is_deleted,
        ].some((isDeleted) => !!isDeleted || isDeleted === undefined) ? (
          <span className="text-destructive"> (deleted)</span>
        ) : (
          ""
        )
        const label = (
          <span>
            {[
              row.original.tail?.manufacturer?.name,
              row.original.tail?.aircraft_type?.name,
              row.original.tail?.version?.version,
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
      id: "Passenger Capacity",
      accessorKey: "aircraft.passenger_capacity",
      header: () => (
        <TableHeaderWithTooltip
          header="Passenger Capacity"
          tooltipId="flight-master-flight-type"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.tail
        return aircraft ? aircraft.passenger_capacity : ""
      },
    },
    {
      id: "Fuel Capacity",
      accessorKey: "aircraft.landing_weight",
      header: () => (
        <TableHeaderWithTooltip
          header="Landing Wt"
          tooltipId="flights-landing-weight"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.tail
        return aircraft ? aircraft.landing_weight : ""
      },
    },
    {
      id: "Cargo Cap",
      accessorKey: "aircraft.cargo_capacity",
      header: () => (
        <TableHeaderWithTooltip
          header="Cargo Cap"
          tooltipId="flights-cargo-capacity"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.tail
        return aircraft ? aircraft.cargo_capacity : ""
      },
    },
    {
      id: "MTOW",
      accessorKey: "aircraft.mtow",
      header: () => (
        <TableHeaderWithTooltip header="MTOW" tooltipId="flights-mtow" />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.tail
        return aircraft ? aircraft.mtow : ""
      },
    },
    {
      id: "Max Zero Fuel Wt",
      accessorKey: "aircraft.max_zero_fuel_weight",
      header: () => (
        <TableHeaderWithTooltip
          header="Max Zero Fuel Wt"
          tooltipId="flight-master-flight-type"
        />
      ),
      cell: ({ row }) => {
        const aircraft = row.original.tail
        return aircraft ? aircraft.mtow : ""
      },
    },
    {
      id: "Max Landing Wt",
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

export const useRecurringColumns = (
  props: ListViewProps
): ColumnDef<Flight>[] => {
  return [
    {
      id: "Schedule", // Used to match the column_name from the columns configuration endpoint in the API
      accessorKey: "schedule",
      header: () => (
        <TableHeaderWithTooltip header="Schedule" tooltipId="schedule" />
      ),
      cell: ({ row }) => {
        const date = row.original.departure_date || ""
        return "Daily"
      },
    },
    {
      id: "Departure Time",
      accessorKey: "departure_d",
      header: () => (
        <TableHeaderWithTooltip
          header="Departure Time"
          tooltipId="departure-time"
        />
      ),
      cell: ({ row }) => {
        const departure_h = row.original.departure_hour
        const departure_m = row.original.departure_minute
        const period = row.original.departure_period
        const today = new Date()
        today.setHours(departure_h)
        today.setMinutes(departure_m)
        const periodFormat = period.toLowerCase()
        const hoursFormat = moment(today).format("HH:mm")
        const abbr = row.original.origin?.timezone?.abbreviation
        const format_abbr =
          abbr.includes("+") || abbr.includes("-") ? "GMT" + abbr : abbr
        return `${hoursFormat}${periodFormat} ${format_abbr}`
      },
    },
    {
      id: "Arrival Time",
      accessorKey: "arrival_date",
      header: () => (
        <TableHeaderWithTooltip
          header="Arrival Time"
          tooltipId="arrival-time"
        />
      ),
      cell: ({ row }) => {
        const arrival_time = row.original.arrival_time
        const abbr = row.original.destination?.timezone?.abbreviation
        const format_abbr =
          abbr.includes("+") || abbr.includes("-") ? "GMT" + abbr : abbr
        return `${arrival_time} ${format_abbr}`
      },
    },
    {
      id: "Flight",
      accessorKey: "flight_number",
      header: () => (
        <TableHeaderWithTooltip
          header="Flight"
          tooltipId="flight-master-flight-no"
        />
      ),
    },
    {
      id: "Tail",
      accessorKey: "tail.tail_number",
      size: 400,
      header: () => (
        <TableHeaderWithTooltip
          header="Tail Number  "
          tooltipId="flight-master-tail-no"
        />
      ),
    },
    {
      id: "Aircraft",
      accessorKey: "tail.aircraft_type.name",
      size: 400,
      header: () => (
        <TableHeaderWithTooltip
          header="Aircraft         "
          tooltipId="flight-master-tail-no"
        />
      ),
      cell: ({ row }) => {
        const aircraft_type = row.original.tail.aircraft_type.name
        const aircraft_version = row.original.tail.version.version
        return `${aircraft_type}-${aircraft_version}`
      },
    },
    {
      id: "From",
      accessorKey: "origin.name",
      size: 400,
      header: () => (
        <TableHeaderWithTooltip header="From " tooltipId="origin-name" />
      ),
    },
    {
      id: "To",
      accessorKey: "destination.name",
      size: 400,
      header: () => (
        <TableHeaderWithTooltip header="To " tooltipId="destination-name" />
      ),
    },
    {
      id: "End Date",
      accessorKey: "destination.name",
      size: 400,
      header: () => (
        <TableHeaderWithTooltip
          header="End Date "
          tooltipId="destination-name"
        />
      ),
      cell: ({ row }) => {
        const arrival_date = row.original.arrival_date
        const departure_date = row.original.departure_date
        return `from ${format(new Date(departure_date), "MMM dd, yyyy")} to ${format(new Date(arrival_date), "MMM dd, yyyy")}`
      },
    },
  ]
}
