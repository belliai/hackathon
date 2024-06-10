"use client";

import CreateFormTemplate from "@/app/organize/masters/components/CreateFormTemplate";
import MastersPageTemplate from "@/app/organize/masters/components/MastersPageTemplate";
import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/organize/masters/components/dummySelectOptions";
import { TFormTextField } from "@/components/form/FormTextField";
import FilterActions from "@/components/page-template/FilterActions";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MasterUldCategoryPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "uldCategory",
      header: "ULD Category",
    },
    {
      accessorKey: "uldType",
      header: "ULD Type",
    },
    {
      accessorKey: "containerType",
      header: "Container Type",
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
      name: "active",
      type: "checkbox",
      label: "Active",
    },
    {
      name: "allIn",
      type: "checkbox",
      label: "All In",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "containerType",
      label: "Container Type",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldCategory",
      label: "ULD Category",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "uldType",
      label: "ULD Type",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "tareWeight",
      label: "Tare Weight",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "maxGrossWt",
      label: "Max Gross Wt",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "k",
      label: "K",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "unit",
      label: "Unit",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "baseLength",
      label: "Base Length",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "baseWidth",
      label: "Base Width",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "baseHeight",
      label: "Base Height",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "baseUnit",
      label: "Base Unit",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "volume",
      label: "Volume",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "shape",
      label: "Shape",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "innerLength",
      label: "Inner Length",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "innerWidth",
      label: "Inner Width",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "innerHeight",
      label: "Inner Height",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "innerUnit",
      label: "Inner Unit",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "aircraftCompatibility",
      label: "Aircraft Compatibility",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "classRating",
      label: "Class Rating",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "maxDimL",
      label: "Max Dim (L)",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "maxDimB",
      label: "Max Dim (B)",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "maxDimH",
      label: "Max Dim (H)",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "maxLbh",
      label: "Max LBH",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "allIn",
      label: "All In",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "isStd",
      label: "Is Std",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "active",
      label: "Active",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "icon",
      label: "Icon",
      orientation: "horizontal",
      type: "file",
    },
  ];

  const filterHookForm = useForm();
  const hookForm = useForm();

  return (
    <MastersPageTemplate
      heading="ULD Category Master"
      columns={columns}
      data={data}
      customFilterButtons={<FilterActions />}
      filterFormFields={filterFormFields}
      filterHookForm={filterHookForm}
      bottomCustomComponent={
        <CreateFormTemplate
          hookForm={hookForm}
          formFields={formFields}
          className="max-h-none"
          customDialogContent={
            <Button variant="button-primary" className="mt-4">
              Save
            </Button>
          }
        />
      }
    />
  );
}
