"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../masters/components/MastersPageTemplate";
import {
  actionColumn,
  selectColumn,
} from "../../masters/components/columnItem";
import StatusBadge from "../../masters/components/StatusBadge";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../masters/components/dummySelectOptions";

export default function MasterAdditionalFsc() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "additionalAtfPrice",
      header: "Additional ATF Price",
    },
    {
      accessorKey: "divisionalValue",
      header: "Divisional Value",
    },
    {
      accessorKey: "agentCode",
      header: "Agent Code",
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
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
      additionalAtfPrice: "100",
      divisionalValue: "100",
      agentCode: "A001",
      validFrom: "2021-01-01",
      validTo: "2021-12-31",
      status: "Active",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      additionalAtfPrice: "200",
      divisionalValue: "200",
      agentCode: "A002",
      validFrom: "2021-01-01",
      validTo: "2021-12-31",
      status: "Inactive",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "additionalAtfPrice",
      placeholder: "Additional ATF Price",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "divisionalValue",
      placeholder: "Divisional Value",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "agentCode",
      placeholder: "Agent Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "validFrom",
      placeholder: "Valid From",
      type: "date",
      endIcon: <Search />,
    },
    {
      name: "validTo",
      placeholder: "Valid To",
      type: "date",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="Additional FSC Master"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={filterFormFields}
      hookForm={filterForm}
    />
  );
}
