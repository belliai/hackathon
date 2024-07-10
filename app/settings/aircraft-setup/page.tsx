"use client"

import { useCallback, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  aircraftFormSchema,
  AircraftFormValues,
} from "@/schemas/aircraft/aircraft"
import { zodResolver } from "@hookform/resolvers/zod"
import { ColumnDef } from "@tanstack/react-table"
import { PlaneIcon, Plus, PlusIcon, ScrollTextIcon } from "lucide-react"
import { useForm, UseFormReturn } from "react-hook-form"

import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableHeaderWithTooltip } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import PageContainer from "@/components/layout/PageContainer"

import AircraftTypeForm from "./components/aircraft-form-v3"
import { formDefaultValues } from "./constants"

export default function MasterAircraftPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const [currentOpenModal, setCurrentOpenModal] = useState<string | boolean>(
    false
  ) // When the state is a string, it means the modal is in edit mode

  const { data: aircrafts, isLoading } = useAircrafts({
    page: 1,
    page_size: 1000,
  })

  const aircraftsData = aircrafts?.data

  const aircraftTailNumbersData = useMemo(
    () =>
      aircraftsData
        ?.flatMap(
          (aircraft) =>
            aircraft.aircraft_tail_numbers?.map((tailNumber) => ({
              ...tailNumber,
              aircraft_id: aircraft.ID,
              manufacturer: aircraft.manufacturer,
              aircraft_type: aircraft.aircraft_type,
              version: aircraft.version,
              mtow: aircraft.mtow,
              landing_weight: aircraft.landing_weight,
              cargo_capacity: aircraft.cargo_capacity,
            })) ?? []
        )
        .sort((a, b) => {
          if (a.status.Name < b.status.Name) return -1
          if (a.status.Name > b.status.Name) return 1
          if (a.manufacturer < b.manufacturer) return -1
          if (a.manufacturer > b.manufacturer) return 1
          if (a.aircraft_type < b.aircraft_type) return -1
          if (a.aircraft_type > b.aircraft_type) return 1
          if (a.version < b.version) return -1
          if (a.version > b.version) return 1
          return 0
        }) ?? [],
    [aircraftsData]
  )

  console.log({ aircraftTailNumbersData })

  const form = useForm<AircraftFormValues>({
    resolver: zodResolver(aircraftFormSchema),
    defaultValues: formDefaultValues,
  })

  function handleRowClick(data: Aircraft) {
    setCurrentOpenModal(data.ID)

    form.reset({
      ...data,
      aircraft_tail_numbers: data.aircraft_tail_numbers?.map((tailNumber) => ({
        id: tailNumber.ID,
        status_id: String(tailNumber.status.ID),
        tail_number: tailNumber?.tail_number,
      })),
      body_type_id: String(data.body_type.ID),
      bulk_cubic_id: String(data.bulk_cubic.ID),
      bulk_unit_id: String(data.bulk_unit.ID),
      cargo_capacity_unit_id: String(data.cargo_capacity_unit.ID),
      landing_weight_unit_id: String(data.landing_weight_unit.ID),
      max_bulk_capacity_volume_unit_id: String(
        data.max_bulk_capacity_volume_unit.ID
      ),
      max_bulk_capacity_weight_unit_id: String(
        data.max_bulk_capacity_weight_unit.ID
      ),
      max_dimension_unit_id: String(data.max_dimension_unit.ID),
      max_volume_unit_id: String(data.max_volume_unit.ID),
      max_zero_fuel_weight_unit_id: String(data.max_zero_fuel_weight_unit.ID),
      mtow_unit_id: String(data.mtow_unit.ID),
      status_id: String(data.status.ID),
      gl_code_id: String(data.gl_code.ID),
      restricted_weight_piece_unit_id: String(
        data.restricted_weight_piece_unit.ID
      ),
      count: String(data.count),
    })
  }

  const handleTailNumberRowClick = (aircraft_id: Aircraft["ID"]) => {
    const aircraft = aircraftsData?.find((item) => item.ID === aircraft_id)

    if (!aircraft) return

    handleRowClick(aircraft)
  }

  const aircraftTypeColumns: ColumnDef<Aircraft>[] = [
    {
      accessorKey: "manufacturer",
      header: () => (
        <TableHeaderWithTooltip
          header="Manufacturer"
          tooltipId="aircraft-manufacturer"
        />
      ),
    },
    {
      accessorKey: "aircraft_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Aircraft Type"
          tooltipId="aircraft-aircraft-type"
        />
      ),
    },
    {
      accessorKey: "version",
      header: () => (
        <TableHeaderWithTooltip header="Version" tooltipId="aircraft-version" />
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
    {
      accessorKey: "mtow",
      header: () => (
        <TableHeaderWithTooltip header="MTOW" tooltipId="aircraft-mtow" />
      ),
    },
    {
      accessorKey: "max_zero_fuel_weight",
      header: () => (
        <TableHeaderWithTooltip
          header="Max Zero Fuel Wt"
          tooltipId="aircraft-max-zero-fuel-wt"
        />
      ),
    },
    {
      accessorKey: "body_type.Name",
      header: () => (
        <TableHeaderWithTooltip
          header="Body Type"
          tooltipId="aircraft-body-type"
        />
      ),
    },
    {
      accessorKey: "count",
      header: () => (
        <TableHeaderWithTooltip
          header="Active Count"
          tooltipId="aircraft-active-count"
        />
      ),
      cell: ({ row }) =>
        row.original?.aircraft_tail_numbers?.filter(
          (item) => item.status.Name.toLowerCase() === "active"
        ).length ?? 0,
    },
    {
      accessorKey: "status",
      header: () => (
        <TableHeaderWithTooltip header="Status" tooltipId="aircraft-status" />
      ),
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status.Name === "Active" ? "success" : "destructive"
          }
        >
          {row.original.status.Name}
        </Badge>
      ),
    },
  ]

  const aircraftTailNumbersColumns: ColumnDef<
    ArrayElement<typeof aircraftTailNumbersData>
  >[] = [
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
      accessorKey: "aircraft_type",
      header: () => (
        <TableHeaderWithTooltip
          header="Aircraft Type"
          tooltipId="aircraft-aircraft-type"
        />
      ),
      cell: ({ row }) =>
        [
          row.original.manufacturer,
          row.original.aircraft_type,
          row.original.version,
        ].join(" "),
    },
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
    {
      accessorKey: "status",
      header: () => (
        <TableHeaderWithTooltip header="Status" tooltipId="aircraft-status" />
      ),
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status.Name === "Active" ? "success" : "destructive"
          }
        >
          {row.original.status.Name}
        </Badge>
      ),
    },
  ]

  const setTabSearchParams = (value: string) => {
    router.push(pathname + "?" + createQueryString("tab", value))
  }

  const createButton = (
    <Button
      size={"sm"}
      variant={"button-primary"}
      className="p-2 text-xs"
      onClick={() => setCurrentOpenModal(true)}
      style={{ fontSize: '0.875rem' }}
    >
      <PlusIcon className="mr-2 size-4" />
      Create Aircraft
    </Button>
  )

  const tabsList = (
    <TabsList className="gap-2 bg-transparent p-0">
      <TabsTrigger
        style={{ fontSize: '0.875rem' }}
        className="h-8 border border-secondary text-xs data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
        value="aircraft-types"
      >
        <PlaneIcon className="mr-2 size-4" />
        Aircraft Types
      </TabsTrigger>
      <TabsTrigger
        style={{ fontSize: '0.875rem' }}
        className="h-8 border border-secondary text-xs data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
        value="list-of-aircrafts"
      >
        <ScrollTextIcon className="mr-2 size-4" />
        List of Aircrafts
      </TabsTrigger>
    </TabsList>
  )

  return (
    <PageContainer>
      <div style={{ marginTop: '9px' }}>
      <Tabs
        onValueChange={setTabSearchParams}
        className="space-y-4"
        defaultValue={searchParams.get("tab") ?? "aircraft-types"}
      >
        <TabsContent value="aircraft-types" asChild>
          <DataTable
            showToolbarOnlyOnHover={true}
            columns={aircraftTypeColumns}
            data={aircraftsData ?? []}
            onRowClick={handleRowClick}
            menuId="aircraft"
            extraRightComponents={createButton}
            extraLeftComponents={tabsList}
          />
        </TabsContent>
        <TabsContent value="list-of-aircrafts" asChild>
          <DataTable
            showToolbarOnlyOnHover={true}
            columns={aircraftTailNumbersColumns}
            data={aircraftTailNumbersData ?? []}
            onRowClick={({ aircraft_id }) => {
              handleTailNumberRowClick(aircraft_id)
            }}
            extraRightComponents={createButton}
            extraLeftComponents={tabsList}
          />
        </TabsContent>
      </Tabs>
      </div>
      <AircraftTypeForm
        form={form}
        currentOpen={currentOpenModal}
        onOpenChange={(open) => {
          if (open) {
            setCurrentOpenModal(currentOpenModal)
          } else {
            if (typeof currentOpenModal === "string") {
              form.reset(formDefaultValues)
            }
            setCurrentOpenModal(false)
          }
        }}
      />
    </PageContainer>
  )
}
