"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { useForm } from "react-hook-form";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";

export default function MasterRolePage() {
  const filterFormFields: TFormTextField[] = [
    {
      name: "role",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      placeholder: "Role",
    },
    {
      name: "isActive",
      label: "isActive",
      type: "checkbox",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "roleName",
      placeholder: "Role Name",
      type: "text",
    },
    {
      name: "roleDescription",
      placeholder: "Role Description",
      type: "text",
    },
    {
      name: "minPercentage",
      placeholder: "Min Percentage",
      type: "number",
    },
    {
      name: "maxPercentage",
      placeholder: "Max Percentage",
      type: "number",
    },
    {
      name: "loginType",
      placeholder: "Login Type",
      type: "text",
    },
    {
      name: "landingUrl",
      placeholder: "Landing URL",
      type: "url",
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "sNo",
      header: "S.No.",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "loginType",
      header: "Login Type",
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
    },
    actionColumn,
  ];

  const data = [
    {
      sNo: 1,
      role: "Admin",
      description: "Has full access to the system",
      createdBy: "System",
      type: "Internal",
      loginType: "Single Sign-On",
      createdOn: "2023-01-01",
    },
    {
      sNo: 2,
      role: "User",
      description: "Can view and edit own data",
      createdBy: "Admin",
      type: "External",
      loginType: "Password",
      createdOn: "2023-02-01",
    },
    {
      sNo: 3,
      role: "Manager",
      description: "Can manage team and view reports",
      createdBy: "Admin",
      type: "Internal",
      loginType: "Single Sign-On",
      createdOn: "2023-03-01",
    },
  ];

  const filterForm = useForm();
  const form = useForm();

  return (
    <MastersPageTemplate
      heading="Role Master"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
    />
  );
}
