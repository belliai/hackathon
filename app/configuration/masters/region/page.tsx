"use client";

import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import FormTextField, { TFormTextField } from "@/components/form/FormTextField";
import FilterActions from "@/components/page-template/FilterActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MastersRegionPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "region_code",
      header: "Region Code",
    },
    {
      accessorKey: "region_name",
      header: "Region Name",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className="bg-green-700/80 text-white hover:bg-green-600">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
    },
    actionColumn,
  ];

  const data = [
    {
      region_code: "R001",
      region_name: "Region 1",
      country: "ID",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      region_code: "R002",
      region_name: "Region 2",
      country: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "regionCode",
      type: "text",
      label: "Region Code",
      hideTooltip: true,
    },
    {
      name: "regionName",
      type: "text",
      label: "Region Name",
      hideTooltip: true,
    },
    {
      name: "countryName",
      type: "select",
      label: "Country Name",
      placeholder: "Select Country",
      options: DUMMY_SELECT_OPTIONS,
      hideTooltip: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "isActive",
    },
  ];

  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="Region Master"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      customFilterButtons={<FilterActions />}
      customComponent={
        <Form {...filterForm}>
          <div className="grid grid-cols-4 w-full max-w-sm items-end gap-x-2 gap-4">
            <div className="col-span-3">
              <FormTextField
                name="operationalContact"
                type="text"
                label="Operational Contact"
                hideTooltip
                form={filterForm}
              />
            </div>
            <div className="col-span-1">
              <Button variant="button-primary">Add Contact</Button>
            </div>
            <div className="col-span-3">
              <FormTextField
                name="salesContact"
                type="text"
                label="Sales Contact"
                hideTooltip
                form={filterForm}
              />
            </div>
            <div className="col-span-1">
              <Button variant="button-primary">Add Contact</Button>
            </div>
            <div className="col-span-3">
              <FormTextField
                name="regionalMgrContact"
                type="text"
                label="Regional Mgr Contact"
                hideTooltip
                form={filterForm}
              />
            </div>
            <div className="col-span-1">
              <Button variant="button-primary">Add Contact</Button>
            </div>
          </div>
          <Separator />
        </Form>
      }
    />
  );
}
