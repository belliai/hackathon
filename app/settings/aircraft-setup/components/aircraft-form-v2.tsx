"use client"

import { useEffect } from "react"
import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import {
  FileClockIcon,
  PlaneIcon,
  PlusIcon,
  SaveIcon,
  Trash,
  Trash2Icon,
} from "lucide-react"
import { Path, useFieldArray, UseFormReturn } from "react-hook-form"

import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
import {
  useCreateAircraft,
  useDeleteAircraft,
  useUpdateAircraft,
} from "@/lib/hooks/aircrafts/aircrafts"
import { useUnits } from "@/lib/hooks/units/units"
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
import { aircraftTypes } from "../constants/aircraft-types"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<AircraftFormValues>
}

export default function AircraftTypeForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props

  const fieldArray = useFieldArray({
    control: form.control,
    name: "aircraft_tail_numbers",
  })

  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateAircraft()

  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateAircraft()

  const { data: aircraftBodyTypes, isLoading: isLoadingAircraftBodyTypes } =
    useAircraftBodyTypes()

  const { data: aircraftStatuses, isLoading: isLoadingAircraftStatuses } =
    useAircraftStatuses()

  const { data: unitsW, isLoading: isLoadingUnits } = useUnits({
    category: "weight",
  })

  const { data: unitsVol, isLoading: isLoadingUnitsVol } = useUnits({
    category: "volume",
  })

  const { data: unitsLen, isLoading: isLoadingUnitsLen } = useUnits({
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

  const aircraftManufacturerOptions = aircraftTypes.map((item) => ({
    value: item.manufacturer,
    label: item.manufacturer,
  }))

  const selectedManufacturer = aircraftTypes.find(
    (item) => item.manufacturer === form.watch("manufacturer")
  )

  const aircraftTypeOptions =
    selectedManufacturer?.types?.map((item) => ({
      value: item.type,
      label: item.type,
    })) ?? []

  const selectedType = selectedManufacturer?.types.find(
    (item) => item.type === form.watch("aircraft_type")
  )

  const aircraftVersionOptions =
    selectedType?.versions?.map((item) => ({
      value: item.version,
      label: item.version,
    })) ?? []

  const selectedVersion = selectedType?.versions.find(
    (item) => item.version === form.watch("version")
  )

  const selectedAircraftDetails = selectedVersion?.details

  useEffect(() => {
    if (!selectedAircraftDetails || isEdit) return
    Object.entries(selectedAircraftDetails).forEach(([key, value]) => {
      form.setValue(key as Path<AircraftFormValues>, value)
    })
  }, [selectedAircraftDetails, form, isEdit])

  async function handleSubmitAircraft(data: AircraftFormValues) {
    const payload: CreateAircraftRequest = {
      ...data,
      count: Number(data.aircraft_tail_numbers.length),
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

  const { mutateAsync: deleteMutateAsync, isPending: isPendingDelete } =
    useDeleteAircraft()

  async function onDelete(id?: Aircraft["ID"]) {
    if (!id) return
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

  return (
    <Dialog open={!!currentOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90dvh] min-w-[1100px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitAircraft, (data) =>
              console.log(data)
            )}
            className="flex h-full w-full flex-col justify-start gap-6"
          >
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Aircraft Type" : "Create Aircraft Type"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex w-full flex-1 flex-row items-stretch gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <Card className="divide-y rounded-md">
                  <CardHeader className="space-y-0">
                    <CardTitle className="font-semibold">
                      Aircraft Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2 pt-2">
                    <InputSwitch<AircraftFormValues>
                      label="Manufacturer"
                      name="manufacturer"
                      type="select"
                      selectOptions={aircraftManufacturerOptions}
                    />
                    <InputSwitch<AircraftFormValues>
                      label="Type"
                      name="aircraft_type"
                      type="select"
                      selectOptions={aircraftTypeOptions}
                      disabled={aircraftTypeOptions.length < 1}
                    />
                    <InputSwitch<AircraftFormValues>
                      label="Version"
                      name="version"
                      type="select"
                      selectOptions={aircraftVersionOptions}
                      disabled={aircraftVersionOptions.length < 1}
                    />
                  </CardContent>
                </Card>
                <Card className="flex flex-1 flex-col divide-y rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="font-semibold">
                      Tail Numbers
                    </CardTitle>
                    <Button
                      type="button"
                      onClick={() => {
                        fieldArray.append({ status_id: "", tail_number: "" })
                      }}
                      variant={"button-primary"}
                      size={"sm"}
                    >
                      <PlusIcon className="mr-2 size-4" />
                      Add Tail Number
                    </Button>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <Table containerClassName="min-h-full h-5 overflow-y-auto">
                      <TableHeader className="border-b">
                        <TableHead className="pl-4 pr-1">Tail Number</TableHead>
                        <TableHead className="px-1">Status</TableHead>
                        <TableHead className="pl-1 pr-4"></TableHead>
                      </TableHeader>
                      <TableBody className="overflow-y-auto border-b">
                        {fieldArray.fields?.map((field, index) => {
                          return (
                            <TableRow key={field.id}>
                              <TableCell className="pl-4 pr-1">
                                <InputSwitch<AircraftFormValues>
                                  name={`aircraft_tail_numbers.${index}.tail_number`}
                                  placeholder="Tail Number"
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1">
                                <InputSwitch<AircraftFormValues>
                                  name={`aircraft_tail_numbers.${index}.status_id`}
                                  type="select"
                                  selectOptions={aircraftStatusOptions}
                                />
                              </TableCell>
                              <TableCell className="w-9 pl-1 pr-4">
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
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div className="h-full flex-1">
                <Tabs
                  defaultValue="details"
                  className="flex h-full flex-col items-start justify-start gap-4 space-y-0"
                >
                  <TabsList>
                    <TabsTrigger value="details">
                      <PlaneIcon className="mr-2 size-4" />
                      Aircraft Details
                    </TabsTrigger>
                    <TabsTrigger value="activity-log">
                      <FileClockIcon className="mr-2 size-4" /> Activity Log
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent className="w-full flex-1" value="details">
                    <Card className="custom-scrollbar h-5 min-h-full w-full space-y-4 overflow-y-auto rounded-md p-4">
                      <div className="space-y-2">
                        <span className="font-semibold">Measurement Units</span>
                        <div className="grid grid-cols-3 gap-2">
                          <InputSwitch<AircraftFormValues>
                            label="Weight Unit"
                            name="mtow"
                            names={[
                              "mtow_unit_id",
                              "cargo_capacity_unit_id",
                              "max_zero_fuel_weight_unit_id",
                              "landing_weight_unit_id",
                              "max_bulk_capacity_weight_unit_id",
                              "restricted_weight_piece_unit_id",
                            ]}
                            type="select"
                            selectOptions={weightUnitsOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Volume Unit"
                            name="mtow"
                            names={[
                              "max_volume_unit_id",
                              "max_bulk_capacity_volume_unit_id",
                              "bulk_cubic_id",
                            ]}
                            type="select"
                            selectOptions={volumeUnitsOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Dimension Unit"
                            name="mtow"
                            names={["max_dimension_unit_id", "bulk_unit_id"]}
                            type="select"
                            selectOptions={lengthUnitsOptions}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Details</span>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="MTOW"
                            name="mtow"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Zero Fuel Weight"
                            name="max_zero_fuel_weight"
                            type="text"
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
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="ULD Positions"
                            name="uld_position"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Landing Weight"
                            name="landing_weight"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Cargo Capacity"
                            name="cargo_capacity"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Bulk Capacity Weight"
                            name="max_bulk_capacity_weight"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Bulk Capacity Volume"
                            name="max_bulk_capacity_volume"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Volume"
                            name="max_volume"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Restricted Weight Per Piece"
                            name="restricted_weight_piece"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Dimension per Piece (Length)"
                            name="max_dimension_length"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Dimension per Piece (Breadth)"
                            name="max_dimension_breadth"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Max Dimension per Piece (Height)"
                            name="max_dimension_height"
                            type="text"
                          />
                          <input
                            name="count"
                            type="hidden"
                            value={fieldArray.fields.length}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Door Dimensions</span>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="AFT (H)"
                            name="aft_h"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="AFT (W)"
                            name="aft_w"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="FWD (H)"
                            name="fwd_h"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="FWD (W)"
                            name="fwd_w"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Bulk (H)"
                            name="bulk_h"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Bulk (W)"
                            name="bulk_w"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Volume</span>
                        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="FWT"
                            name="fwt"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="FWD"
                            name="fwd"
                            type="text"
                          />
                          <InputSwitch<AircraftFormValues>
                            label="Bulk"
                            name="bulk"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold">Status</span>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <InputSwitch<AircraftFormValues>
                            label="Status"
                            name="status_id"
                            type="select"
                            selectOptions={aircraftStatusOptions}
                          />
                          <InputSwitch<AircraftFormValues>
                            label="GL Code"
                            name="gl_code_id"
                            type="select"
                            selectOptions={aircraftBodyTypesOptions}
                          />
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  <TabsContent value="activity-log">
                    <Card className="rounded-md p-4"></Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
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
                        This will delete {selectedManufacturer?.manufacturer}{" "}
                        {selectedType?.type} {selectedVersion?.version}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(currentOpen)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button
                type="submit"
                variant={"button-primary"}
                isLoading={isPendingCreate || isPendingUpdate}
              >
                <SaveIcon className="mr-2 size-4" />
                Save Aircraft Type
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}