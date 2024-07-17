"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ColumnDef, PaginationState } from "@tanstack/react-table"
import * as changeCase from "change-case"
import moment from "moment"
import { useFieldArray, useForm } from "react-hook-form"

import { Flight } from "@/types/flight-master/flight-master"
import { useFlightList } from "@/lib/hooks/flight-master/flight-master"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/data-table/data-table"
import Modal from "@/components/modal/modal"
import { useRecurringFlightsColumns } from "@/app/belli/flight-schedule-editor/components/column"

interface FlightsActualInformation {
  detail: string
  actual?: string
  maximum: string
}

type FlightWithActualInformation = Flight & {
  actual_mtow: string
  actual_landing_weight: string
  actual_cargo_capacity: string
}

export default function FlightsDashboardPage() {
  const [selectedFlight, setSelectedFlight] =
    useState<FlightWithActualInformation | null>(null)

  // Temporary solution to display the actual information, will be replaced with API call
  const [displayedFlightsData, setDisplayedFlightsData] = useState<
    FlightWithActualInformation[]
  >([])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const paginationDetails = useMemo(
    () => ({
      page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }),
    [pagination]
  )

  const { data: flights, isLoading } = useFlightList(paginationDetails)

  const flightsData = flights?.data || []

  useEffect(() => {
    if (flightsData.length) {
      const adjustedFlightsData = flightsData.map((flight) => {
        return {
          ...flight,
          actual_mtow: "",
          actual_landing_weight: "",
          actual_cargo_capacity: "",
        }
      })

      setDisplayedFlightsData(adjustedFlightsData)
    }
  }, [flightsData])

  const actualInformationForm = useForm<{ infos: FlightsActualInformation[] }>({
    defaultValues: {
      infos: [{ detail: "", actual: "", maximum: "" }],
    },
  })

  const actualInformationFieldArray = useFieldArray({
    control: actualInformationForm.control,
    name: "infos",
  })

  const columns = useRecurringFlightsColumns(
    (data) => {},
    (data) => {}
  )

  const displayedFlightsColumns: ColumnDef<FlightWithActualInformation>[] = [
    ...(columns as ColumnDef<FlightWithActualInformation>[]),
    {
      accessorKey: "aircraft.mtow",
      header: "MTOW",
      cell: ({ row }) => {
        return (
          <div className="flex w-full">
            <span className="w-full text-right">
              {row.original.actual_mtow || "-"} /{" "}
              {row.original?.aircraft?.mtow || "-"}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "aircraft.landing_weight",
      header: "Landing Weight",
      cell: ({ row }) => {
        return (
          <div className="flex w-full">
            <span className="w-full text-right">
              {row.original.actual_landing_weight || "-"} /{" "}
              {row.original?.aircraft?.landing_weight || "-"}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "aircraft.cargo_capacity",
      header: "Cargo Capacity",
      cell: ({ row }) => {
        return (
          <div className="flex w-full">
            <span className="w-full text-right">
              {row.original.actual_cargo_capacity || "-"} /{" "}
              {row.original?.aircraft?.cargo_capacity || "-"}
            </span>
          </div>
        )
      },
    },
  ]

  function handleRowClick(flight: FlightWithActualInformation) {
    setSelectedFlight(flight)
  }

  const selectedFlightColumn = useMemo<ColumnDef<FlightsActualInformation>[]>(
    () => [
      {
        header: "Details",
        accessorKey: "detail",
      },
      {
        header: "Actual",
        accessorKey: "actual",
        cell: ({ row }) => {
          return (
            <Input
              {...actualInformationForm.register(`infos.${row.index}.actual`)}
              type="number"
              className="h-9 py-0.5"
            />
          )
        },
      },
      {
        header: "Maximum",
        accessorKey: "maximum",
      },
    ],
    [actualInformationForm.getValues().infos]
  )

  useEffect(() => {
    if (selectedFlight) {
      actualInformationForm.reset({
        infos: [
          {
            detail: "MTOW",
            actual: selectedFlight?.actual_mtow || "",
            maximum: selectedFlight?.aircraft?.mtow || "-",
          },
          {
            detail: "Landing Weight",
            actual: selectedFlight?.actual_landing_weight || "",
            maximum: selectedFlight?.aircraft?.landing_weight || "-",
          },
          {
            detail: "Cargo Capacity",
            actual: selectedFlight?.actual_cargo_capacity || "",
            maximum: selectedFlight?.aircraft?.cargo_capacity || "-",
          },
        ],
      })
    }
  }, [selectedFlight, actualInformationForm])

  function handleSaveActualInformation(data: FlightsActualInformation[]) {
    // Temporary solution to update the actual information, will be replaced with API call
    setDisplayedFlightsData((prev) =>
      prev.map((flight) => {
        if (flight.ID === selectedFlight?.ID) {
          return {
            ...flight,
            actual_mtow: data[0].actual ?? "",
            actual_landing_weight: data[1].actual ?? "",
            actual_cargo_capacity: data[2].actual ?? "",
          }
        }

        return flight
      })
    )
  }

  const selectedFlightModalTitle = `${selectedFlight?.flight_no}, ${selectedFlight?.source.name} - ${selectedFlight?.destination.name}`
  const selectedFlightModalDescription = `${moment(selectedFlight?.from_date).format("ddd, YYYY-MM-DD")} to ${moment(selectedFlight?.to_date).format("ddd, YYYY-MM-DD")} (${selectedFlight?.tail?.tail_number || ""}, ${selectedFlight?.aircraft?.aircraft_type?.name || ""})`

  return (
    <div>
      <Modal
        title={selectedFlightModalTitle}
        description={selectedFlightModalDescription}
        open={!!selectedFlight}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedFlight(null)
          } else {
            setSelectedFlight(selectedFlight)
          }
        }}
        onSave={() => {
          handleSaveActualInformation(actualInformationForm.getValues().infos)
          setSelectedFlight(null)
        }}
      >
        <DataTable
          columns={selectedFlightColumn}
          data={actualInformationForm.getValues().infos ?? []}
          hidePagination
          hideToolbar
          className="mt-2"
        />
      </Modal>
      <DataTable
        initialPinning={{
          left: [],
          right: ["actions"],
        }}
        columns={displayedFlightsColumns}
        initialVisibility={{
          updated_at: false,
          updated_by: false,
          created_at: false,
          sector: false,
        }}
        data={displayedFlightsData}
        pageCount={isLoading ? 1 : flights?.total_pages}
        manualPagination={true}
        onRowClick={handleRowClick}
        tableState={tableState}
        className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
        menuId="flight-dashboard"
        showToolbarOnlyOnHover={true}
      />
    </div>
  )
}
