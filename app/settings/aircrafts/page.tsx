"use client"

import { useCallback, useEffect, useState } from "react"
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
import { PlaneIcon, PlusIcon, ScrollTextIcon, Users } from "lucide-react"
import { useForm } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { TailNumber } from "@/types/aircraft/tail-number"
import { useAircraftDefaults } from "@/lib/hooks/aircrafts/aircraft-defaults"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { useTailNumbers } from "@/lib/hooks/aircrafts/tail-numbers"
import { onExport } from "@/lib/utils/export"
import { isVallidUuid } from "@/lib/utils/string-utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table/data-table"
import PageContainer from "@/components/layout/PageContainer"

import { aircraftTailNumbersColumns } from "./components/columns/aircraft-tail-number-columns"
import AircraftTypeForm from "./components/forms/aircraft-form"
import TailNumberForm from "./components/forms/aircraft-tail-number-form"
import {
  aircraftFormDefaultValues,
  tailNumberFormDefaultValues,
} from "./constants"

const tabsList = (
  <TabsList className="gap-2 bg-transparent p-0">
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="tail-numbers"
    >
      <ScrollTextIcon className="mr-2 size-4" />
      Tail Numbers
    </TabsTrigger>
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="aircraft-types"
    >
      <PlaneIcon className="mr-2 size-4" />
      Aircraft Types
    </TabsTrigger>
  </TabsList>
)

export default function MasterAircraftPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paramsTabValue = searchParams.get("tab")

  const [tabValue, setTabValue] = useState(paramsTabValue || "tail-numbers")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    router.replace(pathname + "?" + createQueryString(key, value))
  }

  const handleTabChange = (val: string) => setSearchParams("tab", val)

  useEffect(() => {
    handleTabChange(tabValue)
  }, [tabValue])

  return (
    <PageContainer>
      <div>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="space-y-4"
        >
          <TabsContent value="aircraft-types" asChild>
            <AircraftDataTable />
          </TabsContent>
          <TabsContent value="tail-numbers" asChild>
            <TailNumbersForm />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}

function AircraftDataTable() {
  const [currentOpenAircraftModal, setCurrentOpenAircraftModal] = useState<
    string | boolean
  >(false) // When the state is a string, it means the modal is in edit mode

  const aircraftForm = useForm<AircraftFormValues>({
    resolver: zodResolver(aircraftFormSchema),
    defaultValues: aircraftFormDefaultValues,
  })

  const { data: aircrafts } = useAircrafts({
    page: 1,
    page_size: 1000,
  })
  const aircraftsData = aircrafts?.data

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
      body_type_id: data.body_type.id,
      gl_code_id: data.gl_code.id,
      count: data.count,
    })
  }

  return (
    <div className="flex h-[85dvh] flex-col items-center justify-start gap-16">
      <div className="flex w-full items-center justify-between">
        {tabsList}
        <Button
          size={"sm"}
          variant={"button-primary"}
          className="p-2 text-sm"
          onClick={() => setCurrentOpenAircraftModal(true)}
        >
          <PlusIcon className="mr-2 size-4" />
          Create Aircraft
        </Button>
      </div>
      <div className="no-scrollbar flex h-5 w-[60%] min-w-fit flex-1 grid-cols-1 flex-col gap-2 overflow-y-scroll">
        {aircraftsData?.map((aircraft) => (
          <Button
            asChild
            key={aircraft.id}
            variant={"secondary"}
            className="cursor-pointer text-foreground"
            onClick={() => handleAircraftRowClick(aircraft)}
          >
            <Card className="sm group grid grid-cols-3 border bg-zinc-900/50 px-3 py-1.5 text-sm">
              <span>
                {aircraft.manufacturer.name} {aircraft.aircraft_type.name}{" "}
                {aircraft.version.version}
              </span>
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <span className="tabular-nums text-foreground">
                  {aircraft.aircraft_tail_numbers?.filter(
                    (item) =>
                      item.status?.name?.toLowerCase() === "active" &&
                      !item.is_deleted
                  ).length ?? 0}
                </span>
                <PlaneIcon className="size-4" />
                <span className="text-xs">Active tail numbers</span>
              </div>
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <span className="tabular-nums text-foreground">
                  {aircraft.passenger_capacity || "-"}
                </span>
                <Users className="size-4" />
                <span className="text-xs">Passenger Capacity</span>
              </div>
            </Card>
          </Button>
        ))}
      </div>
      {/* <DataTable
        showToolbarOnlyOnHover={true}
        columns={aircraftTypeColumns}
        data={aircraftsData ?? []}
        onRowClick={handleAircraftRowClick}
        menuId="aircraft"
        initialVisibility={{
          landing_weight: false,
          cargo_capacity: false,
          mtow: false,
          max_zero_fuel_weight: false,
          body_type: false,
        }}
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
      /> */}
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
    </div>
  )
}

function TailNumbersForm() {
  const [currentOpenTailNumberModal, setCurrentOpenTailNumberModal] = useState<
    string | boolean
  >(false) // When the state is a string, it means the modal is in edit mode

  const { data: tailNumbers } = useTailNumbers({
    page: 1,
    page_size: 1000,
  })

  const { aircraftDefaults } = useAircraftDefaults()

  const tailNumbersData = tailNumbers?.data

  const tailnumberForm = useForm<TailNumberFormValues>({
    resolver: zodResolver(tailNumberFormSchema),
    defaultValues: tailNumberFormDefaultValues,
  })

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
    <>
      <DataTable
        showToolbarOnlyOnHover={true}
        columns={aircraftTailNumbersColumns}
        data={tailNumbersData ?? []}
        onRowClick={handleTailNumberRowClick}
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
        isCanExport={true}
        onExport={() =>
          onExport({ data: tailNumbersData, filename: "TailsNumberData" })
        }
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
    </>
  )
}
