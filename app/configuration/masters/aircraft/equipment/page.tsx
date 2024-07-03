"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { TFormTextField } from "@/components/form/FormTextField"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import CreateFormTemplate from "@/app/k360/organize/masters/components/CreateFormTemplate"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate, {
  SectionedFormFields,
} from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function AircraftEquipmentPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "manuf",
      header: "Manufacturer",
    },
    {
      accessorKey: "aircraftType",
      header: "Aircraft Type",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "paxCap",
      header: "Pax Cap",
    },
    {
      accessorKey: "landingWt",
      header: "Landing Wt",
    },
    {
      accessorKey: "cargoCap",
      header: "Cargo Cap",
    },
    {
      accessorKey: "mtow",
      header: "MTOW",
    },
    {
      accessorKey: "tailNumber",
      header: "Tail #",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "restWt",
      header: "Rest. Wt",
    },
    {
      accessorKey: "dims",
      header: "Dims",
    },
    {
      accessorKey: "vol",
      header: "Vol",
    },
    {
      accessorKey: "maxZeroFuelWt",
      header: "Max. Zero Fuel Wt",
    },
    {
      accessorKey: "maxWidebodyBulkCap",
      header: "Max. Widebody Bulk Cap (Wt. & Vol)",
    },
    {
      accessorKey: "bodyType",
      header: "Body Type",
    },
    {
      accessorKey: "uldPositions",
      header: "ULD Positions",
    },
    {
      accessorKey: "doorDims",
      header: "Door Dims",
    },
    {
      accessorKey: "maxLoadBearingWtPerSqFt",
      header: "Max. load-bearing wt, per sq. ft",
    },
    {
      accessorKey: "maxHurm",
      header: "Max HURM",
    },
    {
      accessorKey: "maxContainers",
      header: "Max Containers",
    },
    {
      accessorKey: "acceptableKennels",
      header: "Acceptable Kennels",
    },
    {
      accessorKey: "kennelCount",
      header: "Kennel Count",
    },
    {
      accessorKey: "maxLBH",
      header: "Max LBH",
    },
    {
      accessorKey: "glCode",
      header: "GL Code",
    },
    actionColumn,
  ]

  const data = [
    {
      manuf: "Boeing",
      aircraftType: "737",
      version: "800",
      paxCap: 162,
      landingWt: 66360,
      cargoCap: 19000,
      mtow: 79015,
      tailNumber: "N12345",
      status: "Active",
      restWt: 41465,
      dims: "39.5x42.5x55.5",
      vol: 1500,
      maxZeroFuelWt: 136000,
      maxWidebodyBulkCap: "7000 kg, 1400 m3",
      bodyType: "Narrowbody",
      uldPositions: 18,
      doorDims: "4.5x5",
      maxLoadBearingWtPerSqFt: 1500,
      maxHurm: 20,
      maxContainers: 8,
      acceptableKennels: "Type A",
      kennelCount: 2,
      maxLBH: "45x55x65",
      glCode: "GL001",
    },
    {
      manuf: "Airbus",
      aircraftType: "A320",
      version: "200",
      paxCap: 180,
      landingWt: 75500,
      cargoCap: 21000,
      mtow: 78000,
      tailNumber: "D67890",
      status: "Inactive",
      restWt: 42000,
      dims: "40x45x60",
      vol: 1600,
      maxZeroFuelWt: 142000,
      maxWidebodyBulkCap: "8000 kg, 1600 m3",
      bodyType: "Widebody",
      uldPositions: 20,
      doorDims: "5x5",
      maxLoadBearingWtPerSqFt: 1550,
      maxHurm: 25,
      maxContainers: 10,
      acceptableKennels: "Type B",
      kennelCount: 3,
      maxLBH: "50x60x70",
      glCode: "GL002",
    },
    {
      manuf: "Embraer",
      aircraftType: "E195",
      version: "100",
      paxCap: 120,
      landingWt: 53000,
      cargoCap: 12000,
      mtow: 57000,
      tailNumber: "F23456",
      status: "Active",
      restWt: 32000,
      dims: "30x40x50",
      vol: 1300,
      maxZeroFuelWt: 110000,
      maxWidebodyBulkCap: "5000 kg, 1000 m3",
      bodyType: "Narrowbody",
      uldPositions: 15,
      doorDims: "3x4",
      maxLoadBearingWtPerSqFt: 1400,
      maxHurm: 18,
      maxContainers: 6,
      acceptableKennels: "Type C",
      kennelCount: 1,
      maxLBH: "35x45x55",
      glCode: "GL003",
    },
    {
      manuf: "Bombardier",
      aircraftType: "CRJ900",
      version: "200",
      paxCap: 90,
      landingWt: 63000,
      cargoCap: 10000,
      mtow: 71000,
      tailNumber: "G34567",
      status: "Active",
      restWt: 34000,
      dims: "28x38x48",
      vol: 1250,
      maxZeroFuelWt: 115000,
      maxWidebodyBulkCap: "6000 kg, 1200 m3",
      bodyType: "Widebody",
      uldPositions: 10,
      doorDims: "2.5x3.5",
      maxLoadBearingWtPerSqFt: 1350,
      maxHurm: 22,
      maxContainers: 7,
      acceptableKennels: "Type D",
      kennelCount: 2,
      maxLBH: "38x48x58",
      glCode: "GL004",
    },
    {
      manuf: "Boeing",
      aircraftType: "747",
      version: "400",
      paxCap: 416,
      landingWt: 285000,
      cargoCap: 30000,
      mtow: 396000,
      tailNumber: "H45678",
      status: "Inactive",
      restWt: 183500,
      dims: "70x80x90",
      vol: 4500,
      maxZeroFuelWt: 255000,
      maxWidebodyBulkCap: "12000 kg, 2400 m3",
      bodyType: "Widebody",
      uldPositions: 35,
      doorDims: "7x8",
      maxLoadBearingWtPerSqFt: 2500,
      maxHurm: 30,
      maxContainers: 20,
      acceptableKennels: "Type E",
      kennelCount: 5,
      maxLBH: "75x85x95",
      glCode: "GL005",
    },
  ]

  const filterHookForm = useForm()
  const sectionedHookForm = useForm({
    defaultValues: {
      sectionedFields: [],
    },
  })
  const fieldArray = useFieldArray<any>({
    control: sectionedHookForm.control,
    name: "sectionedFields",
  })

  const filterFormFields: TFormTextField[] = [
    {
      name: "aircraftType",
      label: "Aircraft Type",
      placeholder: "Select Aircraft Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "version",
      label: "Version",
      type: "text",
    },
    {
      name: "tailNo",
      label: "Tail No",
      type: "text",
    },
  ]

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "origin",
          label: "Origin",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "destination",
          label: "Destination",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "manuf",
          label: "Manufacturer",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "aircraftType",
          label: "Aircraft Type",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "MTOW",
          label: "MTOW",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "mtowUnit",
          label: "MTOW Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "maxZeroFuelWt",
          label: "Max Zero Fuel Wt",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "maxZeroFuelWtUnit",
          label: "Max Zero Fuel Wt Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "bodyType",
          label: "Body Type",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "cargoCap",
          label: "Cargo Capacity",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "cargoCapUnit",
          label: "Cargo Capacity Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: DUMMY_SELECT_OPTIONS_STATUS,
          orientation: "horizontal",
        },
        {
          name: "version",
          label: "Version",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "landingWt",
          label: "Landing Wt",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "landingWtUnit",
          label: "Landing Wt Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "paxCap",
          label: "Pax Cap",
          type: "text",
          orientation: "horizontal",
        },
      ],
    },
    {
      sectionName: " ",
      fieldArray: {
        fieldArray: fieldArray,
        fieldArrayName: "sectionedFields",
        fields: [
          {
            name: "uldCategory",
            placeholder: "ULD Category",
            type: "text",
          },
          {
            name: "counterCount",
            placeholder: "Counter Count",
            type: "text",
          },
          {
            name: "maxWeight",
            placeholder: "Max Weight",
            type: "text",
          },
        ],
      },
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "maxBulkCapWt",
          label: "Max Bulk Capacity Weight",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitMaxBulkCapWt",
          label: "Max Bulk Capacity Weight Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapVol",
          label: "Max Bulk Capacity Volume",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitMaxBulkCapVol",
          label: "Max Bulk Capacity Volume Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxVolume",
          label: "Max Volume",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "cubicMaxVolume",
          label: "Cubic (Max Volume)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "restrWtPc",
          label: "Restricted Weight per Piece",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitRestrWtPc",
          label: "Restricted Weight per Piece Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxDimPcL",
          label: "Max Dimension per Piece (Length)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "maxDimPcB",
          label: "Max Dimension per Piece (Breadth)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "maxDimPcH",
          label: "Max Dimension per Piece (Height)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitDimensions",
          label: "Dimensions Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          label: "Status",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS_STATUS,
        },
        {
          name: "glCode",
          label: "GL Code",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Door Dim",
      fields: [
        {
          name: "aftHeight",
          label: "AFT (H)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "aftWidth",
          label: "AFT (W)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "fwdHeight",
          label: "FWD (H)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "fwdWidth",
          label: "FWD (W)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "bulkHeight",
          label: "Bulk (H)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "bulkWidth",
          label: "Bulk (W)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unit",
          label: "Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: "Section Volume",
      fields: [
        {
          name: "FWT",
          label: "FWT",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "FWD",
          label: "FWD",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "bulk",
          label: "Bulk",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "cubic",
          label: "Cubic",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "maxContainers",
          label: "Max Containers",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "containerType",
          label: "Container Type",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "middleSection",
          label: "Middle Section",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "rearSection",
          label: "Rear Section",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "frontSection",
          label: "Front Section",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "acceptableKennels",
          label: "Acceptable Kennels",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "kennelCount",
          label: "Kennel Count",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "maxLbh",
          label: "Max LBH",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
  ]

  return (
    <MastersPageTemplate
      heading="Equipment Master"
      columns={columns}
      data={data}
      customFilterButtons={<FilterActions />}
      filterFormFields={filterFormFields}
      filterHookForm={filterHookForm}
      bottomCustomComponent={
        <CreateFormTemplate
          className="max-h-none"
          hookForm={sectionedHookForm}
          sectionedFormFields={sectionedFormFields}
          customDialogContent={
            <Button variant="button-primary" className="mt-4">
              Save
            </Button>
          }
        />
      }
    />
  )
}
