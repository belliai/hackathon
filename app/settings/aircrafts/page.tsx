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
import { PlaneIcon, PlusIcon, ScrollTextIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { TailNumber } from "@/types/aircraft/tail-number"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { useTailNumbers } from "@/lib/hooks/aircrafts/tail-numbers"
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
      volume_unit_id: data.volume_unit.id,
      dimension_unit_id: data.dimension_unit.id,
      weight_unit_id: data.weight_unit.id,
      gl_code_id: data.gl_code.id,
      count: data.count,
    })
  }
  return (
    <>
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
    </>
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
  const tailNumbersData = tailNumbers?.data

  const tailnumberForm = useForm<TailNumberFormValues>({
    resolver: zodResolver(tailNumberFormSchema),
    defaultValues: tailNumberFormDefaultValues,
  })

  const handleTailNumberRowClick = (tailNumber: TailNumber) => {
    tailnumberForm.reset({
      ...tailNumber,
      aircraft_id: tailNumber.id,
      body_type_id: tailNumber.body_type?.id,
      volume_unit_id: tailNumber.volume_unit?.id,
      dimension_unit_id: tailNumber.dimension_unit?.id,
      weight_unit_id: tailNumber.weight_unit?.id,
      status_id: tailNumber.status?.id,
      gl_code_id: tailNumber.gl_code?.id,
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
