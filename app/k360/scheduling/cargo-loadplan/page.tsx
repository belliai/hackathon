"use client";

import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { DataTable } from "@/components/data-table/data-table";
import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { PlaneIcon } from "lucide-react";
import { useForm } from "react-hook-form";

type CargoLoadplanDataType = {
  awb_no: string;
  origin: string;
  dest: string;
  pieces: number;
  weight: number;
  declared_vol: number;
  planned_pcs: number;
  planned_wt: number;
  load_vol: number;
  shc: string;
  commodity: string;
  remarks: string;
  priority: string;
  handling_info: string;
};

const columns: ColumnDef<CargoLoadplanDataType>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "awb_no",
    header: "AWB No.",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "dest",
    header: "Dest.",
  },
  {
    accessorKey: "pieces",
    header: "Pieces",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "declared_vol",
    header: "Declared Vol",
  },
  {
    accessorKey: "planned_pcs",
    header: "Planned Pcs",
  },
  {
    accessorKey: "planned_wt",
    header: "Planned Wt",
  },
  {
    accessorKey: "load_vol",
    header: "Load Vol",
  },
  {
    accessorKey: "shc",
    header: "SHC",
  },
  {
    accessorKey: "commodity",
    header: "Commodity",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "handling_info",
    header: "Handling Info",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
];

const data: CargoLoadplanDataType[] = [
  {
    awb_no: "123-45678901",
    origin: "LAX",
    dest: "JFK",
    pieces: 10,
    weight: 500,
    declared_vol: 2.5,
    planned_pcs: 10,
    planned_wt: 500,
    load_vol: 2.5,
    shc: "GEN",
    commodity: "Electronics",
    remarks: "Handle with care",
    priority: "High",
    handling_info: "Fragile",
  },
  {
    awb_no: "234-56789012",
    origin: "ORD",
    dest: "DFW",
    pieces: 15,
    weight: 700,
    declared_vol: 3.0,
    planned_pcs: 15,
    planned_wt: 700,
    load_vol: 3.0,
    shc: "PER",
    commodity: "Perishables",
    remarks: "Keep cool",
    priority: "Medium",
    handling_info: "Refrigerated",
  },
  {
    awb_no: "345-67890123",
    origin: "SFO",
    dest: "MIA",
    pieces: 8,
    weight: 300,
    declared_vol: 1.8,
    planned_pcs: 8,
    planned_wt: 300,
    load_vol: 1.8,
    shc: "DGR",
    commodity: "Chemicals",
    remarks: "Hazardous materials",
    priority: "High",
    handling_info: "Handle with caution",
  },
];

type FilterDataType = Partial<{
  partner_code: string;
  flight_no: string;
  flight_date: string;
  dep_airport: string;
}>;

const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "partner_code",
    type: "select",
    label: "Partner Code",
    selectOptions: [
      { value: "12", label: "Partner1" },
      { value: "15", label: "Partner2" },
      // Add more options as needed
    ],
  },
  {
    key: "flight_no",
    type: "text",
    label: "Flight No.",
  },
  {
    key: "flight_date",
    type: "date",
    label: "Flight Date",
  },
  {
    key: "dep_airport",
    type: "text",
    label: "Dept. Airport",
  },
];

export default function Page() {
  const form = useForm();
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Cargo Loadplan" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <div className="flex flex-row gap-6 max-h-full">
        <Card className="p-3 space-y-3 rounded-md">
          <div className="w-full flex justify-center items-center">
            <PlaneIcon className="size-6 my-1" />
          </div>
          <div className="bg-green-600 h-60 w-24 rounded-sm border flex items-center justify-center">
            <span className="font-semibold">BULK</span>
          </div>
        </Card>
        <div className="flex-grow overflow-x-auto">
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      </div>
      <Card className="rounded-sm">
        <CardHeader className="p-4 space-y-0 flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Cargo Loadplan</h3>
          <div className="flex flex-row gap-3">
            <Button variant={"button-primary"}>Save</Button>
            <Button variant={"button-primary"}>Print Load Plan</Button>
            <Button variant={"button-primary"}>Download Excel</Button>
            <Button variant={"button-primary"}>Finalize</Button>
            <Button variant={"button-primary"}>Send Loadplan</Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="px-4 py-4">
          <div className="w-full flex items-center justify-center text-muted-foreground py-4">
            No Items
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-sm">
        <CardHeader className="p-4 space-y-0 flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Assigned AWBs</h3>
          <div className="flex flex-row gap-3">
            <Button variant={"button-primary"}>Unnasign AWB</Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="px-4 py-4">
          <div className="w-full flex items-center justify-center text-muted-foreground py-4">
            No Items
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
