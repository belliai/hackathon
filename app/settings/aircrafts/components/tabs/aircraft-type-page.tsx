"use client"

import { useMemo, useState } from "react"
import {
  aircraftFormSchema,
  AircraftFormValues,
} from "@/schemas/aircraft/aircraft"
import { zodResolver } from "@hookform/resolvers/zod"
import { BoxIcon, PlaneIcon, PlusIcon, WeightIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { aircraftFormDefaultValues } from "../../constants"
import useGeneralFieldSections from "../../hooks/use-field-sections"
import AircraftDiagram from "../aircrafts/aircraft-diagram"
import AircraftTypeFormV2 from "../forms/aircraft-form-v2"

const getAircraftTypeString = (aircraft: Aircraft) =>
  [
    aircraft.manufacturer.name,
    aircraft.aircraft_type.name,
    aircraft.version.version,
  ].join(" ")

export default function AircraftTypePage({
  isSetting = false,
}: {
  isSetting?: boolean
}) {
  const [currentOpenAircraftModal, setCurrentOpenAircraftModal] = useState<
    string | boolean
  >(false) // When the state is a string, it means the modal is in edit mode
  const [ULDTotal, setULDTotal] = useState(0)
  const { fieldSections, triggers } = useGeneralFieldSections()
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
    setULDTotal(parseInt(data?.uld_position) || 0)
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
    <div
      className={`flex ${isSetting ? "h-fit gap-4" : "h-[85dvh] gap-16"} flex-col items-center justify-start`}
    >
      <div
        className={`flex w-full items-center ${isSetting ? "justify-end" : "justify-between"}`}
      >
        <Button
          size={"sm"}
          variant={"button-primary"}
          className="p-2 text-sm"
          onClick={() => {
            setCurrentOpenAircraftModal(true)
            aircraftForm.reset(aircraftFormDefaultValues)
          }}
        >
          <PlusIcon className="mr-2 size-4" />
          Create Aircraft
        </Button>
      </div>
      <div className="grid w-full grid-cols-3 gap-4 overflow-hidden">
        {/* Aircraft List */}
        <div className="custom-scrollbar flex h-[75vh] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-1">
          {aircraftsData?.map((aircraft) => {
            const aircraftName = getAircraftTypeString(aircraft)
            return (
              <Button
                asChild
                key={aircraft.id}
                variant={"secondary"}
                className={`h-fit cursor-pointer text-foreground ${currentOpenAircraftModal === aircraft.id ? "border border-button-primary bg-white" : "bg-green"}`}
                onClick={() => handleAircraftRowClick(aircraft)}
              >
                <Card className="flex flex-col items-start gap-3 border px-3 py-4 text-sm dark:bg-zinc-900/50">
                  <div className="flex w-full items-center justify-between gap-2">
                    <h2 className="text-base font-bold">{aircraftName}</h2>
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                      <PlaneIcon className="size-4" />
                      <span className="tabular-nums text-foreground">
                        {aircraft.aircraft_tail_numbers?.filter(
                          (item) =>
                            item.status?.name?.toLowerCase() === "active" &&
                            !item.is_deleted
                        ).length ?? 0}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex w-full justify-between gap-2">
                    <div className="flex w-1/2 flex-col gap-1 text-muted-foreground">
                      <div className="flex gap-1">
                        <BoxIcon className="size-4" />
                        <div className="break-words text-xs">Max Volume</div>
                      </div>
                      <div className="tabular-nums text-foreground">
                        {aircraft.max_bulk_capacity_volume || "0"}m³
                      </div>
                    </div>
                    <div className="flex w-1/2 flex-col gap-1 text-muted-foreground">
                      <div className="flex gap-1">
                        <WeightIcon className="size-4" />
                        <div className="text-xs">Max Weight</div>
                      </div>
                      <div className="tabular-nums text-foreground">
                        {aircraft.max_bulk_capacity_weight || "0"}Kg
                      </div>
                    </div>
                  </div>
                </Card>
              </Button>
            )
          })}
        </div>

        {/* Aircraft Layout */}
        <div className="h-[75vh] overflow-hidden rounded-md border pr-1 dark:bg-zinc-900/50">
          <h3 className="font-bold p-4">ULD Configuration</h3>
          <AircraftDiagram ULDTotal={14} />
        </div>

        {/* Aircraft Form */}
        <div className="custom-scrollbar h-[75vh] w-full overflow-y-auto rounded-md border p-4 dark:bg-zinc-900/50">
          <AircraftTypeFormV2
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
      </div>
    </div>
  )
}
