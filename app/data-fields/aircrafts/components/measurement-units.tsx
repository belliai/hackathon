"use client"

import { useEffect } from "react"
import { SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  AircraftDefaults,
  useAircraftDefaults,
} from "@/lib/hooks/aircrafts/aircraft-defaults"
import { useUnits } from "@/lib/hooks/units/units"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

export default function MeasurementUnits() {
  const {
    aircraftDefaults,
    updateAircraftDefaults,
    refetchDefaults,
    isUpdating,
  } = useAircraftDefaults()

  const form = useForm<AircraftDefaults>({
    defaultValues: {
      dimension_unit_id: aircraftDefaults?.dimension_unit_id,
      volume_unit_id: aircraftDefaults?.volume_unit_id,
      weight_unit_id: aircraftDefaults?.weight_unit_id,
    },
  })

  useEffect(() => {
    if (aircraftDefaults) {
      form.reset({
        dimension_unit_id: aircraftDefaults?.dimension_unit_id,
        volume_unit_id: aircraftDefaults?.volume_unit_id,
        weight_unit_id: aircraftDefaults?.weight_unit_id,
      })
    }
  }, [aircraftDefaults])

  const { data: unitsW } = useUnits({
    category: "weight",
  })

  const { data: unitsVol } = useUnits({
    category: "volume",
  })

  const { data: unitsLen } = useUnits({
    category: "length",
  })

  const weightUnitsOptions = unitsW?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const volumeUnitsOptions = unitsVol?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const lengthUnitsOptions = unitsLen?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const onSubmit = (data: AircraftDefaults) => {
    updateAircraftDefaults(data, {
      onSuccess: () => {
        toast({
          title: "Success!",
          description: "Default units has been updated!",
        })
        refetchDefaults()
      },
      onError: () => {
        toast({
          title: "Error!",
          description: "An error occurred while updating default units",
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full flex-row items-center justify-end">
          <Button
            isLoading={isUpdating}
            type="submit"
            variant={"button-primary"}
            size={"sm"}
          >
            <SaveIcon className="mr-2 size-4" />
            Save Defaults
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <InputSwitch<AircraftDefaults>
            label="Weight Unit"
            name="weight_unit_id"
            className="bg-zinc-900"
            type="select"
            selectOptions={weightUnitsOptions}
          />
          <InputSwitch<AircraftDefaults>
            label="Volume Unit"
            name="volume_unit_id"
            className="bg-zinc-900"
            type="select"
            selectOptions={volumeUnitsOptions}
          />
          <InputSwitch<AircraftDefaults>
            label="Dimension Unit"
            name="dimension_unit_id"
            className="bg-zinc-900"
            type="select"
            selectOptions={lengthUnitsOptions}
          />
        </div>
      </form>
    </Form>
  )
}
