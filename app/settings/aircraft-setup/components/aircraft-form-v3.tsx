"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  FileClockIcon,
  FileSlidersIcon,
  PlaneIcon,
  PlusIcon,
  SaveIcon,
  ScrollTextIcon,
  Trash,
  Trash2Icon,
} from "lucide-react"
import { Path, useFieldArray, UseFormReturn } from "react-hook-form"

import { Aircraft, CreateAircraftRequest } from "@/types/aircraft/aircraft"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftDefaults } from "@/lib/hooks/aircrafts/aircraft-defaults"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

import { formDefaultValues } from "../constants"
import { detailsFields, tabValidations } from "../constants/validation-steps"
import OptionDeleteWarning, { Deletee } from "./option-delete-warning"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<AircraftFormValues>
}

type Tabs = "aircraft-type" | "aircraft-tail-numbers" | "aircraft-details"

const stepsOrder = [
  "aircraft-type",
  "aircraft-tail-numbers",
  "aircraft-details",
]

export default function AircraftTypeForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props

  const [closeWarningOpen, setCloseWarningOpen] = useState(false)

  const [deleteWarning, setDeleteWarning] = useState<Deletee | null>(null)

  const [hasDelete, setHasDelete] = useState(false)

  const fieldArray = useFieldArray({
    control: form.control,
    name: "aircraft_tail_numbers",
  })

  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateAircraft()

  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateAircraft()

  const { data: aircraftBodyTypes } = useAircraftBodyTypes()

  const { data: aircraftStatuses } = useAircraftStatuses()

  const [tabValue, setTabValue] = useState<Tabs>("aircraft-type")

  const [validatedSteps, setValidatedSteps] = useState({
    "aircraft-type": isEdit ? true : false,
    "aircraft-tail-numbers": isEdit ? true : false,
    "aircraft-details": isEdit ? true : false,
  });


  const isAllValidated = !Object.values(validatedSteps).some((item) => !item)
  // default values
  const { aircraftDefaults, updateAircraftDefaults } = useAircraftDefaults()

  const saveDefaults = async () => {
    const validation = await form.trigger(detailsFields)
    if (!validation) return
    await updateAircraftDefaults(form.getValues(), {
      onSuccess: () => {
        toast({
          title: "Success!",
          description: "Aircraft default values has been updated!",
        })
      },
      onError: (error) => {
        console.error(error)
        toast({
          title: "Error!",
          description: "An error occurred while saving aircraft default values",
        })
      },
    })
  }

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

  async function handleSubmitAircraft(data: AircraftFormValues) {
    if (checkForDuplicateTailNumbers(data.aircraft_tail_numbers)) {
      toast({
        title: "Error!",
        description: "There are duplicate tail numbers",
        variant: "destructive",
      })
      return
    }

    const tailNumberCount = data.aircraft_tail_numbers.length
    if (form.getValues("count") > tailNumberCount) {
      setHasDelete(true)
    }
    const payload: CreateAircraftRequest = {
      ...data,
      count: tailNumberCount,
      // Generate uuid for tail numbers
      aircraft_tail_numbers: data.aircraft_tail_numbers?.map((tailNumber) => ({
        ...tailNumber,
        id: tailNumber.id || undefined,
      })),
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
            form.reset(formDefaultValues)
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

  useEffect(() => {
    if (!currentOpen) {
      form.reset(formDefaultValues)
      setTabValue("aircraft-type")
      setHasDelete(false)
    }
  }, [currentOpen, form, formDefaultValues, isEdit])

  useEffect(() => {
    setValidatedSteps({
      "aircraft-type": isEdit ? true : false,
      "aircraft-tail-numbers": isEdit ? true : false,
      "aircraft-details": isEdit ? true : false,
    })
  }, [isEdit])

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

  function checkForDuplicateTailNumbers(
    tailNumbers: { tail_number: string }[]
  ): boolean {
    const seen = new Set()
    for (const { tail_number } of tailNumbers) {
      if (seen.has(tail_number)) {
        return true
      }
      seen.add(tail_number)
    }
    return false
  }

  const handleTabChange = async (newTab: string) => {

    const safeNewTab = newTab as Tabs;

    if (safeNewTab === tabValue) return; // No change if the same tab is clicked

    const currentIndex = stepsOrder.indexOf(tabValue);
    const newIndex = stepsOrder.indexOf(safeNewTab);
    const movingForward = newIndex > currentIndex;

    // Direct navigation if moving backwards or to an already validated step
    if (!movingForward || validatedSteps[safeNewTab]) {
        setTabValue(safeNewTab);
        return;
    }

    // Validate the current tab before moving forward
    const isValidated = await form.trigger(tabValidations[tabValue]);
    setValidatedSteps((prev) => ({
        ...prev,
        [tabValue]: isValidated,
    }));

    // If validation is successful, unlock the next tab and navigate to it
    if (isValidated) {
        // Unlock the next tab if available
        const nextTab = stepsOrder[newIndex];
        setValidatedSteps(prev => ({
            ...prev,
            [nextTab]: true // Ensure the next tab is set to true in validatedSteps
        }));
        setTabValue(safeNewTab);
    }
};



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
              value={tabValue}
              // onValueChange={async (val) => {
              //   const isValidated = await form.trigger(tabValidations[tabValue])
              //   setValidatedSteps((prev) => ({
              //     ...prev,
              //     [tabValue]: isValidated,
              //   }))
              //   if (isValidated) setTabValue(val as Tabs)
              // }}
              onValueChange={handleTabChange}
              className="flex h-full flex-row items-start justify-start gap-4 space-y-0"
            >
              <div className="space-y-2">
                <TabsList className="h-fit w-52 flex-col">
                  <TabsTrigger
                    value="aircraft-type"
                    className="w-full justify-start py-1.5"
                  >
                    <PlaneIcon className="mr-2 size-4" />
                    Aircraft Type
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!validatedSteps["aircraft-type"]}
                    value="aircraft-tail-numbers"
                    className="w-full justify-start py-1.5"
                  >
                    <ScrollTextIcon className="mr-2 size-4" />
                    Tail Numbers
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!validatedSteps["aircraft-tail-numbers"]}
                    value="aircraft-details"
                    className="w-full justify-start py-1.5"
                  >
                    <FileSlidersIcon className="mr-2 size-4" />
                    Aircraft Details
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={!isEdit}
                    value="activity-log"
                    className="w-full justify-start py-1.5"
                  >
                    <FileClockIcon className="mr-2 size-4" /> Activity Log
                  </TabsTrigger>
                </TabsList>
                <InputSwitch<AircraftFormValues>
                  label="Aircraft Status"
                  name="status_id"
                  type="select"
                  className="rounded-md"
                  selectOptions={aircraftStatusOptions}
                />
              </div>
              <TabsContent className="w-full flex-1" value="aircraft-type">
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
                        upsertAircraftManufacturer({
                          name,
                        })
                      }}
                      onEdit={(option) => {
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
                        upsertAircraftType({
                          name,
                          aircraft_manufacturer_id: selectedManufacturer.value,
                        })
                      }}
                      onEdit={(option) => {
                        if (!selectedManufacturer) return
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
                        upsertAircraftVersion({
                          version: name,
                          aircraft_type_id: selectedType.value,
                        })
                      }}
                      onEdit={(option) => {
                        if (!selectedType) return
                        upsertAircraftVersion({
                          version: option.label,
                          id: option.value,
                          aircraft_type_id: selectedType.value,
                        })
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                className="h-full w-full flex-1"
                value="aircraft-tail-numbers"
              >
                <Card className="flex h-full flex-1 flex-col divide-y rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="font-semibold">
                      Tail Numbers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <Table containerClassName="min-h-full h-5  overflow-y-auto">
                      <TableHeader className="border-b">
                        <TableHead className="pl-4 pr-1">Tail Number</TableHead>
                        <TableHead className="px-1">Status</TableHead>
                        <TableHead className="pl-1 pr-4"></TableHead>
                      </TableHeader>
                      <TableBody className="overflow-y-auto">
                        {fieldArray.fields?.map((field, index) => {
                          return (
                            <TableRow key={field.id}>
                              <TableCell className="pl-4 pr-1 align-top">
                                <InputSwitch<AircraftFormValues>
                                  name={`aircraft_tail_numbers.${index}.tail_number`}
                                  placeholder="Tail Number"
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<AircraftFormValues>
                                  name={`aircraft_tail_numbers.${index}.status_id`}
                                  type="select"
                                  selectOptions={aircraftStatusOptions}
                                />
                              </TableCell>
                              <TableCell className="w-9 pl-1 pr-4 align-top">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="destructive"
                                  onClick={() => {
                                    fieldArray.remove(index)
                                  }}
                                >
                                  <Trash className="size-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                        <TableRow className="hover:bg-transparent">
                          <TableCell colSpan={3} className="px-4 py-3">
                            <Button
                              className="w-full"
                              type="button"
                              onClick={() => {
                                fieldArray.append({
                                  status_id: "",
                                  tail_number: "",
                                })
                              }}
                              variant={"secondary"}
                              size={"sm"}
                            >
                              <PlusIcon className="mr-2 size-4" />
                              Add Tail Number
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                className="h-full w-full flex-1"
                value="aircraft-details"
              >
                <Card className="flex h-full flex-col divide-y rounded-md">
                  <CardHeader className="flex w-full flex-row items-center justify-between space-y-0">
                    <CardTitle className="font-semibold">
                      Aircraft Details
                    </CardTitle>
                    <div className="inline-flex items-center gap-1">
                      <Button
                        onClick={saveDefaults}
                        type="button"
                        size={"sm"}
                        className="h-7"
                        variant={"secondary"}
                      >
                        <SaveIcon className="mr-2 size-3" />
                        Save as default
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="w-full flex-1 p-0">
                    <div className="custom-scrollbar h-5 min-h-full space-y-4 overflow-y-auto p-4">
                      <div className="space-y-2">
                        <span className="font-semibold">Measurement Units</span>
                        <div className="grid grid-cols-3 gap-2">
                          <InputSwitch<AircraftFormValues>
                            label="Weight Unit"
                            name="weight_unit_id"
                            type="select"
                            selectOptions={weightUnitsOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Volume Unit"
                            name="volume_unit_id"
                            type="select"
                            selectOptions={volumeUnitsOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Dimension Unit"
                            name="dimension_unit_id"
                            type="select"
                            selectOptions={lengthUnitsOptions}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Details</span>
                        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="MTOW"
                            name="mtow"
                            type="number"
                            rightIcon={selectedWeightUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Zero Fuel Weight"
                            name="max_zero_fuel_weight"
                            type="number"
                            rightIcon={selectedWeightUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Body Type"
                            name="body_type_id"
                            type="select"
                            selectOptions={aircraftBodyTypesOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Passenger Capacity"
                            name="passenger_capacity"
                            type="number"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="ULD Positions"
                            name="uld_position"
                            type="number"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Landing Weight"
                            name="landing_weight"
                            type="number"
                            rightIcon={selectedWeightUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Cargo Capacity"
                            name="cargo_capacity"
                            type="number"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Bulk Capacity Weight"
                            name="max_bulk_capacity_weight"
                            type="number"
                            rightIcon={selectedWeightUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Bulk Capacity Volume"
                            name="max_bulk_capacity_volume"
                            type="number"
                            rightIcon={selectedVolumeUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Volume"
                            name="max_volume"
                            type="number"
                            rightIcon={selectedVolumeUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Restricted Weight Per Piece"
                            name="restricted_weight_piece"
                            type="number"
                            rightIcon={selectedWeightUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Dimension per Piece (Length)"
                            name="max_dimension_length"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Dimension per Piece (Breadth)"
                            name="max_dimension_breadth"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Dimension per Piece (Height)"
                            name="max_dimension_height"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="GL Code"
                            name="gl_code_id"
                            type="select"
                            selectOptions={aircraftBodyTypesOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            name="count"
                            type="hidden"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Door Dimensions</span>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="AFT (H)"
                            name="aft_h"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="AFT (W)"
                            name="aft_w"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="FWD (H)"
                            name="fwd_h"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="FWD (W)"
                            name="fwd_w"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Bulk (H)"
                            name="bulk_h"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Bulk (W)"
                            name="bulk_w"
                            type="number"
                            rightIcon={selectedDimensionUnitSymbol}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Volume</span>
                        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="FWT"
                            name="fwt"
                            type="number"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="FWD"
                            name="fwd"
                            type="number"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Bulk"
                            name="bulk"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
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
                disabled={tabValue === stepsOrder.at(0)}
                type="button"
                variant={"secondary"}
                onClick={() => {
                  const stepIndex = stepsOrder.findIndex(
                    (item) => item === tabValue
                  )
                  setTabValue(stepsOrder[stepIndex - 1] as Tabs)
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
                  isValidated && setTabValue(stepsOrder[nextStepIndex] as Tabs)
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
            <Link href={"/belli/flight-schedule-editor"}>
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
