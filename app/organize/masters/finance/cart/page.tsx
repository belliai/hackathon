"use client";

import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { FormTextFieldProps } from "@/components/form/FormTextField";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";

const cartFormFields: Omit<FormTextFieldProps, "form">[] = [
  {
    name: "cart_no",
    type: "text",
    placeholder: "Cart #",
    endIcon: <Search size={16} />,
  },
  {
    name: "cart_description",
    type: "select",
    placeholder: "Cart Description",
    options: [
      { label: "Cart", value: "cart" },
      { label: "Trolly", value: "trolly" },
    ],
  },
  {
    name: "station_code",
    type: "text",
    placeholder: "Station Code",
    endIcon: <Search size={16} />,
  },
  {
    name: "status",
    type: "select",
    placeholder: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

export default function CartPage() {
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => <DataTableSelectHead table={table} />,
      cell: ({ row }) => <DataTableSelectRow row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge className="bg-green-700/80 text-white hover:bg-green-600">
            {row.original.status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          items={[
            {
              label: "Edit",
              value: "edit",
            },
            {
              label: "View",
              value: "view",
            },
          ]}
        />
      ),
    },
  ];

  const data = [
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      cart_no: "CART-001",
      cart_description: "Cart Description",
      station_code: "ST-001",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
  ];

  const cartForm = useForm();

  return (
    <MastersPageTemplate
      heading="Cart Master"
      buttonText="Create Cart"
      hookForm={cartForm}
      formFields={cartFormFields}
      columns={columns}
      data={data}
      filterFormFields={cartFormFields}
      filterHookForm={cartForm}
    />
  );
}
