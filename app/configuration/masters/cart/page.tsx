"use client";

import MastersPageTemplate from "@/app/organize/masters/components/MastersPageTemplate";
import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import { TFormTextField } from "@/components/form/FormTextField";
import FilterActions from "@/components/page-template/FilterActions";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MasterCartPage() {
  const cartFormFields: TFormTextField[] = [
    {
      name: "cart_no",
      type: "text",
      label: "Cart #",
    },
    {
      name: "cart_description",
      type: "select",
      label: "Cart Description",
      options: [
        { label: "Cart", value: "cart" },
        { label: "Trolly", value: "trolly" },
      ],
    },
    {
      name: "station_code",
      type: "text",
      label: "Station Code",
    },
    {
      name: "location",
      type: "text",
      label: "Location",
    },
    {
      name: "active",
      type: "checkbox",
      label: "Active",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "cart_no",
      header: "Cart No",
    },
    {
      accessorKey: "cart_description",
      header: "Cart Description",
    },
    {
      accessorKey: "station_code",
      header: "Station Code",
    },
    {
      accessorKey: "location",
      header: "location",
    },
    {
      accessorKey: "status",
      header: "Active",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    actionColumn,
  ];

  const data = [
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      location: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
  ];

  const cartForm = useForm();

  return (
    <MastersPageTemplate
      heading="Cart Master"
      columns={columns}
      data={data}
      filterFormFields={cartFormFields}
      filterHookForm={cartForm}
      customFilterButtons={<FilterActions />}
    />
  );
}
