"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type AwbType = {
  awb_number?: string;
  origin?: string;
  dest?: string;
  mft_pcs?: string;
  mft_wt?: string;
  arr_pcs?: string;
  arr_wt?: string;
  rem_pcs?: string;
  rem_wt?: string;
  priority?: string;
  discrepancy?: string;
  comm_code?: string;
  shipper?: string;
  consignee?: string;
  remarks?: string;
  handling_instruction?: string;
  flt?: string;
  flt_date?: string;
  arrival_time?: string;
  next_flt?: string;
  pol?: string;
  uom?: string;
  acc_pcs?: string;
  acc_wt?: string;
  security_check?: string;
};

export type UldType = {
  uld?: string;
  origin?: string;
  dest?: string;
  uld_wt?: string;
  scale_wt?: string;
  awb_ct?: string;
  awb_pcs?: string;
  awb_wt?: string;
  priority?: string;
  arrived?: string;
  flt?: string;
  flt_date?: string;
  pol?: string;
  uom?: string;
  handling_instruction?: string;
  remark?: string;
};

export const awbColumn: ColumnDef<AwbType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-zinc-500"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "awb_number",
    header: "AWB Number",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "dest",
    header: "Dest",
  },
  {
    accessorKey: "mft_pcs",
    header: "Mft Pcs",
  },
  {
    accessorKey: "mft_wt",
    header: "Mft Wt",
  },
  {
    accessorKey: "arr_pcs",
    header: "Arr Pcs",
  },
  {
    accessorKey: "arr_wt",
    header: "Arr Wt",
  },
  {
    accessorKey: "rem_pcs",
    header: "Rem Pcs",
  },
  {
    accessorKey: "rem_wt",
    header: "Rem Wt",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "discrepancy",
    header: "Discrepancy",
  },
  {
    accessorKey: "comm_code",
    header: "Comm Code",
  },
  {
    accessorKey: "shipper",
    header: "Shipper",
  },
  {
    accessorKey: "consignee",
    header: "Consignee",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "handling_instruction",
    header: "Handling Instruction",
  },
  {
    accessorKey: "flt",
    header: "Flt#",
  },
  {
    accessorKey: "flt_date",
    header: "Flt Date",
  },
  {
    accessorKey: "arrival_time",
    header: "Arrival Time",
  },
  {
    accessorKey: "next_flt",
    header: "Next Flt",
  },
  {
    accessorKey: "pol",
    header: "POL",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "acc_pcs",
    header: "Acc Pcs",
  },
  {
    accessorKey: "acc_wt",
    header: "Acc Wt",
  },
  {
    accessorKey: "security_check",
    header: "Security Check",
  },
];

export const uldColumn: ColumnDef<UldType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-zinc-500"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "uld",
    header: "ULD",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "dest",
    header: "Dest",
  },
  {
    accessorKey: "uld_wt",
    header: "ULD Wt",
  },
  {
    accessorKey: "scale_wt",
    header: "Scale Wt",
  },
  {
    accessorKey: "awb_ct",
    header: "AWB Ct",
  },
  {
    accessorKey: "awb_pcs",
    header: "AWB Pcs",
  },
  {
    accessorKey: "awb_wt",
    header: "AWB Wt",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "arrived",
    header: "Arrived",
  },
  {
    accessorKey: "flt",
    header: "Flt#",
  },
  {
    accessorKey: "flt_date",
    header: "Flt Date",
  },
  {
    accessorKey: "pol",
    header: "POL",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "handling_instruction",
    header: "Handling Instruction",
  },
  {
    accessorKey: "remark",
    header: "Remark",
  },
];
