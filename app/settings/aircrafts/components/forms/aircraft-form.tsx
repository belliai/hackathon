"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { AircraftGeneralFields } from "@/schemas/aircraft/general-fields"
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react"
import { Path, UseFormReturn } from "react-hook-form"
import { useStep } from "usehooks-ts"

import { Aircraft, CreateAircraftRequest } from "@/types/aircraft/aircraft"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftDefaults } from "@/lib/hooks/aircrafts/aircraft-defaults"
import {
  useAircraftManufacturers,
  useDeleteAircraftManufacturers,
  useUpsertAircraftManufacturers,
} from "@/lib/hooks/aircrafts/aircraft-type/manufacturers"
import {
  useAircraftTypes,
  useDeleteAircraftTypes,
  useUpsertAircraftTypes,
} from "@/lib/hooks/aircrafts/aircraft-type/types"
import {
  useAircraftVersions,
  useDeleteAircraftVersions,
  useUpsertAircraftVersions,
} from "@/lib/hooks/aircrafts/aircraft-type/versions"
import {
  useCreateAircraft,
  useDeleteAircraft,
  useUpdateAircraft,
} from "@/lib/hooks/aircrafts/aircrafts"
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
import { Option } from "@/components/ui/combobox-admin-input"
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

import { aircraftFormDefaultValues } from "../../constants"
import { aircraftFormTabsTrigger } from "../../constants/tab-triggers"
import { aircractTabValidations } from "../../constants/validation-steps-aircraft"
import useGeneralFieldSections from "../../hooks/use-field-sections"
import { AircraftFormTabs } from "../../types"
import OptionDeleteWarning, { Deletee } from "../option-delete-warning"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<AircraftFormValues>
}

export default function AircraftTypeForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props

  const [closeWarningOpen, setCloseWarningOpen] = useState(false)
  const [deleteWarning, setDeleteWarning] = useState<Deletee | null>(null)
  const [hasDelete, setHasDelete] = useState(false)
  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateAircraft()
  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateAircraft()

  const { fieldSections, triggers } = useGeneralFieldSections()
  const visibleSections = useMemo(
    () => [aircraftFormTabsTrigger, ...triggers],
    [triggers]
  )

  const [step, stepControl] = useStep(15)
  const canGoToNextStep = step < visibleSections.length

  const [validatedSteps, setValidatedSteps] = useState<boolean[]>(
    visibleSections.map(() => false)
  )
  const isAllValidated = !validatedSteps.some((item) => !item)

  // default values
  const { aircraftDefaults } = useAircraftDefaults()

  // this is to set default values on create
  useEffect(() => {
    if (aircraftDefaults && !isEdit) {
      const newDefaults = {
        ...aircraftDefaults,
        ID: undefined,
        created_at: undefined,
        updated_at: undefined,
      }
      Object.entries(newDefaults).forEach(([key, value]) => {
        value && form.setValue(key as Path<AircraftFormValues>, value)
      })
    }
  }, [aircraftDefaults, currentOpen])

  // manufacturers
  const { data: aircraftManufacturers, isLoading: isLoadingManufacturers } =
    useAircraftManufacturers()
  const { mutate: upsertAircraftManufacturer } =
    useUpsertAircraftManufacturers()
  const { mutate: deleteAircraftManufacturer } =
    useDeleteAircraftManufacturers()

  const aircraftManufacturerOptions =
    aircraftManufacturers?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? []

  const selectedManufacturer = aircraftManufacturerOptions.find(
    (item) => item.value === form.watch("manufacturer_id")
  )

  const { data: aircraftBodyTypes } = useAircraftBodyTypes()
  const aircraftBodyTypesOptions = aircraftBodyTypes?.map((bodyType) => ({
    value: String(bodyType.ID),
    label: bodyType.Name,
  }))

  // types
  const { data: aircraftTypes } = useAircraftTypes(selectedManufacturer?.value)
  const { mutate: upsertAircraftType } = useUpsertAircraftTypes()
  const { mutate: deleteAircraftType } = useDeleteAircraftTypes()

  const aircraftTypesOptions =
    aircraftTypes?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? []

  const selectedType = aircraftTypesOptions.find(
    (item) => item.value === form.watch("aircraft_type_id")
  )

  // versions
  const { data: aircraftVersions } = useAircraftVersions(selectedType?.value)
  const { mutate: upsertAircraftVersion } = useUpsertAircraftVersions()
  const { mutate: deleteAircraftVersion } = useDeleteAircraftVersions()

  const aircraftVersionsOptions =
    aircraftVersions?.map((item) => ({
      value: item.id,
      label: item.version,
    })) ?? []

  const selectedVersion = aircraftVersionsOptions.find(
    (item) => item.value === form.watch("version_id")
  )

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

  async function handleSubmitAircraft(data: AircraftFormValues) {
    const payload: CreateAircraftRequest = {
      ...data,
    }

    if (isEdit) {
      // Update aircraft
      await updateMutateAsync(
        { id: currentOpen, ...payload },
        {
          onError: (error) => {
            console.error(error)
            toast({
              title: "Error!",
              description: "An error occurred while updating aircraft",
            })
          },
          onSuccess: (data) => {
            onOpenChange(false)
            console.log("res data", data)
            form.reset(aircraftFormDefaultValues)
            toast({
              title: "Success!",
              description: "Aircraft updated successfully",
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
            description: "An error occurred while creating aircraft",
          })
        },
        onSuccess: (data) => {
          onOpenChange(false)
          console.log("res data", data)
          toast({
            title: "Success!",
            description: "Aircraft created successfully",
          })
        },
      })
    }
  }

  // this is to reset the form states on modal close
  useEffect(() => {
    if (!currentOpen) {
      form.reset(aircraftFormDefaultValues)
      stepControl.reset()
      setHasDelete(false)
    }
    setValidatedSteps(visibleSections.map(() => false))
  }, [currentOpen, form, aircraftFormDefaultValues, isEdit])

  const { mutateAsync: deleteMutateAsync, isPending: isPendingDelete } =
    useDeleteAircraft()

  async function onDelete(id?: Aircraft["id"]) {
    if (!id) return
    setHasDelete(true)
    await deleteMutateAsync(
      { id },
      {
        onError: (error) => {
          console.error(error)
          toast({
            title: "Error!",
            description: "An error occurred while deleting aircraft",
          })
        },
        onSuccess: (data) => {
          console.log("res data", data)
          onOpenChange(false)
          toast({
            title: "Success!",
            description: "Aircraft deleted successfully",
          })
        },
      }
    )
  }

  // Check duplicate and show toast error message
  const showErrorToast = (errorMsg: string) => {
    toast({
      title: "Error!",
      description: errorMsg,
      variant: "destructive",
    })
  }

  type CheckForDuplicatesParams<T> = {
    items: T[]
    keyToCheck: keyof T
    errorMsg: string
  }

  enum OptionType {
    Manufacturer = "Manufacturer",
    Type = "Type",
    Version = "Version",
  }

  const optionsMap: Record<OptionType, Option[]> = {
    [OptionType.Manufacturer]: aircraftManufacturerOptions,
    [OptionType.Type]: aircraftTypesOptions,
    [OptionType.Version]: aircraftVersionsOptions,
  }

  const getValueStep = useCallback(
    (value: string) => {
      return visibleSections.findIndex((item) => item.key === value) + 1
    },
    [visibleSections]
  )

  function checkDuplicate(option: OptionType, newLabel: string): boolean {
    const items = optionsMap[option]
    if (
      items.some((item) => item.label.toLowerCase() === newLabel.toLowerCase())
    ) {
      showErrorToast(`${option} ${newLabel} already exists`)
      return true
    }
    return false
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
      aircractTabValidations[visibleSections[step].key as AircraftFormTabs]
    )

    if (isValidated) {
      setValidatedSteps((prev) => {
        prev[step - 1] = isValidated
        return prev
      })
      stepControl.setStep(clickedTabIndex)
    }
  }

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
            onSubmit={form.handleSubmit(handleSubmitAircraft, (data) =>
              console.log({ data })
            )}
            className="flex h-full w-full flex-col justify-start gap-6"
          >
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Aircraft Type" : "Create Aircraft Type"}
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
                value={String(getValueStep("aircraft-type"))}
              >
                <Card className="divide-y rounded-md">
                  <CardHeader className="space-y-0">
                    <CardTitle className="font-semibold">
                      Aircraft Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2 pt-2">
                    <InputSwitch<AircraftFormValues>
                      label="Manufacturer"
                      name="manufacturer_id"
                      type="combobox-admin"
                      selectOptions={aircraftManufacturerOptions}
                      isLoading={isLoadingManufacturers}
                      onDelete={(option) => {
                        setDeleteWarning({
                          type: "manufacturer",
                          id: option.value,
                          label: option.label,
                        })
                      }}
                      onCreate={(name) => {
                        if (checkDuplicate(OptionType.Manufacturer, name)) {
                          return
                        }
                        upsertAircraftManufacturer({
                          name,
                        })
                      }}
                      onEdit={(option) => {
                        if (
                          checkDuplicate(OptionType.Manufacturer, option.label)
                        ) {
                          return
                        }
                        upsertAircraftManufacturer({
                          name: option.label,
                          ID: option.value,
                        })
                      }}
                    />
                    <InputSwitch<AircraftFormValues>
                      label="Type"
                      name="aircraft_type_id"
                      type="combobox-admin"
                      selectOptions={aircraftTypesOptions}
                      disabled={!selectedManufacturer}
                      onDelete={(option) => {
                        setDeleteWarning({
                          type: "type",
                          id: option.value,
                          label: option.label,
                        })
                      }}
                      onCreate={(name) => {
                        if (!selectedManufacturer) return
                        if (checkDuplicate(OptionType.Type, name)) {
                          return
                        }
                        upsertAircraftType({
                          name,
                          aircraft_manufacturer_id: selectedManufacturer.value,
                        })
                      }}
                      onEdit={(option) => {
                        if (!selectedManufacturer) return
                        if (checkDuplicate(OptionType.Type, option.label)) {
                          return
                        }
                        upsertAircraftType({
                          name: option.label,
                          id: option.value,
                          aircraft_manufacturer_id: selectedManufacturer.value,
                        })
                      }}
                    />
                    <InputSwitch<AircraftFormValues>
                      label="Version"
                      name="version_id"
                      type="combobox-admin"
                      selectOptions={aircraftVersionsOptions}
                      disabled={!selectedType}
                      onDelete={(option) => {
                        setDeleteWarning({
                          type: "version",
                          id: option.value,
                          label: option.label,
                        })
                      }}
                      onCreate={(name) => {
                        if (!selectedType) return
                        if (checkDuplicate(OptionType.Version, name)) {
                          return
                        }
                        upsertAircraftVersion({
                          version: name,
                          aircraft_type_id: selectedType.value,
                        })
                      }}
                      onEdit={(option) => {
                        if (!selectedType) return
                        if (checkDuplicate(OptionType.Version, option.label)) {
                          return
                        }
                        upsertAircraftVersion({
                          version: option.label,
                          id: option.value,
                          aircraft_type_id: selectedType.value,
                        })
                      }}
                    />
                    <InputSwitch<AircraftFormValues>
                      label="Body Type"
                      name="body_type_id"
                      type="select"
                      selectOptions={aircraftBodyTypesOptions}
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
                      <AlertDialogDescription>
                        This will delete {selectedManufacturer?.label}{" "}
                        {selectedType?.label} {selectedVersion?.label}
                      </AlertDialogDescription>
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
                    aircractTabValidations[key as AircraftFormTabs]
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
      <OptionDeleteWarning
        open={!!deleteWarning}
        onOpenChange={(_open) => {
          !_open && setDeleteWarning(null)
        }}
        onConfirm={({ id, type }) => {
          switch (type) {
            case "manufacturer":
              deleteAircraftManufacturer(id)
              if (id === form.watch("manufacturer_id")) {
                form.setValue("manufacturer_id", "")
              }
              break
            case "type":
              deleteAircraftType(id)
              if (id === form.watch("aircraft_type_id")) {
                form.setValue("aircraft_type_id", "")
              }
              break
            case "version":
              deleteAircraftVersion(id)
              if (id === form.watch("version_id")) {
                form.setValue("version_id", "")
              }
              break
          }
          // should check whether tail numbers with the deleted (manufacturer | type | version) is assigned a flight or not
          // when the flights API is ready maybe?
          // if yes then set to true, else false
          setHasDelete(true)
        }}
        deletee={deleteWarning}
      />
    </Dialog>
  )
}
