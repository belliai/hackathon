"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions";
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";

export default function MasterCommodityPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "commodityCode",
      header: "Commodity Code",
    },
    {
      accessorKey: "commodityName",
      header: "Commodity Name",
    },
    {
      accessorKey: "commodityDescription",
      header: "Commodity Description",
    },
    {
      accessorKey: "commodityCategory",
      header: "Commodity Category",
    },
    {
      accessorKey: "shcCode",
      header: "SHC Code",
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
      accessorKey: "isNotoc",
      header: "ISNOTOC",
    },
    {
      accessorKey: "priority",
      header: "Priority",
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

  const formFields: TFormTextField[] = [
    {
      name: "commodityCode",
      label: "Commodity Code",
      type: "text",
    },
    {
      name: "commodityName",
      label: "Commodity Name",
      type: "text",
    },
    {
      name: "commodityDescription",
      label: "Commodity Description",
      type: "text",
    },
    {
      name: "commodityCategory",
      label: "Commodity Category",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      placeholder: "Select Category",
    },
    {
      name: "shcCode",
      label: "SHC Code",
      type: "text",
    },
    {
      name: "status",
      label: "Status",
      placeholder: "Select Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "isNotoc",
      label: "ISNOTOC",
      placeholder: "Select ISNOTOC",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "priority",
      placeholder: "Select Priority",
      label: "Priority",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Active",
    },
    {
      name: "isConsole",
      label: "Is Console",
      type: "checkbox",
    },
    {
      name: "isShowMobile",
      label: "Show In Mobile App",
      type: "checkbox",
    },
  ];

  const filterForm = useForm();

  const data = [
    {
      commodityCode: "C001",
      commodityName: "Electronics",
      commodityDescription:
        "Consumer electronics including smartphones and laptops",
      commodityCategory: "Technology",
      shcCode: "E001",
      status: "Active",
      isNotoc: "No",
      priority: "High",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
      action: "Edit",
    },
    {
      commodityCode: "C002",
      commodityName: "Apparel",
      commodityDescription: "Clothing and accessories",
      commodityCategory: "Fashion",
      shcCode: "A001",
      status: "Inactive",
      isNotoc: "Yes",
      priority: "Medium",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
      action: "Edit",
    },
    {
      commodityCode: "C003",
      commodityName: "Pharmaceuticals",
      commodityDescription: "Medicines and healthcare products",
      commodityCategory: "Health",
      shcCode: "P001",
      status: "Active",
      isNotoc: "No",
      priority: "High",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
      action: "Edit",
    },
    {
      commodityCode: "C004",
      commodityName: "Furniture",
      commodityDescription: "Home and office furniture",
      commodityCategory: "Home",
      shcCode: "F001",
      status: "Inactive",
      isNotoc: "Yes",
      priority: "Low",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
      action: "Edit",
    },
    {
      commodityCode: "C005",
      commodityName: "Food and Beverages",
      commodityDescription: "Perishable and non-perishable food items",
      commodityCategory: "Food",
      shcCode: "F002",
      status: "Active",
      isNotoc: "No",
      priority: "High",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
      action: "Edit",
    },
  ];

  return (
    <MastersPageTemplate
      heading="Commodity Master"
      filterFormFields={formFields}
      filterHookForm={filterForm}
      columns={columns}
      data={data}
      customFilterButtons={<FilterActions />}
    />
  );
}
