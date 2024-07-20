"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  aircraftFormSchema,
  AircraftFormValues,
} from "@/schemas/aircraft/aircraft"
import {
  tailNumberFormSchema,
  TailNumberFormValues,
} from "@/schemas/aircraft/tail-numbers"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlaneIcon, PlusIcon, ScrollTextIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table/data-table"
import PageContainer from "@/components/layout/PageContainer"

import { aircraftTailNumbersColumns } from "./components/columns/aircraft-tail-number-columns"
import { aircraftTypeColumns } from "./components/columns/aircraft-type-columns"
import AircraftTypeForm from "./components/forms/aircraft-form-v3"
import TailNumberForm from "./components/forms/aircraft-tail-number-form"
import {
  aircraftFormDefaultValues,
  tailNumberFormDefaultValues,
} from "./constants"
import { TailNumberData } from "./types"

export default function MasterAircraftPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [tabValue, setTabValue] = useState(
    searchParams.get("tab") ?? "aircraft-types"
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    console.log({ key, value })
    // i have no idea why this is not working
    router.push(pathname + "?" + createQueryString(key, value))
  }

  useEffect(() => {
    setSearchParams("tab", tabValue)
  }, [tabValue])

  const [currentOpenAircraftModal, setCurrentOpenAircraftModal] = useState<
    string | boolean
  >(false) // When the state is a string, it means the modal is in edit mode
  const [currentOpenTailNumberModal, setCurrentOpenTailNumberModal] = useState<
    string | boolean
  >(false) // When the state is a string, it means the modal is in edit mode

  const { data: aircrafts, isLoading } = useAircrafts({
    page: 1,
    page_size: 1000,
  })

  const aircraftsData = aircrafts?.data

  const aircraftTailNumbersData: TailNumberData[] = useMemo(
    () =>
      aircraftsData
        ?.flatMap(
          (aircraft) =>
            aircraft.aircraft_tail_numbers?.map((tailNumber) => ({
              ...tailNumber,
              aircraft_id: aircraft.id,
              manufacturer: aircraft.manufacturer,
              aircraft_type: aircraft.aircraft_type,
              version: aircraft.version,
              mtow: aircraft.mtow,
              landing_weight: aircraft.landing_weight,
              cargo_capacity: aircraft.cargo_capacity,
            })) ?? []
        )
        .sort((a, b) => {
          if (a.status.name < b.status.name) return -1
          if (a.status.name > b.status.name) return 1
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

  const aircraftForm = useForm<AircraftFormValues>({
    resolver: zodResolver(aircraftFormSchema),
    defaultValues: aircraftFormDefaultValues,
  })
  const tailnumberForm = useForm<TailNumberFormValues>({
    resolver: zodResolver(tailNumberFormSchema),
    defaultValues: tailNumberFormDefaultValues,
  })

  function handleAircraftRowClick(data: Aircraft) {
    setCurrentOpenAircraftModal(data.id)

    aircraftForm.reset({
      ...data,
      manufacturer_id: data.manufacturer.is_deleted ? "" : data.manufacturer.id,
      aircraft_type_id:
        data.aircraft_type.is_deleted || data.manufacturer.is_deleted
          ? ""
          : data.aircraft_type.id,
      version_id:
        data.version.is_deleted ||
        data.aircraft_type.is_deleted ||
        data.manufacturer.is_deleted
          ? ""
          : data.version.id,
      aircraft_tail_numbers: data.aircraft_tail_numbers?.map((tailNumber) => ({
        id: tailNumber.id,
        status_id: tailNumber.status.id,
        tail_number: tailNumber?.tail_number,
      })),
      body_type_id: data.body_type.id,
      volume_unit_id: data.volume_unit.id,
      dimension_unit_id: data.dimension_unit.id,
      weight_unit_id: data.weight_unit.id,
      status_id: data.status.id,
      gl_code_id: data.gl_code.id,
      count: data.count,
    })
  }

  const handleTailNumberRowClick = (
    aircraft_id: Aircraft["id"],
    tail_number: string
  ) => {
    const aircraft = aircraftsData?.find((item) => item.id === aircraft_id)
    if (!aircraft) return

    const transformedAircraft: Partial<Aircraft> = {
      ...aircraft,
      manufacturer: undefined,
      aircraft_type: undefined,
      version: undefined,
      aircraft_tail_numbers: undefined,
    }

    tailnumberForm.reset({
      ...transformedAircraft,
      tail_number: tail_number,
      aircraft_id: transformedAircraft.id,
      body_type_id: transformedAircraft.body_type?.id,
      volume_unit_id: transformedAircraft.volume_unit?.id,
      dimension_unit_id: transformedAircraft.dimension_unit?.id,
      weight_unit_id: transformedAircraft.weight_unit?.id,
      status_id: transformedAircraft.status?.id,
      gl_code_id: transformedAircraft.gl_code?.id,
    })

    setCurrentOpenTailNumberModal(aircraft_id)
  }

  const tabsList = (
    <TabsList className="gap-2 bg-transparent p-0">
      <TabsTrigger
        className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
        value="aircraft-types"
      >
        <PlaneIcon className="mr-2 size-4" />
        Aircraft Types
      </TabsTrigger>
      <TabsTrigger
        className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
        value="tail-numbers"
      >
        <ScrollTextIcon className="mr-2 size-4" />
        Tail Numbers
      </TabsTrigger>
    </TabsList>
  )

  return (
    <PageContainer>
      <div>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="space-y-4"
        >
          <TabsContent value="aircraft-types" asChild>
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={aircraftTypeColumns}
              data={aircraftsData ?? []}
              onRowClick={handleAircraftRowClick}
              menuId="aircraft"
              extraRightComponents={
                <Button
                  size={"sm"}
                  variant={"button-primary"}
                  className="p-2 text-sm"
                  onClick={() => setCurrentOpenAircraftModal(true)}
                >
                  <PlusIcon className="mr-2 size-4" />
                  Create Aircraft
                </Button>
              }
              extraLeftComponents={tabsList}
            />
          </TabsContent>
          <TabsContent value="tail-numbers" asChild>
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={aircraftTailNumbersColumns}
              data={aircraftTailNumbersData ?? []}
              onRowClick={({ aircraft_id, tail_number }) => {
                handleTailNumberRowClick(aircraft_id, tail_number)
              }}
              extraRightComponents={
                <Button
                  size={"sm"}
                  variant={"button-primary"}
                  className="p-2 text-sm"
                  onClick={() => setCurrentOpenTailNumberModal(true)}
                >
                  <PlusIcon className="mr-2 size-4" />
                  Create Tail Number
                </Button>
              }
              extraLeftComponents={tabsList}
            />
          </TabsContent>
        </Tabs>
      </div>
      <AircraftTypeForm
        form={aircraftForm}
        currentOpen={currentOpenAircraftModal}
        onOpenChange={(open) => {
          if (open) {
            setCurrentOpenAircraftModal(currentOpenAircraftModal)
          } else {
            if (typeof currentOpenAircraftModal === "string") {
              aircraftForm.reset(aircraftFormDefaultValues)
            }
            setCurrentOpenAircraftModal(false)
          }
        }}
      />
      <TailNumberForm
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
    </PageContainer>
  )
}
