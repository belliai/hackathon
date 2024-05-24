"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "../../components/dummySelectOptions";
import { ColumnDef } from "@tanstack/react-table";
import { actionColumn, selectColumn } from "../../components/columnItem";
import StatusBadge from "../../components/StatusBadge";
import { useFieldArray, useForm } from "react-hook-form";

export default function MasterAircraftPositioningConfigurationPage() {
  const formFields: TFormTextField[] = [
    {
      name: "aircraftType",
      placeholder: "Aircraft Type *",
      type: "text",
    },
    {
      name: "equipmentNo",
      placeholder: "Equipment No.",
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
      placeholder: "Pattern Name *",
      type: "text",
    },
    {
      name: "overLoad",
      placeholder: "Over Load%",
      type: "text",
    },
    {
      name: "sg",
      placeholder: "SG",
      type: "text",
    },
    {
      name: "partnerCode",
      placeholder: "Partner Code",
      type: "text",
    },
    {
      name: "flightNo",
      placeholder: "Flight No.",
      type: "text",
    },
    {
      name: "bulkWeight",
      placeholder: "Bulk Weight",
      type: "text",
    },
    {
      name: "bulkVolume",
      placeholder: "Bulk Volume",
      type: "text",
    },
    {
      name: "uom",
      placeholder: "UOM",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      placeholder: "Status *",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "default",
      placeholder: "Default",
      type: "text",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "aircraftType",
      placeholder: "Aircraft Type *",
      type: "text",
    },
    {
      name: "equipmentNo",
      placeholder: "Equipment No.",
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
      name: "partnerCode",
      placeholder: "Partner Code",
      type: "text",
    },
  ];

  const fieldArrayFormFields: TFormTextField[] = [
    {
      name: "srNo",
      placeholder: "Sr. No.",
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
  ];

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
      header: "Status",
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

  const filterForm = useForm();
  const form = useForm();

  const fieldArray = useFieldArray({
    name: "fieldArray" as string,
    control: form.control,
  });

  return (
    <MastersPageTemplate
      heading="Aircraft Positioning Configuration"
      buttonText="Create"
      columns={columns}
      data={data}
      sectionedFormFields={[
        {
          fields: formFields,
        },
        {
          sectionName: "Containers",
          fieldArray: {
            fields: fieldArrayFormFields,
            fieldArray,
          },
        },
      ]}
      filterFormFields={filterFormFields}
      hookForm={form}
      filterHookForm={filterForm}
    />
  );
}
