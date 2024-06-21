"use client";

import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function AgentListPage() {
  const filterFormFields: TFormTextField[] = [
    {
      name: "agentCode",
      label: "Agent Code",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "agentName",
      label: "Agent Name",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "airportCode",
      label: "Airport Code",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "country",
      label: "Country",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active",
    },
    {
      name: "CASS",
      label: "CASS",
      type: "checkbox",
    },
    {
      name: "isGSA",
      label: "GSA",
      type: "checkbox",
    },
    {
      name: "isSubagent",
      label: "Subagent",
      type: "checkbox",
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "agentCode",
      header: "Agent Code",
    },
    {
      accessorKey: "agentName",
      header: "Agent Name",
    },
    {
      accessorKey: "parentCode",
      header: "Parent Code",
    },
    {
      accessorKey: "a2aD2d",
      header: "A2A / D2D",
    },
    {
      accessorKey: "airportCode",
      header: "Airport Code",
    },
    {
      accessorKey: "controllingLocator",
      header: "Controlling Locator",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "status",
      header: "Status",
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
      accessorKey: "participationType",
      header: "Participation Type",
    },
    {
      accessorKey: "iacCode",
      header: "IAC Code",
    },
    {
      accessorKey: "validUpto",
      header: "Valid Up To",
    },
    actionColumn,
  ];

  const data = [
    {
      agentCode: "AGT001",
      agentName: "Acme Corp",
      parentCode: "PC001",
      a2aD2d: "A2A",
      warehouseCode: "WH001",
      airportCode: "AP001",
      city: "New York",
      country: "USA",
      status: "Active",
      validFrom: "2023-01-01",
      validTo: "2024-01-01",
      controllingLocator: "CL002",
    },
    {
      agentCode: "AGT002",
      agentName: "Global Inc",
      parentCode: "PC002",
      a2aD2d: "D2D",
      warehouseCode: "WH002",
      airportCode: "AP002",
      city: "Los Angeles",
      country: "USA",
      status: "Inactive",
      validFrom: "2022-06-15",
      controllingLocator: "CL002",
      validTo: "2023-06-15",
    },
    {
      agentCode: "AGT003",
      agentName: "Tech Solutions",
      parentCode: "PC003",
      a2aD2d: "A2A",
      warehouseCode: "WH003",
      airportCode: "AP003",
      city: "San Francisco",
      country: "USA",
      status: "Active",
      validFrom: "2023-03-10",
      controllingLocator: "CL002",
      validTo: "2024-03-10",
    },
    {
      agentCode: "AGT004",
      agentName: "Innovate Ltd",
      parentCode: "PC004",
      a2aD2d: "D2D",
      warehouseCode: "WH004",
      airportCode: "AP004",
      city: "Chicago",
      country: "USA",
      status: "Inactive",
      validFrom: "2021-09-01",
      validTo: "2022-09-01",
      controllingLocator: "CL002",
    },
    {
      agentCode: "AGT005",
      agentName: "Logistics Plus",
      parentCode: "PC005",
      a2aD2d: "A2A",
      warehouseCode: "WH005",
      airportCode: "AP005",
      city: "Houston",
      country: "USA",
      status: "Active",
      validFrom: "2022-12-01",
      controllingLocator: "CL002",
      validTo: "2023-12-01",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Agent List"
      hookForm={form}
      formFields={filterFormFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} />
        </div>
      }
    />
  );
}
