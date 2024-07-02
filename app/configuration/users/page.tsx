"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { TFormTextField } from "@/components/form/FormTextField";
import { useForm } from "react-hook-form";
import { selectColumn } from "@/app/k360/organize/masters/components/columnItem";
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FilterActions from "@/components/page-template/FilterActions";

export default function ConfigurationUsersPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "loginId",
      header: "Login ID",
    },
    {
      accessorKey: "userName",
      header: "User Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "emailId",
      header: "Email ID",
    },
    {
      accessorKey: "baseStation",
      header: "Base Station",
    },
    {
      accessorKey: "agentCode",
      header: "Agent Code",
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
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
  ];

  const filterFormFields = [
    {
      name: "userId",
      placeholder: "User ID",
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
      name: "role",
      placeholder: "Role",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "station",
      placeholder: "Station",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "text",
    },
    {
      name: "companyName",
      placeholder: "Company Name",
      type: "text",
    },
  ];

  const formFieldsL: TFormTextField[] = [
    {
      name: "loginId",
      placeholder: "Login ID",
      type: "text",
      required: true,
    },
    {
      name: "userName",
      placeholder: "User Name",
      type: "text",
      required: true,
    },
    {
      name: "emailId",
      placeholder: "Email ID",
      type: "text",
      required: true,
    },
    {
      name: "mobileNo",
      placeholder: "Mobile No.",
      type: "text",
      required: true,
    },
    {
      name: "password",
      placeholder: "Enter Password",
      type: "password",
      required: true,
    },
    {
      name: "role",
      placeholder: "Role",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      required: true,
    },
    {
      name: "baseStation",
      placeholder: "Base Station",
      type: "text",
      required: true,
    },
    {
      name: "stationAccess",
      placeholder: "Station Access",
      type: "text",
    },
    {
      name: "agentCode",
      placeholder: "Agent Code",
      type: "text",
    },
    {
      name: "status",
      placeholder: "Select Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "agentType",
      placeholder: "Select Agent Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "remark",
      placeholder: "Remark",

      type: "text",
    },
  ];

  const data = [
    {
      loginId: "user123",
      userName: "John Doe",
      emailId: "john.doe@example.com",
      mobileNo: "1234567890",
      password: "password123",
      role: "Admin",
      baseStation: "Station A",
      stationAccess: "Access A",
      agentCode: "AG123",
      status: "Active",
      agentType: "Type A",
      remark: "Remark 1",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-10",
    },
    {
      loginId: "user456",
      userName: "Jane Smith",
      emailId: "jane.smith@example.com",
      mobileNo: "0987654321",
      password: "password456",
      role: "User",
      baseStation: "Station B",
      stationAccess: "Access B",
      agentCode: "AG456",
      status: "Inactive",
      agentType: "Type B",
      remark: "Remark 2",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-10",
    },
    {
      loginId: "user789",
      userName: "Alice Johnson",
      emailId: "alice.johnson@example.com",
      mobileNo: "1122334455",
      password: "password789",
      role: "Manager",
      baseStation: "Station C",
      stationAccess: "Access C",
      agentCode: "AG789",
      status: "Active",
      agentType: "Type C",
      remark: "Remark 3",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-10",
    },
  ];

  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="User Listing"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      customFilterButtons={<FilterActions />}
      filterHookForm={filterForm}
      pageActions={
        <Button
          className="bg-button-primary hover:bg-button-primary/80 text-white"
          asChild
        >
          <Link href="/configuration/users/new">Create User</Link>
        </Button>
      }
    />
  );
}
