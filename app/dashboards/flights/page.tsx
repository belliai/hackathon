"use client"

import { useState } from "react"
import {
  tailNumberFormSchema,
  TailNumberFormValues,
} from "@/schemas/aircraft/tail-numbers"
import { zodResolver } from "@hookform/resolvers/zod"
import * as changeCase from "change-case"
import { format } from "date-fns"
import { DownloadIcon, Loader } from "lucide-react"
import moment from "moment"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { useReadLocalStorage } from "usehooks-ts"

import { Aircraft } from "@/types/aircraft/aircraft"
import { TailNumber } from "@/types/aircraft/tail-number"
import { Flight, Specification } from "@/types/flight-master/flight-master"
import {
  useFlightsDashboard,
  useFlightStatuses,
  usePartialUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { useGetOrganizationSettings } from "@/lib/hooks/settings/organization"
import { useTableState } from "@/lib/hooks/tables/table-state"
import { cn } from "@/lib/utils"
import { isVallidUuid } from "@/lib/utils/string-utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import CargoCapacityAreaChart from "@/components/charts/cargo-capacity-area-chart"
import { DataTable } from "@/components/data-table-v2/data-table"
import Modal from "@/components/modal/modal"
import { DisplayOption } from "@/app/data-fields/display"
import TailNumberForm from "@/app/settings/aircrafts/components/forms/aircraft-tail-number-form"
import { tailNumberFormDefaultValues } from "@/app/settings/aircrafts/constants"
import { TableCellDropdown } from "@/app/settings/flights/components/forms/table-cell-dropdown"
import NewFlightModal from "@/app/settings/flights/components/new-flight-form"

interface FlightsActualInformation {
  detail: string
  actual?: string
  maximum: string
}

export default function FlightsDashboardPage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  const [selectedFlightSetting, setSelectedFlightSetting] =
    useState<Flight | null>(null)

  const [currentOpenTailNumberModal, setCurrentOpenTailNumberModal] = useState<
    string | boolean
  >(false)

  const tailnumberForm = useForm<TailNumberFormValues>({
    resolver: zodResolver(tailNumberFormSchema),
    defaultValues: tailNumberFormDefaultValues,
  })

  const { data: cargoDisplaySettings } = useGetOrganizationSettings({
    sectionKey: "cargo",
  })
  const displayOption: DisplayOption =
    useReadLocalStorage("display_option", {
      initializeWithValue: false, // For SSR compatibility
    }) || "numbers-percentages"

  const { mutateAsync: partialUpdateFlight } = usePartialUpdateFlight()

  const { data: flightStatusesData } = useFlightStatuses()

  const flightStatusOptions = flightStatusesData?.map((status) => ({
    label: status.status,
    value: status.id,
  }))

  flightStatusOptions?.unshift({ label: "No Status", value: "" })

  const tableStateProps = useTableState({
    initialSort: { sort_by: "departure_date", sort_dir: "asc" },
  })

  const {
    data: flights,
    isLoading,
    refetch,
  } = useFlightsDashboard({
    ...tableStateProps.pagination,
    ...tableStateProps.sort,
    start_date: moment().format("YYYY-MM-DD"),
  })

  const actualInformationForm = useForm<{ infos: FlightsActualInformation[] }>({
    defaultValues: {
      infos: [{ detail: "", actual: "", maximum: "" }],
    },
  })

  function getVisibleCargoFields(visibilityConfig: any) {
    const visibleFields = Object.keys(visibilityConfig).filter(
      (key) => visibilityConfig[key]
    )

    return visibleFields
  }

  async function handleChangeStatus(data: { statusId: string; id: string }) {
    await partialUpdateFlight(
      {
        id: data.id,
        status_id: data.statusId,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update flight status",
            variant: "destructive",
          })
          refetch()
        },
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Flight status updated successfully",
          })
        },
      }
    )
  }

  function generateActualValues(visibleFields: string[], flight: Flight) {
    const visible = visibleFields
      .map((field) => {
        if (field.endsWith("_actual")) {
          const tailField = field.replace("_actual", "")

          return {
            detail: changeCase.capitalCase(field.replace("_actual", "")),
            actual:
              flight.specification?.[tailField as keyof Specification] || "",
            maximum: flight.tail?.[tailField as keyof TailNumber] || "",
          }
        }
      })
      .filter((field) => field && field.actual !== "visible")

    return visible as FlightsActualInformation[]
  }

  function handleRowClick(flight: Flight) {
    const visibleActualInformationFields = generateActualValues(
      getVisibleCargoFields(cargoDisplaySettings),
      flight
    )

    actualInformationForm.reset({
      infos: visibleActualInformationFields,
    })

    setSelectedFlight(flight)
  }

  async function handleSaveActualInformation(data: FlightsActualInformation[]) {
    if (!selectedFlight) {
      toast({
        title: "Error",
        description: "No flight selected",
      })

      return
    }

    const updatedActualInformation = data.reduce((acc, info) => {
      return {
        ...acc,
        [`${changeCase.snakeCase(info.detail)}`]: info.actual
          ? Number(info.actual)
          : 0,
      }
    }, {})

    await partialUpdateFlight(
      {
        ...updatedActualInformation,
        id: selectedFlight?.id,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update actual information",
          })
        },
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Actual information updated successfully",
          })
        },
      }
    )
  }

  const selectedFlightModalTitle = `${selectedFlight?.flight_number}, ${selectedFlight?.origin.name} - ${selectedFlight?.destination.name}`
  const selectedFlightModalDescription = `${moment(selectedFlight?.departure_date).format("ddd, YYYY-MM-DD")} to ${moment(selectedFlight?.departure_date).format("ddd, YYYY-MM-DD")} (${selectedFlight?.tail?.tail_number || ""}, ${selectedFlight?.tail?.aircraft_type?.name || ""})`

  const handleTailNumberRowClick = (tailNumber: TailNumber) => {
    tailnumberForm.reset({
      ...tailNumber,
      body_type_id: isVallidUuid(tailNumber.body_type?.id),
      status_id: isVallidUuid(tailNumber.status?.id),
      gl_code_id: isVallidUuid(tailNumber.gl_code?.id),
    })
    setCurrentOpenTailNumberModal(tailNumber.id)
  }

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Details</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Maximum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actualInformationForm.getValues().infos.map((info, index) => (
                <TableRow key={index}>
                  <TableCell>{info.detail}</TableCell>
                  <TableCell className="w-28">
                    <Input
                      {...actualInformationForm.register(
                        `infos.${index}.actual`
                      )}
                      type="number"
                      className="h-9 w-full py-0.5"
                    />
                  </TableCell>
                  <TableCell className="w-28">{info.maximum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h2 className="font-semibold">Historical Load Capacity</h2>
          <CargoCapacityAreaChart />
        </div>
      </Modal>
      {isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Loader className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      ) : (
        <DataTable
          tableKey="dashboard_flights"
          data={flights}
          onRowClick={handleRowClick}
          onRefetchData={refetch}
          extraToolbarButtons={[
            {
              label: "Export Manifest",
              icon: DownloadIcon,
              onClick: () => {
                toast({
                  title: "Exporting Manifest",
                  description:
                    "Please wait while your data is being downloaded",
                })
              },
            },
          ]}
          customCellRenderers={[
            {
              key: "departure_date",
              renderer: (data) => {
                const date = new Date(data.departure_date)
                return (
                  <div className="inline-flex gap-2 tabular-nums">
                    <span className="font-mono">{format(date, "EEE")}</span>
                    <span>{format(date, "dd-MM-yyyy")}</span>
                  </div>
                )
              },
            },
            {
              key: "flight_number",
              renderer: (data, value) => (
                <Badge
                  className="pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFlightSetting(data)
                  }}
                  variant={"chip-primary"}
                >
                  {value}
                </Badge>
              ),
            },
            {
              key: "tail.tail_number",
              renderer: (data, value) => (
                <Badge
                  className="pointer-events-auto inline-flex gap-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTailNumberRowClick(data.tail)
                  }}
                  variant={"chip-primary"}
                >
                  <span>{data.tail.tail_number}</span>
                  <span className="font-light text-muted-foreground">
                    {data.tail.manufacturer.name} {data.tail.aircraft_type.name}{" "}
                    {data.tail.version.version}
                  </span>
                </Badge>
              ),
            },
            {
              key: "volume_capacity",
              renderer: (data) => (
                <ActualInformation
                  actual={Number(data.specification?.volume_capacity)}
                  maximum={Number(data?.specification?.total_volume_capacity)}
                  displayOption={displayOption}
                  unit={String(data.tail.volume_unit.symbol || "")}
                />
              ),
            },
            {
              key: "weight_capacity",
              renderer: (data) => (
                <ActualInformation
                  actual={Number(data.specification?.weight_capacity)}
                  maximum={Number(data?.specification?.total_weight_capacity)}
                  displayOption={displayOption}
                  unit={String(data.tail.weight_unit.symbol || "")}
                />
              ),
            },
            {
              key: "status.id",
              renderer: (data) => (
                <TableCellDropdown
                  defaultValue={data.status.id}
                  name="status"
                  options={flightStatusOptions ?? []}
                  onChangeSelect={async (option) => {
                    await handleChangeStatus({
                      statusId: option.status ?? "",
                      id: data.id,
                    })
                  }}
                />
              ),
            },
            {
              key: "special_handling_codes",
              renderer: (data) => (
                <div className="inline-flex items-center gap-1">
                  {data.special_handling_codes.map((item) => (
                    <Tooltip key={item.id}>
                      <TooltipTrigger>
                        <Badge variant={"chip-primary"}>{item.code}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>{item.label}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ),
            },
          ]}
          {...tableStateProps}
        />
      )}
      <NewFlightModal
        data={selectedFlightSetting}
        onSaved={refetch}
        open={!!selectedFlightSetting}
        mode={"edit"}
        onOpenChange={() => setSelectedFlightSetting(null)}
        resetData={() => setSelectedFlightSetting(null)}
        selectedFlights={"one"}
      />
      <TailNumberForm
        disableDelete
        onSaved={refetch}
        form={tailnumberForm}
        currentOpen={currentOpenTailNumberModal}
        onOpenChange={(open) => {
          if (open) {
            setCurrentOpenTailNumberModal(currentOpenTailNumberModal)
          } else {
            if (typeof currentOpenTailNumberModal === "string") {
              tailnumberForm.reset(tailNumberFormDefaultValues)
            }
            setCurrentOpenTailNumberModal(false)
          }
        }}
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
  const { resolvedTheme } = useTheme()

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

      const threshold = 0.5
      const isMoreThanThreshold = backgroundAlphaDecimal > threshold
      const lightModeTextColor = `rgba(251, 87, 39, ${backgroundAlpha + 0.8})`

      return (
        <div className="flex w-fit shrink-0 items-center gap-2">
          <span
            className={cn(
              "w-14 whitespace-nowrap rounded-sm border bg-button-primary px-1 text-center text-sm text-zinc-500 dark:border-0 dark:text-white"
            )}
            style={{
              backgroundColor: `rgba(251, 87, 39, ${backgroundAlpha})`,
              borderColor: lightModeTextColor,
              color:
                isMoreThanThreshold || resolvedTheme === "dark"
                  ? "#FFFF"
                  : lightModeTextColor,
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
