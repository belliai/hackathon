"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import MastersPageTemplate from "../../masters/components/MastersPageTemplate";
import { Search } from "lucide-react";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions";
import { useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import {
  actionColumn,
  selectColumn,
} from "../../masters/components/columnItem";

export default function OrganizeOtherChargesPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "ocCode",
      header: "OC Code",
    },
    {
      accessorKey: "ocDescription",
      header: "OC Description",
    },
    {
      accessorKey: "status",
      header: "Status",
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
      ocCode: "OC001",
      ocDescription: "Operational Code 1",
      status: "Active",
      createdAt: "2023-01-01",
      updatedAt: "2023-02-01",
    },
    {
      ocCode: "OC002",
      ocDescription: "Operational Code 2",
      status: "Inactive",
      createdAt: "2023-01-05",
      updatedAt: "2023-02-05",
    },
    {
      ocCode: "OC003",
      ocDescription: "Operational Code 3",
      status: "Active",
      createdAt: "2023-01-10",
      updatedAt: "2023-02-10",
    },
    {
      ocCode: "OC004",
      ocDescription: "Operational Code 4",
      status: "Inactive",
      createdAt: "2023-01-15",
      updatedAt: "2023-02-15",
    },
    {
      ocCode: "OC005",
      ocDescription: "Operational Code 5",
      status: "Active",
      createdAt: "2023-01-20",
      updatedAt: "2023-02-20",
    },
    {
      ocCode: "OC006",
      ocDescription: "Operational Code 6",
      status: "Inactive",
      createdAt: "2023-01-25",
      updatedAt: "2023-02-25",
    },
    {
      ocCode: "OC007",
      ocDescription: "Operational Code 7",
      status: "Active",
      createdAt: "2023-01-30",
      updatedAt: "2023-03-01",
    },
    {
      ocCode: "OC008",
      ocDescription: "Operational Code 8",
      status: "Inactive",
      createdAt: "2023-02-05",
      updatedAt: "2023-03-05",
    },
    {
      ocCode: "OC009",
      ocDescription: "Operational Code 9",
      status: "Active",
      createdAt: "2023-02-10",
      updatedAt: "2023-03-10",
    },
    {
      ocCode: "OC010",
      ocDescription: "Operational Code 10",
      status: "Inactive",
      createdAt: "2023-02-15",
      updatedAt: "2023-03-15",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "ocCode",
      placeholder: "OC Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "ocDescription",
      placeholder: "OC Description",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "ocGroup",
      placeholder: "OC Group",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From Date",
    },
    {
      name: "toDate",
      type: "date",
      placeholder: "To Date",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "ocCode",
      placeholder: "OC Code",
      type: "text",
    },
    {
      name: "ocDescription",
      placeholder: "OC Description",
      type: "text",
    },
    {
      name: "ocGroup",
      placeholder: "OC Group",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const form = useForm();
  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="Other Charges Master"
      buttonText="Create Other Charges"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={formFields}
      hookForm={form}
    />
  );
}
