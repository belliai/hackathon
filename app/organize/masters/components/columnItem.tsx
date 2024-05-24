import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";

export const selectColumn: ColumnDef<any> = {
  id: "select",
  header: ({ table }) => <DataTableSelectHead table={table} />,
  cell: ({ row }) => <DataTableSelectRow row={row} />,
  enableSorting: false,
  enableHiding: false,
};

export const actionColumn: ColumnDef<any> = {
  accessorKey: "id",
  header: "Action",
  cell: ({ row }) => <DataTableRowActions />,
};
