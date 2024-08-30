"use client"

import { useMemo, useState } from "react"
import {
  aircraftFormSchema,
  AircraftFormValues,
} from "@/schemas/aircraft/aircraft"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CircleAlertIcon,
  PlaneIcon,
  PlusIcon,
  Users,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { findDuplicates } from "@/lib/utils/string-utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import AircraftTypeForm from "../forms/aircraft-form"
import { aircraftFormDefaultValues } from "../../constants"
import AircraftTabsList from "./tab-list"

const getAircraftTypeString = (aircraft: Aircraft) =>
  [
    aircraft.manufacturer.name,
    aircraft.aircraft_type.name,
    aircraft.version.version,
  ].join(" ")

export default function AircraftDataTable({ isSetting = false }: { isSetting?: boolean }) {
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

  const duplicateAircrafts = useMemo(() => {
    const aircraftsList =
      aircrafts?.data.map((aircraft) => getAircraftTypeString(aircraft)) ?? []
    return findDuplicates(aircraftsList)
  }, [aircraftsData])

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
    <div className={`flex ${isSetting ? 'h-fit gap-4' : 'h-[85dvh] gap-16'} flex-col items-center justify-start `}>
      <div className={`flex w-full items-center ${isSetting ? 'justify-end' : 'justify-between'}`}>
        {!isSetting && AircraftTabsList}
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
      <div className={`no-scrollbar flex h-5 ${isSetting ? 'w-full' : 'w-[60%]'} min-w-fit flex-1 grid-cols-1 flex-col gap-2 overflow-y-scroll`}>
        {aircraftsData?.map((aircraft) => {
          const aircraftName = getAircraftTypeString(aircraft)
          const isDuplicate = duplicateAircrafts.includes(aircraftName)
          return (
            <Button
              asChild
              key={aircraft.id}
              variant={"secondary"}
              className="cursor-pointer text-foreground"
              onClick={() => handleAircraftRowClick(aircraft)}
            >
              <Card className="sm group grid grid-cols-3 border dark:bg-zinc-900/50 px-3 py-1.5 text-sm bg-white">
                <span>
                  {aircraftName}{" "}
                  {isDuplicate && (
                    <span className="ml-1 inline-flex h-fit items-center gap-1 text-xs text-destructive">
                      <CircleAlertIcon className="size-2" />
                      possible duplicate
                    </span>
                  )}
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
          )
        })}
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
    </div>
  )
}
