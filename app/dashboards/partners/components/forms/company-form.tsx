"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TailNumberFormValues } from "@/schemas/aircraft/tail-numbers"
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react"
import { Path, UseFormReturn } from "react-hook-form"
import { useStep } from "usehooks-ts"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
import {
  useAircrafts,
  useCreateAircraft,
  useDeleteAircraft,
  useUpdateAircraft,
} from "@/lib/hooks/aircrafts/aircrafts"
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
import InputSwitch from "@/components/form/InputSwitch"

import {
  CompanyFormTabs,
  companyFormTabsList,
} from "../../constants/company-tabs-list"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<any>
}

const getTabIndexValue = (value: CompanyFormTabs) =>
  companyFormTabsList.findIndex((item) => item.value === value).toString()

export default function TailNumberForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props

  const [closeWarningOpen, setCloseWarningOpen] = useState(false)

  const [hasDelete, setHasDelete] = useState(false)

  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateAircraft()

  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateAircraft()

  const { data: aircraftBodyTypes } = useAircraftBodyTypes()

  const { data: aircraftStatuses } = useAircraftStatuses()

  const [step, stepControls] = useStep(companyFormTabsList.length)

  const { data: aircrafts } = useAircrafts({
    page: 1,
    page_size: 999,
  })

  const [validatedSteps, setValidatedSteps] = useState<
    Record<CompanyFormTabs, boolean>
  >({
    "general-info": isEdit ? true : false,
    "address-book": isEdit ? true : false,
    "billing-details": isEdit ? true : false,
  })

  const isAllValidated = !Object.values(validatedSteps).some((item) => !item)
  // default values

  // this is to set default values on create

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

  async function handleSubmitTailNumber(data: TailNumberFormValues) {
    // waiting for backend
    console.log({ data })
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
      form.reset({})
      stepControls.reset()
      setHasDelete(false)
    }
    setValidatedSteps({
      "general-info": isEdit ? true : false,
      "address-book": isEdit ? true : false,
      "billing-details": isEdit ? true : false,
    })
  }, [currentOpen, form, isEdit])

  const { mutateAsync: deleteMutateAsync, isPending: isPendingDelete } =
    useDeleteAircraft()

  async function onDelete(id?: Aircraft["id"]) {
    // waiting for backend
    console.log({ id })
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
              value={String(step)}
              onValueChange={(val) => stepControls.setStep(Number(val))}
              className="flex h-full flex-row items-start justify-start gap-4 space-y-0"
            >
              <div className="space-y-2">
                <TabsList className="h-fit w-52 flex-col">
                  {companyFormTabsList.map((item, index) => (
                    <TabsTrigger
                      key={item.value}
                      value={index.toString()}
                      disabled={
                        index !== 0 &&
                        validatedSteps[companyFormTabsList[index - 1].value]
                      }
                      className="w-full justify-start py-1.5"
                    >
                      <item.icon className="mr-2 size-4" />
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent value={getTabIndexValue("general-info")}>
                <Card className="flex flex-col divide-y rounded-md">
                  <CardHeader className="w-full">
                    <CardTitle className="font-semibold">
                      General Info
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
                disabled={!stepControls.canGoToPrevStep}
                type="button"
                variant={"secondary"}
                onClick={() => stepControls.goToPrevStep()}
              >
                <ChevronLeftCircleIcon className="mr-2 size-4" />
                Prev
              </Button>

              <Button
                type="button"
                className={cn(
                  !stepControls.canGoToNextStep && !isAllValidated && "hidden"
                )}
                disabled={!stepControls.canGoToNextStep}
                variant={isAllValidated ? "secondary" : "button-primary"}
                onClick={async () => {
                  const isValidated = await form.trigger(
                    // companyFormTabsList[step].validationFields
                    []
                  )
                  setValidatedSteps((prev) => ({
                    ...prev,
                    [companyFormTabsList[step].value]: isValidated,
                  }))
                  isValidated && stepControls.goToNextStep()
                }}
              >
                <ChevronRightCircleIcon className="mr-2 size-4" />
                Next
              </Button>

              {(!stepControls.canGoToNextStep || isEdit || isAllValidated) && (
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
