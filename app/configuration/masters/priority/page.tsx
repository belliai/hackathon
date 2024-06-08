"use client";

import { FormTextFieldProps } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DUMMY_SELECT_OPTIONS_STATUS } from "@/app/organize/masters/components/dummySelectOptions";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import MastersPageTemplate from "@/app/organize/masters/components/MastersPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import { Button } from "@/components/ui/button";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Separator } from "@/components/ui/separator";

export default function MasterPriorityPage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "priority",
      label: "Priority",
      type: "text",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
    },
    {
      name: "shipment",
      label: "Shipment",
      type: "text",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const filterForm = useForm();

  return (
    <CreateFormPageTemplate
      heading="List Priority Configuration"
      formFields={formFields}
      hookForm={filterForm}
      customDialogContent={
        <div className="flex flex-col gap-4 w-full max-w-96">
          <FilterActions />
          <Separator />
          <div className="flex gap-2 w-full">
            <Button variant="button-primary">Save</Button>
            <Button variant="button-primary">Details</Button>
          </div>
        </div>
      }
    />
  );
}
