"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ColumnDef,
  PaginationState,
  Table,
  VisibilityState,
} from "@tanstack/react-table"
import { Loader } from "lucide-react"
import moment from "moment"
import { useFieldArray, useForm } from "react-hook-form"
import { useReadLocalStorage } from "usehooks-ts"

import { Aircraft } from "@/types/aircraft/aircraft"
import { Flight } from "@/types/flight-master/flight-master"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { useColumns } from "@/lib/hooks/columns"
import {
  useFlightList,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { onExport } from "@/lib/utils/export"
import { Input } from "@/components/ui/input"
import { TableHeaderWithTooltip } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import { ColumnsByVisibility } from "@/components/data-table/data-table-view-options"
import DataViews from "@/components/data-table/data-views"
import Modal from "@/components/modal/modal"
import CargoCapacityAreaChart from "@/app/dashboards/flights/components/cargo-capacity-area-chart"
import { DisplayOption } from "@/app/data-fields/display"
import { listViewColumns } from "@/app/settings/flights/components/column"

interface FlightsActualInformation {
  detail: string
  actual?: string
  maximum: string
}

type FlightWithActualInformation = Flight & {
  // actual_mtow: string
  // actual_landing_weight: string
  actual_cargo_capacity: string
}

const SETTING_OPTIONS = {
  width: "w-[234px]",
  data: [
    {
      label: "Aircraft Types",
      value: "/settings/aircrafts?tab=aircraft-types",
    },
    {
      label: "Tail Numbers",
      value: "/settings/aircrafts?tab=tail-numbers",
    },
    {
      label: "Flight Scheduler",
      value: "/settings/flights",
    },
    {
      label: "Custom Data Fields: Aircrafts",
      value: "",
      child: [
        {
          label: "Aircrafts",
          value: "/data-fields/aircrafts?tab=aircrafts",
        },
        {
          label: "Measurement Units",
          value: "/data-fields/aircrafts?tab=measurement-units",
        },
      ],
    },
    {
      label: "Custom Data Fields: Flights",
      value: "",
      child: [
        {
          label: "Display",
          value: "/data-fields/flights?tab=display",
        },
        {
          label: "Default Timezone",
          value: "/data-fields/flights?tab=default-timezone",
        },
      ],
    },
  ],
}

export default function FlightsDashboardPage() {
  const displayOption: DisplayOption =
    useReadLocalStorage("display_option", {
      initializeWithValue: false, // For SSR compatibility
    }) || "numbers-percentages"

  const [selectedFlight, setSelectedFlight] =
    useState<FlightWithActualInformation | null>(null)

  // Temporary solution to display the actual information, will be replaced with API call
  const [displayedFlightsData, setDisplayedFlightsData] = useState<
    FlightWithActualInformation[]
  >([])

  const { mutateAsync: updateFlight, isPending: isPendingUpdate } =
    useUpdateFlight()

  const { useGetColumns, useUpdateColumn, useResetColumns } = useColumns()
  const columnsQuery = useGetColumns("dashboard_flights")

  const { mutateAsync } = useUpdateColumn()
  const { mutateAsync: resetColumns } = useResetColumns("dashboard_flights")

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
      const adjustedFlightsData = flightsData.map(({ object }) => {
        return {
          ...object,
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

  const { data: aircraftsList, generateTailName } = useAircrafts({
    page: 1,
    page_size: 999,
  })

  const aircraftTailNumbers = aircraftsList?.data.flatMap((list) =>
    list.aircraft_tail_numbers
      .filter((tail) => !tail.is_deleted)
      .map((tail) => ({
        value: String(tail.id),
        label: generateTailName(list, tail.tail_number),
      }))
  )

  const columns = listViewColumns({
    aircraftOptions: aircraftTailNumbers || [],
    onChangeTailNumber: async (data) => {
      if (!data) return
      const { ID, ...rest } = data
      if (ID) await updateFlight({ ...rest, id: ID })
    },
  }).filter((c) => c.id !== "Tail Number") // Remove Tail Number column

  const displayedFlightsColumns: ColumnDef<FlightWithActualInformation>[] = [
    ...(columns.slice(0, 2) as ColumnDef<FlightWithActualInformation>[]),
    {
      id: "MTOW",
      accessorKey: "aircraft.cargo_capacity",
      header: () => (
        <TableHeaderWithTooltip
          header="Cargo Capacity"
          tooltipId="flights-cargo-capacity"
        />
      ),
      size: displayOption === "numbers-percentages" ? 240 : undefined,
      cell: ({ row }) => {
        return (
          <ActualInformation
            actual={Number(row.original.actual_cargo_capacity)}
            maximum={Number(row.original?.tail?.cargo_capacity)}
            displayOption={displayOption}
            unit={String(row.original.tail.volume_unit.symbol || "")}
          />
        )
      },
    },
    ...(columns.slice(2, 9) as ColumnDef<FlightWithActualInformation>[]),
  ]

  const allColumnsFromApi = columnsQuery.data?.visible_columns.concat(
    columnsQuery.data?.non_visible_columns
  )

  const reorderedDisplayedFlightsColumns = allColumnsFromApi
    ?.map((column) => {
      const foundColumn = displayedFlightsColumns.find(
        (displayedColumn) => displayedColumn.id === column.column_name
      )

      return foundColumn
    })
    .filter(Boolean) as ColumnDef<FlightWithActualInformation>[]

  function handleRowClick(flight: FlightWithActualInformation) {
    actualInformationForm.reset({
      infos: [
        {
          detail: "Cargo Capacity",
          actual: flight?.actual_cargo_capacity || "",
          maximum: flight?.tail?.cargo_capacity || "-",
        },
      ],
    })

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

  function handleSaveActualInformation(data: FlightsActualInformation[]) {
    // Temporary solution to update the actual information, will be replaced with API call
    setDisplayedFlightsData((prev) =>
      prev.map((flight) => {
        if (flight.id === selectedFlight?.id) {
          return {
            ...flight,
            actual_cargo_capacity: data[0].actual ?? "",
          }
        }

        return flight
      })
    )
  }

  const initialColumnOrder = useMemo<string[]>(() => {
    const initialOrder = allColumnsFromApi?.map((column) => column.column_name)

    return initialOrder || []
  }, [columnsQuery.data])

  const initialColumnVisibility = useMemo<VisibilityState>(() => {
    const initialNonVisibleColumns =
      columnsQuery.data?.non_visible_columns.reduce(
        (initialVisibility, column) => {
          return {
            ...initialVisibility,
            [column.column_name]: false,
          }
        },
        {}
      )

    return initialNonVisibleColumns as VisibilityState
  }, [columnsQuery.data?.non_visible_columns])

  async function handleOnOrderChange(newOrder: string[]) {
    const newVisibleColumns = newOrder
      .map((column, index) => {
        const columnData = columnsQuery.data?.visible_columns.find(
          (visibleColumn) => visibleColumn.column_name === column
        )

        if (!columnData) return

        return {
          id: columnData.id,
          visible: true,
          sort_order: index + 1,
          real_column_name: columnData.real_column_name,
        }
      })
      .filter(Boolean) as {
      id: string
      visible: boolean
      sort_order: number
      real_column_name: string
    }[]

    await mutateAsync(
      {
        columns: newVisibleColumns,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update columns",
          })
        },
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Columns updated successfully",
          })
        },
      }
    )
  }

  async function handleResetColumns() {
    await resetColumns(
      {
        tableName: "dashboard_flights",
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to reset columns",
          })
        },
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Columns reset successfully",
          })
        },
      }
    )
  }

  async function handleOnVisibilityChange(
    columnsByvisibility: ColumnsByVisibility<FlightWithActualInformation>
  ) {
    const allColumnsFromApi = columnsQuery.data?.visible_columns.concat(
      columnsQuery.data?.non_visible_columns
    )

    const newColumnsPayload = allColumnsFromApi?.map((column, index) => {
      const hiddenColumn = columnsByvisibility.hidden.find(
        (hiddenColumn) => hiddenColumn.id === column.column_name
      )

      const visibleColumn = columnsByvisibility.active.find(
        (visibleColumn) => visibleColumn.id === column.column_name
      )

      return {
        id: column.id,
        sort_order: index + 1,
        visible: !!visibleColumn && !hiddenColumn,
      }
    }) as {
      id: string
      sort_order: number
      visible: boolean
      real_column_name: string
    }[]

    await mutateAsync(
      {
        columns: newColumnsPayload,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update columns visibility",
          })
        },
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Columns visibility updated successfully",
          })
        },
      }
    )
  }

  const selectedFlightModalTitle = `${selectedFlight?.flight_number}, ${selectedFlight?.origin.name} - ${selectedFlight?.destination.name}`
  const selectedFlightModalDescription = `${moment(selectedFlight?.departure_date).format("ddd, YYYY-MM-DD")} to ${moment(selectedFlight?.departure_date).format("ddd, YYYY-MM-DD")} (${selectedFlight?.tail?.tail_number || ""}, ${selectedFlight?.tail?.aircraft_type?.name || ""})`

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
        <div className="flex w-full max-w-full flex-col gap-8">
          <DataTable
            columns={selectedFlightColumn}
            data={actualInformationForm.getValues().infos ?? []}
            hidePagination
            hideToolbar
            className="mt-2"
          />
          <CargoCapacityAreaChart />
        </div>
      </Modal>
      {isLoading || columnsQuery.isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Loader className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      ) : (
        <DataViews
          onResetColumns={handleResetColumns}
          onOrderChange={handleOnOrderChange}
          onVisibilityChange={handleOnVisibilityChange}
          initialColumnOrder={initialColumnOrder}
          initialPinning={{
            left: [],
            right: ["actions"],
          }}
          columns={reorderedDisplayedFlightsColumns}
          initialVisibility={initialColumnVisibility}
          data={displayedFlightsData || []}
          pageCount={isLoading ? 1 : flights?.total_pages}
          manualPagination={true}
          onRowClick={handleRowClick}
          tableState={tableState}
          className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
          menuId="flight-dashboard"
          showToolbarOnlyOnHover={true}
          isCanExport={true}
          onExport={() =>
            onExport({
              data: displayedFlightsData,
              filename: "DashboardFlightData",
            })
          }
          // settingOptions={SETTING_OPTIONS}
        />
      )}
    </div>
  )
}

function ActualInformation({
  actual,
  maximum,
  displayOption,
  unit,
}: {
  actual: number
  maximum: number
  displayOption: DisplayOption
  unit?: string
}) {
  switch (displayOption) {
    case "numbers":
      return (
        <span>
          {actual ? actual.toLocaleString() : "-"} /{" "}
          {maximum ? maximum.toLocaleString() : "-"} {unit || ""}
        </span>
      )
    case "percentage":
      const percentage = ((actual / maximum) * 100).toFixed(1)

      if (isNaN(Number(percentage))) {
        return <span>-</span>
      }

      return (
        <div className="flex w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="w-14 whitespace-nowrap rounded-sm bg-button-primary px-1 py-0.5 text-center text-sm text-white">
                {percentage}%
              </span>
            </TooltipTrigger>
            <TooltipContent className="border bg-card text-foreground">
              <span>
                {actual.toLocaleString()} / {maximum.toLocaleString()}{" "}
                {unit || ""}
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    case "numbers-percentages":
      const percentage2 = ((actual / maximum) * 100).toFixed(1)

      if (isNaN(Number(percentage2))) {
        return <span>-</span>
      }

      const backgroundAlphaDecimal = Number(percentage2) / 100
      const backgroundAlpha =
        backgroundAlphaDecimal < 0.1
          ? 0.1 // Set minimum alpha to 0.1
          : backgroundAlphaDecimal

      return (
        <div className="flex w-fit shrink-0 items-center gap-2">
          <span
            className="w-14 whitespace-nowrap rounded-sm bg-button-primary px-1 text-center text-sm text-white"
            style={{
              backgroundColor: `rgba(251, 87, 39, ${backgroundAlpha})`,
            }}
          >
            {percentage2}%
          </span>
          <span>
            {" "}
            {actual.toLocaleString()} / {maximum.toLocaleString()} {unit || ""}
          </span>
        </div>
      )
  }
}
