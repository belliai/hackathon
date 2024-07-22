"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TailNumberFormValues } from "@/schemas/aircraft/tail-numbers"
import {
  BoxesIcon,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  DoorClosedIcon,
  FileSlidersIcon,
  PlaneIcon,
  RulerIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react"
import { Path, UseFormReturn } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftDefaults } from "@/lib/hooks/aircrafts/aircraft-defaults"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
import {
  useAircrafts,
  useCreateAircraft,
  useDeleteAircraft,
  useUpdateAircraft,
} from "@/lib/hooks/aircrafts/aircrafts"
import {
  useCreateTailNumber,
  useUpdateTailNumber,
} from "@/lib/hooks/aircrafts/tail-numbers"
import { useUnits } from "@/lib/hooks/units/units"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

import { tailNumberFormDefaultValues } from "../../constants"
import {
  stepsOrder,
  tabValidations,
} from "../../constants/validation-steps-tail-number"
import { AircraftFormTabs, TailNumberFormTabs } from "../../types"
import { Deletee } from "../option-delete-warning"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<TailNumberFormValues>
}

export default function TailNumberForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props

  const [closeWarningOpen, setCloseWarningOpen] = useState(false)

  const [deleteWarning, setDeleteWarning] = useState<Deletee | null>(null)

  const [hasDelete, setHasDelete] = useState(false)

  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateTailNumber()

  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateTailNumber()

  const [tabValue, setTabValue] = useState<TailNumberFormTabs>("tail-numbers")

  const [validatedSteps, setValidatedSteps] = useState<
    Record<TailNumberFormTabs, boolean>
  >({
    "tail-numbers": isEdit ? true : false,
    "measurement-units": isEdit ? true : false,
    "aircraft-details": isEdit ? true : false,
    "door-dimensions": isEdit ? true : false,
    volume: isEdit ? true : false,
  })

  const isAllValidated = !Object.values(validatedSteps).some((item) => !item)

  const { data: aircrafts } = useAircrafts({
    page: 1,
    page_size: 999,
  })

  const aircraftSelectOptions = aircrafts?.data.map((aircraft) => {
    return {
      value: aircraft.id,
      label: [
        aircraft.manufacturer.name,
        aircraft.aircraft_type.name,
        aircraft.version.version,
      ].join(" "),
    }
  })

  const selectedAircraftId = form.watch("aircraft_id")

  useEffect(() => {
    const selectedAircraft: Partial<Aircraft> = {
      ...aircrafts?.data.find((item) => item.id === selectedAircraftId),
      aircraft_tail_numbers: undefined,
      manufacturer: undefined,
      aircraft_type: undefined,
      version: undefined,
    }
    if (selectedAircraft && !isEdit) {
      const newDefaults: Partial<TailNumberFormValues> = {
        ...selectedAircraft,
        volume_unit_id: selectedAircraft.volume_unit?.id,
        weight_unit_id: selectedAircraft.weight_unit?.id,
        dimension_unit_id: selectedAircraft.dimension_unit?.id,
        body_type_id: selectedAircraft.body_type?.id,
        gl_code_id: selectedAircraft.gl_code?.id,
      }
      Object.entries(newDefaults).forEach(([key, value]) => {
        value &&
          typeof value === "string" &&
          form.setValue(key as Path<TailNumberFormValues>, value)
      })
    }
  }, [selectedAircraftId])

  const { data: aircraftBodyTypes } = useAircraftBodyTypes()
  const { data: aircraftStatuses } = useAircraftStatuses()

  const { data: unitsW } = useUnits({
    category: "weight",
  })

  const { data: unitsVol } = useUnits({
    category: "volume",
  })

  const { data: unitsLen } = useUnits({
    category: "length",
  })

  const aircraftStatusOptions = aircraftStatuses?.map((status) => ({
    value: String(status.ID),
    label: status.Name,
  }))

  const aircraftBodyTypesOptions = aircraftBodyTypes?.map((bodyType) => ({
    value: String(bodyType.ID),
    label: bodyType.Name,
  }))

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

  async function handleSubmitTailNumber(payload: TailNumberFormValues) {
    if (isEdit) {
      // Update aircraft
      await updateMutateAsync(
        { id: currentOpen, ...payload },
        {
          onError: (error) => {
            console.error(error)
            toast({
              title: "Error!",
              description: "An error occurred while updating tail nnumber",
            })
          },
          onSuccess: (data) => {
            onOpenChange(false)
            console.log("res data", data)
            form.reset(tailNumberFormDefaultValues)
            toast({
              title: "Success!",
              description: "Tail number updated successfully",
            })
          },
        }
      )
    } else {
      await mutateAsync(payload, {
        onError: (error) => {
          console.error(error)
          toast({
            title: "Error!",
            description: "An error occurred while creating tail number",
          })
        },
        onSuccess: (data) => {
          onOpenChange(false)
          console.log("res data", data)
          toast({
            title: "Success!",
            description: "Tail Number created successfully",
          })
        },
      })
    }
  }

  const selectedWeightUnitSymbol = (
    <span className="text-xs text-muted-foreground">
      {unitsW?.find((unit) => unit.ID === form.watch("weight_unit_id"))?.Symbol}
    </span>
  )

  const selectedVolumeUnitSymbol = (
    <span className="text-xs text-muted-foreground">
      {
        unitsVol?.find((unit) => unit.ID === form.watch("volume_unit_id"))
          ?.Symbol
      }
    </span>
  )

  const selectedDimensionUnitSymbol = (
    <span className="text-xs text-muted-foreground">
      {
        unitsLen?.find((unit) => unit.ID === form.watch("dimension_unit_id"))
          ?.Symbol
      }
    </span>
  )

  // this is to reset the form states on modal close
  useEffect(() => {
    if (!currentOpen) {
      form.reset(tailNumberFormDefaultValues)
      setTabValue("tail-numbers")
      setHasDelete(false)
    }
    setValidatedSteps({
      "tail-numbers": isEdit ? true : false,
      "measurement-units": isEdit ? true : false,
      "aircraft-details": isEdit ? true : false,
      "door-dimensions": isEdit ? true : false,
      volume: isEdit ? true : false,
    })
  }, [currentOpen, form, tailNumberFormDefaultValues, isEdit])

  const { mutateAsync: deleteMutateAsync, isPending: isPendingDelete } =
    useDeleteAircraft()

  async function onDelete(id?: Aircraft["id"]) {
    // waiting for backend
    console.log({ id })
  }

  const handleTabChange = async (newTab: string) => {
    const safeNewTab = newTab as TailNumberFormTabs

    if (safeNewTab === tabValue) return // No change if the same tab is clicked

    const movingForward =
      stepsOrder.indexOf(safeNewTab) > stepsOrder.indexOf(tabValue)

    // Allow backward navigation without validation
    if (!movingForward) {
      setTabValue(safeNewTab)
      return
    }

    // Proceed with validation only if moving forward
    const isValidated = await form.trigger(tabValidations[tabValue])
    setValidatedSteps((prev) => ({
      ...prev,
      [tabValue]: isValidated,
    }))

    if (isValidated) {
      setTabValue(safeNewTab)
    }
  }

  return (
    <Dialog
      open={!!currentOpen}
      onOpenChange={(_open) => {
        if (!form.formState.isDirty) {
          onOpenChange(false)
          return
        }
        if (!_open) setCloseWarningOpen(true)
      }}
    >
      <DialogContent hideCloseButton className="h-[90dvh] min-w-[1100px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitTailNumber, (data) =>
              console.log({ data })
            )}
            className="flex h-full w-full flex-col justify-start gap-6"
          >
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Tail Number" : "Create Tail Number"}
              </DialogTitle>
            </DialogHeader>
            <Tabs
              value={tabValue}
              onValueChange={handleTabChange}
              className="flex h-full flex-row items-start justify-start gap-4 space-y-0"
            >
              <div className="space-y-2">
                <TabsList className="h-fit w-52 flex-col">
                  <TabsTrigger
                    value="tail-numbers"
                    className="w-full justify-start py-1.5"
                  >
                    <PlaneIcon className="mr-2 size-4" />
                    Tail Number
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!validatedSteps["tail-numbers"]}
                    value="measurement-units"
                    className="w-full justify-start py-1.5"
                  >
                    <RulerIcon className="mr-2 size-4" />
                    Measurement Units
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!validatedSteps["measurement-units"]}
                    value="aircraft-details"
                    className="w-full justify-start py-1.5"
                  >
                    <FileSlidersIcon className="mr-2 size-4" />
                    Capacity Details
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!validatedSteps["aircraft-details"]}
                    value="door-dimensions"
                    className="w-full justify-start py-1.5"
                  >
                    <DoorClosedIcon className="mr-2 size-4" />
                    Door Dimensions
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!validatedSteps["door-dimensions"]}
                    value="volume"
                    className="w-full justify-start py-1.5"
                  >
                    <BoxesIcon className="mr-2 size-4" />
                    Volume
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent className="w-full flex-1" value="tail-numbers">
                <Card className="divide-y rounded-md">
                  <CardHeader className="space-y-0">
                    <CardTitle className="font-semibold">Tail Number</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2 pt-2">
                    <InputSwitch<TailNumberFormValues>
                      name={"tail_number"}
                      placeholder="Tail Number"
                      label="Tail Number"
                      type="text"
                    />
                    <InputSwitch<TailNumberFormValues>
                      name={"aircraft_id"}
                      placeholder="Select Aircraft Type"
                      label="Aircraft Type"
                      type="select"
                      selectOptions={aircraftSelectOptions}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Aircraft Status"
                      name="status_id"
                      type="select"
                      className="rounded-md"
                      defaultValue={aircraftStatusOptions?.[0].value}
                      selectOptions={aircraftStatusOptions}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                className="h-full w-full flex-1"
                value="measurement-units"
              >
                <Card className="flex flex-col divide-y rounded-md">
                  <CardHeader className="w-full">
                    <CardTitle className="font-semibold">
                      Measurement Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid w-full grid-cols-3 gap-2 pt-2">
                    <InputSwitch<TailNumberFormValues>
                      label="Weight Unit"
                      name="weight_unit_id"
                      type="select"
                      selectOptions={weightUnitsOptions}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Volume Unit"
                      name="volume_unit_id"
                      type="select"
                      selectOptions={volumeUnitsOptions}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Dimension Unit"
                      name="dimension_unit_id"
                      type="select"
                      selectOptions={lengthUnitsOptions}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                className="h-full w-full flex-1"
                value="door-dimensions"
              >
                <Card className="flex flex-col divide-y rounded-md">
                  <CardHeader className="w-full">
                    <CardTitle className="font-semibold">
                      Door Dimension
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid w-full grid-cols-3 gap-2 pt-2">
                    <InputSwitch<TailNumberFormValues>
                      label="AFT (H)"
                      name="aft_h"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="AFT (W)"
                      name="aft_w"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="FWD (H)"
                      name="fwd_h"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="FWD (W)"
                      name="fwd_w"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Bulk (H)"
                      name="bulk_h"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Bulk (W)"
                      name="bulk_w"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent className="h-full w-full flex-1" value="volume">
                <Card className="flex flex-col divide-y rounded-md">
                  <CardHeader className="w-full">
                    <CardTitle className="font-semibold">Volume</CardTitle>
                  </CardHeader>
                  <CardContent className="grid w-full grid-cols-3 gap-2 pt-2">
                    <InputSwitch<TailNumberFormValues>
                      label="FWT"
                      name="fwt"
                      type="number"
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="FWD"
                      name="fwd"
                      type="number"
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Bulk"
                      name="bulk"
                      type="number"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                className="h-full w-full flex-1"
                value="aircraft-details"
              >
                <Card className="flex flex-col divide-y rounded-md">
                  <CardHeader>
                    <CardTitle className="font-semibold">
                      Aircraft Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid w-full grid-cols-3 gap-2 pt-2">
                    <InputSwitch<TailNumberFormValues>
                      label="MTOW"
                      name="mtow"
                      type="number"
                      rightIcon={selectedWeightUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Zero Fuel Weight"
                      name="max_zero_fuel_weight"
                      type="number"
                      rightIcon={selectedWeightUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Body Type"
                      name="body_type_id"
                      type="select"
                      selectOptions={aircraftBodyTypesOptions}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Passenger Capacity"
                      name="passenger_capacity"
                      type="number"
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="ULD Positions"
                      name="uld_position"
                      type="number"
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Landing Weight"
                      name="landing_weight"
                      type="number"
                      rightIcon={selectedWeightUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Cargo Capacity"
                      name="cargo_capacity"
                      type="number"
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Bulk Capacity Weight"
                      name="max_bulk_capacity_weight"
                      type="number"
                      rightIcon={selectedWeightUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Bulk Capacity Volume"
                      name="max_bulk_capacity_volume"
                      type="number"
                      rightIcon={selectedVolumeUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Volume"
                      name="max_volume"
                      type="number"
                      rightIcon={selectedVolumeUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Restricted Weight Per Piece"
                      name="restricted_weight_piece"
                      type="number"
                      rightIcon={selectedWeightUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Dimension per Piece (Length)"
                      name="max_dimension_length"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Dimension per Piece (Breadth)"
                      name="max_dimension_breadth"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="Max Dimension per Piece (Height)"
                      name="max_dimension_height"
                      type="number"
                      rightIcon={selectedDimensionUnitSymbol}
                    />
                    <InputSwitch<TailNumberFormValues>
                      label="GL Code"
                      name="gl_code_id"
                      type="select"
                      selectOptions={aircraftBodyTypesOptions}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent className="flex-1" value="activity-log">
                <Card className="w-full rounded-md p-4"></Card>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setCloseWarningOpen(true)}
              >
                Cancel
              </Button>
              {typeof currentOpen === "string" && (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      type="button"
                      variant={"secondary"}
                      isLoading={isPendingDelete}
                    >
                      <Trash2Icon className="mr-2 size-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant={"destructive"}
                        onClick={() => onDelete(currentOpen)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                disabled={tabValue === stepsOrder.at(0)}
                type="button"
                variant={"secondary"}
                onClick={() => {
                  const stepIndex = stepsOrder.findIndex(
                    (item) => item === tabValue
                  )
                  setTabValue(stepsOrder[stepIndex - 1])
                }}
              >
                <ChevronLeftCircleIcon className="mr-2 size-4" />
                Prev
              </Button>

              <Button
                type="button"
                className={cn(
                  tabValue === stepsOrder.at(-1) && !isAllValidated && "hidden"
                )}
                disabled={tabValue === stepsOrder.at(-1)}
                variant={isAllValidated ? "secondary" : "button-primary"}
                onClick={async () => {
                  const stepIndex = stepsOrder.findIndex(
                    (item) => item === tabValue
                  )
                  const nextStepIndex = stepIndex + 1
                  const isValidated = await form.trigger(
                    tabValidations[tabValue]
                  )
                  setValidatedSteps((prev) => ({
                    ...prev,
                    [tabValue]: isValidated,
                  }))
                  isValidated && setTabValue(stepsOrder[nextStepIndex])
                }}
              >
                <ChevronRightCircleIcon className="mr-2 size-4" />
                Next
              </Button>

              {(tabValue === stepsOrder.at(-1) || isEdit || isAllValidated) && (
                <Button
                  type="submit"
                  variant={"button-primary"}
                  isLoading={isPendingCreate || isPendingUpdate}
                >
                  <SaveIcon className="mr-2 size-4" />
                  Save
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <AlertDialog open={closeWarningOpen} onOpenChange={setCloseWarningOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You may have unsaved changes. Continue?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continue editing</AlertDialogCancel>
            <AlertDialogAction
              variant={"button-primary"}
              onClick={() => onOpenChange(false)}
            >
              Yes, discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={!currentOpen && hasDelete}
        onOpenChange={(_open) => {
          if (!_open) setHasDelete(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You may have deleted an aircraft type or tail number that is
              assigned to an upcoming flight
            </AlertDialogTitle>
            <AlertDialogDescription>
              This flight needs a new aircraft assigned to it
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ignore</AlertDialogCancel>
            <Link href={"/dashboards/flights"}>
              <AlertDialogAction variant={"button-primary"}>
                Fix This
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
