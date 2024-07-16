"use client"

import { useEffect, useState } from "react"
import {
  aircraftFormSchema,
  AircraftFormValues,
} from "@/schemas/aircraft/aircraft"
import { zodResolver } from "@hookform/resolvers/zod"
import { ColumnDef } from "@tanstack/react-table"
import {
  Box,
  Calculator,
  DoorClosed,
  Plane,
  Plus,
  ScrollTextIcon,
  Search,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { Aircraft, CreateAircraftRequest } from "@/types/aircraft/aircraft"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
import {
  useAircrafts,
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import BalanceCard from "@/components/dashboard/balance-card"
import DimensionsCard from "@/components/dashboard/dimensions-card"
import CreateEditModal from "@/components/dashboard/modal/create-edit-modal/create-edit-modal"
import { TFormTextField } from "@/components/form/FormTextField"

import createActionColumn, {
  actionColumn,
  selectColumn,
} from "../../components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions"
import MastersPageFieldArrayForm from "../../components/MastersPageFieldArrayForm"
import MastersPageTemplate, {
  SectionedFormFields,
} from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterAircraftPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<Aircraft | null>(null)
  const [openModal, setOpenModal] = useState<string | boolean>(false) // When the state is a string, it means the modal is in edit mode

  const { toast } = useToast()

  const { data: aircraftBodyTypes, isLoading: isLoadingAircraftBodyTypes } =
    useAircraftBodyTypes()

  const { data: aircraftStatuses, isLoading: isLoadingAircraftStatuses } =
    useAircraftStatuses()

  const { data: units, isLoading: isLoadingUnits } = useUnits({
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

  const weightUnitsOptions = units?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const volumeUnitsOptions = unitsVol?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const lengthUnitsOptions = units?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const { data: aircrafts, isLoading } = useAircrafts({
    page: 1,
    page_size: 1000,
  })

  const aircraftsData = aircrafts?.data

  const filterHookForm = useForm()

  const formDefaultValues: AircraftFormValues = {
    aft_h: "",
    aft_w: "",
    aircraft_tail_numbers: [
      {
        id: "",
        status_id: "",
        tail_number: "",
      },
    ],
    aircraft_type_id: "",
    body_type_id: "",
    bulk: "",
    bulk_h: "",
    bulk_w: "",
    cargo_capacity: "",
    fwd: "",
    fwd_h: "",
    fwd_w: "",
    count: 0,
    fwt: "",
    gl_code_id: "",
    landing_weight: "",
    max_bulk_capacity_volume: "",
    max_bulk_capacity_weight: "",
    max_dimension_breadth: "",
    max_dimension_height: "",
    manufacturer_id: "",
    max_dimension_length: "",
    max_volume: "",
    max_zero_fuel_weight: "",
    mtow: "",
    passenger_capacity: "",
    restricted_weight_piece: "",
    status_id: "",
    uld_position: "",
    version_id: "",
    dimension_unit_id: "",
    volume_unit_id: "",
    weight_unit_id: "",
  }

  const sectionedHookForm = useForm<AircraftFormValues>({
    resolver: zodResolver(aircraftFormSchema),
    defaultValues: formDefaultValues,
  })

  const fieldArray = useFieldArray<any>({
    name: "aircraft_tail_numbers",
    control: sectionedHookForm.control,
  })

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "manufacturer",
          label: "Manufacturer",
          type: "text",
        },
        {
          name: "aircraft_type",
          label: "Aircraft Type",
          type: "text",
        },
        {
          name: "version",
          label: "Version",
          type: "text",
        },
        {
          name: "mtow",
          label: "MTOW",
          type: "number",
        },
        {
          name: "mtow_unit_id",
          label: "MTOW Unit",
          type: "select",
          options: weightUnitsOptions,
        },
        {
          name: "max_zero_fuel_weight",
          label: "Max Zero Fuel Weight",
          type: "text",
        },
        {
          name: "max_zero_fuel_weight_unit_id",
          label: "Max Zero Fuel Weight Unit",
          type: "select",
          options: weightUnitsOptions,
        },
        {
          name: "body_type_id",
          label: "Body Type",
          type: "select",
          options: aircraftBodyTypesOptions,
        },
        {
          name: "passenger_capacity",
          label: "Passenger Capacity",
          type: "text",
        },
        {
          name: "uld_position",
          label: "ULD Positions",
          type: "text",
        },
        {
          name: "landing_weight",
          label: "Landing Weight",
          type: "number",
        },
        {
          name: "landing_weight_unit_id",
          label: "Landing Weight Unit",
          type: "select",
          options: weightUnitsOptions,
        },
        {
          name: "cargo_capacity",
          label: "Cargo Capacity",
          type: "number",
        },
        {
          name: "cargo_capacity_unit_id",
          label: "Cargo Capacity Unit",
          type: "select",
          options: volumeUnitsOptions,
        },
        {
          name: "max_bulk_capacity_weight",
          label: "Max Bulk Capacity Weight",
          type: "number",
        },
        {
          name: "max_bulk_capacity_weight_unit_id",
          label: "Max Bulk Capacity Weight Unit",
          type: "select",
          options: weightUnitsOptions,
        },
        {
          name: "max_bulk_capacity_volume",
          label: "Max Bulk Capacity Volume",
          type: "number",
        },
        {
          name: "max_bulk_capacity_volume_unit_id",
          label: "Max Bulk Capacity Volume Unit",
          type: "select",
          options: volumeUnitsOptions,
        },
        {
          name: "max_volume",
          label: "Max Volume",
          type: "number",
        },
        {
          name: "max_volume_unit_id",
          label: "Max Volume Unit",
          type: "select",
          options: volumeUnitsOptions,
        },
        {
          name: "restricted_weight_piece",
          label: "Restricted Weight per Piece",
          type: "number",
        },
        {
          name: "restricted_weight_piece_unit_id",
          label: "Restricted Weight per Piece Unit",
          type: "select",
          options: weightUnitsOptions,
        },
        {
          name: "max_dimension_length",
          label: "Max Dimension per Piece (Length)",
          type: "number",
        },
        {
          name: "max_dimension_breadth",
          label: "Max Dimension per Piece (Breadth)",
          type: "number",
        },
        {
          name: "max_dimension_height",
          label: "Max Dimension per Piece (Height)",
          type: "number",
        },
        {
          name: "max_dimension_unit_id",
          label: "Dimensions Unit",
          type: "select",
          options: lengthUnitsOptions,
        },
        {
          name: "status_id",
          label: "Status",
          type: "select",
          options: aircraftStatusOptions,
        },
        {
          name: "gl_code_id",
          label: "GL Code",
          type: "select",
          options: aircraftBodyTypesOptions,
        },
        {
          name: "count",
          label: "Count",
          type: "number",
        },
      ],
    },
    {
      sectionName: "Door Dimensions",
      fields: [
        {
          name: "aft_h",
          label: "AFT (H)",
          type: "number",
        },
        {
          name: "aft_w",
          label: "AFT (W)",
          type: "number",
        },
        {
          name: "fwd_h",
          label: "FWD (H)",
          type: "number",
        },
        {
          name: "fwd_w",
          label: "FWD (W)",
          type: "number",
        },
        {
          name: "bulk_h",
          label: "Bulk (H)",
          type: "number",
        },
        {
          name: "bulk_w",
          label: "Bulk (W)",
          type: "number",
        },
        {
          name: "bulk_unit_id",
          label: "Unit",
          type: "select",
          options: lengthUnitsOptions,
        },
      ],
    },
    {
      sectionName: "Section Volume",
      fields: [
        {
          name: "fwt",
          label: "FWT",
          type: "number",
        },
        {
          name: "fwd",
          label: "FWD",
          type: "number",
        },
        {
          name: "bulk",
          label: "Bulk",
          type: "number",
        },
        {
          name: "bulk_cubic_id",
          label: "Cubic",
          type: "select",
          options: volumeUnitsOptions,
        },
      ],
    },
  ]
  const filterFormFields: TFormTextField[] = [
    {
      name: "manufacturer",
      placeholder: "Manufacturer",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "aircraftType",
      placeholder: "Aircraft Type",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "version",
      placeholder: "Version",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "fromDate",
      placeholder: "From Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "toDate",
      placeholder: "To Date",
      type: "date",
      hideTooltip: true,
    },
  ]

  function handleRowClick(data: Aircraft) {
    setOpenModal(data.id)

    sectionedHookForm.reset({
      ...data,
      manufacturer_id: data.manufacturer.id,
      aircraft_type_id: data.aircraft_type.id,
      version_id: data.version.id,
      aircraft_tail_numbers: data.aircraft_tail_numbers?.map((tailNumber) => ({
        id: tailNumber.id,
        status_id: tailNumber.status.id,
        tail_number: tailNumber?.tail_number,
      })),
      body_type_id: data.body_type.id,
      volume_unit_id: data.volume_unit.id,
      dimension_unit_id: data.dimension_unit.id,
      weight_unit_id: data.weight_unit.id,
      status_id: data.status.id,
      gl_code_id: data.gl_code.id,
      count: data.count,
    })
  }

  const onShowDelete = (data: Aircraft) => {
    setDeleteConfirm(data)
  }

  const columns: ColumnDef<Aircraft>[] = [
    selectColumn as ColumnDef<Aircraft>,
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
    },
    {
      accessorKey: "aircraft_type",
      header: "Aircraft Type",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "passenger_capacity",
      header: "Pax Capacity",
    },
    {
      accessorKey: "landing_weight",
      header: "Landing Wt",
    },
    {
      accessorKey: "cargo_capacity",
      header: "Cargo Cap",
    },
    {
      accessorKey: "mtow",
      header: "MTOW",
    },
    {
      accessorKey: "max_zero_fuel_weight",
      header: "Max Zero Fuel Wt",
    },
    {
      accessorKey: "body_type.Name",
      header: "Body Type",
    },
    {
      accessorKey: "count",
      header: "Active Count",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status.name}
          severity={row.original.status.name === "Active" ? "default" : "error"}
        />
      ),
    },
    createActionColumn({
      items: [
        {
          label: "Edit",
          value: "edit",
          fn: handleRowClick,
        },
        {
          label: "Delete",
          value: "delete",
          fn: onShowDelete,
          shortcut: "⌘⌫",
        },
      ],
    }) as ColumnDef<Aircraft>,
  ]

  const { mutateAsync, isPending } = useCreateAircraft()
  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateAircraft()
  const { mutateAsync: deleteMutateAsync } = useDeleteAircraft()

  async function onDelete(data: Aircraft) {
    if (data) {
      await deleteMutateAsync(
        { id: data.id },
        {
          onError: (error) => {
            console.error(error)
            toast({
              title: "Error!",
              description: "An error occurred while deleting aircraft",
            })
          },
          onSuccess: (data) => {
            setDeleteConfirm(null)
            console.log("res data", data)
            toast({
              title: "Success!",
              description: "Aircraft deleted successfully",
            })
          },
        }
      )
    }
  }

  async function handleSubmitAircraft(data: AircraftFormValues) {
    const payload: CreateAircraftRequest = {
      ...data,
      count: Number(data.count),
      // Generate uuid for tail numbers
      aircraft_tail_numbers: data.aircraft_tail_numbers.map((tailNumber) => ({
        ...tailNumber,
        id: tailNumber.id || undefined,
      })),
    }

    if (typeof openModal === "string") {
      // Update aircraft
      await updateMutateAsync(
        { id: openModal, ...payload },
        {
          onError: (error) => {
            console.error(error)
            toast({
              title: "Error!",
              description: "An error occurred while updating aircraft",
            })
          },
          onSuccess: (data) => {
            setOpenModal(false)
            console.log("res data", data)
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
          setOpenModal(false)
          console.log("res data", data)
          toast({
            title: "Success!",
            description: "Aircraft created successfully",
          })
        },
      })
    }
  }

  return (
    <>
      <MastersPageTemplate
        heading="Aircraft Master"
        buttonText="Create Aircraft"
        columns={columns}
        sectionedFormFields={sectionedFormFields}
        filterFormFields={filterFormFields}
        filterHookForm={filterHookForm}
        hookForm={sectionedHookForm}
        data={aircraftsData ?? []}
        canCreate={false}
        onRowClick={handleRowClick}
        extraTableToolbarButtons={[
          {
            label: "Create Aircraft",
            icon: Plus,
            variant: "button-primary",
            onClick: () => setOpenModal(true),
          },
        ]}
        bottomCustomComponent={
          <AlertDialog
            open={deleteConfirm !== null}
            onOpenChange={(open) => {
              if (!open) {
                setDeleteConfirm(null)
              } else {
                setDeleteConfirm(deleteConfirm)
              }
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete{" "}
                  {deleteConfirm &&
                    `${deleteConfirm?.manufacturer}` +
                      " " +
                      deleteConfirm.aircraft_type}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteConfirm && onDelete(deleteConfirm)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />
      <CreateEditModal
        defaultFullScreen={true}
        title={
          typeof openModal === "string"
            ? "Edit Aircraft"
            : openModal
              ? "Create Aircraft"
              : ""
        }
        open={openModal !== false}
        form={sectionedHookForm}
        onSubmit={handleSubmitAircraft}
        setOpen={(open) => {
          if (open) {
            setOpenModal(openModal)
          } else {
            if (typeof openModal === "string") {
              sectionedHookForm.reset(formDefaultValues)
            }
            setOpenModal(false)
          }
        }}
        tabItems={[
          {
            label: "Aircraft Details",
            value: "aircraft-details",
            icon: <Plane />,
            formFields: sectionedFormFields[0].fields,
          },
          {
            label: "Tail Numbers",
            value: "tail-numbers",
            icon: <Calculator />,
            content: (
              <MastersPageFieldArrayForm
                fieldArrayProps={{
                  fieldArray,
                  fields: [
                    {
                      name: "tail_number",
                      placeholder: "Tail Number",
                      type: "text",
                    },
                    {
                      name: "status_id",
                      placeholder: "Status",
                      type: "select",
                      options: aircraftStatusOptions,
                    },
                  ],
                  fieldArrayName: "aircraft_tail_numbers",
                }}
                hookForm={sectionedHookForm}
              />
            ),
          },
          {
            label: "Door Dimensions",
            value: "door-dimensions",
            icon: <DoorClosed />,
            formFields: sectionedFormFields[1].fields,
          },
          {
            label: "Volume",
            value: "volume",
            icon: <Box />,
            formFields: sectionedFormFields[2].fields,
          },
        ]}
        rightComponent={
          // This is a dummy component, will replace once there is a use for this
          <>
            <div className="space-y-4">
              {/* <OrderSummaryCard {...formValues} /> */}
              <DimensionsCard />
              <BalanceCard />
            </div>
            <div className="space-y-4">
              <Button
                type="button"
                variant={"button-secondary"}
                className="w-full"
              >
                <ScrollTextIcon className="mr-2 h-4 w-4" />
                View Invoice
              </Button>
              <Button
                isLoading={isPending || isPendingUpdate}
                variant={"button-primary"}
                className="w-full"
                type="submit"
              >
                Save Reservation
              </Button>
            </div>
          </>
        }
      />
    </>
  )
}
