"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import FormTextField, {
  FormTextFieldProps,
} from "@/components/form/FormTextField";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";

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
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
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
    <PageContainer className="gap-6">
      <PageHeader
        title="Cart"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                <Plus size={16} className="mr-2" />
                Create Cart
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create Cart</DialogTitle>
              <Form {...cartForm}>
                <div className="flex flex-col gap-4">
                  {cartFormFields.map((field) => {
                    return (
                      <FormTextField
                        key={field.name}
                        {...field}
                        form={cartForm}
                        endIcon={null}
                      />
                    );
                  })}
                </div>
              </Form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="p-4 border rounded-md">
        <Form {...cartForm}>
          <form className="flex gap-4">
            {cartFormFields.map((field) => {
              return (
                <FormTextField key={field.name} {...field} form={cartForm} />
              );
            })}
            <div className="flex gap-2">
              <Button
                size="icon"
                className="bg-button-primary  text-white hover:bg-button-primary/80"
              >
                <Search size={16} />
              </Button>
              <Button
                size="icon"
                className="bg-button-secondary  text-white hover:bg-button-secondary/80"
              >
                <Download size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <DataTable columns={columns} data={data} hideToolbar />
    </PageContainer>
  );
}
