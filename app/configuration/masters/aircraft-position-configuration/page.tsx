"use client";

import MastersPageTemplate, {
  SectionedFormFields,
} from "@/app/organize/masters/components/MastersPageTemplate";
import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";

export default function AirportPositionConfiguration() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "aircraftType",
      header: "Aircraft Type",
    },
    {
      accessorKey: "equipmentNo",
      header: "Equipment No.",
    },
    {
      accessorKey: "fromDate",
      header: "From Date",
    },
    {
      accessorKey: "toDate",
      header: "To Date",
    },
    {
      accessorKey: "patternName",
      header: "Pattern Name",
    },
    {
      accessorKey: "overLoad",
      header: "Over Load %",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No.",
    },
    {
      accessorKey: "bulkWeight",
      header: "Bulk Weight",
    },
    {
      accessorKey: "bulkVolume",
      header: "Bulk Volume",
    },
    {
      accessorKey: "uom",
      header: "UOM",
    },
    {
      accessorKey: "status",
      header: "IsActive",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    {
      accessorKey: "default",
      header: "Default",
    },
    {
      accessorKey: "loadingPattern",
      header: "Loading Pattern",
    },
    actionColumn,
  ];

  const data = [
    {
      aircraftType: "Boeing 737",
      equipmentNo: "EQ12345",
      fromDate: "01-06-2024",
      toDate: "01-07-2024",
      patternName: "Pattern A",
      overLoad: "5%",
      flightNo: "FL123",
      bulkWeight: "5000 kg",
      bulkVolume: "15 m³",
      uom: "kg",
      status: "Active",
      default: "Yes",
      loadingPattern: "Pattern 1",
      action: "Edit",
    },
    {
      aircraftType: "Airbus A320",
      equipmentNo: "EQ67890",
      fromDate: "15-06-2024",
      toDate: "15-07-2024",
      patternName: "Pattern B",
      overLoad: "7%",
      flightNo: "FL456",
      bulkWeight: "6000 kg",
      bulkVolume: "18 m³",
      uom: "kg",
      status: "Inactive",
      default: "No",
      loadingPattern: "Pattern 2",
      action: "Edit",
    },
    {
      aircraftType: "Boeing 787",
      equipmentNo: "EQ11223",
      fromDate: "10-06-2024",
      toDate: "10-07-2024",
      patternName: "Pattern C",
      overLoad: "3%",
      flightNo: "FL789",
      bulkWeight: "7000 kg",
      bulkVolume: "20 m³",
      uom: "kg",
      status: "Active",
      default: "Yes",
      loadingPattern: "Pattern 3",
      action: "Edit",
    },
    {
      aircraftType: "Airbus A350",
      equipmentNo: "EQ44556",
      fromDate: "05-06-2024",
      toDate: "05-07-2024",
      patternName: "Pattern D",
      overLoad: "6%",
      flightNo: "FL101",
      bulkWeight: "8000 kg",
      bulkVolume: "22 m³",
      uom: "kg",
      status: "Inactive",
      default: "No",
      loadingPattern: "Pattern 4",
      action: "Edit",
    },
    {
      aircraftType: "Embraer E195",
      equipmentNo: "EQ77889",
      fromDate: "20-06-2024",
      toDate: "20-07-2024",
      patternName: "Pattern E",
      overLoad: "4%",
      flightNo: "FL202",
      bulkWeight: "5500 kg",
      bulkVolume: "17 m³",
      uom: "kg",
      status: "Active",
      default: "Yes",
      loadingPattern: "Pattern 5",
      action: "Edit",
    },
  ];

  const form = useForm({
    defaultValues: {
      fieldArray: [
        {
          no: "1",
        },
        {
          no: "2",
        },
      ],
    },
  });

  const fieldArray = useFieldArray<any>({
    name: "fieldArray",
    control: form.control,
  });

  const fieldArrayFormFields: TFormTextField[] = [
    {
      name: "no",
      placeholder: "No.",
      disabled: true,
      type: "text",
    },
    {
      name: "compartmentName",
      placeholder: "Compartment Name",
      type: "text",
    },
    {
      name: "containerPosition",
      placeholder: "Container Position",
      type: "text",
    },
    {
      name: "palletPosition",
      placeholder: "Pallet Position",
      type: "text",
    },
    {
      name: "maxWeight",
      placeholder: "Max Weight",
      type: "text",
    },
    {
      name: "compartmentType",
      placeholder: "Compartment Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "seatType",
      placeholder: "Seat Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ];

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "aircraftType",
          label: "Aircraft Type *",
          type: "text",
        },
        {
          name: "equipmentNo",
          label: "Equipment No.",
          type: "text",
        },
        {
          name: "fromDate",
          label: "From Date",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "toDate",
          label: "To Date",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "patternName",
          label: "Pattern Name *",
          type: "text",
        },
        {
          name: "flightNo",
          label: "Flight No.",
          type: "text",
        },
        {
          name: "overLoad",
          label: "Over Load%",
          type: "text",
        },
        {
          name: "bulkWeight",
          label: "Bulk Weight",
          type: "text",
        },
        {
          name: "bulkVolume",
          label: "Bulk Volume",
          type: "text",
        },
        {
          name: "uom",
          label: "UOM",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isActive",
          label: "isActive",
          type: "checkbox",
        },
        {
          name: "isDefault",
          label: "isDefault",
          type: "checkbox",
        },
      ],
    },
    {
      sectionName: "Containers",
      fieldArray: {
        fields: fieldArrayFormFields,
        fieldArray,
      },
    },
  ];

  return (
    <CreateFormPageTemplate
      className="max-h-none"
      heading="Aircraft Position Configuration"
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      customDialogContent={
        <DataTable columns={columns} data={data} hideToolbar className="mt-8" />
      }
    />
  );
}
