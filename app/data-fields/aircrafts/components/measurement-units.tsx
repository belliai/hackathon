"use client"

import { useEffect } from "react"
import { SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  DefaultMeasurementFormValues,
  useDefaultMeasurements,
  useUpdateDefaultMeasurements,
} from "@/lib/hooks/units/default-measurement"
import { useUnits } from "@/lib/hooks/units/units"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

export default function MeasurementUnits() {
  const { data: defaultMeasurements, refetch } = useDefaultMeasurements()
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateDefaultMeasurements()

  const form = useForm<DefaultMeasurementFormValues>()

  const { data: unitsW } = useUnits({
    category: "weight",
  })

  const { data: unitsVol } = useUnits({
    category: "volume",
  })

  const { data: unitsLen } = useUnits({
    category: "length",
  })

  console.log({ unitsW })

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

  useEffect(() => {
    if (defaultMeasurements) {
      console.log({ defaultMeasurements })
      form.reset({
        dimension_unit_id: defaultMeasurements.dimension_unit.id,
        volume_unit_id: defaultMeasurements.volume_unit.id,
        weight_unit_id: defaultMeasurements.weight_unit.id,
      })
    }
  }, [defaultMeasurements, form, unitsW, unitsLen, unitsVol])

  console.log("formvalues", form.watch())

  const onSubmit = (data: DefaultMeasurementFormValues) => {
    update(data, {
      onSuccess: () => {
        toast({
          title: "Success!",
          description: "Default units has been updated!",
        })
        refetch()
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
    <div>
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
            <InputSwitch<DefaultMeasurementFormValues>
              label="Weight Unit"
              name="weight_unit_id"
              className="bg-zinc-900"
              type="select"
              selectOptions={weightUnitsOptions}
            />
            <InputSwitch<DefaultMeasurementFormValues>
              label="Volume Unit"
              name="volume_unit_id"
              className="bg-zinc-900"
              type="select"
              selectOptions={volumeUnitsOptions}
            />
            <InputSwitch<DefaultMeasurementFormValues>
              label="Dimension Unit"
              name="dimension_unit_id"
              className="bg-zinc-900"
              type="select"
              selectOptions={lengthUnitsOptions}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
