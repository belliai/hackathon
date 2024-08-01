"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ColumnDef, PaginationState } from "@tanstack/react-table"
import moment from "moment"
import { useFieldArray, useForm } from "react-hook-form"
import { useReadLocalStorage } from "usehooks-ts"

import { Aircraft } from "@/types/aircraft/aircraft"
import { Flight } from "@/types/flight-master/flight-master"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import {
  useFlightList,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { Input } from "@/components/ui/input"
import { TableHeaderWithTooltip } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DataTable } from "@/components/data-table/data-table"
import Modal from "@/components/modal/modal"
import { DisplayOption } from "@/app/data-fields/display"
import { useListViewColumns } from "@/app/settings/flights/components/column"
import { onExport } from "@/lib/utils/export"
import SettingMenuToggle from "@/components/setting-menu-toggle/setting-menu-toggle"

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

const SETTING_OPTIONS = [
  {
    label: 'Aircraft Types',
    link: '/settings/aircrafts?tab=aircraft-types',
  },
  {
    label: 'Tail Numbers',
    link: '/settings/aircrafts?tab=tail-numbers',
  },
  {
    label: 'Flight Scheduler',
    link: '/settings/flights',
  },
  {
    label: 'Custom Data Fields: Aircrafts',
    link: '',
    child: [
      {
        label: 'Aircrafts',
        link: '/data-fields/aircrafts?tab=aircrafts',
      },
      {
        label: 'Measurement Units',
        link: '/data-fields/aircrafts?tab=measurement-units',
      },
    ]
  },
  {
    label: 'Custom Data Fields: Flights',
    link: '',
    child: [
      {
        label: 'Display',
        link: '/data-fields/flights?tab=display',
      },
      {
        label: 'Default Timezone',
        link: '/data-fields/flights?tab=default-timezone',
      },
    ]
  },
]

export default function FlightsDashboardPage() {
  const displayOption: DisplayOption =
    useReadLocalStorage("display_option", {
      initializeWithValue: false, // For SSR compatibility
    }) || "numbers"

  const [selectedFlight, setSelectedFlight] =
    useState<FlightWithActualInformation | null>(null)

  // Temporary solution to display the actual information, will be replaced with API call
  const [displayedFlightsData, setDisplayedFlightsData] = useState<
    FlightWithActualInformation[]
  >([])

  const { mutateAsync: updateFlight, isPending: isPendingUpdate } =
    useUpdateFlight()

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

  const columns = useListViewColumns({
    aircraftOptions: aircraftTailNumbers || [],
    onChangeTailNumber: async (data) => {
      if (!data) return
      const { ID, ...rest } = data
      if (ID) await updateFlight({ ...rest, id: ID })
    },
  })

  const displayedFlightsColumns: ColumnDef<FlightWithActualInformation>[] = [
    ...(columns.slice(0, 2) as ColumnDef<FlightWithActualInformation>[]),
    {
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

  function handleRowClick(flight: FlightWithActualInformation) {
    actualInformationForm.reset({
      infos: [
        {
          detail: "MTOW",
          actual: flight?.actual_mtow || "",
          maximum: flight?.tail?.mtow || "-",
        },
        {
          detail: "Landing Weight",
          actual: flight?.actual_landing_weight || "",
          maximum: flight?.tail?.landing_weight || "-",
        },
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
            actual_mtow: data[0].actual ?? "",
            actual_landing_weight: data[1].actual ?? "",
            actual_cargo_capacity: data[2].actual ?? "",
          }
        }

        return flight
      })
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
        isCanExport={true}
        onExport={() =>
          onExport({ data: displayedFlightsData, filename: "DashboardFlightData" })
        }
        extraLeftComponents={<SettingMenuToggle settingOptions={SETTING_OPTIONS} />}
      />
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

      return (
        <div className="flex w-fit shrink-0 items-center gap-2">
          <span className="w-14 whitespace-nowrap rounded-sm bg-button-primary px-1 py-0.5 text-center text-sm text-white">
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
