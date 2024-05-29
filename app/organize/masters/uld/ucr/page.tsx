"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { useFieldArray, useForm } from "react-hook-form";
import { actionColumn, selectColumn } from "../../components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "../../components/dummySelectOptions";
import { Button } from "@/components/ui/button";

export default function MasterUsrPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "ucrNumber",
      header: "UCR No.",
    },
    {
      accessorKey: "ucrDate",
      header: "UCR Date",
    },
    {
      accessorKey: "transferringCarrier",
      header: "Transferring Carrier",
    },
    {
      accessorKey: "transferWarehouse",
      header: "Transfer Warehouse",
    },
    {
      accessorKey: "receivingCarrier",
      header: "Receiving Carrier",
    },
    {
      accessorKey: "finalWarehouse",
      header: "Final Warehouse",
    },
    {
      accessorKey: "uldNumber",
      header: "ULD No.",
    },
    actionColumn,
  ];

  const data = [
    {
      ucrNumber: "UCR123456",
      ucrDate: "2024-05-29",
      transferringCarrier: "Carrier A",
      transferWarehouse: "Warehouse X",
      receivingCarrier: "Carrier B",
      finalWarehouse: "Warehouse Y",
      uldNumber: "ULD789012",
    },
    {
      ucrNumber: "UCR654321",
      ucrDate: "2024-05-30",
      transferringCarrier: "Carrier C",
      transferWarehouse: "Warehouse Z",
      receivingCarrier: "Carrier D",
      finalWarehouse: "Warehouse W",
      uldNumber: "ULD345678",
    },
    {
      ucrNumber: "UCR987654",
      ucrDate: "2024-06-01",
      transferringCarrier: "Carrier E",
      transferWarehouse: "Warehouse V",
      receivingCarrier: "Carrier F",
      finalWarehouse: "Warehouse U",
      uldNumber: "ULD123456",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "ucrNumber",
      placeholder: "UCR No.",
      type: "text",
    },
    {
      name: "uldNumber",
      placeholder: "ULD No.",
      type: "text",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "warehouseTransferring",
      placeholder: "Warehouse Transferring",
      type: "text",
    },
    {
      name: "carrierTransferring",
      placeholder: "Carrier Transferring",
      type: "text",
    },
    {
      name: "warehouseFinal",
      placeholder: "Warehouse Final",
      type: "text",
    },
    {
      name: "carrierReceiving",
      placeholder: "Carrier Receiving",
      type: "text",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "transferDate",
      label: "Transfer Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "transferTime",
      type: "text",
      placeholder: "Transfer Time",
    },
    {
      name: "transferringParty",
      placeholder: "Transferring Party",
      type: "text",
    },
    {
      name: "actualTransferDate",
      label: "Actual Transfer Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "receivingParty",
      placeholder: "Receiving Party",
      type: "text",
    },
    {
      name: "actualReceiveDate",
      label: "Actual Receive Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "loaded",
      placeholder: "Loaded",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "transferLocation",
      placeholder: "Transfer Location",
      type: "text",
    },
    {
      name: "finalLocation",
      placeholder: "Final Location",
      type: "text",
    },
    {
      name: "awbPrefix",
      placeholder: "AWB Prefix",
      type: "text",
    },
    {
      name: "awbNo",
      placeholder: "AWB No.",
      type: "text",
    },
    {
      name: "supplimentalInformation",
      placeholder: "Supplimental Information",
      type: "text",
    },
    {
      name: "remarks",
      placeholder: "Remarks",
      type: "text",
    },
  ];

  const filterForm = useForm();
  const hookForm = useForm({
    defaultValues: {
      fieldArray: [
        {
          ucrNo: "",
          receiptNo: "",
          isDamaged: false,
          returnedAt: "",
          returnedOn: "",
          awbPrefix: "",
          awbNo: "",
          isLoaded: false,
          uldCondition: "",
          uldOdln: "",
        },
      ],
      accessories: [
        {
          status: "",
          nets: "",
          doors: "",
          straps: "",
          fittings: "",
        },
      ],
    },
  });

  const fieldArray = useFieldArray<any>({
    control: hookForm.control,
    name: "fieldArray",
  });

  const accessoriesfieldArray = useFieldArray<any>({
    control: hookForm.control,
    name: "accessories",
  });

  return (
    <MastersPageTemplate
      heading="UCR"
      buttonText="Create UCR"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={hookForm}
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            Save
          </Button>
          <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            Print
          </Button>
          <Button
            className="bg-button-secondary hover:bg-button-secondary/80 text-white"
            onClick={() => {
              hookForm.reset({
                fieldArray: [],
                accessories: [],
              });
            }}
          >
            Clear
          </Button>
          <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            Cancel
          </Button>
          <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            Send LUC
          </Button>
        </div>
      }
      sectionedFormFields={[
        {
          fields: formFields,
        },
        {
          sectionName: "UCR ULD Details",
          fieldArray: {
            fieldArray: fieldArray,
            fields: [
              {
                name: "ucrNo",
                placeholder: "UCR No.",
                type: "text",
              },
              {
                name: "receiptNo",
                placeholder: "Receipt No.",
                type: "text",
              },
              {
                name: "isDamaged",
                placeholder: "Is Damaged",
                type: "select",
                options: DUMMY_SELECT_OPTIONS,
              },
              {
                name: "returnedAt",
                type: "date",
                hideTooltip: true,
              },
              {
                name: "returnedOn",
                type: "date",
                hideTooltip: true,
              },
              {
                name: "awbPrefix",
                placeholder: "AWB Prefix",
                type: "text",
              },
              {
                name: "awbNo",
                placeholder: "AWB No.",
                type: "text",
              },
              {
                name: "isLoaded",
                placeholder: "Is Loaded",
                type: "select",
                options: DUMMY_SELECT_OPTIONS,
              },
              {
                name: "uldCondition",
                placeholder: "ULD Condition",
                type: "text",
              },
              {
                name: "uldOdln",
                placeholder: "ULD ODLN",
                type: "text",
              },
            ],
          },
        },
        {
          sectionName: "Accessories",
          fieldArray: {
            fieldArray: accessoriesfieldArray,
            fieldArrayName: "accessories",
            fields: [
              {
                name: "status",
                placeholder: "Status",
                type: "text",
              },
              {
                name: "nets",
                placeholder: "Nets",
                type: "text",
              },
              {
                name: "doors",
                placeholder: "Doors",
                type: "text",
              },
              {
                name: "straps",
                placeholder: "Straps",
                type: "text",
              },
              {
                name: "fittings",
                placeholder: "Fittings",
                type: "text",
              },
            ],
          },
        },
      ]}
    />
  );
}
