"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../components/dummySelectOptions"
import MastersPageTemplate from "../components/MastersPageTemplate"

export default function MasterUldPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "uldNumber",
      header: "ULD#",
    },
    {
      accessorKey: "uldStatus",
      header: "ULD Status",
    },
    {
      accessorKey: "uldUseStatus",
      header: "ULD Use Status",
    },
    {
      accessorKey: "flightNumber",
      header: "Flight Number",
    },
    {
      accessorKey: "uldLocation",
      header: "ULD Location",
    },
    {
      accessorKey: "uldLocationType",
      header: "ULD Location Type",
    },
    {
      accessorKey: "tareWeight",
      header: "Tare Weight",
    },
    {
      accessorKey: "maxGrossWeight",
      header: "Max Gross Weight",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "location",
      placeholder: "Location",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "uldNumber",
      placeholder: "ULD#",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "uldType",
      placeholder: "ULD Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldOwner",
      placeholder: "ULD Owner",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldStatus",
      placeholder: "ULD Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "uldUseStatus",
      placeholder: "ULD Use Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const formFields: TFormTextField[] = [
    {
      name: "uldType",
      placeholder: "ULD Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldSeries",
      placeholder: "ULD Series",
      type: "text",
    },
    {
      name: "sg",
      placeholder: "SG",
      type: "text",
    },
    {
      name: "uldOwner",
      placeholder: "ULD Owner",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isThirdParty",
      placeholder: "Is Third Party",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldManufacturer",
      placeholder: "ULD Manufacturer",
      type: "text",
    },
    {
      name: "updatedOn",
      placeholder: "Updated On",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "uldPurchaseCost",
      placeholder: "ULD Purchase Cost",
      type: "text",
    },
    {
      name: "currency",
      placeholder: "Currency",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldLocationType",
      placeholder: "ULD Location Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldLocation",
      placeholder: "ULD Location",
      type: "text",
    },
    {
      name: "uldLocationSource",
      placeholder: "ULD Location Source",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isReceived",
      placeholder: "Is Received",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "dimensionL",
      placeholder: "Dimension (L)",
      type: "text",
    },
    {
      name: "dimensionB",
      placeholder: "Dimension (B)",
      type: "text",
    },
    {
      name: "dimensionH",
      placeholder: "Dimension (H)",
      type: "text",
    },
    {
      name: "cubicCM",
      placeholder: "Cubic CM",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldStatus",
      placeholder: "ULD Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldUseStatus",
      placeholder: "ULD Use Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "maxGrossWeight",
      placeholder: "Max Gross Weight",
      type: "text",
    },
    {
      name: "dollyWeight",
      placeholder: "Dolly Weight",
      type: "text",
    },
    {
      name: "tareWeight",
      placeholder: "Tare Weight",
      type: "text",
    },
    {
      name: "unit",
      placeholder: "Unit",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldEconomicalRepairPoint",
      placeholder: "ULD Economical Repair Point",
      type: "text",
    },
    {
      name: "certification",
      placeholder: "Certification",
      type: "text",
    },
    {
      name: "classRating",
      placeholder: "Class Rating",
      type: "text",
    },
    {
      name: "remarks",
      placeholder: "Remarks",
      type: "text",
    },
  ]

  const data = [
    {
      uldNumber: "ULD12345",
      uldStatus: "Active",
      uldUseStatus: "In Use",
      flightNumber: "FN123",
      uldLocation: "Warehouse A",
      uldLocationType: "Indoor",
      tareWeight: "200 kg",
      maxGrossWeight: "5000 kg",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-10",
    },
    {
      uldNumber: "ULD67890",
      uldStatus: "Inactive",
      uldUseStatus: "Stored",
      flightNumber: "FN456",
      uldLocation: "Warehouse B",
      uldLocationType: "Outdoor",
      tareWeight: "250 kg",
      maxGrossWeight: "6000 kg",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-10",
    },
    {
      uldNumber: "ULD11223",
      uldStatus: "Active",
      uldUseStatus: "In Use",
      flightNumber: "FN789",
      uldLocation: "Warehouse C",
      uldLocationType: "Indoor",
      tareWeight: "300 kg",
      maxGrossWeight: "7000 kg",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-10",
    },
    {
      uldNumber: "ULD44556",
      uldStatus: "Maintenance",
      uldUseStatus: "Under Repair",
      flightNumber: "FN012",
      uldLocation: "Warehouse D",
      uldLocationType: "Outdoor",
      tareWeight: "350 kg",
      maxGrossWeight: "8000 kg",
      createdAt: "2023-04-01",
      updatedAt: "2023-04-10",
    },
    {
      uldNumber: "ULD77889",
      uldStatus: "Active",
      uldUseStatus: "In Use",
      flightNumber: "FN345",
      uldLocation: "Warehouse E",
      uldLocationType: "Indoor",
      tareWeight: "400 kg",
      maxGrossWeight: "9000 kg",
      createdAt: "2023-05-01",
      updatedAt: "2023-05-10",
    },
  ]

  const filterHookForm = useForm()
  const hookForm = useForm()

  return (
    <MastersPageTemplate
      heading="ULD Master"
      buttonText="Create ULD"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      formFields={formFields}
      filterHookForm={filterHookForm}
      hookForm={hookForm}
      pageActions={
        <Button
          className="bg-button-primary text-white hover:bg-button-primary/80"
          asChild
        >
          <Link href="/organize/masters/uld/movement-history">
            Movement History
          </Link>
        </Button>
      }
    />
  )
}
