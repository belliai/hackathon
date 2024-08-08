"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { TailNumberFormValues } from "@/schemas/aircraft/tail-numbers"
import { useQueryClient } from "@tanstack/react-query"
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react"
import { Path, UseFormReturn } from "react-hook-form"
import { useStep } from "usehooks-ts"

import { Aircraft } from "@/types/aircraft/aircraft"
import { TailNumber } from "@/types/aircraft/tail-number"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
import {
  route as aircraftRoute,
  useAircrafts,
} from "@/lib/hooks/aircrafts/aircrafts"
import {
  useCreateTailNumber,
  useDeleteTailNumber,
  useUpdateTailNumber,
} from "@/lib/hooks/aircrafts/tail-numbers"
import { useDefaultMeasurements } from "@/lib/hooks/units/default-measurement"
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
import { tailNumberFormTabsTrigger } from "../../constants/tab-triggers"
import { tailNumberTabValidations } from "../../constants/validation-steps-tail-number"
import useGeneralFieldSections from "../../hooks/use-field-sections"
import { TailNumberFormTabs } from "../../types"
import { Deletee } from "../option-delete-warning"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<TailNumberFormValues>
}

export default function TailNumberForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props
  const queryClient = useQueryClient()

  const [closeWarningOpen, setCloseWarningOpen] = useState(false)

  const [deleteWarning, setDeleteWarning] = useState<Deletee | null>(null)

  const [hasDelete, setHasDelete] = useState(false)

  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateTailNumber()

  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateTailNumber()

  const { fieldSections, triggers } = useGeneralFieldSections()
  const visibleSections = useMemo(
    () => [tailNumberFormTabsTrigger, ...triggers],
    [triggers]
  )

  const [step, stepControl] = useStep(15)
  const canGoToNextStep = step < visibleSections.length

  const [validatedSteps, setValidatedSteps] = useState<boolean[]>(
    visibleSections.map(() => false)
  )
  const isAllValidated = !validatedSteps.some((item) => !item)

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

  const aircraftStatusOptions = aircraftStatuses?.map((status) => ({
    value: String(status.ID),
    label: status.Name,
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
            queryClient.invalidateQueries({ queryKey: [aircraftRoute] })
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
          queryClient.invalidateQueries({ queryKey: [aircraftRoute] })
        },
      })
    }
  }

  const { data: defaultMeasurements } = useDefaultMeasurements()

  const selectedWeightUnitSymbol = (
    <span className="text-xs text-muted-foreground">
      {defaultMeasurements?.weight_unit.symbol}
    </span>
  )

  const selectedVolumeUnitSymbol = (
    <span className="text-xs text-muted-foreground">
      {defaultMeasurements?.volume_unit.symbol}
    </span>
  )

  const selectedDimensionUnitSymbol = (
    <span className="text-xs text-muted-foreground">
      {defaultMeasurements?.dimension_unit.symbol}
    </span>
  )

  const getRightIcon = (unit?: "weight" | "dimension" | "volume") => {
    switch (unit) {
      case "weight":
        return selectedWeightUnitSymbol
      case "dimension":
        return selectedDimensionUnitSymbol
      case "volume":
        return selectedVolumeUnitSymbol
      default:
        return undefined
    }
  }

  const getValueStep = useCallback(
    (value: string) => {
      return visibleSections.findIndex((item) => item.key === value) + 1
    },
    [visibleSections]
  )

  // this is to reset the form states on modal close
  useEffect(() => {
    if (!currentOpen) {
      form.reset(tailNumberFormDefaultValues)
      stepControl.reset()
      setHasDelete(false)
    }
    setValidatedSteps(visibleSections.map(() => false))
  }, [currentOpen, form, tailNumberFormDefaultValues, isEdit])

  const { mutateAsync: deleteMutateAsync, isPending: isPendingDelete } =
    useDeleteTailNumber()

  async function onDelete(id?: TailNumber["id"]) {
    if (!id) return
    setHasDelete(true)
    await deleteMutateAsync(
      { id },
      {
        onError: (error) => {
          console.error(error)
          toast({
            title: "Error!",
            description: "An error occurred while deleting tail number",
          })
        },
        onSuccess: (data) => {
          console.log("res data", data)
          onOpenChange(false)
          toast({
            title: "Success!",
            description: "Tail number deleted successfully",
          })
          queryClient.invalidateQueries({ queryKey: [aircraftRoute] })
        },
      }
    )
  }

  const handleTabChange = async (newTab: string) => {
    const clickedTabIndex = Number(newTab)

    if (clickedTabIndex === step) return // No change if the same tab is clicked

    const movingForward = clickedTabIndex > step
    // Allow backward navigation without validation
    if (!movingForward) {
      stepControl.setStep(clickedTabIndex)
      return
    }

    // Proceed with validation only if moving forward
    const isValidated = await form.trigger(
      tailNumberTabValidations[visibleSections[step].key as TailNumberFormTabs]
    )

    if (isValidated) {
      setValidatedSteps((prev) => {
        prev[step - 1] = isValidated
        return prev
      })
      stepControl.setStep(clickedTabIndex)
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
      <DialogContent hideCloseButton className="max-h-[90dvh] min-w-[1100px]">
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
              value={String(step)}
              onValueChange={handleTabChange}
              className="flex h-full flex-row items-start justify-start gap-4 space-y-0"
            >
              <div className="space-y-2">
                <TabsList className="h-fit w-52 flex-col">
                  {visibleSections.map((item, index) => (
                    <TabsTrigger
                      key={item.key}
                      value={String(index + 1)}
                      className="w-full justify-start py-1.5"
                      disabled={
                        index === 0 ? false : !validatedSteps[index - 1]
                      }
                    >
                      <item.icon className="mr-2 size-4" />
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent
                className="w-full flex-1"
                value={String(getValueStep("tail-numbers"))}
              >
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
                      disabled={isEdit}
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
              {fieldSections.map((section) => {
                if (!section) return null
                return (
                  <TabsContent
                    key={section.value}
                    className="h-full w-full flex-1"
                    value={String(getValueStep(section.value))}
                  >
                    <Card className="flex flex-col divide-y rounded-md">
                      <CardHeader className="w-full">
                        <CardTitle className="font-semibold">
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid w-full grid-cols-2 gap-2 pt-2">
                        {section.items.map((item) => {
                          return (
                            // @ts-ignore
                            <InputSwitch<AircraftGeneralFields>
                              key={item.name}
                              label={item.label}
                              name={item.name}
                              type={item.type}
                              selectOptions={item.selectOptions}
                              rightIcon={getRightIcon(item.unit)}
                            />
                          )
                        })}
                      </CardContent>
                    </Card>
                  </TabsContent>
                )
              })}
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
                disabled={!stepControl.canGoToPrevStep}
                type="button"
                variant={"secondary"}
                onClick={stepControl.goToPrevStep}
              >
                <ChevronLeftCircleIcon className="mr-2 size-4" />
                Prev
              </Button>

              <Button
                type="button"
                className={cn(!canGoToNextStep && !isAllValidated && "hidden")}
                disabled={!canGoToNextStep}
                variant={isAllValidated ? "secondary" : "button-primary"}
                onClick={async () => {
                  const key = visibleSections[step - 1].key
                  const isValidated = await form.trigger(
                    tailNumberTabValidations[key as TailNumberFormTabs]
                  )
                  setValidatedSteps((prev) => {
                    prev[step - 1] = isValidated
                    return prev
                  })
                  isValidated && stepControl.goToNextStep()
                }}
              >
                <ChevronRightCircleIcon className="mr-2 size-4" />
                Next
              </Button>

              {(!canGoToNextStep || isEdit || isAllValidated) && (
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
