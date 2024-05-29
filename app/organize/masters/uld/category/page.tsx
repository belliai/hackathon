"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { ColumnDef } from "@tanstack/react-table";
import { actionColumn, selectColumn } from "../../components/columnItem";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import StatusBadge from "../../components/StatusBadge";
import { useForm } from "react-hook-form";

export default function MasterULDCategoryPage() {
  const filterFormFields: TFormTextField[] = [
    {
      name: "containerType",
      type: "select",
      placeholder: "Container Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldCategory",
      type: "select",
      placeholder: "ULD Category",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "fromDate",
      type: "date",
      label: "From Date",
      hideTooltip: true,
    },
    {
      name: "toDate",
      type: "date",
      label: "To Date",
      hideTooltip: true,
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "containerType",
      placeholder: "Container Type",
      type: "text",
    },
    {
      name: "uldCategory",
      placeholder: "ULD Category",
      type: "text",
    },
    {
      name: "uldType",
      placeholder: "ULD Type",
      type: "text",
    },
    {
      name: "tareWeight",
      placeholder: "Tare Weight",
      type: "text",
    },
    {
      name: "maxGrossWt",
      placeholder: "Max Gross Wt",
      type: "text",
    },
    {
      name: "k",
      placeholder: "K",
      type: "text",
    },
    {
      name: "unit",
      placeholder: "Unit",
      type: "text",
    },
    {
      name: "baseLength",
      placeholder: "Base Length",
      type: "text",
    },
    {
      name: "baseWidth",
      placeholder: "Base Width",
      type: "text",
    },
    {
      name: "baseHeight",
      placeholder: "Base Height",
      type: "text",
    },
    {
      name: "baseUnit",
      placeholder: "Base Unit",
      type: "text",
    },
    {
      name: "volume",
      placeholder: "Volume",
      type: "text",
    },
    {
      name: "shape",
      placeholder: "Shape",
      type: "text",
    },
    {
      name: "innerLength",
      placeholder: "Inner Length",
      type: "text",
    },
    {
      name: "innerWidth",
      placeholder: "Inner Width",
      type: "text",
    },
    {
      name: "innerHeight",
      placeholder: "Inner Height",
      type: "text",
    },
    {
      name: "innerUnit",
      placeholder: "Inner Unit",
      type: "text",
    },
    {
      name: "aircraftCompatibility",
      placeholder: "Aircraft Compatibility",
      type: "text",
    },
    {
      name: "classRating",
      placeholder: "Class Rating",
      type: "text",
    },
    {
      name: "maxDimL",
      placeholder: "Max Dim (L)",
      type: "text",
    },
    {
      name: "maxDimB",
      placeholder: "Max Dim (B)",
      type: "text",
    },
    {
      name: "maxDimH",
      placeholder: "Max Dim (H)",
      type: "text",
    },
    {
      name: "maxLbh",
      placeholder: "Max LBH",
      type: "text",
    },
    {
      name: "allIn",
      placeholder: "All In",
      type: "text",
    },
    {
      name: "isStd",
      placeholder: "Is Std",
      type: "checkbox",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "text",
    },
    {
      name: "file",
      placeholder: "No file chosen",
      type: "file",
    },
    {
      name: "icon",
      placeholder: "Icon",
      type: "file",
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "containerType",
      header: "Container Type",
    },
    {
      accessorKey: "uldCategory",
      header: "ULD Category",
    },
    {
      accessorKey: "uldType",
      header: "ULD Type",
    },
    {
      accessorKey: "tareWeight",
      header: "Tare Weight",
    },
    {
      accessorKey: "maxGrossWt",
      header: "Max Gross Wt",
    },
    {
      accessorKey: "baseLength",
      header: "Base Length",
    },
    {
      accessorKey: "baseWidth",
      header: "Base Width",
    },
    {
      accessorKey: "baseHeight",
      header: "Base Height",
    },
    {
      accessorKey: "innerLength",
      header: "Inner Length",
    },
    {
      accessorKey: "innerWidth",
      header: "Inner Width",
    },
    {
      accessorKey: "innerHeight",
      header: "Inner Height",
    },
    {
      accessorKey: "aircraftCompatibility",
      header: "Aircraft Compatibility",
    },
    {
      accessorKey: "classRating",
      header: "Class Rating",
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
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ];

  const data = [
    {
      containerType: "Type A",
      uldCategory: "Category 1",
      uldType: "Type 1",
      tareWeight: "500 kg",
      maxGrossWt: "5000 kg",
      baseLength: "100 cm",
      baseWidth: "200 cm",
      baseHeight: "150 cm",
      innerLength: "90 cm",
      innerWidth: "190 cm",
      innerHeight: "140 cm",
      aircraftCompatibility: "Boeing 747",
      classRating: "Class A",
      status: "Active",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-10",
    },
    {
      containerType: "Type B",
      uldCategory: "Category 2",
      uldType: "Type 2",
      tareWeight: "600 kg",
      maxGrossWt: "6000 kg",
      baseLength: "110 cm",
      baseWidth: "210 cm",
      baseHeight: "160 cm",
      innerLength: "100 cm",
      innerWidth: "200 cm",
      innerHeight: "150 cm",
      aircraftCompatibility: "Airbus A380",
      classRating: "Class B",
      status: "Inactive",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-10",
    },
    {
      containerType: "Type C",
      uldCategory: "Category 3",
      uldType: "Type 3",
      tareWeight: "700 kg",
      maxGrossWt: "7000 kg",
      baseLength: "120 cm",
      baseWidth: "220 cm",
      baseHeight: "170 cm",
      innerLength: "110 cm",
      innerWidth: "210 cm",
      innerHeight: "160 cm",
      aircraftCompatibility: "Boeing 777",
      classRating: "Class C",
      status: "Active",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-10",
    },
  ];

  const hookForm = useForm();
  const filterHookForm = useForm();

  return (
    <MastersPageTemplate
      heading="ULD Category"
      buttonText="Create ULD Category"
      filterFormFields={filterFormFields}
      formFields={formFields}
      columns={columns}
      data={data}
      filterHookForm={filterHookForm}
      hookForm={hookForm}
    />
  );
}
