"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Unassigned = {
  awb_number?: string;
  org?: string;
  dest?: string;
  pieces?: string;
  weight?: string;
  unit?: string;
  rem_pcs?: string;
  rem_wt?: string;
  priority?: string;
  uom?: string;
  comm_desc?: string;
  shipper_name?: string;
  product_type?: string;
  shc?: string;
  flt_date?: string;
  scr?: string;
  remarks?: string;
};

export type Assigned = {
  awb_number?: string;
  accepted_pcs?: string;
  bulk_wt?: string;
  uom?: string;
  cart?: string;
  uld?: string;
  unid?: string;
  comm_description?: string;
  product_type?: string;
  scr_status?: string;
  transit?: string;
  shc?: string;
};

export type Cart = {
  cart?: string;
  scale_wt?: string;
  weight?: string;
  loading_priority?: string;
  builder_name?: string;
  pol?: string;
  pou?: string;
  unid?: string;
};

export type Uld = {
  uld?: string;
  pol?: string;
  pou?: string;
  unid?: string;
  scale_wt?: string;
  loading_priority?: string;
  uld_status?: string;
  awb_wt?: string;
  builder_name?: string;
  uom?: string;
  flt_stat?: string;
  remarks?: string;
};

export const unassignedColumn: ColumnDef<Unassigned>[] = [
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
    accessorKey: "org",
    header: "Org",
  },
  {
    accessorKey: "dest",
    header: "Dest",
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
    accessorKey: "unid",
    header: "UNID",
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
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "comm_desc",
    header: "Comm Desc",
  },
  {
    accessorKey: "shipper_name",
    header: "Shipper Name",
  },
  {
    accessorKey: "product_type",
    header: "Product Type",
  },
  {
    accessorKey: "shc",
    header: "SHC",
  },
  {
    accessorKey: "flt_date",
    header: "Flt Date",
  },
  {
    accessorKey: "src",
    header: "Scr",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];

export const assignedColumn: ColumnDef<Assigned>[] = [
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
    accessorKey: "accepted_pcs",
    header: "Accepted Pcs",
  },
  {
    accessorKey: "bulk_wt",
    header: "Bulk Wt",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "cart",
    header: "Cart#",
  },
  {
    accessorKey: "uld",
    header: "ULD#",
  },
  {
    accessorKey: "unid",
    header: "UNID",
  },
  {
    accessorKey: "comm_description",
    header: "Comm Description",
  },
  {
    accessorKey: "product_type",
    header: "Prod Type",
  },
  {
    accessorKey: "scr_status",
    header: "Scr Status",
  },
  {
    accessorKey: "transit",
    header: "Transit",
  },
  {
    accessorKey: "shc",
    header: "SHC",
  },
];

export const cartColumn: ColumnDef<Cart>[] = [
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
    accessorKey: "cart",
    header: "Cart#",
  },
  {
    accessorKey: "scale_wt",
    header: "Scale Wt",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "loading_priority",
    header: "Loading Priority",
  },
  {
    accessorKey: "builder_name",
    header: "Builder Name",
  },
  {
    accessorKey: "pol",
    header: "POL",
  },
  {
    accessorKey: "pou",
    header: "POU",
  },
  {
    accessorKey: "unid",
    header: "UNID",
  },
];

export const uldColumn: ColumnDef<Uld>[] = [
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
    header: "ULD#",
  },
  {
    accessorKey: "pol",
    header: "POL",
  },
  {
    accessorKey: "pou",
    header: "POU",
  },
  {
    accessorKey: "unid",
    header: "UNID",
  },
  {
    accessorKey: "scale_wt",
    header: "Scale Wt",
  },
  {
    accessorKey: "loading_priority",
    header: "Loading Priority",
  },
  {
    accessorKey: "uld_status",
    header: "ULD Status",
  },
  {
    accessorKey: "builder_name",
    header: "Builder Name",
  },
  {
    accessorKey: "awb_st",
    header: "AWB St",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "flt_stat",
    header: "Flt Stat",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];
