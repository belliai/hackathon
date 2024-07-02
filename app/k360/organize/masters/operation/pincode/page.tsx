"use client";

import { useFieldArray, useForm } from "react-hook-form";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import FormTextField, { TFormTextField } from "@/components/form/FormTextField";
import { DUMMY_SELECT_OPTIONS } from "../../components/dummySelectOptions";
import { ColumnDef } from "@tanstack/react-table";
import { actionColumn, selectColumn } from "../../components/columnItem";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Download, Plus, Trash, Upload } from "lucide-react";
import { useMemo } from "react";

export default function MasterPincodePage() {
  const pinCodeForm = useForm({
    defaultValues: {
      pincodes: [
        {
          pincode: "",
          city: "",
          state: "",
          serviceableType: "",
          warehouseCode: "",
          airportCode: "",
          latitude: "",
          longitude: "",
        },
      ],
    },
  });

  const pincodeFieldArray = useFieldArray({
    control: pinCodeForm.control,
    name: "pincodes",
  });

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      selectColumn,
      {
        accessorKey: "pincode",
        header: "Pincode",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.pincode`}
              form={pinCodeForm}
              type="text"
            />
          );
        },
      },
      {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.city`}
              form={pinCodeForm}
              type="text"
            />
          );
        },
      },
      {
        accessorKey: "state",
        header: "State",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.state`}
              form={pinCodeForm}
              type="select"
              options={DUMMY_SELECT_OPTIONS}
            />
          );
        },
      },
      {
        accessorKey: "serviceableType",
        header: "Serviceable Type",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.serviceableType`}
              form={pinCodeForm}
              type="select"
              options={DUMMY_SELECT_OPTIONS}
            />
          );
        },
      },
      {
        accessorKey: "warehouseCode",
        header: "Warehouse Code",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.warehouseCode`}
              form={pinCodeForm}
              type="text"
            />
          );
        },
      },
      {
        accessorKey: "airportCode",
        header: "Airport Code",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.airportCode`}
              form={pinCodeForm}
              type="select"
              options={DUMMY_SELECT_OPTIONS}
            />
          );
        },
      },
      {
        accessorKey: "latitude",
        header: "Latitude",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.latitude`}
              form={pinCodeForm}
              type="text"
            />
          );
        },
      },
      {
        accessorKey: "longitude",
        header: "Longitude",
        cell: ({ row }) => {
          return (
            <FormTextField
              name={`pincodes.${row.index}.longitude`}
              form={pinCodeForm}
              type="text"
            />
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          return "23 July 2021 12:00:00 PM";
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
          return "23 July 2021 12:00:00 PM";
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          return (
            <Button
              size="icon"
              variant="destructive"
              onClick={() => {
                console.log("delete", row.index);

                pincodeFieldArray.remove(row.index);
              }}
            >
              <Trash size={18} />
            </Button>
          );
        },
      },
    ],
    []
  );

  const filterForm: TFormTextField[] = [
    {
      placeholder: "Pincode",
      type: "text",
      name: "pincode",
    },
    {
      placeholder: "City",
      type: "text",
      name: "city",
    },
    {
      placeholder: "State",
      type: "text",
      name: "state",
    },
    {
      placeholder: "Airport Code",
      type: "select",
      name: "airportCode",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "airportType",
      type: "select",
      placeholder: "Airport Type",
      options: DUMMY_SELECT_OPTIONS,
    },
  ];

  const filterHookForm = useForm();

  return (
    <Form {...pinCodeForm}>
      <MastersPageTemplate
        heading="Pincode Master"
        buttonText="Create Pincode"
        columns={columns}
        data={pinCodeForm.watch("pincodes") ?? []}
        filterFormFields={filterForm}
        filterHookForm={filterHookForm}
        hookForm={pinCodeForm}
        canCreate={false}
        pageActions={
          <>
            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              <Download className="mr-2" size={16} />
              Backup CSV
            </Button>
            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              <Upload className="mr-2" size={16} />
              Upload CSV
            </Button>
            <Button
              className="bg-button-primary hover:bg-button-primary/80 text-white"
              onClick={() => {
                pincodeFieldArray.append({
                  pincode: "",
                  city: "",
                  state: "",
                  serviceableType: "",
                  warehouseCode: "",
                  airportCode: "",
                  latitude: "",
                  longitude: "",
                });
              }}
            >
              <Plus size={16} className="mr-2" />
              Add Pincode
            </Button>
          </>
        }
      />
    </Form>
  );
}
